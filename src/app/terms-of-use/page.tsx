import React from 'react';

export default function TermsOfUse() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <div className="card mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">Terms of Use</h1>
              <p className="text-white/60">for Goovi VPN</p>
            </div>
          </div>
          <div className="h-px bg-white/10 my-6" />
          <p className="text-white/60 text-sm mb-4">Last updated: October 9, 2025</p>
          <p className="text-white/80 leading-relaxed">
            These Terms of Use ("Terms") govern your access to and use of the Goovi VPN mobile application ("Service"). 
            By using the Service, you agree to these Terms.
          </p>
        </div>

        <Section 
          title="1. Service Description"
          content="Goovi VPN provides an encrypted virtual private network using the WireGuard protocol to enhance online privacy, protect data, and bypass local restrictions."
        />

        <Section 
          title="2. Acceptable Use"
          content={
            <>
              <p>You agree not to use the Service for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Illegal activities or copyright infringement</li>
                <li>Attacking, scanning, or disrupting other systems</li>
                <li>Spamming, phishing, or distributing malware</li>
                <li>Any behavior violating applicable laws or regulations</li>
              </ul>
              <p className="mt-4">We reserve the right to suspend or terminate accounts involved in abuse or unlawful activity.</p>
            </>
          }
        />

        <Section 
          title="3. User Responsibility"
          content={
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for maintaining the security of your device and credentials.</li>
              <li>You agree to comply with all applicable local laws while using the VPN.</li>
            </ul>
          }
        />

        <Section 
          title="4. Payment and Subscription"
          content={
            <>
              <p>If Goovi VPN offers paid plans, subscriptions are handled through Google Play Billing.</p>
              <p className="mt-4">Refunds and renewals follow Google Play's policies.</p>
            </>
          }
        />

        <Section 
          title="5. Limitation of Liability"
          content={
            <>
              <p>The Service is provided "as is" and "as available."</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Goovi makes no guarantees about uptime, performance, or compatibility.</li>
                <li>We are not liable for any loss of data, profit, or damages arising from your use of the Service.</li>
              </ul>
            </>
          }
        />

        <Section 
          title="6. Termination"
          content="We may suspend or terminate your access to the Service for any violation of these Terms or if required by law."
        />

        <Section 
          title="7. Modifications"
          content={
            <>
              <p>We may modify these Terms at any time. Updates will be posted at:</p>
              <p className="mt-4">
                <a href="https://goovi-vpn.com/terms-of-use" className="text-secondary hover:underline">
                  https://goovi-vpn.com/terms-of-use
                </a>
              </p>
            </>
          }
        />

        <Section 
          title="8. Contact"
          content={
            <>
              <p>For any questions about these Terms, contact us at:</p>
              <p className="mt-4">
                📩 <a href="mailto:support@goovi-vpn.com" className="text-secondary hover:underline">support@goovi-vpn.com</a>
              </p>
            </>
          }
        />

        <div className="card bg-secondary/10 border-secondary/30 mt-8">
          <div className="flex items-center gap-4">
            <svg className="w-6 h-6 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white/90">By using Goovi VPN, you agree to these Terms of Use.</p>
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
