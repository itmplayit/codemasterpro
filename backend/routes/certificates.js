import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Generate certificate ID
function generateCertId() {
  return `CM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
}

// Check and generate certificate if course completed
router.post('/generate/:courseId', auth, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    // Check enrollment and progress
    const [enrollments] = await pool.query('SELECT progress FROM enrollments WHERE user_id=? AND course_id=?', [userId, courseId]);
    if (enrollments.length === 0) return res.status(404).json({ message: 'Not enrolled' });
    
    if (enrollments[0].progress < 80) {
      return res.status(400).json({ message: 'Complete 80% to get certificate', progress: enrollments[0].progress });
    }

    // Check if already exists
    const [existing] = await pool.query('SELECT * FROM certificates WHERE user_id=? AND course_id=?', [userId, courseId]);
    if (existing.length > 0) return res.json(existing[0]);

    const certId = generateCertId();
    const [result] = await pool.query('INSERT INTO certificates (user_id, course_id, certificate_id) VALUES (?, ?, ?)', [userId, courseId, certId]);

    const [course] = await pool.query('SELECT title FROM courses WHERE id=?', [courseId]);
    const [user] = await pool.query('SELECT name FROM users WHERE id=?', [userId]);

    res.json({
      id: result.insertId,
      certificate_id: certId,
      course_title: course[0]?.title,
      user_name: user[0]?.name,
      issued_at: new Date()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/my-certificates', auth, async (req, res) => {
  const [certs] = await pool.query(`
    SELECT cert.*, c.title as course_title, c.thumbnail
    FROM certificates cert
    JOIN courses c ON cert.course_id = c.id
    WHERE cert.user_id=?
    ORDER BY cert.issued_at DESC
  `, [req.user.id]);
  res.json(certs);
});

router.get('/verify/:certId', async (req, res) => {
  const [certs] = await pool.query(`
    SELECT cert.*, u.name as user_name, c.title as course_title
    FROM certificates cert
    JOIN users u ON cert.user_id = u.id
    JOIN courses c ON cert.course_id = c.id
    WHERE cert.certificate_id=?
  `, [req.params.certId]);
  
  if (certs.length === 0) return res.status(404).json({ valid: false, message: 'Invalid certificate' });
  res.json({ valid: true, certificate: certs[0] });
});

export default router;
