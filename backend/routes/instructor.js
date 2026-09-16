import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Middleware: instructor or admin
const instructorOnly = (req, res, next) => {
  if (!['instructor','admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Instructor access required' });
  }
  next();
};

router.use(auth, instructorOnly);

// Dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const instructorId = req.user.id;
    
    const [[totalCourses]] = await pool.query('SELECT COUNT(*) as count FROM courses WHERE instructor_id=?', [instructorId]);
    const [[totalStudents]] = await pool.query('SELECT SUM(total_students) as count FROM courses WHERE instructor_id=?', [instructorId]);
    const [[totalEarnings]] = await pool.query('SELECT SUM(amount) as total FROM instructor_earnings WHERE instructor_id=?', [instructorId]);
    const [[totalLessons]] = await pool.query('SELECT COUNT(*) as count FROM lessons WHERE course_id IN (SELECT id FROM courses WHERE instructor_id=?)', [instructorId]);

    const [courses] = await pool.query(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM enrollments WHERE course_id=c.id) as enrollments,
        (SELECT COUNT(*) FROM lessons WHERE course_id=c.id) as lesson_count
      FROM courses c WHERE c.instructor_id=? ORDER BY c.created_at DESC
    `, [instructorId]);

    const [recentEnrollments] = await pool.query(`
      SELECT e.*, u.name, c.title FROM enrollments e
      JOIN users u ON e.user_id=u.id
      JOIN courses c ON e.course_id=c.id
      WHERE c.instructor_id=? ORDER BY e.enrolled_at DESC LIMIT 10
    `, [instructorId]);

    res.json({
      stats: {
        courses: totalCourses.count,
        students: totalStudents.count || 0,
        earnings: totalEarnings.total || 0,
        lessons: totalLessons.count
      },
      courses,
      recentEnrollments
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Earnings
router.get('/earnings', async (req, res) => {
  const [earnings] = await pool.query(`
    SELECT ie.*, c.title FROM instructor_earnings ie
    JOIN courses c ON ie.course_id=c.id
    WHERE ie.instructor_id=? ORDER BY ie.created_at DESC
  `, [req.user.id]);
  res.json(earnings);
});

// Update course
router.put('/courses/:id', async (req, res) => {
  const { title, description, price } = req.body;
  const [course] = await pool.query('SELECT instructor_id FROM courses WHERE id=?', [req.params.id]);
  if (course.length===0) return res.status(404).json({ message: 'Not found' });
  if (course[0].instructor_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not your course' });
  }
  await pool.query('UPDATE courses SET title=?, description=?, price=? WHERE id=?', [title, description, price, req.params.id]);
  res.json({ message: 'Updated' });
});

export default router;
