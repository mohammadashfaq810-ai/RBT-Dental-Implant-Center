import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteConfig } from '../types';
import { FULL_TREATMENT_CATALOG } from '../data/defaultConfig';
import { ProcedureShowcase } from '../components/ProcedureShowcase';

interface ServicesPageProps {
  config: SiteConfig;
  onBookService: (serviceName: string) => void;
}

type FilterKey = 'all' | 'implants' | 'cosmetic' | 'restorative' | 'orthodontics';

const FILTER_TABS: Array<{ id: FilterKey; label: string }> = [
  { id: 'all', label: 'All Treatments' },
  { id: 'implants', label: 'Dental Implants' },
  { id: 'cosmetic', label: 'Cosmetic Dentistry' },
  { id: 'restorative', label: 'Root Canal & General' },
  { id: 'orthodontics', label: 'Aligners & Ortho' },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ config, onBookService }) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filteredProcedures =
    activeFilter === 'all'
      ? config.procedures
      : config.procedures.filter((p) => p.category === activeFilter);

  const filteredCatalog =
    activeFilter === 'all'
      ? FULL_TREATMENT_CATALOG
      : FULL_TREATMENT_CATALOG.filter((item) => item.category === activeFilter);

  return (
    <div className="space-y-20 py-10 sm:py-14 px-5 sm:px-8">
      {/* Header & Interactive Segmented Filter */}
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold text-[#3b594c]">
            Clinical Services · {config.clinicName} · DHA Phase 5, Lahore
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight rbt-heading-text balance-text">
            Dental Implants, Digital Cosmetic Dentistry &amp; Painless Care
          </h1>
          <p className="text-base sm:text-lg text-[#284237] leading-relaxed">
            Explore our complete range of specialist dental procedures carried out by{' '}
            {config.leadDentist} using CBCT 3D planning, custom surgical guides, CAD/CAM zirconia
            restorations, and gentle chairside techniques.
          </p>
        </div>

        {/* Interactive Filter Segmented Control */}
        <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rbt-tint-bg rounded-xl border rbt-hairline">
          {FILTER_TABS.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'rbt-surface-bg rbt-heading-text shadow-xs'
                    : 'text-[#3b594c] hover:text-[#0d281d]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dentist-Led Step-by-Step Procedure Cards with Photos & Attractive Color Callouts */}
        <ProcedureShowcase
          procedures={filteredProcedures}
          whatsappDigits={config.whatsappDigits}
          onSelectForBooking={onBookService}
        />
      </section>

      {/* Complete Treatment Directory */}
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-semibold text-[#3b594c]">Full Treatment Directory</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold rbt-heading-text balance-text">
            Specialized Procedures Available at Our DHA Phase 5 Clinic
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCatalog.map((item, idx) => (
            <article
              key={item.id}
              className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#526e61] font-mono tabular-nums">
                  <span>{String(idx + 1).padStart(2, '0')}.</span>
                  <span>{item.visitEstimate}</span>
                </div>
                <h3 className="font-display text-lg font-bold rbt-heading-text">{item.name}</h3>
                <p className="text-sm leading-relaxed text-[#284237]">{item.shortDescription}</p>
              </div>

              <div className="pt-4 border-t rbt-hairline flex items-center justify-between gap-3">
                <span className="text-xs text-[#476658] truncate">{item.idealFor}</span>
                <button
                  type="button"
                  onClick={() => onBookService(item.name)}
                  className="inline-flex items-center gap-1 text-xs font-semibold rbt-accent-text hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Book Slot
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
