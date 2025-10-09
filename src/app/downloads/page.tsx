import React from 'react';
import appConfig from '@/config/app.config';

export default function Downloads() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Download <span className="text-gradient">Goovi VPN</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Available on all your devices. Get started with Goovi VPN in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <DownloadCard
            icon={<AndroidIcon />}
            title="Android"
            description="Download from Google Play Store"
            version="Version 1.0.0"
            link={appConfig.downloads.android}
            badge="play-store"
          />

          <DownloadCard
            icon={<AppleIcon />}
            title="iOS"
            description="Download from App Store"
            version="Version 1.0.0"
            link={appConfig.downloads.ios}
            badge="app-store"
          />

          <DownloadCard
            icon={<WindowsIcon />}
            title="Windows"
            description="Windows 10 and later"
            version="Version 1.0.0"
            link={appConfig.downloads.windows}
            badge="download"
          />

          <DownloadCard
            icon={<MacIcon />}
            title="macOS"
            description="macOS 11 (Big Sur) and later"
            version="Version 1.0.0"
            link={appConfig.downloads.macos}
            badge="download"
          />

          <DownloadCard
            icon={<LinuxIcon />}
            title="Linux"
            description="Ubuntu, Debian, Fedora"
            version="Version 1.0.0"
            link={appConfig.downloads.linux}
            badge="download"
          />

          <div className="card flex flex-col items-center justify-center text-center p-8 border-dashed">
            <svg className="w-16 h-16 text-white/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <h3 className="text-xl font-bold mb-2 text-white/60">More Platforms</h3>
            <p className="text-white/40 text-sm">Coming Soon</p>
          </div>
        </div>

        <div className="card bg-primary/10 border-primary/30 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
              <p className="text-white/70 mb-4">
                Check our setup guides or contact support for installation assistance.
              </p>
              <a
                href={`mailto:${appConfig.supportEmail}`}
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {appConfig.supportEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">5M+</div>
            <div className="text-white/60">Downloads</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-secondary mb-2">4.8★</div>
            <div className="text-white/60">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">150+</div>
            <div className="text-white/60">Countries</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadCard({
  icon,
  title,
  description,
  version,
  link,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  version: string;
  link: string;
  badge: 'play-store' | 'app-store' | 'download';
}) {
  return (
    <div className="card group hover:border-primary/50 transition-all duration-300">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/60 mb-2">{description}</p>
        <p className="text-white/40 text-sm mb-6">{version}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {badge === 'play-store' && (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Google Play
            </>
          )}
          {badge === 'app-store' && (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              App Store
            </>
          )}
          {badge === 'download' && (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </>
          )}
        </a>
      </div>
    </div>
  );
}

function AndroidIcon() {
  return (
    <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
    </svg>
  );
}

function MacIcon() {
  return (
    <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
    </svg>
  );
}

function LinuxIcon() {
  return (
    <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.62,8.35C14.2,8.63 12.87,9.39 12.67,9.54C12.28,9.85 11.92,9.83 11.53,9.53C11.33,9.37 10,8.61 9.58,8.34C9.1,8.03 9.13,7.64 9.66,7.42C11.3,6.73 12.94,6.78 14.57,7.45C14.85,7.57 14.96,7.8 14.62,8.35M16,21.06C15.92,21.47 15.24,22 14.5,22C14.15,22 13.82,21.87 13.53,21.64C13.24,21.41 12.67,20.88 12,20.88C11.33,20.88 10.76,21.41 10.47,21.64C10.18,21.87 9.85,22 9.5,22C8.76,22 8.08,21.47 8,21.06C7.92,20.64 8.08,19.5 8.45,18.31C8.82,17.12 9.47,15 12,15C14.53,15 15.18,17.12 15.55,18.31C15.92,19.5 16.08,20.64 16,21.06M21.84,15.63C21.5,13.88 20.4,12.24 19.66,11C18.92,9.76 18.45,8.47 18.45,7C18.45,4.79 16.66,3 14.45,3C13.66,3 12.9,3.23 12.24,3.67C11.67,3.25 11,3 10.29,3C8.08,3 6.29,4.79 6.29,7C6.29,8.47 5.82,9.76 5.08,11C4.34,12.24 3.24,13.88 2.9,15.63C2.66,16.84 3.09,17.93 3.95,18.37C4.54,18.68 5.25,18.64 5.95,18.26C6.42,18 6.96,17.47 7.5,16.88C8.44,17.74 9.85,18.5 12,18.5C14.15,18.5 15.56,17.74 16.5,16.88C17.04,17.47 17.58,18 18.05,18.26C18.75,18.64 19.46,18.68 20.05,18.37C20.91,17.93 21.34,16.84 21.84,15.63Z" />
    </svg>
  );
}
