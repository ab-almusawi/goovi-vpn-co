# 🚀 Quick Deployment Guide

## Step-by-Step Deployment to Ubuntu Server

### 📋 Prerequisites
- Ubuntu server: **81.30.161.139**
- Hostinger domain configured
- SSH access to server

---

## 🎯 Quick Steps

### 1️⃣ On Your Local Machine (Windows)

```bash
# Navigate to website folder
cd Goovi_Co

# Install and build
npm install
npm run build

# Test locally
PORT=3001 npm run start
# Visit http://localhost:3001 to verify
```

### 2️⃣ Connect to Your Server

```bash
ssh root@81.30.161.139
```

### 3️⃣ Install Software (One-Time Setup)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 and Nginx
sudo npm install -g pm2
sudo apt install -y nginx certbot python3-certbot-nginx

# Verify installations
node --version
npm --version
pm2 --version
nginx -v
```

### 4️⃣ Create Website Directory

```bash
sudo mkdir -p /var/www/goovi-website
sudo chown -R $USER:$USER /var/www/goovi-website
```

### 5️⃣ Upload Your Website

**Option A: Using Git (Recommended)**
```bash
cd /var/www/goovi-website
git clone YOUR_REPO_URL .
```

**Option B: Using WinSCP/FileZilla**
- Upload the entire `Goovi_Co` folder to `/var/www/goovi-website/`

### 6️⃣ Setup Website on Server

```bash
cd /var/www/goovi-website/Goovi_Co

# Install dependencies
npm install --production

# Build (if not built locally)
npm run build

# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 config
pm2 save

# Enable PM2 on boot
pm2 startup
# Run the command it outputs
```

### 7️⃣ Configure Nginx

Create config file:
```bash
sudo nano /etc/nginx/sites-available/goovi-vpn
```

Paste the nginx configuration from `PRODUCTION_DEPLOYMENT.md` (Part 3.1)

**Key points to adjust in the config:**
- Replace `goovi-vpn.com` with your actual domain
- Check API port (line with `proxy_pass http://localhost:8080/api`)

Enable the site:
```bash
# Link config
sudo ln -s /etc/nginx/sites-available/goovi-vpn /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 8️⃣ Configure Domain in Hostinger

Go to your Hostinger DNS settings and add:

**A Record 1:**
- Type: A
- Name: @
- Value: 81.30.161.139
- TTL: 14400

**A Record 2:**
- Type: A
- Name: www
- Value: 81.30.161.139
- TTL: 14400

**Wait 1-24 hours for DNS propagation**

### 9️⃣ Install SSL Certificate

```bash
# Make sure DNS is pointing to your server first!
# Check with: nslookup your-domain.com

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow prompts and choose to redirect HTTP to HTTPS
```

### 🔟 Configure Firewall

```bash
# Allow necessary ports
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## ✅ Verify Everything Works

```bash
# Check PM2
pm2 status
pm2 logs goovi-website

# Check Nginx
sudo systemctl status nginx

# Test locally
curl http://localhost:3001

# Test from outside
curl http://your-domain.com
```

---

## 🔄 Update Your Website (Future Updates)

```bash
# SSH to server
ssh root@81.30.161.139

# Navigate to website
cd /var/www/goovi-website/Goovi_Co

# Pull changes (if using Git)
git pull

# Or upload new files via WinSCP

# Install new dependencies
npm install --production

# Rebuild
npm run build

# Restart PM2
pm2 restart goovi-website

# Check status
pm2 logs goovi-website
```

---

## 📝 Important Commands

```bash
# View website logs
pm2 logs goovi-website

# Restart website
pm2 restart goovi-website

# Stop website
pm2 stop goovi-website

# Start website
pm2 start goovi-website

# Nginx reload
sudo systemctl reload nginx

# Nginx restart
sudo systemctl restart nginx

# View nginx logs
sudo tail -f /var/log/nginx/goovi-vpn-error.log
sudo tail -f /var/log/nginx/goovi-vpn-access.log

# Renew SSL
sudo certbot renew
```

---

## 🆘 Troubleshooting

### Website not loading?

```bash
# Check if PM2 is running
pm2 status

# Check logs
pm2 logs goovi-website

# Restart if needed
pm2 restart goovi-website
```

### 502 Bad Gateway?

```bash
# Next.js isn't running
pm2 restart goovi-website

# Check if port 3001 is listening
sudo netstat -tulpn | grep 3001
```

### API not working?

Check your API port in nginx config:
```bash
sudo nano /etc/nginx/sites-available/goovi-vpn
# Find the line: proxy_pass http://localhost:XXXX/api
# Make sure XXXX matches your API port
```

### Domain not working?

```bash
# Check DNS
nslookup your-domain.com
ping your-domain.com

# Wait for DNS propagation (can take 1-48 hours)
```

---

## 📊 Your Setup

**Architecture:**
```
Your Domain → Nginx (Port 80/443)
                ↓
    ┌───────────┴────────────┐
    ↓                        ↓
Next.js (Port 3001)    VPN API (Port 3000, /api)
```

**URLs:**
- Website: https://your-domain.com
- Downloads: https://your-domain.com/downloads
- About: https://your-domain.com/about
- Privacy: https://your-domain.com/privacy-policy
- Terms: https://your-domain.com/terms-of-use
- API: https://your-domain.com/api/*

---

## 🎉 Done!

Your Goovi VPN website is now live on your Ubuntu server with:
- ✅ Nginx reverse proxy
- ✅ PM2 process management
- ✅ SSL/HTTPS
- ✅ Domain from Hostinger
- ✅ API endpoints working

**Questions?** See `PRODUCTION_DEPLOYMENT.md` for detailed explanations.
