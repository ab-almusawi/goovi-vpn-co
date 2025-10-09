# 🚀 Production Deployment Guide

## 📋 Overview

**Server**: Ubuntu (81.30.161.139)  
**Web Server**: Nginx  
**Domain**: Your Hostinger domain  
**Services**:
- Company Website (Goovi VPN) - Port 3000
- VPN API - Already running on /api

## 🎯 Architecture

```
Domain (goovi-vpn.com)
         ↓
    [Nginx :80/443]
         ↓
    ┌────────────┴────────────┐
    ↓                         ↓
[Next.js :3001]         [VPN API :3000]
(Website)               (/api endpoints)
```

---

## 📦 Part 1: Prepare Your Next.js App

### 1.1 Build for Production

On your local Windows machine:

```bash
cd Goovi_Co

# Install dependencies if not already done
npm install

# Build the production version
npm run build

# Test production build locally
npm run start
```

### 1.2 Create Ecosystem File for PM2

Create `Goovi_Co/ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'goovi-website',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/goovi-website',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

### 1.3 Upload to Server

Use one of these methods:

**Option A: Using SCP (from Windows PowerShell)**
```powershell
# Create a zip of the necessary files
# Then upload to server
scp -r Goovi_Co root@81.30.161.139:/tmp/
```

**Option B: Using Git (Recommended)**
```bash
# On your server
cd /var/www
git clone your-repo-url goovi-website
cd goovi-website/Goovi_Co
```

**Option C: Using FileZilla/WinSCP**
Upload these folders/files:
- `.next/` (built folder)
- `public/`
- `src/`
- `node_modules/` (or run npm install on server)
- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `ecosystem.config.js`

---

## 🖥️ Part 2: Ubuntu Server Setup

### 2.1 Connect to Your Server

```bash
ssh root@81.30.161.139
```

### 2.2 Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx (if not already installed)
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

### 2.3 Create Website Directory

```bash
# Create directory
sudo mkdir -p /var/www/goovi-website

# Set permissions
sudo chown -R $USER:$USER /var/www/goovi-website
```

### 2.4 Upload and Setup Website

```bash
# Navigate to website directory
cd /var/www/goovi-website

# If using Git
git clone your-repo-url .
cd Goovi_Co

# Install dependencies
npm install --production

# Build the app (if not built locally)
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Enable PM2 to start on system boot
pm2 startup
# Follow the command it gives you
```

---

## 🌐 Part 3: Nginx Configuration

### 3.1 Create Nginx Configuration File

Create `/etc/nginx/sites-available/goovi-vpn`:

```bash
sudo nano /etc/nginx/sites-available/goovi-vpn
```

Paste this configuration:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name goovi-vpn.com www.goovi-vpn.com;
    
    # Allow Certbot for SSL certificate
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name goovi-vpn.com www.goovi-vpn.com;

    # SSL Configuration (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/goovi-vpn.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/goovi-vpn.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Next.js Website (all paths except /api)
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Next.js specific
        proxy_buffering off;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # VPN API endpoints
    location /api {
        proxy_pass http://localhost:3000/api;  # VPN API running on port 3000
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # API specific timeouts
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
        
        # CORS headers (if needed)
        add_header Access-Control-Allow-Origin * always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;
        
        # Handle preflight requests
        if ($request_method = 'OPTIONS') {
            return 204;
        }
    }

    # Optimize static files
    location /_next/static {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=3600, immutable";
    }

    # Optimize images
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://localhost:3001;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Logs
    access_log /var/log/nginx/goovi-vpn-access.log;
    error_log /var/log/nginx/goovi-vpn-error.log;
}
```

### 3.2 Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/goovi-vpn /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 Part 4: SSL Certificate (HTTPS)

### 4.1 Install SSL Certificate with Let's Encrypt

```bash
# Make sure your domain is pointing to your server IP first!

# Create directory for certbot
sudo mkdir -p /var/www/certbot

# Obtain certificate (replace with your domain)
sudo certbot --nginx -d goovi-vpn.com -d www.goovi-vpn.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (recommended)
```

### 4.2 Auto-Renewal Setup

```bash
# Certbot auto-renewal is set up by default
# Test renewal process
sudo certbot renew --dry-run

# Check certbot timer
sudo systemctl status certbot.timer
```

---

