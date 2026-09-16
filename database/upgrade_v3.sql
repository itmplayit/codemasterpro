USE codemaster_pro;

-- Wishlist
CREATE TABLE IF NOT EXISTS wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_wish (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Comments / Q&A (course discussions)
CREATE TABLE IF NOT EXISTS discussions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  lesson_id INT NULL,
  user_id INT NOT NULL,
  parent_id INT NULL,
  comment TEXT NOT NULL,
  is_answer BOOLEAN DEFAULT FALSE,
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES discussions(id) ON DELETE CASCADE
);

-- Coupons
CREATE TABLE IF NOT EXISTS coupons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_percent INT NOT NULL,
  max_uses INT DEFAULT 100,
  used_count INT DEFAULT 0,
  valid_until DATE NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO coupons (code, discount_percent, max_uses, valid_until) VALUES
('WELCOME50', 50, 1000, '2026-12-31'),
('PRO100', 100, 50, '2026-06-30'),
('BHOPAL20', 20, 500, '2026-12-31');

-- Jobs Board
CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  company VARCHAR(100) NOT NULL,
  location VARCHAR(100) DEFAULT 'Remote',
  type ENUM('fulltime','internship','contract') DEFAULT 'fulltime',
  salary VARCHAR(100) NULL,
  description TEXT NOT NULL,
  skills VARCHAR(300) NULL,
  apply_link VARCHAR(500) NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jobs (title, company, location, type, salary, description, skills, is_featured) VALUES
('Frontend Developer', 'Google', 'Bangalore', 'fulltime', '28 LPA', 'ReactJS developer needed for Google Cloud team', 'React, JavaScript, TypeScript', TRUE),
('Backend Developer (Node + MySQL)', 'Razorpay', 'Remote', 'fulltime', '18 LPA', 'Build payment systems with Node and MySQL', 'Node.js, MySQL, XAMPP, Express', TRUE),
('Full Stack Intern', 'CodeMaster Pro', 'Bhopal', 'internship', '30k/month', 'Work on our education platform', 'React, Node, MySQL', FALSE);

-- Code Snippets / Playground saves
CREATE TABLE IF NOT EXISTS code_snippets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  language VARCHAR(50) DEFAULT 'javascript',
  code TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Instructor Earnings
CREATE TABLE IF NOT EXISTS instructor_earnings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  instructor_id INT NOT NULL,
  course_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type ENUM('sale','membership_share') DEFAULT 'sale',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info','success','warning') DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
