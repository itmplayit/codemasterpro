import express from 'express';
import pool from '../config/db.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Create table if not exists
const initTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value JSON NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        updated_by INT NULL
      )
    `);
    // Insert default if empty
    const [rows] = await pool.query('SELECT COUNT(*) as cnt FROM site_settings');
    if (rows[0].cnt === 0) {
      const defaults = {
        general: {
          siteName: 'codemaster.pro',
          siteLogo: '⌘',
          tagline: 'Code that actually ships.',
          description: 'Professional coding platform for developers who want to learn, build, and deploy.',
          favicon: '',
        },
        appearance: {
          primaryColor: '#ffffff',
          secondaryColor: '#f59e0b',
          backgroundColor: '#050507',
          cardColor: '#12121a',
          borderColor: 'rgba(255,255,255,0.06)',
          theme: 'dark',
          fontHeading: 'Space Grotesk',
          fontBody: 'Inter',
          borderRadius: '16px',
        },
        homepage: {
          heroTitle: 'Code that',
          heroHighlight: 'actually',
          heroSuffix: 'ships.',
          heroSubtitle: 'Professional coding platform for developers who want to learn, build, and deploy. Courses, notes, AI tutor, playground, one-click deploy to Hostinger — all in React + MySQL (XAMPP).',
          heroBadge: 'One-Click Deploy to Hostinger • Live now',
          ctaPrimary: 'Start building',
          ctaSecondary: 'Open Playground',
          trustedTitle: 'Trusted by developers at',
          trustedLogos: ['GOOGLE', 'RAZORPAY', 'AMAZON', 'HOSTINGER'],
          features: [
            { title:'One-Click Deploy', desc:'Playground se live website in 10s. Hostinger powered, SSL auto, subdomain. Free 1, Pro 10 projects.', icon:'Zap' },
            { title:'AI Tutor', desc:'GPT-4 tutor + XAMPP error solver. Hinglish + voice.', icon:'Cpu' },
            { title:'XAMPP MySQL', desc:'Built for Indian colleges. Schema + seed + Docker + deploy.sh.', icon:'Database' },
            { title:'Earn ₹50k/mo', desc:'Memberships ₹499 + AdSense + Jobs ₹1999/post + Affiliate.', icon:'Github' },
          ]
        },
        footer: {
          description: 'Professional coding education. Learn, build, deploy, get hired. Built with React + MySQL (XAMPP) in Bhopal, for India.',
          email: 'admin@codemaster.pro',
          location: 'Bhopal, MP 🇮🇳',
          copyright: '© 2026 codemaster.pro — Built in Bhopal, for India. React + XAMPP MySQL + Razorpay.',
          social: { twitter:'', github:'', youtube:'', linkedin:'' }
        },
        seo: {
          metaTitle: 'CodeMaster Pro - Learn, Build, Deploy, Get Hired',
          metaDescription: 'Professional coding platform for developers. React + MySQL XAMPP + Razorpay + One-Click Deploy to Hostinger. 50k+ students.',
          keywords: 'coding, react, mysql, xampp, razorpay, hostinger, javascript, dsa, bhopal',
          ogImage: '',
        },
        monetization: {
          razorpayKey: 'rzp_test_••••••••',
          razorpaySecret: '••••••••',
          hostingerApi: 'hst_••••••••',
          adsenseId: 'ca-pub-••••••••',
          proPrice: 499,
          premiumPrice: 999,
          affiliateCommission: 30,
        },
        advanced: {
          customCss: '',
          customJs: '',
          maintenanceMode: false,
          maintenanceMessage: 'We are upgrading — back in 10 mins 🚀',
        }
      };
      for (const [key, value] of Object.entries(defaults)) {
        await pool.query('INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)', [key, JSON.stringify(value)]);
      }
      console.log('✅ site_settings table initialized with defaults');
    }
  } catch (err) {
    console.error('site_settings init error:', err.message);
  }
};
initTable();

// Public - Get all settings (for frontend) - with fallback if MySQL down
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    const settings = {};
    rows.forEach(r=>{
      try {
        settings[r.setting_key] = typeof r.setting_value === 'string' ? JSON.parse(r.setting_value) : r.setting_value;
      } catch {
        settings[r.setting_key] = r.setting_value;
      }
    });
    // If empty, return defaults
    if (Object.keys(settings).length===0) throw new Error('Empty');
    res.json(settings);
  } catch (err) {
    console.log('MySQL not available, returning defaults for settings');
    // Return defaults so frontend still works in cloud without XAMPP
    res.json({
      general: { siteName: 'codemaster.pro', siteLogo: '⌘', tagline: 'Code that actually ships.', description: 'Professional coding platform for developers who want to learn, build, and deploy.' },
      appearance: { primaryColor: '#ffffff', secondaryColor: '#f59e0b', backgroundColor: '#050507', cardColor: '#12121a', theme: 'dark', fontHeading: 'Space Grotesk', fontBody: 'Inter' },
      homepage: { heroTitle: 'Code that', heroHighlight: 'actually', heroSuffix: 'ships.', heroSubtitle: 'Professional coding platform for developers who want to learn, build, and deploy.', heroBadge: 'One-Click Deploy to Hostinger • Live now', ctaPrimary: 'Start building', ctaSecondary: 'Open Playground', trustedTitle: 'Trusted by developers at', trustedLogos: ['GOOGLE','RAZORPAY','AMAZON','HOSTINGER'] },
      footer: { description: 'Professional coding education. Learn, build, deploy, get hired.', email: 'admin@codemaster.pro', location: 'Bhopal, MP 🇮🇳', copyright: '© 2026 codemaster.pro — Built in Bhopal, for India.' },
      seo: { metaTitle: 'CodeMaster Pro', metaDescription: 'Professional coding platform', keywords: 'coding, react, mysql' },
      monetization: { proPrice: 499, premiumPrice: 999, affiliateCommission: 30 }
    });
  }
});

// Public - Get single setting
router.get('/:key', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT setting_value FROM site_settings WHERE setting_key=?', [req.params.key]);
    if (rows.length===0) return res.status(404).json({ message: 'Not found' });
    const val = typeof rows[0].setting_value === 'string' ? JSON.parse(rows[0].setting_value) : rows[0].setting_value;
    res.json(val);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

// Admin - Update all settings
router.put('/', auth, adminOnly, async (req, res) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      await pool.query(
        'INSERT INTO site_settings (setting_key, setting_value, updated_by) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value), updated_by=VALUES(updated_by)',
        [key, JSON.stringify(value), req.user.id]
      );
    }
    res.json({ message: 'Settings updated in MySQL', settings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update' });
  }
});

// Admin - Update single setting key
router.put('/:key', auth, adminOnly, async (req, res) => {
  try {
    const { key } = req.params;
    const value = req.body;
    await pool.query(
      'INSERT INTO site_settings (setting_key, setting_value, updated_by) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value), updated_by=VALUES(updated_by)',
      [key, JSON.stringify(value), req.user.id]
    );
    res.json({ message: `${key} updated in MySQL` });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

// Admin - Reset to defaults
router.post('/reset', auth, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM site_settings');
    await initTable();
    res.json({ message: 'Reset to defaults in MySQL' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reset' });
  }
});

export default router;
