-- CodeMaster Pro - Database Schema for XAMPP MySQL
-- Create database
CREATE DATABASE IF NOT EXISTS codemaster_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE codemaster_pro;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user','admin','instructor') DEFAULT 'user',
  membership ENUM('free','pro','premium') DEFAULT 'free',
  membership_expiry DATETIME NULL,
  avatar VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  icon VARCHAR(50) NULL,
  description TEXT NULL
);

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_desc VARCHAR(300) NULL,
  thumbnail VARCHAR(255) NULL,
  category_id INT,
  instructor_id INT,
  level ENUM('beginner','intermediate','advanced') DEFAULT 'beginner',
  price DECIMAL(10,2) DEFAULT 0.00,
  original_price DECIMAL(10,2) DEFAULT 0.00,
  is_free BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  language VARCHAR(50) DEFAULT 'English',
  duration_hours DECIMAL(5,2) DEFAULT 0,
  total_lessons INT DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 4.5,
  total_students INT DEFAULT 0,
  membership_required ENUM('free','pro','premium') DEFAULT 'free',
  status ENUM('draft','published') DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Course Modules / Lessons
CREATE TABLE IF NOT EXISTS lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NULL,
  video_url VARCHAR(500) NULL,
  content TEXT NULL,
  duration_minutes INT DEFAULT 0,
  is_preview BOOLEAN DEFAULT FALSE,
  order_no INT DEFAULT 0,
  resources JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Notes / Study Materials
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  category_id INT,
  description TEXT NULL,
  content LONGTEXT NULL,
  file_url VARCHAR(500) NULL,
  file_type ENUM('pdf','markdown','link') DEFAULT 'pdf',
  is_premium BOOLEAN DEFAULT FALSE,
  downloads INT DEFAULT 0,
  views INT DEFAULT 0,
  tags VARCHAR(300) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Study Materials (cheat sheets, roadmaps)
CREATE TABLE IF NOT EXISTS study_materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  type ENUM('cheatsheet','roadmap','interview','ebook') DEFAULT 'cheatsheet',
  category_id INT,
  thumbnail VARCHAR(255) NULL,
  file_url VARCHAR(500) NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  downloads INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT NULL,
  category_id INT,
  course_id INT NULL,
  level ENUM('beginner','intermediate','advanced') DEFAULT 'beginner',
  time_limit INT DEFAULT 10,
  passing_score INT DEFAULT 60,
  is_premium BOOLEAN DEFAULT FALSE,
  total_attempts INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  question TEXT NOT NULL,
  option_a VARCHAR(500) NOT NULL,
  option_b VARCHAR(500) NOT NULL,
  option_c VARCHAR(500) NOT NULL,
  option_d VARCHAR(500) NOT NULL,
  correct_option ENUM('a','b','c','d') NOT NULL,
  explanation TEXT NULL,
  points INT DEFAULT 1,
  order_no INT DEFAULT 0,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  quiz_id INT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  time_taken INT NULL,
  answers JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  progress DECIMAL(5,2) DEFAULT 0.00,
  completed_lessons JSON NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME NULL,
  UNIQUE KEY unique_enrollment (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Memberships / Payments
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('membership','course') NOT NULL,
  plan ENUM('pro','premium') NULL,
  course_id INT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  payment_id VARCHAR(100) NULL,
  order_id VARCHAR(100) NULL,
  status ENUM('pending','success','failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);

-- Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  certificate_id VARCHAR(100) UNIQUE NOT NULL,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Comments / Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  rating INT CHECK (rating >=1 AND rating <=5),
  comment TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Site Settings - Full Website Customization from Admin (MySQL)
CREATE TABLE IF NOT EXISTS site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT NULL,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
('general', JSON_OBJECT('siteName', 'codemaster.pro', 'siteLogo', '⌘', 'tagline', 'Code that actually ships.', 'description', 'Professional coding platform for developers who want to learn, build, and deploy.', 'favicon', '')) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('appearance', JSON_OBJECT('primaryColor', '#ffffff', 'secondaryColor', '#f59e0b', 'backgroundColor', '#050507', 'cardColor', '#12121a', 'borderColor', 'rgba(255,255,255,0.06)', 'theme', 'dark', 'fontHeading', 'Space Grotesk', 'fontBody', 'Inter', 'borderRadius', '16px')) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('homepage', JSON_OBJECT('heroTitle', 'Code that', 'heroHighlight', 'actually', 'heroSuffix', 'ships.', 'heroSubtitle', 'Professional coding platform for developers who want to learn, build, and deploy. Courses, notes, AI tutor, playground, one-click deploy to Hostinger — all in React + MySQL (XAMPP).', 'heroBadge', 'One-Click Deploy to Hostinger • Live now', 'ctaPrimary', 'Start building', 'ctaSecondary', 'Open Playground', 'trustedTitle', 'Trusted by developers at', 'trustedLogos', JSON_ARRAY('GOOGLE', 'RAZORPAY', 'AMAZON', 'HOSTINGER'))) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('footer', JSON_OBJECT('description', 'Professional coding education. Learn, build, deploy, get hired. Built with React + MySQL (XAMPP) in Bhopal, for India.', 'email', 'admin@codemaster.pro', 'location', 'Bhopal, MP 🇮🇳', 'copyright', '© 2026 codemaster.pro — Built in Bhopal, for India. React + XAMPP MySQL + Razorpay.')) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('seo', JSON_OBJECT('metaTitle', 'CodeMaster Pro - Learn, Build, Deploy, Get Hired', 'metaDescription', 'Professional coding platform for developers. React + MySQL XAMPP + Razorpay + One-Click Deploy to Hostinger. 50k+ students.', 'keywords', 'coding, react, mysql, xampp, razorpay, hostinger, javascript, dsa, bhopal')) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('monetization', JSON_OBJECT('proPrice', 499, 'premiumPrice', 999, 'affiliateCommission', 30)) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);
