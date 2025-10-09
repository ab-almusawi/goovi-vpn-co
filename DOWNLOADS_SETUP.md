# Downloads Setup Guide

This guide explains how to set up and serve downloadable APK and portable files through the Goovi VPN website.

## 📁 Directory Structure

```
/var/www/goovi-website/
├── downloads/                          # Download files directory
│   ├── Goovi-VPN-v1.0.0-Android.apk
│   └── Goovi-VPN-v1.0.0-Portable.zip
└── goovi-vpn-co/                       # Next.js website
```

## 🚀 Step 1: Create Downloads Directory on Server

```bash
# Create directory
sudo mkdir -p /var/www/goovi-website/downloads

# Set permissions
sudo chmod 755 /var/www/goovi-website/downloads

# Set ownership (replace 'user' with your username)
sudo chown user:user /var/www/goovi-website/downloads
```

## 📤 Step 2: Upload Files from Windows

### Option A: Using PowerShell SCP

```powershell
# Upload Android APK
scp "C:\path\to\Goovi-VPN-v1.0.0-Android.apk" user@81.30.161.139:/var/www/goovi-website/downloads/

# Upload Windows Portable ZIP
scp "C:\path\to\Goovi-VPN-v1.0.0-Portable.zip" user@81.30.161.139:/var/www/goovi-website/downloads/
```

### Option B: Using WinSCP (GUI)

1. Download and install WinSCP: https://winscp.net/
2. Connect to server:
   - Host: `81.30.161.139`
   - User: `user`
   - Protocol: SFTP
3. Navigate to `/var/www/goovi-website/downloads`
4. Drag and drop your APK and ZIP files

### Option C: Using FileZilla

1. Download FileZilla: https://filezilla-project.org/
2. Connect with SFTP to `81.30.161.139`
3. Upload files to `/var/www/goovi-website/downloads`

## ⚙️ Step 3: Update Nginx Configuration

### On the Server:

```bash
# Edit nginx config
sudo nano /etc/nginx/sites-available/goovi-vpn
```

Add this location block **BEFORE** the `location /api` block in **BOTH** HTTP and HTTPS server blocks:

```nginx
# Downloads - static file serving
location /downloads {
    alias /var/www/goovi-website/downloads;
    autoindex off;
    add_header Content-Disposition "attachment";
    add_header Cache-Control "public, max-age=86400";
}
```

### Example placement in HTTP block:

```nginx
server {
    listen 80;
    server_name goovi-vpn.com www.goovi-vpn.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # ADD THIS BLOCK HERE ↓
    location /downloads {
        alias /var/www/goovi-website/downloads;
        autoindex off;
        add_header Content-Disposition "attachment";
        add_header Cache-Control "public, max-age=86400";
    }

    location /api {
        proxy_pass http://localhost:3000/api;
        # ... rest of config
    }
}
```

### Example placement in HTTPS block:

```nginx
server {
    listen 443 ssl http2;
    server_name goovi-vpn.com www.goovi-vpn.com;

    # SSL config...
    
    # Security headers...

    # ADD THIS BLOCK HERE ↓
    location /downloads {
        alias /var/www/goovi-website/downloads;
        autoindex off;
        add_header Content-Disposition "attachment";
        add_header Cache-Control "public, max-age=86400";
    }

    location /api {
        proxy_pass http://localhost:3000/api;
        # ... rest of config
    }
}
```

### Test and reload:

```bash
# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

## 🔧 Step 4: Update Environment Variables

### On the Server:

```bash
cd /var/www/goovi-website/goovi-vpn-co

# Edit .env file
sudo nano .env
```

Update or add these lines:

```bash
NEXT_PUBLIC_DOWNLOAD_ANDROID=https://goovi-vpn.com/downloads/Goovi-VPN-v1.0.0-Android.apk
NEXT_PUBLIC_DOWNLOAD_WINDOWS=https://goovi-vpn.com/downloads/Goovi-VPN-v1.0.0-Portable.zip
```

Also update `.env.local` with the same values:

```bash
sudo nano .env.local
```

### Rebuild and restart the website:

```bash
# Rebuild Next.js
sudo npm run build

# Restart PM2
pm2 restart goovi-website

# Verify status
pm2 status
```

## ✅ Step 5: Test Downloads

### Test with curl:

```bash
# Test Android APK
curl -I https://goovi-vpn.com/downloads/Goovi-VPN-v1.0.0-Android.apk

# Test Windows Portable
curl -I https://goovi-vpn.com/downloads/Goovi-VPN-v1.0.0-Portable.zip

# Should return HTTP 200 OK with Content-Disposition header
```

### Test in browser:

1. Visit: https://goovi-vpn.com/downloads
2. Click download buttons
3. Files should download automatically

### Verify file permissions:

```bash
ls -la /var/www/goovi-website/downloads/
# Should show files owned by user with 644 or 755 permissions
```

## 🔄 Adding New Download Files

To add new versions in the future:

1. Upload new file to `/var/www/goovi-website/downloads/`
2. Update environment variables in `.env` and `.env.local`
3. Rebuild: `sudo npm run build`
4. Restart: `pm2 restart goovi-website`

No nginx changes needed unless changing directory structure.

## 📝 Download URLs

After setup, files will be accessible at:

- **Android APK**: `https://goovi-vpn.com/downloads/Goovi-VPN-v1.0.0-Android.apk`
- **Windows Portable**: `https://goovi-vpn.com/downloads/Goovi-VPN-v1.0.0-Portable.zip`

These URLs should be used in:
- Mobile app download buttons
- Website download page
- Documentation
- Marketing materials

## 🔒 Security Notes

- Files are served over HTTPS with valid SSL certificate
- No directory listing enabled (`autoindex off`)
- Files download automatically (`Content-Disposition: attachment`)
- Cached for 24 hours to reduce server load
- Only files explicitly placed in downloads directory are accessible

## 🐛 Troubleshooting

### Downloads return 404:

```bash
# Check if files exist
ls -la /var/www/goovi-website/downloads/

# Check nginx config
sudo nginx -t

# Check nginx logs
sudo tail -f /var/log/nginx/goovi-vpn-error.log
```

### Downloads not starting automatically:

- Check Content-Disposition header in browser dev tools
- Verify nginx config has `add_header Content-Disposition "attachment";`

### Permission denied errors:

```bash
# Fix permissions
sudo chmod 755 /var/www/goovi-website/downloads
sudo chmod 644 /var/www/goovi-website/downloads/*
```

## 📊 Monitoring Downloads

To see download statistics:

```bash
# View access logs
sudo tail -f /var/log/nginx/goovi-vpn-access.log | grep "/downloads"

# Count downloads
sudo grep "/downloads" /var/log/nginx/goovi-vpn-access.log | wc -l
```

---

**Setup Complete!** 🎉

Your download files are now accessible at:
- https://goovi-vpn.com/downloads/Goovi-VPN-v1.0.0-Android.apk
- https://goovi-vpn.com/downloads/Goovi-VPN-v1.0.0-Portable.zip

