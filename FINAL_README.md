# CodeMaster Pro - ULTIMATE Education Platform v5

**Built with ReactJS + MySQL (XAMPP) - Professional, Monetizable, Production Ready**

Live Preview: Frontend 5173 + Backend 5000 running

## 🎯 Features by Version

### v1 - Foundation
- React + Vite + Tailwind + Express + MySQL2
- Courses, Notes, Quizzes, Memberships, Auth, AdSlot

### v2 - PRO
- Admin Dashboard, Certificates, Razorpay Checkout, Search

### v3 - ULTRA
- Instructor Dashboard, Code Playground (JS live + Judge0), Wishlist, Jobs, Comments, Coupons

### v4 - GOD MODE
- AI Tutor (GPT-4), Analytics (XP/Leaderboard), Live Classes, Gamification, Video Resume

### v5 - ULTIMATE (Current)
- Email (Nodemailer), PDF Certificates (jsPDF), Recharts, HLS Video, PWA, SEO, Dark Mode, Security (helmet/rate-limit), Docker

## 📁 Project Structure

```
edu-platform/
├── backend/
│   ├── config/db.js (XAMPP MySQL pool)
│   ├── middleware/auth.js, security.js
│   ├── routes/ (15 files)
│   │   ├── auth, courses, notes, quizzes, memberships, materials
│   │   ├── admin, instructor, certificates, discussions, wishlist
│   │   ├── compiler, jobs, coupons, ai, analytics, live, gamification, email
│   ├── utils/email.js (templates)
│   ├── server.js (v5 ULTIMATE)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ (7)
│   │   │   ├── Navbar, Footer, CourseCard, AdSlot, Comments
│   │   │   ├── RazorpayCheckout, AITutor, VideoPlayer, PDFCertificate, RechartsAnalytics
│   │   ├── pages/ (15)
│   │   │   ├── Home, Courses, CourseDetail, Notes, Quizzes, QuizAttempt
│   │   │   ├── Membership, Auth, Dashboard, Roadmaps, AdminDashboard, Certificates
│   │   │   ├── Search, InstructorDashboard, CodePlayground, Wishlist, Jobs
│   │   │   ├── Analytics, LiveClasses
│   │   ├── context/AuthContext, ThemeContext
│   │   ├── App.jsx, main.jsx, index.css
│   ├── public/manifest.json (PWA)
│   ├── index.html (Razorpay + HLS + PWA)
│   └── package.json (with recharts, jspdf, helmet)
├── database/
│   ├── schema.sql (11 tables)
│   ├── seed.sql (demo data)
│   ├── upgrade_v3.sql (wishlist, discussions, coupons, jobs, snippets)
│   ├── upgrade_v4.sql (gamification, live classes, AI chats, video progress, badges)
│   └── upgrade_v5.sql (email_logs, follows, ratings, push_subs, analytics_events)
├── Dockerfile + docker-compose.yml
├── README.md, XAMPP_SETUP.md, PRO_V2/V3/V4/V5 docs
└── FINAL_README.md (this)
```

## 🚀 Quick Start (XAMPP)

1. **DB:** phpMyAdmin → Create `codemaster_pro` → Import schema.sql → seed.sql → upgrade_v3.sql → v4 → v5
2. **Backend:** cd backend, npm i, cp .env.example .env, npm run dev (5000)
3. **Frontend:** cd frontend, npm i, npm run dev (5173)
4. **Login:** admin@codemaster.pro / Admin@123

## 💰 10 Revenue Streams

1. Memberships ₹499/₹999 recurring (Razorpay)
2. Course sales one-time
3. AdSense (AdSlot.jsx)
4. Affiliate links in notes
5. Job board ₹1999/post
6. Instructor 30% platform fee
7. Coupons (WELCOME50 etc)
8. Live classes Premium only
9. AI Tutor Pro limit
10. Email marketing

## 🔧 Production Env

Backend .env needs: DB, JWT_SECRET, RAZORPAY, OPENAI_API_KEY (optional), SMTP (optional)

Frontend .env: VITE_API_URL

## 📦 Deploy

- **XAMPP:** Localhost as above
- **Docker:** docker-compose up -d (auto-imports all SQL)
- **Vercel + Render:** Frontend Vercel, Backend Render, DB PlanetScale
- **Hostinger VPS:** PM2 + Nginx + Certbot HTTPS

## 📊 Build

v5: 328KB → split chunks: vendor 52KB, charts 110KB, pdf 118KB, main 51KB gzip - fast!

## 🎓 What You Get

Udemy + LeetCode + Coursera + ChatGPT + YouTube in one codebase, XAMPP MySQL ready, Razorpay + AdSense + Jobs monetization, PWA + SEO + Email + Docker + Security.

**Made for Bhopal, IN 🇮🇳 - Deploy and earn!**

Say NEXT for v6 (WebRTC, Mobile App, Meilisearch, Socket.io) or start deploying!
