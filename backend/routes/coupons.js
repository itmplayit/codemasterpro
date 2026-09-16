import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    const [coupons] = await pool.query('SELECT * FROM coupons WHERE code=? AND is_active=TRUE', [code.toUpperCase()]);
    
    if (coupons.length===0) return res.status(404).json({ valid:false, message:'Invalid coupon' });
    
    const coupon = coupons[0];
    if (coupon.used_count >= coupon.max_uses) return res.status(400).json({ valid:false, message:'Coupon expired (max uses)' });
    if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) return res.status(400).json({ valid:false, message:'Coupon expired' });
    
    res.json({ valid:true, discount: coupon.discount_percent, coupon });
  } catch (err) {
    // Fallback demo
    const demo = { WELCOME50:50, PRO100:100, BHOPAL20:20 };
    const discount = demo[req.body.code?.toUpperCase()];
    if (discount) return res.json({ valid:true, discount });
    res.status(404).json({ valid:false, message:'Invalid coupon' });
  }
});

export default router;
