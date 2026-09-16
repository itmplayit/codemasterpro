import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const [items] = await pool.query(`
    SELECT w.*, c.title, c.slug, c.thumbnail, c.price, c.level
    FROM wishlist w
    JOIN courses c ON w.course_id=c.id
    WHERE w.user_id=? ORDER BY w.created_at DESC
  `, [req.user.id]);
  res.json(items);
});

router.post('/:courseId', async (req, res) => {
  try {
    await pool.query('INSERT IGNORE INTO wishlist (user_id, course_id) VALUES (?, ?)', [req.user.id, req.params.courseId]);
    res.json({ message: 'Added to wishlist' });
  } catch (err) { res.status(500).json({ message: 'Error' }); }
});

router.delete('/:courseId', async (req, res) => {
  await pool.query('DELETE FROM wishlist WHERE user_id=? AND course_id=?', [req.user.id, req.params.courseId]);
  res.json({ message: 'Removed' });
});

router.get('/check/:courseId', async (req, res) => {
  const [exists] = await pool.query('SELECT id FROM wishlist WHERE user_id=? AND course_id=?', [req.user.id, req.params.courseId]);
  res.json({ inWishlist: exists.length>0 });
});

export default router;
