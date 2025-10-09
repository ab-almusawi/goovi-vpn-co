#!/bin/bash

# ==============================================================================
# WGDashboard Quick Installation Script
# For Goovi VPN - wg.goovi-vpn.com
# ==============================================================================

set -e  # Exit on error

echo "========================================"
echo "WGDashboard Installation for Goovi VPN"
echo "========================================"
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root (use sudo)"
   exit 1
fi

echo "📦 Step 1: Installing dependencies..."
apt update
apt install -y python3 python3-pip git wireguard-tools

echo ""
echo "📥 Step 2: Cloning WGDashboard..."
if [ -d "/opt/wgdashboard" ]; then
    echo "⚠️  WGDashboard directory already exists. Backing up..."
    mv /opt/wgdashboard /opt/wgdashboard.backup.$(date +%Y%m%d_%H%M%S)
fi

cd /opt
git clone https://github.com/WGDashboard/WGDashboard.git wgdashboard
cd wgdashboard

echo ""
echo "⚙️  Step 3: Installing WGDashboard..."
chmod +x ./src/wgd.sh
./src/wgd.sh install

echo ""
echo "🔧 Step 4: Configuring WGDashboard..."
# Configure to listen on localhost only
sed -i 's/app_ip = .*/app_ip = 127.0.0.1/' /opt/wgdashboard/src/wg-dashboard.ini
sed -i 's/app_port = .*/app_port = 10086/' /opt/wgdashboard/src/wg-dashboard.ini

echo ""
echo "🚀 Step 5: Starting WGDashboard..."
./src/wgd.sh start

echo ""
echo "📝 Step 6: Creating nginx configuration..."
cat > /etc/nginx/sites-available/wg-dashboard << 'EOF'
# WGDashboard HTTP (for Certbot)
server {
    listen 80;
    listen [::]:80;
    server_name wg.goovi-vpn.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

# WGDashboard HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name wg.goovi-vpn.com;

    # SSL will be configured by Certbot

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000" always;

    location / {
        proxy_pass http://127.0.0.1:10086;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }

    access_log /var/log/nginx/wg-dashboard-access.log;
    error_log /var/log/nginx/wg-dashboard-error.log;
}
EOF

echo ""
echo "🔗 Step 7: Enabling nginx site..."
ln -sf /etc/nginx/sites-available/wg-dashboard /etc/nginx/sites-enabled/

echo ""
echo "✅ Step 8: Testing nginx configuration..."
nginx -t

echo ""
echo "🔄 Step 9: Reloading nginx..."
systemctl reload nginx

echo ""
echo "========================================"
echo "✅ WGDashboard Installation Complete!"
echo "========================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Add DNS A record:"
echo "   Type: A"
echo "   Name: wg"
echo "   Value: $(curl -s ifconfig.me)"
echo "   TTL: Auto"
echo ""
echo "2. Wait for DNS to propagate (check with: nslookup wg.goovi-vpn.com)"
echo ""
echo "3. Generate SSL certificate:"
echo "   sudo certbot --nginx -d wg.goovi-vpn.com"
echo ""
echo "4. Access WGDashboard:"
echo "   URL: https://wg.goovi-vpn.com"
echo "   Username: admin"
echo "   Password: admin"
echo "   ⚠️  CHANGE PASSWORD IMMEDIATELY!"
echo ""
echo "5. Check status:"
echo "   sudo wgd.sh status"
echo ""
echo "📚 Full documentation: See WGDASHBOARD_SETUP.md"
echo ""