## 🌍 Part 5: Domain Configuration (Hostinger)

### 5.1 DNS Records Setup

Log in to your Hostinger account and add these DNS records:

**A Records:**
```
Type: A
Name: @
Value: 81.30.161.139
TTL: 14400

Type: A
Name: www
Value: 81.30.161.139
TTL: 14400
```

**Optional - Subdomain for API:**
```
Type: A
Name: api
Value: 81.30.161.139
TTL: 14400
```

### 5.2 Wait for DNS Propagation

DNS changes can take 1-48 hours to propagate globally. Check status:

```bash
# Check from your local machine
nslookup goovi-vpn.com
ping goovi-vpn.com

# Or use online tools:
# https://www.whatsmydns.net/
```

---

## 📝 Part 6: Environment Variables

### 6.1 Create Production .env File

On the server:

```bash
cd /var/www/goovi-website/Goovi_Co

# Create .env.production.local
nano .env.production.local
```

Add your production values:

```bash
# Application Settings
NEXT_PUBLIC_APP_NAME=Goovi VPN
NEXT_PUBLIC_APP_VERSION=1.0.0

# Server Configuration
PORT=3000
HOST=localhost

# Contact Information
NEXT_PUBLIC_SUPPORT_EMAIL=support@goovi-vpn.com
NEXT_PUBLIC_WEBSITE_URL=https://goovi-vpn.com

# Download Links (update with real links)
NEXT_PUBLIC_DOWNLOAD_ANDROID=https://play.google.com/store/apps/details?id=com.goovi.vpn
NEXT_PUBLIC_DOWNLOAD_IOS=https://apps.apple.com/app/goovi-vpn/id123456789
NEXT_PUBLIC_DOWNLOAD_WINDOWS=https://goovi-vpn.com/downloads/Goovi-VPN-Setup-Windows.exe
NEXT_PUBLIC_DOWNLOAD_MACOS=https://goovi-vpn.com/downloads/Goovi-VPN-Setup-macOS.dmg
NEXT_PUBLIC_DOWNLOAD_LINUX=https://goovi-vpn.com/downloads/Goovi-VPN-Setup-Linux.AppImage

# API Configuration
NEXT_PUBLIC_API_URL=https://goovi-vpn.com
NEXT_PUBLIC_API_PREFIX=/api
```

### 6.2 Restart Application

```bash
pm2 restart goovi-website
pm2 save
```

---

## 🔥 Part 7: Firewall Configuration

### 7.1 Configure UFW (Ubuntu Firewall)

```bash
# Check status
sudo ufw status

# Allow SSH (important!)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow your VPN API port (if different)
# sudo ufw allow 8080/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## 🧪 Part 8: Testing

### 8.1 Check Services

```bash
# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check PM2
pm2 status
pm2 logs goovi-website --lines 50

# Check Next.js is running
curl http://localhost:3000

# Check from outside
curl http://81.30.161.139
curl https://goovi-vpn.com
```

### 8.2 Test API Endpoints

```bash
# Test API through nginx
curl http://localhost/api/your-endpoint
curl https://goovi-vpn.com/api/your-endpoint
```

### 8.3 Browser Testing

Open in your browser:
- ✅ https://goovi-vpn.com - Should show homepage
- ✅ https://goovi-vpn.com/downloads - Should show downloads page
- ✅ https://goovi-vpn.com/about - Should show about page
- ✅ https://goovi-vpn.com/api/... - Should hit your VPN API

---

## 🔄 Part 9: Deployment & Updates

### 9.1 Quick Deployment Script

Create `deploy.sh` on your server:

```bash
#!/bin/bash

echo "🚀 Deploying Goovi VPN Website..."

# Navigate to website directory
cd /var/www/goovi-website/Goovi_Co

# Pull latest changes (if using Git)
git pull origin main

# Install dependencies
npm install --production

# Build the application
npm run build

# Restart PM2
pm2 restart goovi-website

# Save PM2 state
pm2 save

echo "✅ Deployment complete!"
```

Make it executable:

```bash
chmod +x deploy.sh
```

### 9.2 Update Process

```bash
# SSH into server
ssh root@81.30.161.139

# Run deployment script
cd /var/www/goovi-website/Goovi_Co
./deploy.sh
```

---

## 📊 Part 10: Monitoring & Logs

### 10.1 View Logs

```bash
# PM2 logs (Next.js)
pm2 logs goovi-website
pm2 logs goovi-website --lines 100

