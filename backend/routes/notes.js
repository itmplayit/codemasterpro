import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all notes
router.get('/', async (req, res) => {
  try {
    const { category, search, premium } = req.query;
    let query = `
      SELECT n.*, c.name as category_name, c.slug as category_slug
      FROM notes n
      LEFT JOIN categories c ON n.category_id = c.id
      WHERE 1=1
    `;
    const params = [];
    if (category) { query += ' AND c.slug = ?'; params.push(category); }
    if (search) { query += ' AND (n.title LIKE ? OR n.tags LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    if (premium === 'false') { query += ' AND n.is_premium = FALSE'; }
    query += ' ORDER BY n.created_at DESC';

    const [notes] = await pool.query(query, params);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const [notes] = await pool.query(`
      SELECT n.*, c.name as category_name FROM notes n
      LEFT JOIN categories c ON n.category_id = c.id
      WHERE n.slug = ?
    `, [req.params.slug]);
    if (notes.length === 0) return res.status(404).json({ message: 'Note not found' });

    // Increment views
    await pool.query('UPDATE notes SET views = views + 1 WHERE id = ?', [notes[0].id]);

    res.json(notes[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Download count
router.post('/:id/download', auth, async (req, res) => {
  try {
    const [notes] = await pool.query('SELECT is_premium FROM notes WHERE id = ?', [req.params.id]);
    if (notes.length === 0) return res.status(404).json({ message: 'Not found' });
    
    if (notes[0].is_premium && req.user.membership === 'free') {
      return res.status(403).json({ message: 'Premium membership required' });
    }

    await pool.query('UPDATE notes SET downloads = downloads + 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Download counted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
