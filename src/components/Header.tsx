'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-2xl font-bold">Goovi VPN</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/downloads" className="hover:text-primary">
              Downloads
            </Link>
            <Link href="/about" className="hover:text-primary">
              About Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms-of-use" className="hover:text-primary">
              Terms
            </Link>
            <a href="mailto:support@goovi-vpn.com" className="btn-primary">
              Contact Us
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/" className="block hover:text-primary">
              Home
            </Link>
            <Link href="/downloads" className="block hover:text-primary">
              Downloads
            </Link>
            <Link href="/about" className="block hover:text-primary">
              About Us
            </Link>
            <Link href="/privacy-policy" className="block hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="block hover:text-primary">
              Terms of Use
            </Link>
            <a href="mailto:support@goovi-vpn.com" className="block text-primary">
              Contact Us
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
