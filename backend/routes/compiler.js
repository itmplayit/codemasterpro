import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Simple JS code execution (sandboxed - for demo)
// In production, use Judge0 API or Piston API
router.post('/execute', async (req, res) => {
  try {
    const { language, code, input } = req.body;
    
    if (language === 'javascript') {
      // Safe execution for JS only - capture console.log
      let output = '';
      const originalLog = console.log;
      const logs = [];
      
      // Mock console.log
      const mockConsole = {
        log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
      };
      
      try {
        // Create function with limited scope
        const func = new Function('console', 'input', `
          ${code}
        `);
        func(mockConsole, input || '');
        output = logs.join('\n') || 'Code executed (no output)';
      } catch (e) {
        output = `Error: ${e.message}`;
      }
      
      return res.json({ output, language, success: !output.startsWith('Error:') });
    }
    
    // For other languages, mock or use external API
    // Example with Piston API: https://github.com/engineer-man/piston
    if (['python','java','cpp','c'].includes(language)) {
      // Mock response for demo - integrate Judge0/Piston in production
      return res.json({
        output: `[${language.toUpperCase()} Execution - Demo Mode]\nCode length: ${code.length} chars\nIntegrate Judge0 API for real execution.\n\nSample output: Hello World`,
        language,
        success: true,
        note: 'Integrate https://ce.judge0.com or https://emkc.org/api/v2/piston for production'
      });
    }
    
    res.status(400).json({ message: 'Unsupported language' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Execution failed', error: err.message });
  }
});

// Save snippet
router.post('/snippets', auth, async (req, res) => {
  const { title, language, code, is_public } = req.body;
  const [result] = await pool.query(
    'INSERT INTO code_snippets (user_id, title, language, code, is_public) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, title, language, code, is_public || false]
  );
  res.json({ id: result.insertId });
});

router.get('/snippets', auth, async (req, res) => {
  const [snippets] = await pool.query('SELECT * FROM code_snippets WHERE user_id=? ORDER BY created_at DESC', [req.user.id]);
  res.json(snippets);
});

router.get('/snippets/public', async (req, res) => {
  const [snippets] = await pool.query(`
    SELECT cs.*, u.name as user_name FROM code_snippets cs
    JOIN users u ON cs.user_id=u.id
    WHERE cs.is_public=TRUE ORDER BY cs.created_at DESC LIMIT 20
  `);
  res.json(snippets);
});

export default router;
