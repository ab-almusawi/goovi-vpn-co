# WGDashboard Installation Guide

Complete guide to install and configure [WGDashboard](https://github.com/WGDashboard/WGDashboard) on your VPS server with subdomain access.

## 🎯 Setup Overview

- **Server**: 81.30.161.139 (same as website)
- **Access URL**: https://wg.goovi-vpn.com
- **Purpose**: View and manage WireGuard configurations
- **Security**: Login-protected web interface

---

## 📋 Prerequisites

- WireGuard already installed on server
- Root or sudo access
- DNS access to add subdomain

---

## 🚀 Step 1: Install WGDashboard

### On Linux Server:

```bash
# Install dependencies
sudo apt update
sudo apt install -y python3 python3-pip git wireguard-tools

# Clone WGDashboard
cd /opt
sudo git clone https://github.com/WGDashboard/WGDashboard.git wgdashboard
cd wgdashboard

# Install WGDashboard
sudo chmod +x ./src/wgd.sh
sudo ./src/wgd.sh install

# This will:
# - Install Python dependencies
# - Create systemd service
# - Set up configuration
```

---

## ⚙️ Step 2: Configure WGDashboard

```bash
# Start WGDashboard for initial setup
sudo wgd.sh start

# Default runs on http://localhost:10086
# Default username: admin
# Default password: admin (change this immediately!)
```

### Configure to run on localhost only:

```bash
# Edit configuration
sudo nano /opt/wgdashboard/src/wg-dashboard.ini
```

Update these settings:

```ini
[Server]
wg_conf_path = /etc/wireguard
app_ip = 127.0.0.1
app_port = 10086
auth_req = true
version = v4

[Account]
username = admin
# Change password on first login!
```

Save and restart:

```bash
sudo wgd.sh restart
```

---

## 🌐 Step 3: Setup DNS

Add a DNS A record for the subdomain:

### In your DNS provider (Namecheap, Cloudflare, etc):

```
Type: A
Name: wg
Value: 81.30.161.139
TTL: Auto or 300
```

### Verify DNS propagation:

```powershell
# On Windows
nslookup wg.goovi-vpn.com
```

Should return: `81.30.161.139`

---

## 🔧 Step 4: Configure Nginx Reverse Proxy

### Create nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/wg-dashboard
```

Paste this configuration:

```nginx
# WGDashboard HTTP (for Certbot challenge only)
server {
    listen 80;
    listen [::]:80;
    server_name wg.goovi-vpn.com;

    # Allow Certbot for SSL certificate
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# WGDashboard HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name wg.goovi-vpn.com;

    # SSL Configuration (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/wg.goovi-vpn.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/wg.goovi-vpn.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000" always;

    # WGDashboard proxy
    location / {
        proxy_pass http://127.0.0.1:10086;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_read_timeout 86400;
    }

    # Logs
    access_log /var/log/nginx/wg-dashboard-access.log;
    error_log /var/log/nginx/wg-dashboard-error.log;
}
```

### Enable the configuration:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/wg-dashboard /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

---

## 🔒 Step 5: Generate SSL Certificate

```bash
# Generate SSL certificate for subdomain
sudo certbot --nginx -d wg.goovi-vpn.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose redirect (option 2)
```

Certbot will automatically update the nginx config with SSL certificates.

---

## 🔐 Step 6: Secure WGDashboard

### On first login:

1. Visit: https://wg.goovi-vpn.com
2. Login with:
   - Username: `admin`
   - Password: `admin`
3. **Immediately change password!**
4. Go to Settings → Change Password

### Additional security (optional):

```bash
# Restrict access to specific IPs (your office/home IP)
sudo nano /etc/nginx/sites-available/wg-dashboard
```

Add inside the `location /` block:

```nginx
# Allow only specific IPs
allow 185.95.204.9;      # Your IP
allow 127.0.0.1;         # Localhost
deny all;
```

---

## ✅ Step 7: Verify Installation

### Test WGDashboard:

```bash
# Check WGDashboard service status
sudo wgd.sh status

# Check if running on correct port
sudo netstat -tlnp | grep 10086

# Test locally
curl http://localhost:10086

# Test via domain
curl -I https://wg.goovi-vpn.com
```

### Expected behavior:

✅ https://wg.goovi-vpn.com shows login page  
✅ Can login and see WireGuard configs  
✅ SSL certificate valid  
✅ HTTP redirects to HTTPS  

---

## 🎛️ Step 8: Configure WireGuard Integration

### Point WGDashboard to your WireGuard configs:

```bash
# Check where your WireGuard configs are
ls -la /etc/wireguard/

# WGDashboard should auto-detect them
# If not, edit:
sudo nano /opt/wgdashboard/src/wg-dashboard.ini
```

Ensure:
```ini
[Server]
wg_conf_path = /etc/wireguard
```

Restart:
```bash
sudo wgd.sh restart
```

---

## 🔄 Management Commands

```bash
# Start WGDashboard
sudo wgd.sh start

# Stop WGDashboard
sudo wgd.sh stop

# Restart WGDashboard
sudo wgd.sh restart

# Check status
sudo wgd.sh status

# View logs
sudo wgd.sh debug

# Update WGDashboard
cd /opt/wgdashboard
sudo git pull
sudo wgd.sh restart
```

---

## 📱 Using WGDashboard

Once logged in, you can:

1. **View Configurations**
   - See all WireGuard interfaces
   - View connected peers
   - Monitor traffic

2. **Manage Peers**
   - Add new peers
   - Remove peers
   - Generate QR codes for mobile
   - Download config files

3. **Monitor Status**
   - Real-time connection status
   - Data transfer statistics
   - Peer handshakes

4. **Configuration**
   - Edit WireGuard settings
   - Manage interface settings
   - Set peer restrictions

---

## 🔥 Firewall Configuration

If using UFW:

```bash
# WGDashboard is accessed via nginx (port 443)
# No additional firewall rules needed

# But ensure HTTPS is allowed
sudo ufw allow 443/tcp
sudo ufw status
```

---

## 🐛 Troubleshooting

### WGDashboard won't start:

```bash
# Check logs
sudo wgd.sh debug

# Check if port is in use
sudo lsof -i :10086

# Reinstall if needed
cd /opt/wgdashboard
sudo wgd.sh stop
sudo ./src/wgd.sh install
```

### Can't access via domain:

```bash
# Check DNS
nslookup wg.goovi-vpn.com

# Check nginx
sudo nginx -t
sudo systemctl status nginx

# Check SSL certificate
sudo certbot certificates
```

### Permission errors:

```bash
# Fix WireGuard config permissions
sudo chmod 600 /etc/wireguard/*.conf
sudo chown root:root /etc/wireguard/*.conf

# Fix WGDashboard permissions
sudo chown -R root:root /opt/wgdashboard
```

---

## 🔄 Backup & Restore

### Backup WGDashboard configuration:

```bash
# Backup database and configs
sudo cp /opt/wgdashboard/src/db/wgdashboard.db ~/wgdashboard-backup.db
sudo cp /opt/wgdashboard/src/wg-dashboard.ini ~/wgdashboard-backup.ini

# Backup WireGuard configs
sudo tar -czf ~/wireguard-backup.tar.gz /etc/wireguard/
```

### Restore:

```bash
sudo cp ~/wgdashboard-backup.db /opt/wgdashboard/src/db/wgdashboard.db
sudo cp ~/wgdashboard-backup.ini /opt/wgdashboard/src/wg-dashboard.ini
sudo tar -xzf ~/wireguard-backup.tar.gz -C /
sudo wgd.sh restart
```

---

## 🎉 Complete Setup Summary

After completing all steps, you'll have:

1. ✅ **WGDashboard** installed at `/opt/wgdashboard`
2. ✅ **Accessible** at https://wg.goovi-vpn.com
3. ✅ **SSL certificate** from Let's Encrypt
4. ✅ **Nginx reverse proxy** configured
5. ✅ **Login protected** admin interface
6. ✅ **Auto-start** on server reboot (systemd service)

---

## 📚 Additional Resources

- WGDashboard Documentation: https://wgdashboard.dev
- GitHub Repository: https://github.com/WGDashboard/WGDashboard
- WireGuard Documentation: https://www.wireguard.com/quickstart/

---

## 🔗 Architecture Overview

```
User Browser
     ↓ HTTPS (443)
  Nginx (Reverse Proxy)
     ↓ HTTP (10086)
  WGDashboard (Python/Flask)
     ↓
  WireGuard (wg0, wg1, etc.)
```

---

**Installation Complete!** 🎉

Access your WireGuard dashboard at:
**https://wg.goovi-vpn.com**

Default credentials (change immediately):
- Username: `admin`
- Password: `admin`

