import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { type, category } = req.query;
    let query = `
      SELECT sm.*, c.name as category_name FROM study_materials sm
      LEFT JOIN categories c ON sm.category_id = c.id WHERE 1=1
    `;
    const params = [];
    if (type) { query += ' AND sm.type = ?'; params.push(type); }
    if (category) { query += ' AND c.slug = ?'; params.push(category); }
    query += ' ORDER BY sm.created_at DESC';
    const [materials] = await pool.query(query, params);
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const [cats] = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const [[courseCount]] = await pool.query('SELECT COUNT(*) as count FROM courses WHERE status="published"');
    const [[userCount]] = await pool.query('SELECT COUNT(*) as count FROM users');
    const [[noteCount]] = await pool.query('SELECT COUNT(*) as count FROM notes');
    const [[quizCount]] = await pool.query('SELECT COUNT(*) as count FROM quizzes');
    res.json({
      courses: courseCount.count,
      users: userCount.count,
      notes: noteCount.count,
      quizzes: quizCount.count
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