# Nginx logs
sudo tail -f /var/log/nginx/goovi-vpn-access.log
sudo tail -f /var/log/nginx/goovi-vpn-error.log

# System logs
sudo journalctl -u nginx -f
```

### 10.2 PM2 Monitoring

```bash
# Monitor CPU/Memory usage
pm2 monit

# View detailed info
pm2 info goovi-website

# View process list
pm2 list
```

---

## 🛡️ Part 11: Security Best Practices

### 11.1 Additional Security Headers

Already included in nginx config:
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection
- ✅ Strict-Transport-Security (HSTS)

### 11.2 Fail2Ban (Optional)

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Enable and start
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 11.3 Keep System Updated

```bash
# Regular updates
sudo apt update && sudo apt upgrade -y

# Auto security updates
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Build Next.js app locally
- [ ] Test production build locally
- [ ] Update environment variables
- [ ] Update download links in config

### Server Setup
- [ ] Connect to Ubuntu server
- [ ] Install Node.js, PM2, Nginx
- [ ] Create website directory
- [ ] Upload website files
- [ ] Install dependencies
- [ ] Configure PM2

### Nginx & SSL
- [ ] Create Nginx configuration
- [ ] Enable site in Nginx
- [ ] Test Nginx configuration
- [ ] Reload Nginx
- [ ] Install SSL certificate
- [ ] Test auto-renewal

### Domain
- [ ] Configure DNS A records in Hostinger
- [ ] Wait for DNS propagation
- [ ] Test domain resolution

### Testing
- [ ] Test website loading
- [ ] Test all pages (Home, Downloads, About, Privacy, Terms)
- [ ] Test API endpoints
- [ ] Test HTTPS redirect
- [ ] Test on mobile devices

### Production
- [ ] Set up firewall rules
- [ ] Configure monitoring
- [ ] Set up backup strategy
- [ ] Document deployment process

---

## 🆘 Troubleshooting

### Issue: Website not loading

```bash
# Check if Next.js is running
pm2 status
pm2 logs goovi-website

# Check Nginx
sudo nginx -t
sudo systemctl status nginx

# Check port 3000 is listening
sudo netstat -tulpn | grep 3000
```

### Issue: SSL Certificate Error

```bash
# Re-obtain certificate
sudo certbot --nginx -d goovi-vpn.com -d www.goovi-vpn.com --force-renewal

# Check certificate status
sudo certbot certificates
```

### Issue: API not accessible

```bash
# Check your API is running
sudo netstat -tulpn | grep 8080  # or your API port

# Check Nginx proxy
sudo tail -f /var/log/nginx/goovi-vpn-error.log

# Test proxy
curl -v http://localhost:8080/api/test
```

### Issue: 502 Bad Gateway

```bash
# Usually means Next.js isn't running
pm2 restart goovi-website
pm2 logs goovi-website

# Or wrong port in Nginx config
sudo nano /etc/nginx/sites-available/goovi-vpn
# Check proxy_pass port matches your Next.js PORT
```

---

## 📞 Quick Reference

**Server IP**: 81.30.161.139  
**Website Port**: 3001 (internal)  
**API Port**: 3000 (internal)  
**Public Ports**: 80 (HTTP), 443 (HTTPS)

**Key Commands**:
```bash
# Restart website
pm2 restart goovi-website

# Reload Nginx
sudo systemctl reload nginx

# View logs
pm2 logs goovi-website
sudo tail -f /var/log/nginx/goovi-vpn-error.log

# Update SSL
sudo certbot renew
```

**Important Paths**:
- Website: `/var/www/goovi-website/Goovi_Co`
- Nginx config: `/etc/nginx/sites-available/goovi-vpn`
- SSL certs: `/etc/letsencrypt/live/goovi-vpn.com/`
- Logs: `/var/log/nginx/`

---

## 🎉 Success!

Your production setup:
- ✅ Next.js website on https://goovi-vpn.com
- ✅ VPN API on https://goovi-vpn.com/api
- ✅ SSL/HTTPS enabled
- ✅ PM2 process management
- ✅ Nginx reverse proxy
- ✅ Domain from Hostinger

**Your website is now live! 🚀**
