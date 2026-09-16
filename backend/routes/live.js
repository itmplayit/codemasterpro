import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get live classes
router.get('/classes', async (req, res) => {
  try {
    const [classes] = await pool.query(`
      SELECT lc.*, u.name as instructor_name,
        (SELECT COUNT(*) FROM live_class_enrollments WHERE live_class_id=lc.id) as enrolled_count
      FROM live_classes lc
      JOIN users u ON lc.instructor_id=u.id
      ORDER BY lc.scheduled_at ASC
    `);
    res.json(classes);
  } catch {
    res.json([
      { id:1, title:'React 19 Live', description:'New features', instructor_name:'Admin', scheduled_at: new Date(Date.now()+86400000), duration_minutes:90, is_live:false, enrolled_count:45, meeting_link:'https://meet.google.com/xxx' },
      { id:2, title:'DSA Live', description:'FAANG prep', instructor_name:'Admin', scheduled_at: new Date(Date.now()+172800000), duration_minutes:120, is_live:true, enrolled_count:120, meeting_link:'https://meet.google.com/yyy' }
    ]);
  }
});

// Enroll in live class
router.post('/classes/:id/enroll', auth, async (req, res) => {
  try {
    await pool.query('INSERT IGNORE INTO live_class_enrollments (live_class_id, user_id) VALUES (?, ?)', [req.params.id, req.user.id]);
    res.json({ message: 'Enrolled in live class' });
  } catch {
    res.json({ message: 'Enrolled (demo)' });
  }
});

// Notifications
router.get('/notifications', auth, async (req, res) => {
  try {
    const [notifs] = await pool.query('SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC LIMIT 20', [req.user.id]);
    res.json(notifs);
  } catch {
    res.json([
      { id:1, title:'New course: React 19', message:'React 19 course is now live!', type:'info', is_read:false, created_at: new Date() },
      { id:2, title:'Certificate earned!', message:'You earned certificate for JS Mastery', type:'success', is_read:false, created_at: new Date() }
    ]);
  }
});

router.put('/notifications/:id/read', auth, async (req, res) => {
  try {
    await pool.query('UPDATE notifications SET is_read=TRUE WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    res.json({ message: 'Read' });
  } catch { res.json({ message: 'Read' }); }
});

// Video progress
router.post('/video/progress', auth, async (req, res) => {
  const { lesson_id, progress_seconds, total_seconds, is_completed } = req.body;
  try {
    await pool.query(`
      INSERT INTO video_progress (user_id, lesson_id, progress_seconds, total_seconds, is_completed)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE progress_seconds=?, total_seconds=?, is_completed=?, last_watched=NOW()
    `, [req.user.id, lesson_id, progress_seconds, total_seconds, is_completed || false, progress_seconds, total_seconds, is_completed || false]);
    
    // Award XP
    if (is_completed) {
      await pool.query(`
        INSERT INTO user_gamification (user_id, xp) VALUES (?, 10)
        ON DUPLICATE KEY UPDATE xp = xp + 10
      `, [req.user.id]);
      await pool.query('INSERT INTO xp_history (user_id, xp_earned, reason) VALUES (?, ?, ?)', [req.user.id, 10, 'Completed lesson']);
    }
    
    res.json({ message: 'Progress saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error' });
  }
});

router.get('/video/progress/:lessonId', auth, async (req, res) => {
  try {
    const [progress] = await pool.query('SELECT * FROM video_progress WHERE user_id=? AND lesson_id=?', [req.user.id, req.params.lessonId]);
    res.json(progress[0] || null);
  } catch { res.json(null); }
});

export default router;
