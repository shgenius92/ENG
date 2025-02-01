'use client';
import { useState } from 'react';
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      {/* Header with Top-Right Menu */}
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        {/* Left part of the header (optional) */}
        <div className="text-xl font-semibold">MyApp</div>

        {/* Right part of the header (Menu) */}
        <div className="hidden md:flex space-x-6">
          <Link href="/home" className="text-lg hover:underline">Home</Link>
          <Link href="/about" className="text-lg hover:underline">About</Link>
          <Link href="/contact" className="text-lg hover:underline">Contact</Link>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden relative">
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? '✕' : '☰'}
          </button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-gray-800 text-white p-4 space-y-4 rounded shadow-lg z-50">
              <Link href="/cards/home" className="block text-lg hover:underline">Home</Link>
              <Link href="/cards/revision" className="block text-lg hover:underline">Revision</Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main>{children}</main>

      {/* Footer (optional) */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
