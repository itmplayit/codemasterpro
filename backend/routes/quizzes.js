import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const [quizzes] = await pool.query(`
      SELECT q.*, c.name as category_name,
      (SELECT COUNT(*) FROM quiz_questions WHERE quiz_id = q.id) as total_questions
      FROM quizzes q
      LEFT JOIN categories c ON q.category_id = c.id
      ORDER BY q.created_at DESC
    `);
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz with questions (without answers if not admin)
router.get('/:slug', async (req, res) => {
  try {
    const [quizzes] = await pool.query('SELECT * FROM quizzes WHERE slug = ?', [req.params.slug]);
    if (quizzes.length === 0) return res.status(404).json({ message: 'Quiz not found' });

    const quiz = quizzes[0];
    const [questions] = await pool.query('SELECT id, quiz_id, question, option_a, option_b, option_c, option_d, points, order_no FROM quiz_questions WHERE quiz_id = ? ORDER BY order_no', [quiz.id]);

    res.json({ ...quiz, questions });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit quiz
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const quizId = req.params.id;
    const { answers, time_taken } = req.body; // answers: {questionId: 'a'|'b'|'c'|'d'}

    const [questions] = await pool.query('SELECT id, correct_option FROM quiz_questions WHERE quiz_id = ?', [quizId]);
    if (questions.length === 0) return res.status(404).json({ message: 'Quiz not found' });

    let correct = 0;
    const detailed = [];

    for (const q of questions) {
      const userAns = answers[q.id];
      const isCorrect = userAns === q.correct_option;
      if (isCorrect) correct++;
      detailed.push({ question_id: q.id, user_answer: userAns, correct_answer: q.correct_option, is_correct: isCorrect });
    }

    const score = Math.round((correct / questions.length) * 100);

    await pool.query(
      'INSERT INTO quiz_attempts (user_id, quiz_id, score, total_questions, correct_answers, time_taken, answers) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, quizId, score, questions.length, correct, time_taken, JSON.stringify(answers)]
    );

    await pool.query('UPDATE quizzes SET total_attempts = total_attempts + 1 WHERE id = ?', [quizId]);

    // Get correct answers with explanations
    const [fullQuestions] = await pool.query('SELECT * FROM quiz_questions WHERE quiz_id = ? ORDER BY order_no', [quizId]);

    res.json({
      score,
      correct,
      total: questions.length,
      passed: score >= 60,
      detailed_results: fullQuestions.map(q => ({
        ...q,
        user_answer: answers[q.id],
        is_correct: answers[q.id] === q.correct_option
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaderboard
router.get('/:id/leaderboard', async (req, res) => {
  try {
    const [board] = await pool.query(`
      SELECT qa.score, qa.time_taken, qa.created_at, u.name
      FROM quiz_attempts qa
      JOIN users u ON qa.user_id = u.id
      WHERE qa.quiz_id = ?
      ORDER BY qa.score DESC, qa.time_taken ASC
      LIMIT 20
    `, [req.params.id]);
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User attempts
router.get('/user/my-attempts', auth, async (req, res) => {
  try {
    const [attempts] = await pool.query(`
      SELECT qa.*, q.title, q.slug FROM quiz_attempts qa
      JOIN quizzes q ON qa.quiz_id = q.id
      WHERE qa.user_id = ? ORDER BY qa.created_at DESC
    `, [req.user.id]);
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
