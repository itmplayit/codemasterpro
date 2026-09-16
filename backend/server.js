import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';

import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import noteRoutes from './routes/notes.js';
import quizRoutes from './routes/quizzes.js';
import membershipRoutes from './routes/memberships.js';
import materialRoutes from './routes/materials.js';
import adminRoutes from './routes/admin.js';
import certificateRoutes from './routes/certificates.js';
import instructorRoutes from './routes/instructor.js';
import discussionRoutes from './routes/discussions.js';
import wishlistRoutes from './routes/wishlist.js';
import compilerRoutes from './routes/compiler.js';
import jobRoutes from './routes/jobs.js';
import couponRoutes from './routes/coupons.js';
import aiRoutes from './routes/ai.js';
import analyticsRoutes from './routes/analytics.js';
import liveRoutes from './routes/live.js';
import gamificationRoutes from './routes/gamification.js';
import emailRoutes from './routes/email.js';
import sitemapRoutes from './routes/sitemap.js';
import deployRoutes from './routes/deploy.js';
import settingsRoutes from './routes/settings.js';
import { securityHeaders, generalLimiter, sanitizeInput } from './middleware/security.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS FIRST (important for rate limit errors to have CORS headers)
app.use(cors({
  origin: '*', // Allow all for demo - in production set to FRONTEND_URL
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput);
// Security headers after CORS
app.use(securityHeaders);
// Rate limiter only for auth and ai, not for public courses/stats
// app.use(generalLimiter); // Disabled for demo - enable in production with higher limit

// Serve uploaded files (if using multer)
// app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'CodeMaster Pro API Running 🚀 v6 ONE-CLICK DEPLOY',
    version: '6.0.0',
    features: ['Admin', 'Instructor', 'Certificates', 'Compiler', 'Discussions', 'Wishlist', 'Jobs', 'Coupons', 'AI Tutor', 'Analytics', 'Live Classes', 'Gamification', 'Video Progress', 'Email', 'Security', 'PDF', 'PWA', 'One-Click Deploy'],
    endpoints: ['/api/auth', '/api/courses', '/api/notes', '/api/quizzes', '/api/memberships', '/api/admin', '/api/instructor', '/api/discussions', '/api/wishlist', '/api/compiler', '/api/jobs', '/api/coupons', '/api/ai', '/api/analytics', '/api/live', '/api/gamification', '/api/email', '/api/deploy']
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/compiler', compilerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/live', liveRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/deploy', deployRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api', sitemapRoutes); // /api/sitemap.xml
app.use('/api', materialRoutes); // /api/categories, /api/stats

// Health check for XAMPP MySQL
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as ok');
    res.json({ status: 'ok', mysql: 'connected', xampp: true });
  } catch (err) {
    res.status(500).json({ status: 'error', mysql: err.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Frontend should run on ${process.env.FRONTEND_URL}`);
  console.log(`🗄️  Using XAMPP MySQL Database: ${process.env.DB_NAME}`);
});
