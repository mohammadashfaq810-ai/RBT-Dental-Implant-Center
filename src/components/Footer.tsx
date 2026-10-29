import React from 'react';
import { Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { PageRoute, SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onNavigate }) => {
  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${config.whatsappDigits}?text=${encodeURIComponent(
    `Assalam-o-Alaikum RBT Dental & Implant Center! I would like to book a consultation with ${config.leadDentist}.`
  )}`;

  return (
    <footer className="bg-[#0d281d] text-[#e2f2e7] tracking-[0.01em] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & SEO Intro */}
          <div className="lg:col-span-4 space-y-4">
            <p className="font-display text-xl font-bold text-white tracking-tight">
              {config.clinicName}
            </p>
            <p className="text-sm text-[#bdd8c7] leading-relaxed">
              Modern digital dentistry, CBCT-guided dental implants, cosmetic zirconia crowns,
              veneers, invisible aligners, and gentle painless dental care led by{' '}
              <span className="text-white font-medium">{config.leadDentist}</span> in DHA Phase 5,
              Lahore.
            </p>
            <p className="text-xs text-[#9ec2ac] font-mono tabular-nums">
              Google Patient Rating: {config.ratingScore} / 5.0 · {config.reviewCount} Verified
              Reviews
            </p>
          </div>

          {/* Site Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-display text-sm font-semibold text-white">Clinic Pages</p>
            <ul className="space-y-2.5 text-sm text-[#bdd8c7]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Dr. Bazil
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dental Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Map
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('admin')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Clinic Admin Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Core Specialties */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-display text-sm font-semibold text-white">Key Treatments</p>
            <ul className="space-y-2 text-sm text-[#bdd8c7]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  3D Guided Dental Implants
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  All-on-4 &amp; All-on-6 Implants
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Zirconia Crowns &amp; Veneers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Painless Root Canal &amp; Fillings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Invisible Clear Aligners
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-3 space-y-3.5 text-sm text-[#bdd8c7]">
            <p className="font-display text-sm font-semibold text-white">Visit DHA Phase 5</p>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#6ee7b7] shrink-0 mt-1" />
              <div>
                <p className="text-white/95 leading-snug">{config.addressFull}</p>
                <p className="text-xs text-[#9ec2ac] mt-0.5 font-mono">{config.plusCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#6ee7b7] shrink-0" />
              <a
                href={`tel:${config.phoneDisplay.replace(/\s+/g, '')}`}
                className="font-mono tabular-nums text-white hover:underline"
              >
                {config.phoneDisplay}
              </a>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#6ee7b7] shrink-0 mt-0.5" />
              <p className="font-mono text-xs tabular-nums leading-relaxed">
                Open 7 Days (Mon–Sun)
                <br />
                10:00 AM – 9:00 PM
              </p>
            </div>
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6ee7b7] hover:text-white transition-colors"
              >
                Chat with Reception on WhatsApp
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9ec2ac]">
          <p>
            &copy; {new Date().getFullYear()} {config.clinicName}. Led by {config.leadDentist}. All
            rights reserved.
          </p>
          <p>DHA Phase 5, Lahore · Comprehensive Implant, Cosmetic &amp; Digital Dentistry</p>
        </div>
      </div>
    </footer>
  );
};
