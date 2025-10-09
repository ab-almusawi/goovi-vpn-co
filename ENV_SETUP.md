# Environment Variables Setup

## 📝 Overview

This website uses environment variables to manage configuration settings like ports, hosts, download links, and API endpoints.

## 🔧 Configuration Methods

### Method 1: Create .env.local File (Recommended)

Create a `.env.local` file in the root of the `Goovi_Co` folder:

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

# Download Links (Update with your actual links)
NEXT_PUBLIC_DOWNLOAD_ANDROID=https://play.google.com/store/apps/details?id=com.goovi.vpn
NEXT_PUBLIC_DOWNLOAD_IOS=https://apps.apple.com/app/goovi-vpn/id123456789
NEXT_PUBLIC_DOWNLOAD_WINDOWS=https://goovi-vpn.com/downloads/Goovi-VPN-Setup-Windows.exe
NEXT_PUBLIC_DOWNLOAD_MACOS=https://goovi-vpn.com/downloads/Goovi-VPN-Setup-macOS.dmg
NEXT_PUBLIC_DOWNLOAD_LINUX=https://goovi-vpn.com/downloads/Goovi-VPN-Setup-Linux.AppImage

# API Configuration
NEXT_PUBLIC_API_URL=http://81.30.161.139
NEXT_PUBLIC_API_PREFIX=/api
```

### Method 2: Use config/app.config.ts (Current Method)

The app uses `src/config/app.config.ts` which reads from environment variables with fallback defaults.

**Advantages:**
- Works immediately without .env file
- Has sensible defaults
- Type-safe configuration
- Easy to update

## 🔑 Variable Descriptions

### Application Settings
- `NEXT_PUBLIC_APP_NAME` - Application name (default: "Goovi VPN")
- `NEXT_PUBLIC_APP_VERSION` - Version number (default: "1.0.0")

### Server Settings
- `PORT` - Port number for development server (default: 3000)
- `HOST` - Hostname (default: localhost)

### Contact
- `NEXT_PUBLIC_SUPPORT_EMAIL` - Support email address
- `NEXT_PUBLIC_WEBSITE_URL` - Main website URL

### Download Links
Update these with your actual app store and download links:

- `NEXT_PUBLIC_DOWNLOAD_ANDROID` - Google Play Store link
- `NEXT_PUBLIC_DOWNLOAD_IOS` - Apple App Store link
- `NEXT_PUBLIC_DOWNLOAD_WINDOWS` - Windows installer URL
- `NEXT_PUBLIC_DOWNLOAD_MACOS` - macOS installer URL  
- `NEXT_PUBLIC_DOWNLOAD_LINUX` - Linux AppImage URL

### API Configuration
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `NEXT_PUBLIC_API_PREFIX` - API prefix path

## 🚀 Usage

### Change Port
```bash
# Option 1: .env.local
PORT=4000

# Option 2: Command line
npm run dev -- -p 4000

# Option 3: Set environment variable
PORT=4000 npm run dev
```

### Update Download Links

**Edit `src/config/app.config.ts`:**
```typescript
downloads: {
  android: 'https://play.google.com/...',
  ios: 'https://apps.apple.com/...',
  // ... etc
}
```

**Or create `.env.local` and set:**
```
NEXT_PUBLIC_DOWNLOAD_ANDROID=your-link-here
NEXT_PUBLIC_DOWNLOAD_IOS=your-link-here
```

## 📁 File Priority

Next.js loads environment variables in this order:
1. `.env.local` (highest priority)
2. `.env.production` or `.env.development`
3. `.env`
4. Default values in `app.config.ts`

## 🔒 Security Notes

### Public vs Private Variables

**NEXT_PUBLIC_*** prefix:
- ✅ Exposed to browser
- ✅ Can be used in client components
- ⚠️ Don't put secrets here

**No prefix:**
- 🔒 Server-side only
- 🔒 Not exposed to browser
- ✅ Use for API keys, secrets

### Example:
```bash
# ✅ Safe - Public information
NEXT_PUBLIC_API_URL=https://api.goovi-vpn.com

# ❌ NEVER DO THIS - Secret will be exposed
NEXT_PUBLIC_API_SECRET=abc123

# ✅ Correct - Server-side only
API_SECRET=abc123
```

## 📝 Updating Configuration

### Step 1: Create .env.local
```bash
cd Goovi_Co
touch .env.local
```

### Step 2: Add Your Settings
Copy content from this file and customize.

### Step 3: Restart Development Server
```bash
npm run dev
```

### Step 4: Verify
Check `src/config/app.config.ts` is reading your values.

## 🌍 Production Deployment

### Vercel
1. Go to Project Settings → Environment Variables
2. Add each variable
3. Redeploy

### Netlify
1. Site settings → Build & deploy → Environment
2. Add variables
3. Trigger new deployment

### Custom Server
Create `.env.production.local`:
```bash
PORT=8080
NEXT_PUBLIC_API_URL=https://api.goovi-vpn.com
```

## 💡 Tips

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Share `.env.example`** - Template for team members
3. **Use different values per environment** - Dev vs Production
4. **Test with defaults first** - Ensure app works without .env

## 📚 References

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Environment Variable Loading Order](https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order)

---

**Need Help?** Check `src/config/app.config.ts` to see how variables are used.
