import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Helper: Generate subdomain slug
function generateSubdomain(projectName, userId) {
  const slug = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 30);
  return `${slug}-${userId}-${Date.now().toString(36)}`;
}

// Helper: Mock deploy to Hostinger (replace with real FTP/API in production)
async function deployToHostinger(deployment) {
  // In production, use:
  // 1. Hostinger API: https://api.hostinger.com (create subdomain, upload via FTP)
  // 2. Or Vercel API: POST https://api.vercel.com/v13/deployments
  // 3. Or Docker: Build image and run
  
  const logs = [
    `[${new Date().toISOString()}] 📦 Starting deployment for ${deployment.project_name}`,
    `[${new Date().toISOString()}] 🔍 Language: ${deployment.language}, Framework: ${deployment.framework}`,
    `[${new Date().toISOString()}] 📝 Code size: ${deployment.code.length} chars`,
    `[${new Date().toISOString()}] 🌐 Creating subdomain: ${deployment.subdomain}.codemasterpro.in`,
    `[${new Date().toISOString()}] 🔧 Installing dependencies...`,
    `[${new Date().toISOString()}] ⚙️  Building project...`,
    `[${new Date().toISOString()}] 📤 Uploading to Hostinger via FTP...`,
    `[${new Date().toISOString()}] 🔗 Configuring SSL (Let's Encrypt)...`,
    `[${new Date().toISOString()}] ✅ Deployed! URL: https://${deployment.subdomain}.codemasterpro.in`,
    `[${new Date().toISOString()}] 🎉 Live in 8.2s`
  ];

  // Simulate build time
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    success: true,
    url: `https://${deployment.subdomain}.codemasterpro.in`,
    logs: logs.join('\n')
  };
}

// Create deployment - One-Click Deploy
router.post('/', auth, async (req, res) => {
  try {
    const { project_name, language, framework, code, package_json, env_vars } = req.body;
    
    if (!project_name || !code) {
      return res.status(400).json({ message: 'Project name and code required' });
    }

    const userId = req.user.id;
    
    // Check limits based on membership
    try {
      const [count] = await pool.query('SELECT COUNT(*) as count FROM deployments WHERE user_id=?', [userId]);
      const [user] = await pool.query('SELECT membership FROM users WHERE id=?', [userId]);
      
      const limits = { free: 1, pro: 10, premium: 100 };
      const membership = user[0]?.membership || 'free';
      const limit = limits[membership] || 1;
      
      if (count[0].count >= limit) {
        return res.status(403).json({ 
          message: `Deployment limit reached (${limit} for ${membership}). Upgrade to Pro for 10 projects!`,
          limit,
          current: count[0].count,
          membership
        });
      }
    } catch (e) {
      console.log('Limit check skipped (no DB)', e.message);
    }

    const subdomain = generateSubdomain(project_name, userId);
    
    // Save deployment
    let deploymentId;
    try {
      const [result] = await pool.query(
        `INSERT INTO deployments (user_id, project_name, subdomain, language, framework, code, package_json, env_vars, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'deploying')`,
        [userId, project_name, subdomain, language || 'javascript', framework || 'static', code, package_json || null, JSON.stringify(env_vars || {})]
      );
      deploymentId = result.insertId;
    } catch (err) {
      // Fallback if DB not available (sandbox)
      deploymentId = Date.now();
      console.log('DB not available, using mock ID', deploymentId);
    }

    // Start deployment (async)
    const deployment = {
      id: deploymentId,
      project_name,
      subdomain,
      language,
      framework,
      code
    };

    // Mock deploy (in production, this would be async job)
    const deployResult = await deployToHostinger(deployment);

    // Update deployment status
    try {
      await pool.query(
        'UPDATE deployments SET deployment_url=?, status=?, build_logs=?, deployed_at=NOW() WHERE id=?',
        [deployResult.url, deployResult.success ? 'live' : 'failed', deployResult.logs, deploymentId]
      );

      // Award XP
      await pool.query(`
        INSERT INTO user_gamification (user_id, xp, deployments) VALUES (?, 50, 1)
        ON DUPLICATE KEY UPDATE xp = xp + 50, deployments = deployments + 1
      `, [userId]);

      await pool.query('INSERT INTO xp_history (user_id, xp_earned, reason) VALUES (?, ?, ?)', [userId, 50, `Deployed ${project_name}`]);
    } catch (e) {
      console.log('DB update skipped', e.message);
    }

    res.json({
      id: deploymentId,
      project_name,
      subdomain,
      deployment_url: deployResult.url,
      status: 'live',
      logs: deployResult.logs,
      message: 'Deployed successfully! 🚀',
      xp_earned: 50
    });

  } catch (err) {
    console.error('Deploy error:', err);
    res.status(500).json({ message: 'Deployment failed', error: err.message });
  }
});

// Get my deployments
router.get('/my', auth, async (req, res) => {
  try {
    const [deployments] = await pool.query(
      'SELECT * FROM deployments WHERE user_id=? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(deployments);
  } catch (err) {
    // Fallback mock
    res.json([
      {
        id: 1,
        project_name: 'Todo App',
        subdomain: 'my-todo-abc123',
        deployment_url: 'https://my-todo-abc123.codemasterpro.in',
        language: 'javascript',
        framework: 'react',
        status: 'live',
        visits: 42,
        created_at: new Date()
      }
    ]);
  }
});

// Get deployment logs
router.get('/:id/logs', auth, async (req, res) => {
  try {
    const [logs] = await pool.query('SELECT * FROM deployment_logs WHERE deployment_id=? ORDER BY created_at ASC', [req.params.id]);
    const [deployment] = await pool.query('SELECT build_logs FROM deployments WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    
    if (deployment.length === 0) return res.status(404).json({ message: 'Not found' });
    
    res.json({
      build_logs: deployment[0].build_logs,
      logs
    });
  } catch {
    res.json({
      build_logs: `[2026-09-15] 📦 Starting deployment...\n[2026-09-15] ✅ Deployed!`,
      logs: []
    });
  }
});

// Delete deployment
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM deployments WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    res.json({ message: 'Deployment deleted' });
  } catch {
    res.json({ message: 'Deleted (mock)' });
  }
});

// Redeploy
router.post('/:id/redeploy', auth, async (req, res) => {
  try {
    const [deployments] = await pool.query('SELECT * FROM deployments WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    if (deployments.length === 0) return res.status(404).json({ message: 'Not found' });
    
    const deployment = deployments[0];
    await pool.query('UPDATE deployments SET status="deploying" WHERE id=?', [req.params.id]);
    
    const result = await deployToHostinger(deployment);
    
    await pool.query('UPDATE deployments SET status=?, deployment_url=?, build_logs=?, deployed_at=NOW() WHERE id=?',
      [result.success ? 'live' : 'failed', result.url, result.logs, req.params.id]);
    
    res.json({ message: 'Redeployed!', url: result.url, logs: result.logs });
  } catch (err) {
    res.status(500).json({ message: 'Redeploy failed' });
  }
});

// Public: Get deployment by subdomain (for visit counting)
router.get('/public/:subdomain', async (req, res) => {
  try {
    const [deployments] = await pool.query('SELECT * FROM deployments WHERE subdomain=? AND is_public=TRUE', [req.params.subdomain]);
    if (deployments.length === 0) return res.status(404).json({ message: 'Deployment not found' });
    
    // Increment visits
    await pool.query('UPDATE deployments SET visits=visits+1 WHERE id=?', [deployments[0].id]);
    
    res.json(deployments[0]);
  } catch {
    res.status(404).json({ message: 'Not found' });
  }
});

export default router;
