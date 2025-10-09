#  Quick Start Guide - Goovi VPN Website

## Step-by-Step Setup

### 1️⃣ Open Terminal in Goovi_Co Folder
```bash
cd "G:\Mobile Apps\Goovi apps\vpn\g_vpn\Goovi_Co"
```

### 2️⃣ Install Dependencies (First Time Only)
```bash
npm install
```
Wait for installation to complete (~2-3 minutes)

### 3️⃣ Start Development Server
```bash
npm run dev
```

### 4️⃣ Open in Browser
Navigate to: **http://localhost:3000**

## 🎉 That's It!

Your website is now running locally. You should see:
-  Homepage with hero section
-  Navigation menu
-  All pages accessible

## 📄 Pages Available

- **Home**: http://localhost:3000/
- **About Us**: http://localhost:3000/about
- **Privacy Policy**: http://localhost:3000/privacy-policy
- **Terms of Use**: http://localhost:3000/terms-of-use

## 🛠️ Development Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Run production build
npm run lint    # Check for errors
```

## 🎨 What You'll See

### Homepage
- Large hero section with "Secure Your Digital Life"
- 3 feature cards (Fast, Secure, Zero Logs)
- "Why Choose Goovi VPN" section
- Call-to-action button

### Other Pages
- Professional card-based layout
- Same dark theme as mobile app
- Fully responsive
- Clickable email links

## 🐛 Troubleshooting

### Port Already in Use?
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Missing Dependencies?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

**Need Help?** Check `WEBSITE_SUMMARY.md` for detailed information.
