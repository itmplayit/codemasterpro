import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://codemasterpro.in';
    
    let courses = [];
    let notes = [];
    let quizzes = [];
    
    try {
      const [c] = await pool.query('SELECT slug, created_at FROM courses WHERE status="published"');
      courses = c;
      const [n] = await pool.query('SELECT slug, created_at FROM notes');
      notes = n;
      const [q] = await pool.query('SELECT slug, created_at FROM quizzes');
      quizzes = q;
    } catch {
      // Fallback if DB not connected
      courses = [{ slug: 'complete-javascript-mastery-2025', created_at: new Date() }];
    }

    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/courses', priority: '0.9', changefreq: 'daily' },
      { url: '/notes', priority: '0.8', changefreq: 'weekly' },
      { url: '/quizzes', priority: '0.8', changefreq: 'weekly' },
      { url: '/roadmaps', priority: '0.7', changefreq: 'monthly' },
      { url: '/membership', priority: '0.9', changefreq: 'monthly' },
      { url: '/jobs', priority: '0.7', changefreq: 'weekly' },
      { url: '/playground', priority: '0.6', changefreq: 'monthly' },
      { url: '/about', priority: '0.5', changefreq: 'monthly' },
      { url: '/contact', priority: '0.5', changefreq: 'monthly' }
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticPages.forEach(page => {
      xml += `  <url>\n    <loc>${baseUrl}${page.url}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
    });

    courses.forEach(course => {
      xml += `  <url>\n    <loc>${baseUrl}/courses/${course.slug}</loc>\n    <lastmod>${new Date(course.created_at).toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    notes.forEach(note => {
      xml += `  <url>\n    <loc>${baseUrl}/notes/${note.slug}</loc>\n    <lastmod>${new Date(note.created_at).toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    quizzes.forEach(quiz => {
      xml += `  <url>\n    <loc>${baseUrl}/quizzes/${quiz.slug}</loc>\n    <lastmod>${new Date(quiz.created_at).toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating sitemap');
  }
});

export default router;
