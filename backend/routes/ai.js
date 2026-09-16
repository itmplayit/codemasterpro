import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Mock AI responses for demo (replace with OpenAI API in production)
const MOCK_RESPONSES = {
  javascript: "In JavaScript, closures allow functions to access variables from outer scope even after outer function has returned. Example:\n\n```js\nfunction outer() {\n  let count=0;\n  return () => count++;\n}\n```",
  react: "React hooks like useState and useEffect let you use state and lifecycle in functional components. useEffect runs after render, cleanup runs before unmount.",
  python: "Python list comprehension: [x*2 for x in range(10) if x%2==0] is faster than for loop.",
  mysql: "For XAMPP MySQL optimization: Use indexes on WHERE columns, avoid SELECT *, use EXPLAIN to check query plan, and enable query cache in my.ini",
  dsa: "For DSA interviews, master patterns: Two pointers, Sliding window, Binary search, DP. Practice 100 problems per pattern.",
  default: "I'm CodeMaster AI Tutor 🤖\n\nI can help with:\n- JavaScript, React, Node.js, Python, MySQL\n- DSA & System Design\n- Debugging code\n- Interview prep\n- XAMPP setup\n\nAsk me anything!"
};

// AI Tutor Chat
router.post('/chat', auth, async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) return res.status(400).json({ message: 'Message required' });

    const userId = req.user.id;
    const lowerMsg = message.toLowerCase();

    // Save user message
    try {
      await pool.query('INSERT INTO ai_chats (user_id, role, message) VALUES (?, ?, ?)', [userId, 'user', message]);
    } catch {}

    // Determine response (mock AI - replace with OpenAI in production)
    let response = MOCK_RESPONSES.default;
    
    if (lowerMsg.includes('javascript') || lowerMsg.includes('js') || lowerMsg.includes('closure') || lowerMsg.includes('promise')) {
      response = MOCK_RESPONSES.javascript;
    } else if (lowerMsg.includes('react') || lowerMsg.includes('hook') || lowerMsg.includes('component')) {
      response = MOCK_RESPONSES.react;
    } else if (lowerMsg.includes('python')) {
      response = MOCK_RESPONSES.python;
    } else if (lowerMsg.includes('sql') || lowerMsg.includes('mysql') || lowerMsg.includes('xampp') || lowerMsg.includes('database')) {
      response = MOCK_RESPONSES.mysql;
    } else if (lowerMsg.includes('dsa') || lowerMsg.includes('algorithm') || lowerMsg.includes('interview')) {
      response = MOCK_RESPONSES.dsa;
    } else if (lowerMsg.includes('code') || lowerMsg.includes('debug') || lowerMsg.includes('error')) {
      response = `Let me debug that for you:\n\nYour code issue might be:\n1. Check variable scope\n2. Verify async/await handling\n3. Look for typos in property names\n\nShare the exact code and error for precise help!\n\n💡 Tip: Use our Code Playground (/playground) to test quickly.`;
    }

    // Add context awareness
    if (context?.course) {
      response = `For course "${context.course}" specifically:\n\n${response}`;
    }

    // Save AI response
    try {
      await pool.query('INSERT INTO ai_chats (user_id, role, message) VALUES (?, ?, ?)', [userId, 'assistant', response]);
      
      // Award XP for using AI tutor
      await pool.query(`
        INSERT INTO user_gamification (user_id, xp, level) VALUES (?, 5, 1)
        ON DUPLICATE KEY UPDATE xp = xp + 5
      `, [userId]);
    } catch {}

    // In production, use OpenAI:
    /*
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are CodeMaster AI Tutor, expert in coding, DSA, and XAMPP MySQL setup. Help students with concise, code examples." },
        { role: "user", content: message }
      ],
      max_tokens: 500
    });
    response = completion.choices[0].message.content;
    */

    res.json({ response, usage: { xp_earned: 5 } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI error', error: err.message });
  }
});

// Get chat history
router.get('/history', auth, async (req, res) => {
  try {
    const [chats] = await pool.query('SELECT * FROM ai_chats WHERE user_id=? ORDER BY created_at DESC LIMIT 50', [req.user.id]);
    res.json(chats.reverse());
  } catch {
    res.json([]);
  }
});

// AI Quiz Generator
router.post('/generate-quiz', auth, async (req, res) => {
  try {
    const { topic, difficulty, count } = req.body;
    
    // Mock quiz generation - replace with OpenAI in production
    const mockQuiz = {
      title: `${topic} Quiz - ${difficulty}`,
      questions: Array.from({ length: count || 5 }, (_, i) => ({
        question: `Sample ${topic} question ${i+1} (${difficulty}) - What is the output?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: Math.floor(Math.random()*4),
        explanation: `This tests your ${topic} knowledge`
      }))
    };

    res.json(mockQuiz);
  } catch (err) {
    res.status(500).json({ message: 'Generation failed' });
  }
});

// AI Code Review
router.post('/review-code', auth, async (req, res) => {
  const { code, language } = req.body;
  
  // Mock review
  const review = {
    score: Math.floor(Math.random()*30)+70,
    issues: [
      { type: 'suggestion', message: 'Consider using const instead of let for variables not reassigned', line: 2 },
      { type: 'performance', message: 'This loop could be optimized with map/filter', line: 5 }
    ],
    improved_code: code + '\n// Improved version with best practices',
    explanation: 'Good code overall! Followed clean code principles. Minor optimizations suggested.'
  };
  
  res.json(review);
});

export default router;
