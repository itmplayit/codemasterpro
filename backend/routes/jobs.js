import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [jobs] = await pool.query('SELECT * FROM jobs ORDER BY is_featured DESC, created_at DESC');
    res.json(jobs);
  } catch (err) {
    // Fallback if table not exists (demo mode)
    res.json([
      { id:1, title:'Frontend Developer', company:'Google', location:'Bangalore', type:'fulltime', salary:'28 LPA', description:'ReactJS developer needed', skills:'React, JS, TS', is_featured:1 },
      { id:2, title:'Backend Developer (Node + MySQL)', company:'Razorpay', location:'Remote', type:'fulltime', salary:'18 LPA', description:'Build payment systems', skills:'Node, MySQL, XAMPP', is_featured:1 }
    ]);
  }
});

router.get('/:id', async (req, res) => {
  const [jobs] = await pool.query('SELECT * FROM jobs WHERE id=?', [req.params.id]);
  if (jobs.length===0) return res.status(404).json({ message: 'Not found' });
  res.json(jobs[0]);
});

export default router;
