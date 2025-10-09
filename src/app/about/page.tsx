import React from 'react';

export default function AboutUs() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <div className="card mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">About Us</h1>
              <p className="text-white/60">Goovi VPN</p>
            </div>
          </div>
          <div className="h-px bg-white/10 my-6" />
          <p className="text-white/60 text-sm mb-4">Last updated: October 9, 2025</p>
          <p className="text-white/80 leading-relaxed">
            Welcome to Goovi VPN, a service proudly developed by Goovi — a technology company dedicated to 
            providing fast, secure, and private internet access to users around the world.
          </p>
        </div>

        <Section 
          title="🌍 Our Mission"
          content={
            <>
              <p>At Goovi, our mission is to empower users with freedom, privacy, and security online.</p>
              <p className="mt-4">We believe everyone deserves the right to browse the internet safely and without restrictions.</p>
              <p className="mt-4">That&apos;s why we built Goovi VPN, a simple yet powerful tool that protects your connection using modern encryption technologies such as WireGuard.</p>
              <p className="mt-4">We&apos;re committed to transparency and never compromising on user privacy.</p>
              <p className="mt-4">Our system is built on a no-log policy, meaning we do not monitor, track, or store any of your online activities.</p>
            </>
          }
        />

        <Section 
          title="🔒 Our Core Principles"
          content={
            <>
              <p>At Goovi, we follow a few guiding principles that shape everything we do:</p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li><strong>Privacy First</strong> – We never collect or share user data.</li>
                <li><strong>Security by Design</strong> – Every connection is encrypted end-to-end with the WireGuard protocol.</li>
                <li><strong>Speed and Stability</strong> – Our servers are optimized for fast, consistent, and reliable VPN performance.</li>
                <li><strong>Simplicity and Accessibility</strong> – Goovi VPN is easy to use, with a clean interface designed for everyone.</li>
                <li><strong>Transparency</strong> – No hidden policies, no tracking, no misleading claims.</li>
              </ul>
            </>
          }
        />

        <Section 
          title="⚙️ Technology We Use"
          content={
            <>
              <p>Goovi VPN uses the WireGuard protocol, a next-generation VPN technology known for its simplicity, high performance, and strong security.</p>
              <p className="mt-4">This ensures your connection remains private, encrypted, and resistant to modern cyber threats.</p>
              <p className="mt-4">We also ensure that our systems are continuously updated to meet the latest security standards and privacy regulations.</p>
            </>
          }
        />

        <Section 
          title="💬 Contact Us"
          content={
            <>
              <p>We&apos;re always happy to hear from our users!</p>
              <p className="mt-4">For questions, support, or partnership inquiries, contact us at:</p>
              <p className="mt-4">
                📩 <a href="mailto:support@goovi-vpn.com" className="text-secondary hover:underline">support@goovi-vpn.com</a>
              </p>
            </>
          }
        />

        <Section 
          title="🧭 Our Commitment"
          content={
            <>
              <p>Your privacy and trust mean everything to us.</p>
              <p className="mt-4">Goovi VPN will continue to evolve with the same promise we started with — to keep your data secure and your internet experience private, fast, and unrestricted.</p>
              <p className="mt-4 font-semibold">Goovi – Fast • Secure • Private</p>
            </>
          }
        />

        <div className="card bg-secondary/10 border-secondary/30 mt-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-2xl font-bold">Goovi VPN</span>
            </div>
            <p className="text-white/60 text-sm">© 2025 Goovi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="card mb-6">
      <h2 className="text-2xl font-bold text-secondary mb-4">{title}</h2>
      <div className="text-white/80 leading-relaxed space-y-4">
        {content}
      </div>
    </div>
  );
}
