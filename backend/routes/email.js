import express from 'express';
import pool from '../config/db.js';
import { sendEmail, emailTemplates } from '../utils/email.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Send welcome email (triggered on register)
router.post('/welcome', auth, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT name, email FROM users WHERE id=?', [req.user.id]);
    if (users.length===0) return res.status(404).json({ message: 'User not found' });
    
    const result = await sendEmail({
      to: users[0].email,
      subject: 'Welcome to CodeMaster Pro 🚀',
      html: emailTemplates.welcome(users[0].name),
      type: 'welcome',
      userId: req.user.id,
      pool
    });
    
    res.json({ message: 'Welcome email sent', ...result });
  } catch (err) {
    res.status(500).json({ message: 'Email failed' });
  }
});

// Admin: Send bulk email
router.post('/bulk', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  
  const { subject, html, membership } = req.body;
  let query = 'SELECT email, name, id FROM users';
  const params = [];
  
  if (membership) {
    query += ' WHERE membership=?';
    params.push(membership);
  }
  
  const [users] = await pool.query(query, params);
  
  let sent = 0;
  for (const user of users.slice(0, 10)) { // Limit to 10 for demo
    await sendEmail({ to: user.email, subject, html, type: 'bulk', userId: user.id, pool });
    sent++;
  }
  
  res.json({ message: `Sent to ${sent} users`, total: users.length });
});

// Email logs
router.get('/logs', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  const [logs] = await pool.query('SELECT el.*, u.name FROM email_logs el LEFT JOIN users u ON el.user_id=u.id ORDER BY el.created_at DESC LIMIT 50');
  res.json(logs);
});

export default router;
