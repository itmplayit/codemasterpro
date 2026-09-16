# CodeMaster Pro - V2 Upgrade (NEXT)

## New Features Added in NEXT

### 1. Admin Dashboard (/admin)
- Only accessible by role=admin (admin@codemaster.pro)
- Stats: Users, Courses, Revenue, Enrollments
- Recent users & payments
- Course management: View, Edit, Delete
- User management: Role & membership upgrade
- Create new course form with all fields

**Backend:** `/api/admin/*` protected by auth + adminOnly middleware

### 2. Razorpay Real Integration
- File: `components/RazorpayCheckout.jsx`
- Flow:
  1. Frontend calls `/api/memberships/create-order` → gets order_id
  2. Opens Razorpay checkout (script already in index.html)
  3. On success, calls `/api/memberships/verify` with signature
  4. Backend verifies and upgrades membership
- Demo mode: If Razorpay script not loaded, auto-mocks payment for testing
- To go live:
  - Add RAZORPAY_KEY_ID and SECRET in backend/.env
  - In memberships.js, uncomment razorpay.orders.create and signature verification (code commented)

### 3. Certificates System
- Backend: `/api/certificates/*`
  - POST /generate/:courseId → checks 80% progress, generates CM-XXXX cert
  - GET /my-certificates → user's certs
  - GET /verify/:certId → public verification
- Frontend: `/certificates` page with beautiful certificate cards
- Logic: Certificate ID = CM + timestamp + random
- Future: Add PDF generation via html2pdf or puppeteer

### 4. Search Page (/search)
- Unified search across courses, notes, quizzes
- Real-time API search

### 5. Enhanced Dashboard
- Now shows certificates link
- Progress bars for enrolled courses
- Quiz history

### 6. Live Preview Running
- Frontend: http://localhost:5173 (Vite)
- Backend: http://localhost:5000 (Express)
- Both started with `allowedHosts: true` for E2B preview

### 7. Professional Monetization Stack

**Revenue Streams:**
1. **Memberships** (Primary): ₹499/mo Pro, ₹999/mo Premium
2. **AdSense**: AdSlot component - banner + sidebar
3. **Affiliate**: Add links in notes/resources
4. **Course Sales**: One-time purchase model ready
5. **Instructor Revenue Share**: 70% model (admin can set)

**XAMPP Production Checklist:**
- [ ] Import schema.sql + seed.sql in phpMyAdmin
- [ ] Set .env DB credentials
- [ ] Set JWT_SECRET strong
- [ ] Add Razorpay live keys
- [ ] Get AdSense approval, replace AdSlot.jsx
- [ ] Host backend on VPS (Hostinger) with PM2
- [ ] Host frontend on Vercel/Hostinger
- [ ] Enable HTTPS
- [ ] Add rate limiting (express-rate-limit)

### API Endpoints V2

```
Admin:
GET    /api/admin/stats
GET    /api/admin/courses
POST   /api/admin/courses
PUT    /api/admin/courses/:id
DELETE /api/admin/courses/:id
POST   /api/admin/courses/:id/lessons
GET    /api/admin/users

Certificates:
POST   /api/certificates/generate/:courseId
GET    /api/certificates/my-certificates
GET    /api/certificates/verify/:certId

Existing:
All previous endpoints + /api/search via query params
```

### Next Next (V3 Ideas):
- Video upload with Multer + S3
- Live code editor (Monaco)
- Discussion forum
- Job board
- AI tutor (OpenAI API)
- Mobile app (React Native)

### How to Test Admin:
1. Login as admin@codemaster.pro / Admin@123
2. Go to /admin
3. Create course, see stats
4. If MySQL not connected in sandbox, backend returns 500 - that's expected. On XAMPP it works.

### File Structure V2:
```
frontend/src/
  pages/
    AdminDashboard.jsx (NEW)
    Certificates.jsx (NEW)
    Search.jsx (NEW)
  components/
    RazorpayCheckout.jsx (NEW)

backend/
  routes/
    admin.js (NEW)
    certificates.js (NEW)
```

Enjoy your pro education platform!
