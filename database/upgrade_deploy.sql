USE codemaster_pro;

-- Deployments Table - One-Click Deploy to Hostinger
CREATE TABLE IF NOT EXISTS deployments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  project_name VARCHAR(100) NOT NULL,
  subdomain VARCHAR(100) UNIQUE NOT NULL,
  custom_domain VARCHAR(255) NULL,
  language VARCHAR(50) DEFAULT 'javascript',
  framework VARCHAR(50) DEFAULT 'static',
  code TEXT NOT NULL,
  package_json TEXT NULL,
  env_vars JSON NULL,
  deployment_url VARCHAR(500) NULL,
  status ENUM('deploying','live','failed','stopped') DEFAULT 'deploying',
  build_logs TEXT NULL,
  visits INT DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deployed_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_subdomain (subdomain),
  INDEX idx_user (user_id)
);

-- Deployment logs
CREATE TABLE IF NOT EXISTS deployment_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  deployment_id INT NOT NULL,
  log TEXT NOT NULL,
  level ENUM('info','warn','error') DEFAULT 'info',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (deployment_id) REFERENCES deployments(id) ON DELETE CASCADE
);

-- Add deployment count to gamification
ALTER TABLE user_gamification ADD COLUMN IF NOT EXISTS deployments INT DEFAULT 0;

-- Seed demo deployments
INSERT INTO deployments (user_id, project_name, subdomain, language, framework, code, deployment_url, status, deployed_at) VALUES
(1, 'Todo App', 'admin-todo', 'javascript', 'react', 'console.log("Todo App")', 'https://admin-todo.codemasterpro.in', 'live', NOW()),
(2, 'Portfolio', 'john-portfolio', 'javascript', 'static', '<h1>John Portfolio</h1>', 'https://john-portfolio.codemasterpro.in', 'live', NOW());
