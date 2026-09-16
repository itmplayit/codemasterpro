import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Rate limiting - Increased for dev to avoid 429
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased from 100 to 1000 for dev
  message: { message: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for public routes in dev
    const publicPaths = ['/api/courses', '/api/stats', '/api/categories', '/api/jobs', '/api/sitemap.xml', '/api/health'];
    return publicPaths.some(path => req.path.startsWith(path));
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Increased from 5 to 20
  message: { message: 'Too many login attempts, try again after 15 minutes' }
});

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Increased from 10 to 30
  message: { message: 'AI rate limit exceeded. Upgrade to Pro for unlimited.' }
});

// Security headers
export const securityHeaders = helmet({
  contentSecurityPolicy: false, // Disable for dev, enable in production with proper config
  crossOriginEmbedderPolicy: false
});

// Simple input sanitization
export const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        // Remove <script> tags and trim
        obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };
  
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  next();
};
