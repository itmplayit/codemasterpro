import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get discussions for course
router.get('/course/:courseId', async (req, res) => {
  try {
    const [discussions] = await pool.query(`
      SELECT d.*, u.name as user_name, u.avatar,
        (SELECT COUNT(*) FROM discussions WHERE parent_id=d.id) as reply_count
      FROM discussions d
      JOIN users u ON d.user_id=u.id
      WHERE d.course_id=? AND d.parent_id IS NULL
      ORDER BY d.created_at DESC
    `, [req.params.courseId]);
    res.json(discussions);
  } catch (err) { res.status(500).json({ message: 'Error' }); }
});

// Get replies
router.get('/:id/replies', async (req, res) => {
  const [replies] = await pool.query(`
    SELECT d.*, u.name as user_name FROM discussions d
    JOIN users u ON d.user_id=u.id
    WHERE d.parent_id=? ORDER BY d.created_at ASC
  `, [req.params.id]);
  res.json(replies);
});

// Post discussion
router.post('/', auth, async (req, res) => {
  try {
    const { course_id, lesson_id, comment, parent_id } = req.body;
    if (!comment) return res.status(400).json({ message: 'Comment required' });
    
    const [result] = await pool.query(
      'INSERT INTO discussions (course_id, lesson_id, user_id, parent_id, comment) VALUES (?, ?, ?, ?, ?)',
      [course_id, lesson_id || null, req.user.id, parent_id || null, comment]
    );
    
    const [newComment] = await pool.query(`
      SELECT d.*, u.name as user_name FROM discussions d
      JOIN users u ON d.user_id=u.id WHERE d.id=?
    `, [result.insertId]);
    
    res.status(201).json(newComment[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like
router.post('/:id/like', auth, async (req, res) => {
  await pool.query('UPDATE discussions SET likes=likes+1 WHERE id=?', [req.params.id]);
  res.json({ message: 'Liked' });
});

export default router;
