'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LitLabLogo from './LitLabLogo';
import SearchBar from './SearchBar';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!session?.user;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity" aria-label="Home">
            <LitLabLogo size={36} showText={true} />
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Nav links - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <Link
              href="/"
              className="text-sm font-bold text-gray-700 hover:text-black transition-colors"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="text-sm font-bold text-gray-700 hover:text-black transition-colors"
            >
              Catalog
            </Link>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="text-sm font-bold bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                My Cabinet
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-sm font-bold bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>


          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-3">
            <div className="mb-3">
              <SearchBar />
            </div>
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/catalog"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Catalog
              </Link>
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-bold text-white bg-black py-2 px-3 rounded-lg transition-colors"
                >
                  My Cabinet
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-bold text-white bg-black py-2 px-3 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
