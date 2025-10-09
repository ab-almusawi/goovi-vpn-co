export const appConfig = {
  // Application Info
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Goovi VPN',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  
  // Server Settings
  port: process.env.PORT || '3000',
  host: process.env.HOST || 'localhost',
  
  // Contact
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@goovi-vpn.com',
  websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://goovi-vpn.com',
  
  // Download Links
  downloads: {
    android: process.env.NEXT_PUBLIC_DOWNLOAD_ANDROID || 'https://play.google.com/store/apps/details?id=com.goovi.vpn',
    ios: process.env.NEXT_PUBLIC_DOWNLOAD_IOS || 'https://apps.apple.com/app/goovi-vpn/id123456789',
    windows: process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS || 'https://goovi-vpn.com/downloads/Goovi-VPN-Setup-Windows.exe',
    macos: process.env.NEXT_PUBLIC_DOWNLOAD_MACOS || 'https://goovi-vpn.com/downloads/Goovi-VPN-Setup-macOS.dmg',
    linux: process.env.NEXT_PUBLIC_DOWNLOAD_LINUX || 'https://goovi-vpn.com/downloads/Goovi-VPN-Setup-Linux.AppImage',
  },
  
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://81.30.161.139',
    prefix: process.env.NEXT_PUBLIC_API_PREFIX || '/api',
  },
};

export default appConfig;
