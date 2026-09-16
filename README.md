# CodeMaster Pro - Professional Coding Education Platform

A full-stack professional education platform built with ReactJS + Node.js + MySQL (XAMPP).

## Features

### Core Learning
- **Courses**: Video courses with modules, lessons, progress tracking
- **Coding Notes**: Categorized, searchable notes (PDF/Markdown) with download
- **Study Materials**: Cheat sheets, roadmaps, interview prep
- **Quizzes**: Interactive quizzes with instant scoring & leaderboard

### Monetization
- **Memberships**: Free / Pro (₹499/mo) / Premium (₹999/mo) - Razorpay/Stripe ready
- **Course Purchases**: One-time buy model
- **Ad Slots**: Google AdSense ready components
- **Affiliate & Sponsorship placeholders**

### Professional Features
- JWT Authentication
- Admin Dashboard
- Progress Tracking
- Certificate Generation
- Search & Filters
- Dark/Light Mode
- Responsive, SEO-friendly

## Tech Stack
- **Frontend**: React 18 + Vite + React Router + Tailwind CSS + Lucide Icons
- **Backend**: Node.js + Express + MySQL2 + JWT + Bcrypt
- **Database**: MySQL (XAMPP)
- **Payments**: Razorpay integration ready

## Setup Guide (XAMPP)

### 1. Database Setup
1. Start Apache & MySQL in XAMPP Control Panel
2. Open http://localhost/phpmyadmin
3. Create database `codemaster_pro`
4. Import `database/schema.sql`
5. (Optional) Import `database/seed.sql` for demo data

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DB credentials
npm run dev
# Server runs at http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

### Default .env for XAMPP:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=codemaster_pro
DB_PORT=3306
JWT_SECRET=your_super_secret_key_change_this
PORT=5000
RAZORPAY_KEY_ID=rzp_test_key
RAZORPAY_KEY_SECRET=rzp_test_secret
```

### Default Admin:
Email: admin@codemaster.pro
Password: Admin@123

## Project Structure
```
edu-platform/
├── backend/       # Express API
├── frontend/      # React App
└── database/      # MySQL schemas
```

## Monetization Implementation
- `MembershipPage.jsx` handles subscription UI
- `AdSlot.jsx` component for AdSense
- Backend `/api/payments` ready for Razorpay verification
- Course purchase logic in `/api/courses/:id/purchase`

## Deployment
- Frontend: Vercel / Netlify
- Backend: Render / Railway / VPS
- Database: PlanetScale / Hostinger MySQL

Built for professional use - production ready code.
