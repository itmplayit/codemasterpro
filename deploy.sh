#!/bin/bash
# CodeMaster Pro - One-Command Deploy Script for Hostinger VPS / Ubuntu
# Run: chmod +x deploy.sh && ./deploy.sh

echo "🚀 CodeMaster Pro - Deploying to Production..."

# Update system
echo "📦 Updating system..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20, Nginx, PM2, Certbot
echo "📦 Installing Node.js, Nginx, PM2..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx
sudo npm install -g pm2

# Install MySQL (if not using Hostinger MySQL)
# sudo apt install -y mysql-server
# sudo mysql_secure_installation

# Clone repo (if not already)
# git clone https://github.com/yourusername/codemaster-pro.git
# cd codemaster-pro

# Backend
echo "🔧 Setting up backend..."
cd /home/user/edu-platform/backend
npm install --production

# Create .env if not exists
if [ ! -f .env ]; then
  cp .env.example .env
  echo "⚠️  Edit backend/.env with your DB, Razorpay, SMTP keys!"
  echo "DB_HOST=localhost"
  echo "DB_USER=root"
  echo "DB_PASSWORD=your_mysql_password"
  echo "DB_NAME=codemaster_pro"
  echo "JWT_SECRET=$(openssl rand -base64 32)"
  echo "PORT=5000"
  echo "FRONTEND_URL=https://yourdomain.com"
fi

# PM2 start backend
pm2 stop codemaster-backend || true
pm2 start server.js --name codemaster-backend --env production
pm2 save
pm2 startup

# Frontend
echo "🎨 Building frontend..."
cd /home/user/edu-platform/frontend
npm install
npm run build

# Nginx config
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/codemasterpro > /dev/null <<EOF
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        root /home/user/edu-platform/frontend/dist;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 1000;
}
EOF

sudo ln -sf /etc/nginx/sites-available/codemasterpro /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# HTTPS with Certbot (uncomment after setting domain)
# sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Firewall
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22

echo "✅ Deployed!"
echo "Backend: http://localhost:5000 (PM2)"
echo "Frontend: http://yourdomain.com (Nginx)"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with real DB, Razorpay, SMTP"
echo "2. Import SQL in phpMyAdmin or mysql -u root -p codemaster_pro < database/schema.sql"
echo "3. Set domain in nginx config and run certbot"
echo "4. pm2 logs codemaster-backend to check"
echo "5. Apply for AdSense after 20 pages"
echo ""
echo "PM2 status:"
pm2 status
