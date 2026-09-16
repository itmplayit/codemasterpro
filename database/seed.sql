USE codemaster_pro;

-- Insert Categories
INSERT INTO categories (name, slug, icon, description) VALUES
('JavaScript', 'javascript', 'JS', 'Modern JavaScript from basics to advanced'),
('Python', 'python', 'Py', 'Python for web, data science and automation'),
('ReactJS', 'reactjs', '⚛️', 'React library for building UI'),
('Node.js', 'nodejs', 'Node', 'Backend with Node.js and Express'),
('DSA', 'dsa', '🧠', 'Data Structures and Algorithms'),
('System Design', 'system-design', '🏗️', 'High level and low level design'),
('SQL & Databases', 'sql', '🗄️', 'MySQL, MongoDB, PostgreSQL');

-- Insert Users (password is bcrypt hash for 'Admin@123' and 'User@123')
-- Hash: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO users (name, email, password, role, membership) VALUES
('Admin', 'admin@codemaster.pro', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'admin', 'premium'),
('John Developer', 'john@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'user', 'pro'),
('Priya Coder', 'priya@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'user', 'free');

-- Insert Courses
INSERT INTO courses (title, slug, description, short_desc, thumbnail, category_id, instructor_id, level, price, original_price, is_free, is_featured, duration_hours, total_lessons, membership_required) VALUES
('Complete JavaScript Mastery 2025', 'complete-javascript-mastery-2025', 'Master JavaScript from scratch with projects, ES6+, async, DOM, and more. Perfect for beginners and intermediate.', 'Become a JS expert with hands-on projects', 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600', 1, 1, 'beginner', 499.00, 1999.00, FALSE, TRUE, 24.5, 120, 'free'),
('ReactJS - The Complete Guide', 'reactjs-complete-guide', 'Learn ReactJS with hooks, context, redux, router and build 5 real projects. Includes Next.js basics.', 'Build modern UIs with React', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600', 3, 1, 'intermediate', 799.00, 2999.00, FALSE, TRUE, 32.0, 180, 'pro'),
('Python for Data Structures', 'python-dsa', 'Crack FAANG interviews with Python DSA. 200+ problems solved with explanations.', 'DSA mastery for interviews', 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600', 5, 1, 'intermediate', 0.00, 0.00, TRUE, TRUE, 40.0, 200, 'free'),
('Node.js Backend Pro', 'nodejs-backend-pro', 'Build scalable backend APIs with Node, Express, MySQL, JWT, and deployment.', 'Production backend development', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600', 4, 1, 'advanced', 999.00, 3999.00, FALSE, TRUE, 28.0, 95, 'premium'),
('SQL Mastery with XAMPP & MySQL', 'sql-mastery-mysql', 'Learn SQL from zero to hero using XAMPP MySQL. Includes real-world projects.', 'Complete MySQL course', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600', 7, 1, 'beginner', 299.00, 1499.00, FALSE, FALSE, 15.0, 75, 'free');

-- Insert Lessons
INSERT INTO lessons (course_id, title, description, video_url, duration_minutes, is_preview, order_no) VALUES
(1, 'Introduction to JavaScript', 'What is JS and why learn it', 'https://www.youtube.com/embed/W6NZfCO5SIk', 12, TRUE, 1),
(1, 'Variables and Data Types', 'let, const, var explained', 'https://www.youtube.com/embed/W6NZfCO5SIk', 18, TRUE, 2),
(1, 'Functions and Scope', 'Deep dive into functions', 'https://www.youtube.com/embed/W6NZfCO5SIk', 22, FALSE, 3),
(2, 'React Fundamentals', 'Components, JSX, Props', 'https://www.youtube.com/embed/w7ejDZ8SWv8', 20, TRUE, 1),
(2, 'useState and useEffect', 'Master hooks', 'https://www.youtube.com/embed/w7ejDZ8SWv8', 25, FALSE, 2);

-- Insert Notes
INSERT INTO notes (title, slug, category_id, description, content, file_type, is_premium, tags) VALUES
('JavaScript ES6+ Cheat Sheet', 'javascript-es6-cheatsheet', 1, 'All ES6 features with examples', '# ES6 Cheat Sheet\n\n## Arrow Functions\n```js\nconst add = (a,b) => a+b\n```', 'markdown', FALSE, 'javascript,es6,cheatsheet'),
('React Hooks Complete Notes', 'react-hooks-notes', 3, 'useState, useEffect, useContext all explained', 'Complete React Hooks guide...', 'pdf', TRUE, 'react,hooks'),
('Python DSA Handbook', 'python-dsa-handbook', 5, '150+ DSA patterns', 'DSA patterns...', 'pdf', FALSE, 'dsa,python,interview'),
('MySQL Commands PDF', 'mysql-commands-pdf', 7, 'All SQL queries for interview', 'SELECT, JOIN, GROUP BY...', 'pdf', FALSE, 'sql,mysql,xampp');

-- Study Materials
INSERT INTO study_materials (title, type, category_id, is_premium) VALUES
('Frontend Developer Roadmap 2025', 'roadmap', 3, FALSE),
('Backend Developer Roadmap', 'roadmap', 4, FALSE),
('JavaScript Interview 100 Q&A', 'interview', 1, TRUE),
('React Cheatsheet PDF', 'cheatsheet', 3, FALSE);

-- Quizzes
INSERT INTO quizzes (title, slug, description, category_id, level, time_limit, passing_score, is_premium) VALUES
('JavaScript Basics Quiz', 'javascript-basics-quiz', 'Test your JS fundamentals', 1, 'beginner', 10, 60, FALSE),
('ReactJS Advanced Quiz', 'reactjs-advanced-quiz', 'Hooks, Redux, Performance', 3, 'advanced', 15, 70, TRUE),
('MySQL Quiz for Beginners', 'mysql-quiz-beginners', 'SQL queries and concepts', 7, 'beginner', 10, 60, FALSE);

INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, order_no) VALUES
(1, 'What is the output of typeof null?', 'object', 'null', 'undefined', 'number', 'a', 'In JS, typeof null returns object due to legacy bug', 1),
(1, 'Which method adds element to end of array?', 'push()', 'pop()', 'shift()', 'unshift()', 'a', 'push() adds to end', 2),
(1, 'What does === check?', 'Value only', 'Type only', 'Value and Type', 'None', 'c', '=== is strict equality', 3),
(3, 'Which SQL clause filters groups?', 'WHERE', 'HAVING', 'GROUP BY', 'ORDER BY', 'b', 'HAVING filters after GROUP BY', 1),
(3, 'Which is primary key?', 'Unique and Not Null', 'Can be null', 'Duplicate allowed', 'None', 'a', 'Primary key is unique and not null', 2);
