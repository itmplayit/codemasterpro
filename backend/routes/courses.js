import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all courses with filters
router.get('/', async (req, res) => {
  try {
    const { category, level, search, featured, free } = req.query;
    let query = `
      SELECT c.*, cat.name as category_name, cat.slug as category_slug, u.name as instructor_name
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN users u ON c.instructor_id = u.id
      WHERE c.status = 'published'
    `;
    const params = [];

    if (category) { query += ' AND cat.slug = ?'; params.push(category); }
    if (level) { query += ' AND c.level = ?'; params.push(level); }
    if (featured === 'true') { query += ' AND c.is_featured = TRUE'; }
    if (free === 'true') { query += ' AND c.is_free = TRUE'; }
    if (search) { query += ' AND (c.title LIKE ? OR c.description LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }

    query += ' ORDER BY c.created_at DESC';

    const [courses] = await pool.query(query, params);
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single course with lessons
router.get('/:slug', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT c.*, cat.name as category_name, u.name as instructor_name
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN users u ON c.instructor_id = u.id
      WHERE c.slug = ?
    `, [req.params.slug]);

    if (courses.length === 0) return res.status(404).json({ message: 'Course not found' });

    const course = courses[0];
    const [lessons] = await pool.query('SELECT * FROM lessons WHERE course_id = ? ORDER BY order_no ASC', [course.id]);
    const [reviews] = await pool.query(`
      SELECT r.*, u.name as user_name FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.course_id = ? ORDER BY r.created_at DESC LIMIT 10
    `, [course.id]);

    res.json({ ...course, lessons, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in course
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    // Check if already enrolled
    const [existing] = await pool.query('SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?', [userId, courseId]);
    if (existing.length > 0) return res.json({ message: 'Already enrolled' });

    // Check membership requirement
    const [courses] = await pool.query('SELECT membership_required, price, is_free FROM courses WHERE id = ?', [courseId]);
    if (courses.length === 0) return res.status(404).json({ message: 'Course not found' });

    const course = courses[0];
    const levels = { free: 0, pro: 1, premium: 2 };
    if (levels[req.user.membership] < levels[course.membership_required]) {
      return res.status(403).json({ message: `${course.membership_required} membership required`, required: course.membership_required });
    }

    await pool.query('INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)', [userId, courseId]);
    await pool.query('UPDATE courses SET total_students = total_students + 1 WHERE id = ?', [courseId]);

    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user enrollments
router.get('/user/my-courses', auth, async (req, res) => {
  try {
    const [enrollments] = await pool.query(`
      SELECT e.*, c.title, c.slug, c.thumbnail, c.level
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = ?
      ORDER BY e.enrolled_at DESC
    `, [req.user.id]);
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update progress
router.post('/:id/progress', auth, async (req, res) => {
  try {
    const { lessonId, progress } = req.body;
    const courseId = req.params.id;
    const userId = req.user.id;

    const [enrollment] = await pool.query('SELECT completed_lessons FROM enrollments WHERE user_id = ? AND course_id = ?', [userId, courseId]);
    if (enrollment.length === 0) return res.status(404).json({ message: 'Not enrolled' });

    let completed = [];
    try { completed = JSON.parse(enrollment[0].completed_lessons || '[]'); } catch {}
    if (!completed.includes(lessonId)) completed.push(lessonId);

    await pool.query('UPDATE enrollments SET progress = ?, completed_lessons = ? WHERE user_id = ? AND course_id = ?', 
      [progress, JSON.stringify(completed), userId, courseId]);

    res.json({ message: 'Progress updated', completed });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
