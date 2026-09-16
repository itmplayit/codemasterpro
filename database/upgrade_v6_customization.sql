-- Upgrade v6 - Full Website Customization from Admin Panel (MySQL)
USE codemaster_pro;

CREATE TABLE IF NOT EXISTS site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT NULL,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO site_settings (setting_key, setting_value) VALUES
('general', JSON_OBJECT('siteName', 'codemaster.pro', 'siteLogo', '⌘', 'tagline', 'Code that actually ships.', 'description', 'Professional coding platform for developers who want to learn, build, and deploy.', 'favicon', '')) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('appearance', JSON_OBJECT('primaryColor', '#ffffff', 'secondaryColor', '#f59e0b', 'backgroundColor', '#050507', 'cardColor', '#12121a', 'borderColor', 'rgba(255,255,255,0.06)', 'theme', 'dark', 'fontHeading', 'Space Grotesk', 'fontBody', 'Inter', 'borderRadius', '16px')) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('homepage', JSON_OBJECT('heroTitle', 'Code that', 'heroHighlight', 'actually', 'heroSuffix', 'ships.', 'heroSubtitle', 'Professional coding platform for developers who want to learn, build, and deploy. Courses, notes, AI tutor, playground, one-click deploy to Hostinger — all in React + MySQL (XAMPP).', 'heroBadge', 'One-Click Deploy to Hostinger • Live now', 'ctaPrimary', 'Start building', 'ctaSecondary', 'Open Playground', 'trustedTitle', 'Trusted by developers at', 'trustedLogos', JSON_ARRAY('GOOGLE', 'RAZORPAY', 'AMAZON', 'HOSTINGER'))) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('footer', JSON_OBJECT('description', 'Professional coding education. Learn, build, deploy, get hired. Built with React + MySQL (XAMPP) in Bhopal, for India.', 'email', 'admin@codemaster.pro', 'location', 'Bhopal, MP 🇮🇳', 'copyright', '© 2026 codemaster.pro — Built in Bhopal, for India. React + XAMPP MySQL + Razorpay.')) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('seo', JSON_OBJECT('metaTitle', 'CodeMaster Pro - Learn, Build, Deploy, Get Hired', 'metaDescription', 'Professional coding platform for developers. React + MySQL XAMPP + Razorpay + One-Click Deploy to Hostinger. 50k+ students.', 'keywords', 'coding, react, mysql, xampp, razorpay, hostinger, javascript, dsa, bhopal')) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('monetization', JSON_OBJECT('proPrice', 499, 'premiumPrice', 999, 'affiliateCommission', 30, 'razorpayKey', 'rzp_test_••••••••', 'adsenseId', 'ca-pub-••••••••')) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value),
('advanced', JSON_OBJECT('customCss', '', 'customJs', '', 'maintenanceMode', false, 'maintenanceMessage', 'We are upgrading — back in 10 mins 🚀')) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);

-- Verify
SELECT * FROM site_settings;
