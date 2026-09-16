import express from 'express';
import pool from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

const PLANS = {
  free: { price: 0, duration_days: 0, features: ['Free courses', 'Basic notes', 'Community access'] },
  pro: { price: 499, duration_days: 30, features: ['All free features', 'Pro courses', 'Premium notes', 'Quizzes', 'Certificate', 'Ad-free'] },
  premium: { price: 999, duration_days: 30, features: ['All Pro features', 'Premium courses', '1-1 Mentorship', 'Interview prep', 'Job referrals', 'Priority support'] }
};

// Get plans
router.get('/plans', (req, res) => {
  res.json(PLANS);
});

// Create payment order (mock - integrate Razorpay here)
router.post('/create-order', auth, async (req, res) => {
  try {
    const { plan } = req.body;
    if (!['pro','premium'].includes(plan)) return res.status(400).json({ message: 'Invalid plan' });

    const planData = PLANS[plan];
    const orderId = `order_${Date.now()}_${req.user.id}`;

    // In production, create Razorpay order here
    // const razorpay = new Razorpay({...})
    // const order = await razorpay.orders.create({ amount: planData.price*100, currency: 'INR', receipt: orderId })

    await pool.query(
      'INSERT INTO payments (user_id, type, plan, amount, order_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, 'membership', plan, planData.price, orderId, 'pending']
    );

    res.json({
      order_id: orderId,
      amount: planData.price * 100,
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID,
      plan
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify payment (mock success)
router.post('/verify', auth, async (req, res) => {
  try {
    const { order_id, payment_id, plan } = req.body;
    const planData = PLANS[plan];

    // In production, verify Razorpay signature
    // Here we mock success for demo

    await pool.query('UPDATE payments SET payment_id = ?, status = "success" WHERE order_id = ?', [payment_id || `pay_${Date.now()}`, order_id]);

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + planData.duration_days);

    await pool.query('UPDATE users SET membership = ?, membership_expiry = ? WHERE id = ?', [plan, expiry, req.user.id]);

    res.json({ message: 'Payment verified, membership upgraded', membership: plan, expiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user payments
router.get('/my-payments', auth, async (req, res) => {
  const [payments] = await pool.query('SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  res.json(payments);
});

export default router;
