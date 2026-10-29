import React, { useState } from 'react';
import { ArrowRight, Star, Phone, ChevronDown } from 'lucide-react';
import { AppointmentRecord, PageRoute, SiteConfig } from '../types';
import { VERIFIED_PATIENT_REVIEWS } from '../data/defaultConfig';
import { ResilientImage } from '../components/ResilientImage';
import { ProcedureShowcase } from '../components/ProcedureShowcase';
import { AppointmentForm } from '../components/AppointmentForm';

interface HomePageProps {
  config: SiteConfig;
  onNavigate: (page: PageRoute) => void;
  onBookService: (serviceName: string) => void;
  onAppointmentCreated: (apt: AppointmentRecord) => void;
}

const SEO_FAQS = [
  {
    q: 'Why choose CBCT-guided dental implants at RBT Dental & Implant Center in DHA Lahore?',
    a: 'Dr. Rao Bazil Taimur uses 3D Cone-Beam CT (CBCT) imaging and custom surgical guides to plan exact implant depth and angle before treatment begins. Whether you need a single immediate tooth implant, bone grafting, implant-supported dentures, or full-arch All-on-4 and All-on-6 dental implants in Lahore, computer-guided surgery minimizes discomfort, protects vital anatomy, and accelerates healing.',
  },
  {
    q: 'Are root canal treatments and dental fillings painful at your DHA Phase 5 clinic?',
    a: 'Not at all. Patient comfort is our top priority. Dr. Rao Bazil Taimur explains every step clearly before starting, applies gentle topical and local anesthesia, and uses quiet rotary endodontic instruments so root canal therapy, ultrasonic scaling, and composite fillings feel smooth, calm, and virtually painless.',
  },
  {
    q: 'What cosmetic dentistry options do you offer for stained, chipped, or misaligned teeth?',
    a: 'We provide metal-free CAD/CAM zirconia crowns and bridges, custom porcelain veneers, enamel-safe clinical teeth whitening, full mouth rehabilitation, and transparent invisible aligners in DHA Phase 5, Lahore—tailored to match your facial harmony and natural enamel shade.',
  },
  {
    q: 'What are the clinic timings and exact location in DHA Phase 5, Lahore?',
    a: 'RBT Dental & Implant Center is open 7 days a week—Monday through Sunday from 10:00 AM to 9:00 PM—at First Floor, Building 14A, A Block Sector A, Phase 5 D.H.A., Lahore (Plus Code: FC6F+GJ). You can call or WhatsApp 0313 3337726 anytime to reserve your slot.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  config,
  onNavigate,
  onBookService,
  onAppointmentCreated,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedBookingService, setSelectedBookingService] = useState<string>('');

  const scrollToHomeBooking = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedBookingService(serviceTitle);
    }
    const el = document.getElementById('home-booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onBookService(serviceTitle || '');
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO PROPOSITION SECTION */}
      <section className="pt-8 sm:pt-12 lg:pt-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Hero Text Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 py-2">
              <div className="space-y-5">
                {/* Clean unboxed regional metadata */}
                <p className="text-xs sm:text-sm font-medium text-[#3b594c]">
                  DHA Phase 5, Lahore <span aria-hidden="true">·</span> Led by {config.leadDentist}{' '}
                  <span aria-hidden="true">·</span> Open 10 AM – 9 PM Daily
                </p>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.12] tracking-tight rbt-heading-text balance-text">
                  {config.heroHeadline}
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-[#284237] max-w-[64ch]">
                  {config.heroSubheadline}
                </p>
              </div>

              {/* Single Dominant Primary CTA + Quiet Secondary Phone Link */}
              <div className="space-y-5 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToHomeBooking()}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white rbt-accent-bg rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Book Dental Consultation
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${config.phoneDisplay.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold rbt-heading-text rbt-surface-bg border rbt-hairline rounded-xl hover:bg-black/5 transition-colors whitespace-nowrap shrink-0 font-mono tabular-nums"
                  >
                    <Phone className="w-4 h-4 rbt-accent-text" />
                    {config.phoneDisplay}
                  </a>
                </div>

                <p className="text-xs text-[#476658]">
                  First Floor, Building 14A, A Block Sector A, Phase 5 D.H.A., Lahore{' '}
                  <span aria-hidden="true">·</span> Plus Code {config.plusCode}
                </p>
              </div>
            </div>

            {/* Hero 16:9 Architectural Clinic Visual */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border rbt-hairline h-80 sm:h-96 lg:h-full min-h-[340px]">
                <ResilientImage
                  src={config.heroImageUrl}
                  alt="Modern calm dental operatory and 3D CBCT digital dentistry suite at RBT Dental & Implant Center in DHA Phase 5 Lahore"
                  fallbackTitle={config.clinicName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                  <p className="font-display text-sm sm:text-base font-semibold">
                    Calm, Hygienic &amp; Digitally Guided Dental Suite
                  </p>
                  <p className="text-xs text-white/85 mt-0.5">
                    CBCT 3D implant planning · Custom surgical guides · Gentle patient-first care
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Proof Strip Below Hero Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-7">
            <div className="space-y-1 sm:pr-4 sm:border-r rbt-hairline">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl font-extrabold rbt-heading-text font-mono tabular-nums">
                  {config.ratingScore}
                </span>
                <div className="flex items-center text-amber-500" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#476658] tabular-nums">
                Based on {config.reviewCount} verified patient reviews in Lahore
              </p>
            </div>

            <div className="space-y-1 lg:pr-4 lg:border-r rbt-hairline">
              <p className="font-display text-xl font-bold rbt-heading-text">3D CBCT Guided</p>
              <p className="text-xs text-[#476658]">
                Precision surgical stents for All-on-4, All-on-6 &amp; immediate implants
              </p>
            </div>

            <div className="space-y-1 sm:pr-4 sm:border-r rbt-hairline">
              <p className="font-display text-xl font-bold rbt-heading-text font-mono tabular-nums">
                10 AM – 9 PM
              </p>
              <p className="text-xs text-[#476658]">
                Open all 7 days (Mon–Sun) for busy families &amp; professionals
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-display text-xl font-bold rbt-heading-text">DHA Phase 5</p>
              <p className="text-xs text-[#476658]">
                Building 14A, A Block Sector A · Easy parking &amp; central access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRIC BENTO CAPABILITIES OVERVIEW */}
      <section className="px-5 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold text-[#3b594c]">
                Comprehensive Dentistry Across Lahore
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-bold rbt-heading-text balance-text">
                Mastery Across Implant, Cosmetic, Orthodontic &amp; Restorative Care
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold rbt-accent-text hover:underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              Explore All 13+ Dental Treatments
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Marquee Span-2 Card */}
            <div className="lg:col-span-2 rbt-surface-bg rounded-2xl border rbt-hairline p-7 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <p className="font-mono text-xs font-semibold text-[#0c7c59]">
                  01. Dental Implants &amp; Full Mouth Rehabilitation
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold rbt-heading-text balance-text">
                  Guided Implant Surgery, Immediate Implants &amp; All-on-4 / All-on-6 Prosthetics
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#284237] max-w-[68ch]">
                  Missing a single tooth or seeking fixed teeth across an entire jaw? Using 3D CBCT
                  bone diagnostics, digital surgical guides, targeted bone grafting, and
                  implant-supported dentures, {config.leadDentist} restores natural biting power
                  with predictable comfort and long-term stability.
                </p>
              </div>
              <div className="pt-3 border-t rbt-hairline text-xs text-[#476658]">
                Guided Implant Surgery · Immediate Implants · All-on-4 &amp; All-on-6 · Bone
                Grafting · Implant-Supported Dentures
              </div>
            </div>

            {/* Span-1 Card */}
            <div className="rbt-tint-bg rounded-2xl border rbt-hairline p-7 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <p className="font-mono text-xs font-semibold text-[#0c7c59]">
                  02. Digital Cosmetic Dentistry
                </p>
                <h3 className="font-display text-xl font-bold rbt-heading-text">
                  Zirconia Crowns, Veneers &amp; Teeth Whitening
                </h3>
                <p className="text-sm leading-relaxed text-[#284237]">
                  Custom metal-free zirconia crowns and bridges, ultra-natural porcelain veneers,
                  and clinical teeth whitening designed to brighten your smile without looking
                  artificial.
                </p>
              </div>
              <div className="pt-3 border-t rbt-hairline text-xs text-[#3b594c]">
                Monolithic Zirconia · Aesthetic Veneers · Laser/Clinical Whitening
              </div>
            </div>

            {/* Span-1 Card */}
            <div className="rbt-tint-bg rounded-2xl border rbt-hairline p-7 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <p className="font-mono text-xs font-semibold text-[#0c7c59]">
                  03. Orthodontics &amp; Aligners
                </p>
                <h3 className="font-display text-xl font-bold rbt-heading-text">
                  Invisible Clear Aligners &amp; Bite Alignment
                </h3>
                <p className="text-sm leading-relaxed text-[#284237]">
                  Discreet, removable clear aligners and modern orthodontic care guided by 3D
                  digital movement plans—ideal for adults and teens across DHA Lahore.
                </p>
              </div>
              <div className="pt-3 border-t rbt-hairline text-xs text-[#3b594c]">
                Clear Aligners · Digital Arch Scans · Orthodontic Retainers
              </div>
            </div>

            {/* Span-2 Card */}
            <div className="lg:col-span-2 rbt-surface-bg rounded-2xl border rbt-hairline p-7 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <p className="font-mono text-xs font-semibold text-[#0c7c59]">
                  04. Painless Endodontics &amp; Preventive Dentistry
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold rbt-heading-text balance-text">
                  Calm Root Canal Treatment, Tooth-Colored Fillings &amp; Ultrasonic Scaling
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#284237] max-w-[68ch]">
                  Every patient—especially those feeling anxious—receives a calm, step-by-step
                  explanation before treatment begins. Our rotary root canal therapy, biomimetic
                  composite fillings, and ultrasonic scaling preserve natural teeth smoothly and
                  painlessly.
                </p>
              </div>
              <div className="pt-3 border-t rbt-hairline text-xs text-[#476658]">
                Single-Visit Root Canal · Composite Fillings · Ultrasonic Scaling &amp; Polishing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DENTIST-PERFORMED PROCEDURES WITH CLINICAL IMAGERY & VIBRANT EXPLANATION COLORS */}
      <section className="px-5 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold text-[#3b594c]">
              Clinical Precision &amp; Transparent Care
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold rbt-heading-text balance-text">
              How Dental Procedures Are Carried Out by {config.leadDentist}
            </h2>
            <p className="text-base text-[#284237] leading-relaxed">
              Patients across Lahore trust {config.clinicName} because we never rush or leave you
              guessing. Explore how each specialty procedure is planned and carried out inside our
              hygienic DHA Phase 5 clinic.
            </p>
          </div>

          <ProcedureShowcase
            procedures={config.procedures}
            whatsappDigits={config.whatsappDigits}
            onSelectForBooking={(title) => scrollToHomeBooking(title)}
          />
        </div>
      </section>

      {/* 4. VERIFIED 5.0 GOOGLE REVIEWS (CLAIM-TO-PROOF ADJACENCY) */}
      <section className="px-5 sm:px-8">
        <div className="max-w-7xl mx-auto rbt-tint-bg rounded-3xl border rbt-hairline p-7 sm:p-11 lg:p-14 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold text-[#2d5242] font-mono tabular-nums">
                5.0 Google Rating · {config.reviewCount} Patient Reviews
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-bold rbt-heading-text balance-text">
                Why Patients Recommend Dr. Rao Bazil Taimur Across Lahore
              </h2>
            </div>
            <p className="text-sm text-[#355446] max-w-sm">
              Real words from patients who visited RBT Dental &amp; Implant Center for crowns,
              root canals, aligners, scaling, whitening, and fillings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Featured Detailed Testimonial */}
            <article className="lg:col-span-6 rbt-surface-bg rounded-2xl border rbt-hairline p-7 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs text-[#476658]">
                  <span>{VERIFIED_PATIENT_REVIEWS[0].treatmentMentioned}</span>
                  <span>{VERIFIED_PATIENT_REVIEWS[0].timeAgo}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500" aria-label="5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm sm:text-base leading-relaxed text-[#1d352b]">
                  &ldquo;{VERIFIED_PATIENT_REVIEWS[0].quote}&rdquo;
                </blockquote>
              </div>
              <div className="pt-4 border-t rbt-hairline text-xs font-semibold rbt-heading-text">
                {VERIFIED_PATIENT_REVIEWS[0].authorLabel}
              </div>
            </article>

            {/* Remaining 4 Verified Reviews Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VERIFIED_PATIENT_REVIEWS.slice(1).map((rev) => (
                <article
                  key={rev.id}
                  className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-500" aria-label="5 stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-[#476658]">{rev.treatmentMentioned}</p>
                    <blockquote className="text-xs sm:text-sm leading-relaxed text-[#284237]">
                      &ldquo;{rev.quote}&rdquo;
                    </blockquote>
                  </div>
                  <p className="pt-3 border-t rbt-hairline text-xs font-semibold rbt-heading-text">
                    {rev.authorLabel} <span aria-hidden="true">·</span>{' '}
                    <span className="font-normal text-[#526e61]">{rev.timeAgo}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEO KNOWLEDGE BASE & PATIENT FAQ */}
      <section className="px-5 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <p className="text-xs font-semibold text-[#3b594c]">
              Patient Guide · Dental Implants &amp; Modern Care in Lahore
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold rbt-heading-text balance-text">
              Frequently Asked Questions About Dental Implants &amp; Treatments
            </h2>
          </div>

          <div className="space-y-3">
            {SEO_FAQS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.q}
                  className="rbt-surface-bg rounded-xl border rbt-hairline overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-display text-sm sm:text-base font-bold rbt-heading-text cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm leading-relaxed text-[#284237] border-t rbt-hairline pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE LEAD CAPTURE & CLINIC HOURS */}
      <section id="home-booking-section" className="px-5 sm:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#3b594c]">
                Direct Reception Desk · DHA Phase 5
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-bold rbt-heading-text balance-text">
                Book Your Visit With {config.leadDentist}
              </h2>
              <p className="text-sm sm:text-base text-[#284237] leading-relaxed">
                Whether you are seeking a second opinion on All-on-4 dental implants in Lahore,
                custom zirconia crowns, invisible aligners, or relief from tooth pain, our friendly
                team welcomes you 7 days a week.
              </p>
            </div>

            <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 space-y-4">
              <h3 className="font-display text-base font-bold rbt-heading-text">
                Clinic Address &amp; Daily Timings
              </h3>
              <p className="text-sm text-[#284237] leading-relaxed">{config.addressFull}</p>
              <p className="text-xs font-mono text-[#526e61]">
                Google Maps Plus Code: {config.plusCode}
              </p>

              <div className="pt-3 border-t rbt-hairline space-y-1.5">
                {config.schedule.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-center justify-between text-xs sm:text-sm py-0.5"
                  >
                    <span className="font-medium rbt-heading-text">{row.day}</span>
                    <span className="font-mono tabular-nums text-[#3b594c]">{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AppointmentForm
              preselectedService={selectedBookingService}
              whatsappDigits={config.whatsappDigits}
              leadDentist={config.leadDentist}
              onAppointmentCreated={onAppointmentCreated}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
