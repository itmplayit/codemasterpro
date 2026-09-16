USE codemaster_pro;

-- Email verification & logs
CREATE TABLE IF NOT EXISTS email_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status ENUM('sent','failed') DEFAULT 'sent',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Add email_verified to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(100) NULL;

-- Social follows
CREATE TABLE IF NOT EXISTS follows (
  id INT AUTO_INCREMENT PRIMARY KEY,
  follower_id INT NOT NULL,
  following_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_follow (follower_id, following_id),
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Course ratings detailed
CREATE TABLE IF NOT EXISTS course_ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  rating INT CHECK (rating >=1 AND rating <=5),
  review TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_rating (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- PWA subscriptions (push notifications)
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add dark_mode preference
ALTER TABLE users ADD COLUMN IF NOT EXISTS preferences JSON NULL;

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  event_type VARCHAR(50) NOT NULL,
  event_data JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed more jobs for v5
INSERT INTO jobs (title, company, location, type, salary, description, skills, is_featured) VALUES
('AI Engineer', 'OpenAI', 'Remote', 'fulltime', '45 LPA', 'Build AI tutor systems', 'Python, OpenAI, React', TRUE),
('DevOps Engineer', 'Hostinger', 'Remote', 'fulltime', '22 LPA', 'Manage XAMPP to cloud migration', 'Docker, MySQL, AWS', FALSE);
