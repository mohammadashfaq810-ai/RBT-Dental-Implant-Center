import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../types';

interface NavbarProps {
  clinicName: string;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onBookClick: () => void;
}

const NAV_ITEMS: Array<{ id: PageRoute; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
  { id: 'admin', label: 'Admin' },
];

export const Navbar: React.FC<NavbarProps> = ({
  clinicName,
  currentPage,
  onNavigate,
  onBookClick,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 rbt-surface-bg/95 backdrop-blur-md border-b rbt-hairline">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-5 sm:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav('home');
          }}
          className="font-display text-lg sm:text-xl font-bold tracking-tight rbt-heading-text whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {clinicName}
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  isActive
                    ? 'rbt-heading-text border-current font-semibold'
                    : 'text-[#426053] border-transparent hover:text-[#0d281d] hover:border-[#0d281d]/30'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onBookClick();
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white rbt-accent-bg rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Book Appointment
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border rbt-hairline rbt-heading-text cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileOpen && (
        <div className="md:hidden rbt-surface-bg border-b rbt-hairline px-5 py-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'rbt-tint-bg rbt-heading-text font-semibold'
                    : 'text-[#314d40] hover:bg-black/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookClick();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white rbt-accent-bg rounded-lg transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
