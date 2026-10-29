import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { PageRoute, SiteConfig } from '../types';
import { VERIFIED_PATIENT_REVIEWS } from '../data/defaultConfig';
import { ResilientImage } from '../components/ResilientImage';

interface AboutPageProps {
  config: SiteConfig;
  onNavigate: (page: PageRoute) => void;
  onBookClick: () => void;
}

const CLINICAL_PILLARS = [
  {
    num: '01.',
    title: 'CBCT 3D Planning & Surgical Guides',
    body: 'Every dental implant at RBT Dental & Implant Center is digitally planned on 3D Cone-Beam Computed Tomography scans. Custom surgical guides translate virtual precision into gentle, accurate placement for single implants, immediate implants, and All-on-4 / All-on-6 arches.',
  },
  {
    num: '02.',
    title: 'Calm, Modern & Non-Clinical Atmosphere',
    body: 'Patients consistently remark that our DHA Phase 5 clinic feels serene, neat, and welcoming rather than intimidating. Thoughtful lighting, spotless operatory suites, and unhurried appointments help nervous patients feel completely at ease.',
  },
  {
    num: '03.',
    title: 'Transparent Chairside Explanations',
    body: 'Dr. Rao Bazil Taimur takes the time to show digital radiographs, explain every treatment option in plain language, and walk you through each step before beginning—so there are zero surprises during fillings, root canals, crowns, or aligners.',
  },
  {
    num: '04.',
    title: 'Strict Hospital-Grade Sterilization',
    body: 'All rotary handpieces, surgical implant kits, and diagnostic instruments undergo multi-stage ultrasonic cleaning, sealed pouching, and Class-B autoclave sterilization between every single patient visit.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ config, onNavigate, onBookClick }) => {
  return (
    <div className="space-y-20 py-10 sm:py-14 px-5 sm:px-8">
      {/* Intro & Clinic Exterior Photo */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold text-[#3b594c]">
              About {config.clinicName} <span aria-hidden="true">·</span> DHA Phase 5, Lahore
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight rbt-heading-text balance-text">
              {config.aboutHeadline}
            </h1>
            <p className="text-base leading-relaxed text-[#284237] max-w-[68ch]">
              {config.aboutStoryParagraph1}
            </p>
            <p className="text-base leading-relaxed text-[#284237] max-w-[68ch]">
              {config.aboutStoryParagraph2}
            </p>
          </div>

          <div className="rbt-tint-bg rounded-2xl border rbt-hairline p-6 space-y-2">
            <p className="font-display text-lg font-bold rbt-heading-text">
              Led by {config.leadDentist}
            </p>
            <p className="text-xs font-medium text-[#3b594c]">{config.leadTitle}</p>
            <p className="text-sm text-[#284237] leading-relaxed pt-1">
              Specializing in guided implant surgery, immediate dental implants, bone grafting,
              full mouth rehabilitation, monolithic zirconia crowns, veneers, painless rotary
              endodontics, and digital clear aligners for patients across Lahore.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white rbt-accent-bg rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Meet {config.leadDentist}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-3 text-sm font-semibold rbt-heading-text rbt-surface-bg border rbt-hairline rounded-xl hover:bg-black/5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              View Clinical Procedures
            </button>
          </div>
        </div>

        {/* Authentic Clinic Building Photograph */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="relative overflow-hidden rounded-2xl border rbt-hairline h-80 lg:h-full min-h-[340px]">
            <ResilientImage
              src={config.clinicFacadeImageUrl}
              alt="RBT Dental & Implant Center Building 14A Sector A DHA Phase 5 Lahore exterior signage"
              fallbackTitle={config.clinicName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 text-white">
              <p className="font-display text-sm font-bold">
                First Floor, Building 14A, A Block Sector A
              </p>
              <p className="text-xs text-white/85 mt-0.5">
                Phase 5 D.H.A., Lahore · Open 10:00 AM – 9:00 PM Daily
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Clinical Pillars */}
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold text-[#3b594c]">Our Clinical Standards</p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold rbt-heading-text balance-text">
            Digital Workflows Paired With Genuine Human Care
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CLINICAL_PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="rbt-surface-bg rounded-2xl border rbt-hairline p-7 space-y-3"
            >
              <span className="font-mono text-xs font-bold rbt-accent-text block">
                {pillar.num}
              </span>
              <h3 className="font-display text-xl font-bold rbt-heading-text">{pillar.title}</h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#284237]">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Patient Trust Proof */}
      <section className="max-w-7xl mx-auto rbt-surface-bg rounded-2xl border rbt-hairline p-7 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b rbt-hairline pb-6">
          <div>
            <h2 className="font-display text-2xl font-bold rbt-heading-text">
              Rated {config.ratingScore} Out of 5.0 by Lahore Patients
            </h2>
            <p className="text-sm text-[#476658] mt-1">
              {config.reviewCount} verified reviews highlighting hygiene, comfort, and clear
              explanations.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-amber-500">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} className="w-5 h-5 fill-current" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERIFIED_PATIENT_REVIEWS.slice(0, 3).map((rev) => (
            <div key={rev.id} className="space-y-3">
              <p className="text-xs font-semibold text-[#3b594c]">{rev.treatmentMentioned}</p>
              <p className="text-sm leading-relaxed text-[#284237]">&ldquo;{rev.quote}&rdquo;</p>
              <p className="text-xs font-medium text-[#526e61]">{rev.authorLabel}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
