import express from 'express';
import pool from '../config/db.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// All admin routes protected
router.use(auth, adminOnly);

// Dashboard Stats
router.get('/stats', async (req, res) => {
  try {
    const [[users]] = await pool.query('SELECT COUNT(*) as total FROM users');
    const [[courses]] = await pool.query('SELECT COUNT(*) as total FROM courses');
    const [[enrollments]] = await pool.query('SELECT COUNT(*) as total FROM enrollments');
    const [[revenue]] = await pool.query('SELECT SUM(amount) as total FROM payments WHERE status="success"');
    const [[notes]] = await pool.query('SELECT COUNT(*) as total FROM notes');
    const [[quizzes]] = await pool.query('SELECT COUNT(*) as total FROM quizzes');
    
    const [recentUsers] = await pool.query('SELECT id, name, email, membership, created_at FROM users ORDER BY created_at DESC LIMIT 5');
    const [recentPayments] = await pool.query(`
      SELECT p.*, u.name FROM payments p 
      JOIN users u ON p.user_id = u.id 
      ORDER BY p.created_at DESC LIMIT 5
    `);

    res.json({
      stats: { users: users.total, courses: courses.total, enrollments: enrollments.total, revenue: revenue.total || 0, notes: notes.total, quizzes: quizzes.total },
      recentUsers,
      recentPayments
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Course Management
router.get('/courses', async (req, res) => {
  const [courses] = await pool.query('SELECT c.*, cat.name as category_name FROM courses c LEFT JOIN categories cat ON c.category_id = cat.id ORDER BY c.created_at DESC');
  res.json(courses);
});

router.post('/courses', async (req, res) => {
  try {
    const { title, slug, description, short_desc, category_id, level, price, original_price, is_free, membership_required, thumbnail } = req.body;
    const [result] = await pool.query(
      `INSERT INTO courses (title, slug, description, short_desc, category_id, instructor_id, level, price, original_price, is_free, membership_required, thumbnail) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, description, short_desc, category_id, req.user.id, level, price, original_price, is_free, membership_required, thumbnail]
    );
    res.status(201).json({ id: result.insertId, message: 'Course created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put('/courses/:id', async (req, res) => {
  try {
    const { title, description, price, level, status, is_featured } = req.body;
    await pool.query('UPDATE courses SET title=?, description=?, price=?, level=?, status=?, is_featured=? WHERE id=?',
      [title, description, price, level, status, is_featured, req.params.id]);
    res.json({ message: 'Updated' });
  } catch (err) { res.status(500).json({ message: 'Error' }); }
});

router.delete('/courses/:id', async (req, res) => {
  await pool.query('DELETE FROM courses WHERE id=?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// Lessons
router.post('/courses/:id/lessons', async (req, res) => {
  const { title, video_url, duration_minutes, is_preview, order_no } = req.body;
  const [result] = await pool.query(
    'INSERT INTO lessons (course_id, title, video_url, duration_minutes, is_preview, order_no) VALUES (?, ?, ?, ?, ?, ?)',
    [req.params.id, title, video_url, duration_minutes, is_preview, order_no]
  );
  res.json({ id: result.insertId });
});

// Notes Management
router.post('/notes', async (req, res) => {
  const { title, slug, category_id, description, file_url, is_premium, tags } = req.body;
  const [result] = await pool.query(
    'INSERT INTO notes (title, slug, category_id, description, file_url, is_premium, tags) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, slug, category_id, description, file_url, is_premium, tags]
  );
  res.json({ id: result.insertId });
});

// Quizzes Management
router.post('/quizzes', async (req, res) => {
  const { title, slug, description, category_id, level, time_limit, is_premium } = req.body;
  const [result] = await pool.query(
    'INSERT INTO quizzes (title, slug, description, category_id, level, time_limit, is_premium) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, slug, description, category_id, level, time_limit, is_premium]
  );
  res.json({ id: result.insertId });
});

router.post('/quizzes/:id/questions', async (req, res) => {
  const { question, option_a, option_b, option_c, option_d, correct_option, explanation } = req.body;
  const [result] = await pool.query(
    'INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [req.params.id, question, option_a, option_b, option_c, option_d, correct_option, explanation]
  );
  res.json({ id: result.insertId });
});

// Users Management
router.get('/users', async (req, res) => {
  const [users] = await pool.query('SELECT id, name, email, role, membership, created_at FROM users ORDER BY created_at DESC');
  res.json(users);
});

router.put('/users/:id/role', async (req, res) => {
  const { role, membership } = req.body;
  await pool.query('UPDATE users SET role=?, membership=? WHERE id=?', [role, membership, req.params.id]);
  res.json({ message: 'Updated' });
});

export default router;
