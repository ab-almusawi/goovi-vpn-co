import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <div className="card mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-white/60">for Goovi VPN</p>
            </div>
          </div>
          <div className="h-px bg-white/10 my-6" />
          <p className="text-white/60 text-sm mb-4">Last updated: October 9, 2025</p>
          <p className="text-white/80 leading-relaxed">
            Goovi (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the mobile application Goovi VPN (&quot;the App&quot;). 
            This Privacy Policy explains how we collect, use, and protect information when you use our VPN service.
          </p>
        </div>

        <Section 
          title="1. Information We Collect"
          content={
            <>
              <p>We collect minimal and necessary data to maintain a reliable and secure VPN service:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>IP Address (temporary)</strong> — used only for connecting to our VPN servers and ensuring proper routing.</li>
                <li><strong>Country and Connection Location</strong> — used to optimize server performance and regional routing.</li>
                <li><strong>Connection Time and Duration</strong> — helps us monitor server performance and prevent abuse.</li>
                <li><strong>Diagnostic Data (optional)</strong> — error or crash reports used for troubleshooting (no personal content).</li>
              </ul>
              <p className="mt-4 text-error">❗ We do not monitor or log your browsing activity, DNS requests, or websites you visit.</p>
            </>
          }
        />

        <Section 
          title="2. How We Use the Information"
          content={
            <>
              <p>Collected data is used only for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Providing and maintaining the VPN connection</li>
                <li>Improving connection quality and performance</li>
                <li>Preventing fraud, abuse, or network misuse</li>
                <li>Technical support and troubleshooting</li>
              </ul>
            </>
          }
        />

        <Section 
          title="3. Data Retention"
          content={
            <ul className="list-disc pl-6 space-y-2">
              <li>Connection metadata (IP, country, time) may be kept temporarily (up to 30 days) for operational analytics.</li>
              <li>No activity logs or content of traffic are ever stored.</li>
              <li>Data is deleted automatically after the retention period.</li>
            </ul>
          }
        />

        <Section 
          title="4. Data Sharing"
          content={
            <>
              <p>We do not sell, rent, or trade your personal information.</p>
              <p className="mt-4">We may share minimal technical data only with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Legal authorities only if required by law</li>
              </ul>
              <p className="mt-4">All such partners are bound by strict confidentiality agreements.</p>
            </>
          }
        />

        <Section 
          title="5. Security of Your Data"
          content={
            <>
              <p>We use industry-standard security measures, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>WireGuard encryption (ChaCha20, Poly1305)</li>
                <li>Secure HTTPS communication</li>
                <li>No plaintext logging</li>
              </ul>
              <p className="mt-4">Your data is protected during transfer and storage.</p>
            </>
          }
        />

        <Section 
          title="6. Your Rights"
          content={
            <>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Request access or deletion of your personal data</li>
                <li>Contact our support for data inquiries or removal requests</li>
              </ul>
              <p className="mt-4">📩 Contact: <a href="mailto:support@goovi-vpn.com" className="text-primary hover:underline">support@goovi-vpn.com</a></p>
            </>
          }
        />

        <Section 
          title="7. Third-Party Services"
          content={
            <p>
              Goovi VPN may use Google services for analytics or crash reporting. 
              Each provider handles data in accordance with their own privacy policies.
            </p>
          }
        />

        <Section 
          title="8. Changes to This Policy"
          content={
            <>
              <p>We may update this Privacy Policy periodically. Updates will be posted at:</p>
              <p className="mt-4">
                <a href="https://goovi-vpn.com/privacy-policy" className="text-primary hover:underline">
                  https://goovi-vpn.com/privacy-policy
                </a>
              </p>
            </>
          }
        />

        <div className="card bg-primary/10 border-primary/30 mt-8">
          <div className="flex items-center gap-4">
            <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-white/90">Your privacy is our priority. We are committed to protecting your data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="card mb-6">
      <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
      <div className="text-white/80 leading-relaxed space-y-4">
        {content}
      </div>
    </div>
  );
}
