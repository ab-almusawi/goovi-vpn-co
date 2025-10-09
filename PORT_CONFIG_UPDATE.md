# ⚙️ Port Configuration Update

## 📋 Changes Made

### Port Reassignment

**Reason**: Your VPN API is already using port 3000, so the website has been moved to port 3001.

### Before ❌
```
Website: Port 3000
API: Port 8080 (assumed)
```

### After ✅
```
Website: Port 3001
API: Port 3000 (your actual VPN API)
```

---

## 📝 Files Updated

### 1. **`ecosystem.config.js`**
- Changed PORT from 3000 to 3001
- PM2 will now start the website on port 3001

### 2. **`.env.example`**
- Updated PORT=3001

### 3. **`PRODUCTION_DEPLOYMENT.md`**
- Updated nginx configuration:
  - Website proxy: `localhost:3001`
  - API proxy: `localhost:3000/api`
- Updated architecture diagram
- Updated quick reference ports

### 4. **`DEPLOY_QUICKSTART.md`**
- Updated all port references to 3001
- Updated test commands
- Updated troubleshooting commands
- Updated architecture diagram

---

## 🎯 Your Production Setup

### Architecture
```
Domain (goovi-vpn.com)
         ↓
   [Nginx :80/443]
         ↓
    ┌────────┴────────┐
    ↓                 ↓
[Website :3001]  [VPN API :3000]
(Next.js)        (Your API /api)
```

### Port Mapping
| Service | Internal Port | External Access |
|---------|--------------|-----------------|
| Nginx | 80, 443 | Public |
| Website | 3001 | Via nginx proxy |
| VPN API | 3000 | Via nginx `/api` |

---

## 🚀 How to Use

### Local Development

```bash
cd Goovi_Co

# Start with correct port
PORT=3001 npm run dev

# Or set in .env.local:
echo "PORT=3001" > .env.local
npm run dev

# Access at:
http://localhost:3001
```

### Production Deployment

1. **PM2 Configuration** (ecosystem.config.js):
   ```javascript
   env: {
     NODE_ENV: 'production',
     PORT: 3001  // ✅ Updated
   }
   ```

2. **Nginx Configuration**:
   ```nginx
   # Website
   location / {
       proxy_pass http://localhost:3001;  // ✅ Updated
   }
   
   # VPN API
   location /api {
       proxy_pass http://localhost:3000/api;  // ✅ Matches your API port
   }
   ```

3. **Start Services**:
   ```bash
   # On your Ubuntu server
   pm2 start ecosystem.config.js
   ```

---

## ✅ Verification

### Check Website Port
```bash
# Local
curl http://localhost:3001

# Production (after deployment)
pm2 logs goovi-website
# Should show: "ready on http://localhost:3001"
```

### Check API Port
```bash
# Check your API is running
curl http://localhost:3000/api/health
# Or whatever endpoint you have
```

### Check Nginx Routing
```bash
# Website through nginx
curl http://your-domain.com

# API through nginx
curl http://your-domain.com/api/your-endpoint
```

---

## 🔧 Your VPN API Configuration

Based on your config:
```env
SERVER_PORT=3000                      ✅ API on port 3000
SERVER_HOST=0.0.0.0                   ✅ Listening on all interfaces
VPN_SERVICE_NAME=vpn-api
WIREGUARD_CONFIG_PATH=/etc/wireguard
WIREGUARD_INTERFACE=wg0
VPN_SERVER_PUBLIC_IP=81.30.161.139    ✅ Your server
VPN_SERVER_INTERNAL_IP=192.168.88.230
VPN_SERVER_PORT=51820                 ✅ WireGuard port
```

**Perfect match!** ✅
- API runs on port 3000 internally
- Nginx routes `/api` to `localhost:3000/api`
- Website runs on port 3001
- All services accessible via your domain

---

## 📚 Updated Documentation

All guides have been updated with correct ports:
- ✅ `PRODUCTION_DEPLOYMENT.md` - Full deployment guide
- ✅ `DEPLOY_QUICKSTART.md` - Quick reference
- ✅ `ecosystem.config.js` - PM2 config
- ✅ `.env.example` - Environment template
- ✅ `ENV_SETUP.md` - Environment guide

---

## 🎉 Summary

**Changes Complete!** ✅

Your setup:
- **Website**: Port 3001 (Next.js)
- **VPN API**: Port 3000 (Your existing API)
- **Nginx**: Routes everything correctly
- **Domain**: All accessible via your Hostinger domain

**No conflicts!** Both services can run simultaneously on the same server.

---

**Updated**: October 9, 2025  
**Reason**: Avoid port conflict with VPN API (port 3000)  
**Solution**: Move website to port 3001
