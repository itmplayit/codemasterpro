USE codemaster_pro;

-- Gamification
CREATE TABLE IF NOT EXISTS user_gamification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  xp INT DEFAULT 0,
  level INT DEFAULT 1,
  streak_days INT DEFAULT 0,
  last_active DATE NULL,
  badges JSON NULL,
  completed_courses INT DEFAULT 0,
  quizzes_taken INT DEFAULT 0,
  code_runs INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- XP History
CREATE TABLE IF NOT EXISTS xp_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  xp_earned INT NOT NULL,
  reason VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Live Classes
CREATE TABLE IF NOT EXISTS live_classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NULL,
  instructor_id INT NOT NULL,
  scheduled_at DATETIME NOT NULL,
  duration_minutes INT DEFAULT 60,
  meeting_link VARCHAR(500) NULL,
  is_live BOOLEAN DEFAULT FALSE,
  max_students INT DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS live_class_enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  live_class_id INT NOT NULL,
  user_id INT NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_live_enroll (live_class_id, user_id),
  FOREIGN KEY (live_class_id) REFERENCES live_classes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- AI Chat History
CREATE TABLE IF NOT EXISTS ai_chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role ENUM('user','assistant') NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Video Progress (for resume)
CREATE TABLE IF NOT EXISTS video_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  progress_seconds INT DEFAULT 0,
  total_seconds INT DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  last_watched TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_video (user_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Badges Definition
CREATE TABLE IF NOT EXISTS badges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  xp_required INT DEFAULT 0,
  condition_type VARCHAR(50) NULL
);

INSERT INTO badges (name, description, icon, xp_required, condition_type) VALUES
('First Steps', 'Complete your first lesson', '🎯', 10, 'first_lesson'),
('Quiz Master', 'Score 100% in 5 quizzes', '🧠', 100, 'quiz_5_perfect'),
('Code Ninja', 'Run 50 code snippets', '💻', 150, 'code_50'),
('Streak 7', '7 day learning streak', '🔥', 200, 'streak_7'),
('Course Crusher', 'Complete 3 courses', '🏆', 500, 'courses_3'),
('Pro Member', 'Upgrade to Pro', '👑', 300, 'pro_member');

-- Seed gamification for existing users
INSERT IGNORE INTO user_gamification (user_id, xp, level, streak_days, badges) VALUES
(1, 1250, 8, 12, '["🎯","🧠","💻","🔥","🏆","👑"]'),
(2, 450, 4, 5, '["🎯","🧠"]'),
(3, 80, 2, 2, '["🎯"]');

-- Live classes seed
INSERT INTO live_classes (title, description, instructor_id, scheduled_at, duration_minutes, is_live, meeting_link) VALUES
('React 19 Live - New Features', 'Learn React 19 Server Components live with Q&A', 1, DATE_ADD(NOW(), INTERVAL 1 DAY), 90, FALSE, 'https://meet.google.com/xxx'),
('DSA Live - Crack FAANG', 'Live DSA problem solving', 1, DATE_ADD(NOW(), INTERVAL 2 DAY), 120, TRUE, 'https://meet.google.com/yyy'),
('MySQL XAMPP Mastery Live', 'Live MySQL optimization', 1, DATE_ADD(NOW(), INTERVAL -1 HOUR), 60, TRUE, 'https://meet.google.com/zzz');
