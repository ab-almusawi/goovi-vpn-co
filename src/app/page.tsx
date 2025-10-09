export default function Home() {
  return (
    <div className="pt-20">
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Secure Your <span className="text-gradient">Digital Life</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8">
              Fast • Secure • Private
            </p>
            <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
              Protect your online privacy with Goovi VPN. Powered by WireGuard protocol for ultimate security and lightning-fast speeds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@goovi-vpn.com" className="btn-primary">
                Get Started
              </a>
              <a href="/about" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-white/60">
                WireGuard protocol ensures blazing-fast speeds without compromising security
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Military-Grade Security</h3>
              <p className="text-white/60">
                ChaCha20 encryption and Poly1305 authentication for unbreakable protection
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Zero Logs Policy</h3>
              <p className="text-white/60">
                We never track, monitor, or store your online activities or browsing history
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-darkCard/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">Goovi VPN</span>?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Built with modern technology and privacy-first principles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">No Logging</h3>
                <p className="text-white/60">
                  We don't track, monitor, or store any of your online activities. Your privacy is paramount.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">WireGuard Protocol</h3>
                <p className="text-white/60">
                  Next-generation VPN protocol known for simplicity, high performance, and strong security.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
                <p className="text-white/60">
                  Simple, clean interface designed for everyone. Connect with just one tap.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-white/60">
                  Our support team is always ready to help with any questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Download <span className="text-gradient">Goovi VPN</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Available on all your devices
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-12">
            <a href="/downloads" className="card group hover:border-primary/50 transition-all duration-300 text-center p-6">
              <svg className="w-12 h-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z" />
              </svg>
              <p className="font-semibold text-sm">Android</p>
            </a>

            <a href="/downloads" className="card group hover:border-primary/50 transition-all duration-300 text-center p-6">
              <svg className="w-12 h-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <p className="font-semibold text-sm">iOS</p>
            </a>

            <a href="/downloads" className="card group hover:border-primary/50 transition-all duration-300 text-center p-6">
              <svg className="w-12 h-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
              </svg>
              <p className="font-semibold text-sm">Windows</p>
            </a>

            <a href="/downloads" className="card group hover:border-primary/50 transition-all duration-300 text-center p-6">
              <svg className="w-12 h-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <p className="font-semibold text-sm">macOS</p>
            </a>

            <a href="/downloads" className="card group hover:border-primary/50 transition-all duration-300 text-center p-6">
              <svg className="w-12 h-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.62,8.35C14.2,8.63 12.87,9.39 12.67,9.54C12.28,9.85 11.92,9.83 11.53,9.53C11.33,9.37 10,8.61 9.58,8.34C9.1,8.03 9.13,7.64 9.66,7.42C11.3,6.73 12.94,6.78 14.57,7.45C14.85,7.57 14.96,7.8 14.62,8.35M16,21.06C15.92,21.47 15.24,22 14.5,22C14.15,22 13.82,21.87 13.53,21.64C13.24,21.41 12.67,20.88 12,20.88C11.33,20.88 10.76,21.41 10.47,21.64C10.18,21.87 9.85,22 9.5,22C8.76,22 8.08,21.47 8,21.06C7.92,20.64 8.08,19.5 8.45,18.31C8.82,17.12 9.47,15 12,15C14.53,15 15.18,17.12 15.55,18.31C15.92,19.5 16.08,20.64 16,21.06M21.84,15.63C21.5,13.88 20.4,12.24 19.66,11C18.92,9.76 18.45,8.47 18.45,7C18.45,4.79 16.66,3 14.45,3C13.66,3 12.9,3.23 12.24,3.67C11.67,3.25 11,3 10.29,3C8.08,3 6.29,4.79 6.29,7C6.29,8.47 5.82,9.76 5.08,11C4.34,12.24 3.24,13.88 2.9,15.63C2.66,16.84 3.09,17.93 3.95,18.37C4.54,18.68 5.25,18.64 5.95,18.26C6.42,18 6.96,17.47 7.5,16.88C8.44,17.74 9.85,18.5 12,18.5C14.15,18.5 15.56,17.74 16.5,16.88C17.04,17.47 17.58,18 18.05,18.26C18.75,18.64 19.46,18.68 20.05,18.37C20.91,17.93 21.34,16.84 21.84,15.63Z" />
              </svg>
              <p className="font-semibold text-sm">Linux</p>
            </a>
          </div>

          <div className="text-center">
            <a href="/downloads" className="btn-secondary">
              View All Downloads
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-darkCard/50">
        <div className="container-custom">
          <div className="card text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Protect Your Privacy?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Join thousands of users who trust Goovi VPN for their online security
            </p>
            <a href="mailto:support@goovi-vpn.com" className="btn-primary">
              Contact Us Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
