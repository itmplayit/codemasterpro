# XAMPP MySQL Setup Guide (For Bhopal / Windows)

This project is 100% XAMPP compatible.

### Step 1: Install XAMPP
Download from https://www.apachefriends.org/
Install in C:\xampp

### Step 2: Start MySQL
- Open XAMPP Control Panel
- Click Start for Apache and MySQL
- If MySQL fails, change port to 3307 in my.ini and update .env

### Step 3: Create Database
1. Go to http://localhost/phpmyadmin
2. Click New → Database name: `codemaster_pro` → Create
3. Select database → Import → Choose file → `database/schema.sql` → Go
4. Again Import → `database/seed.sql` → Go

You should see 11 tables.

### Step 4: Backend
```bash
cd backend
npm install
copy .env.example .env   (Windows)
# or cp .env.example .env (Mac/Linux)
# Edit .env if you changed MySQL port/password
npm run dev
```

Test: http://localhost:5000/api/health → should return {"status":"ok","mysql":"connected"}

### Step 5: Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

### Default Login
- Admin: admin@codemaster.pro / Admin@123
- User: john@example.com / User@123

### Monetization Setup

1. **Razorpay** (for Indian payments)
   - Create account at razorpay.com
   - Get KEY_ID and KEY_SECRET
   - Put in backend/.env
   - Frontend will use test mode until you add real checkout code in Membership.jsx

2. **AdSense**
   - Replace AdSlot.jsx with your AdSense code
   - Get approval, then add client id in index.html

3. **Membership Logic**
   - Free users can access is_premium=FALSE content
   - Pro/Premium check via middleware/checkMembership
   - Expiry auto-handled in auth.js

### Production Deployment
- Host MySQL on Hostinger / PlanetScale
- Backend on Render / VPS
- Frontend on Vercel
- Update FRONTEND_URL and VITE_API_URL in .env

### Troubleshooting
- MySQL connection failed: Check XAMPP MySQL running, DB name codemaster_pro exists
- Port 5000 in use: Change PORT in backend/.env
- CORS error: Ensure FRONTEND_URL matches frontend port
