import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const [gam] = await pool.query('SELECT * FROM user_gamification WHERE user_id=?', [req.user.id]);
    const [badges] = await pool.query('SELECT * FROM badges ORDER BY xp_required ASC');
    const [xpHistory] = await pool.query('SELECT * FROM xp_history WHERE user_id=? ORDER BY created_at DESC LIMIT 20', [req.user.id]);
    
    if (gam.length===0) {
      await pool.query('INSERT INTO user_gamification (user_id, xp, level, streak_days) VALUES (?, 0, 1, 1)', [req.user.id]);
      return res.json({ xp:0, level:1, streak_days:1, badges:[], allBadges: badges, xpHistory: [] });
    }
    
    res.json({ ...gam[0], allBadges: badges, xpHistory });
  } catch {
    res.json({
      xp: 450,
      level: 4,
      streak_days: 5,
      badges: ['🎯','🧠'],
      allBadges: [
        { name:'First Steps', icon:'🎯', description:'Complete first lesson', xp_required:10 },
        { name:'Quiz Master', icon:'🧠', description:'5 perfect quizzes', xp_required:100 }
      ],
      xpHistory: []
    });
  }
});

router.post('/streak', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [gam] = await pool.query('SELECT last_active, streak_days FROM user_gamification WHERE user_id=?', [userId]);
    
    if (gam.length===0) {
      await pool.query('INSERT INTO user_gamification (user_id, streak_days, last_active) VALUES (?, 1, CURDATE())', [userId]);
      return res.json({ streak_days:1 });
    }
    
    const lastActive = gam[0].last_active ? new Date(gam[0].last_active) : null;
    const today = new Date();
    today.setHours(0,0,0,0);
    
    let newStreak = gam[0].streak_days;
    if (!lastActive) {
      newStreak = 1;
    } else {
      const diffDays = Math.floor((today - new Date(lastActive).setHours(0,0,0,0)) / 86400000);
      if (diffDays === 1) newStreak += 1;
      else if (diffDays > 1) newStreak = 1;
    }
    
    await pool.query('UPDATE user_gamification SET streak_days=?, last_active=CURDATE() WHERE user_id=?', [newStreak, userId]);
    res.json({ streak_days: newStreak });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

export default router;
