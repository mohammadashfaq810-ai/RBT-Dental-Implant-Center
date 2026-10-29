import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DentistProcedure, ProcedureColorScheme } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProcedureShowcaseProps {
  procedures: DentistProcedure[];
  whatsappDigits: string;
  onSelectForBooking: (serviceTitle: string) => void;
}

const COLOR_STYLES: Record<
  ProcedureColorScheme,
  {
    narrativeBox: string;
    narrativeHeading: string;
    narrativeBody: string;
    stepCard: string;
    stepNum: string;
    stepTitle: string;
    actionBtn: string;
  }
> = {
  emerald: {
    narrativeBox: 'bg-emerald-50 border border-emerald-200/90',
    narrativeHeading: 'text-emerald-950',
    narrativeBody: 'text-emerald-900/90',
    stepCard: 'bg-white border border-emerald-200/80',
    stepNum: 'text-emerald-700',
    stepTitle: 'text-emerald-950',
    actionBtn: 'bg-emerald-700 hover:bg-emerald-800 text-white',
  },
  sky: {
    narrativeBox: 'bg-sky-50 border border-sky-200/90',
    narrativeHeading: 'text-sky-950',
    narrativeBody: 'text-sky-900/90',
    stepCard: 'bg-white border border-sky-200/80',
    stepNum: 'text-sky-700',
    stepTitle: 'text-sky-950',
    actionBtn: 'bg-sky-700 hover:bg-sky-800 text-white',
  },
  amber: {
    narrativeBox: 'bg-amber-50 border border-amber-200/90',
    narrativeHeading: 'text-amber-950',
    narrativeBody: 'text-amber-900/90',
    stepCard: 'bg-white border border-amber-200/80',
    stepNum: 'text-amber-700',
    stepTitle: 'text-amber-950',
    actionBtn: 'bg-amber-700 hover:bg-amber-800 text-white',
  },
  indigo: {
    narrativeBox: 'bg-indigo-50 border border-indigo-200/90',
    narrativeHeading: 'text-indigo-950',
    narrativeBody: 'text-indigo-900/90',
    stepCard: 'bg-white border border-indigo-200/80',
    stepNum: 'text-indigo-700',
    stepTitle: 'text-indigo-950',
    actionBtn: 'bg-indigo-700 hover:bg-indigo-800 text-white',
  },
  teal: {
    narrativeBox: 'bg-teal-50 border border-teal-200/90',
    narrativeHeading: 'text-teal-950',
    narrativeBody: 'text-teal-900/90',
    stepCard: 'bg-white border border-teal-200/80',
    stepNum: 'text-teal-700',
    stepTitle: 'text-teal-950',
    actionBtn: 'bg-teal-700 hover:bg-teal-800 text-white',
  },
  rose: {
    narrativeBox: 'bg-rose-50 border border-rose-200/90',
    narrativeHeading: 'text-rose-950',
    narrativeBody: 'text-rose-900/90',
    stepCard: 'bg-white border border-rose-200/80',
    stepNum: 'text-rose-700',
    stepTitle: 'text-rose-950',
    actionBtn: 'bg-rose-700 hover:bg-rose-800 text-white',
  },
};

export const ProcedureShowcase: React.FC<ProcedureShowcaseProps> = ({
  procedures,
  whatsappDigits,
  onSelectForBooking,
}) => {
  return (
    <div className="space-y-16">
      {procedures.map((proc, idx) => {
        const palette = COLOR_STYLES[proc.colorScheme] || COLOR_STYLES.emerald;
        const isReversed = idx % 2 === 1;
        const waHref = `https://wa.me/${whatsappDigits.replace(/\D/g, '')}?text=${encodeURIComponent(
          `Assalam-o-Alaikum! I would like details about "${proc.title}" at RBT Dental & Implant Center, DHA Phase 5.`
        )}`;

        return (
          <article
            key={proc.id}
            className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-9 lg:p-11"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Clinical Image Column */}
              <div
                className={`lg:col-span-5 flex flex-col justify-between ${
                  isReversed ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="overflow-hidden rounded-xl border rbt-hairline h-72 sm:h-80 lg:h-full min-h-[290px]">
                  <ResilientImage
                    src={proc.imageUrl}
                    alt={proc.imageAlt}
                    fallbackTitle={proc.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Clinical Procedure Explanation Column */}
              <div
                className={`lg:col-span-7 flex flex-col justify-between space-y-6 ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="space-y-3">
                  {/* Unboxed clean metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#476658]">
                    <span className="font-mono tabular-nums font-semibold rbt-heading-text">
                      {proc.indexLabel}. {proc.departmentLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{proc.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proc.comfortNote}</span>
                  </div>

                  {/* Dark Heading */}
                  <h3 className="font-display text-2xl sm:text-[1.7rem] font-bold leading-snug rbt-heading-text balance-text">
                    {proc.title}
                  </h3>

                  <p className="text-xs font-medium text-[#3b594c]">{proc.dentistCredit}</p>

                  {/* SEO-Optimized Summary Paragraph */}
                  <p className="text-base leading-relaxed text-[#284237] max-w-[70ch]">
                    {proc.seoSummary}
                  </p>
                </div>

                {/* Catchy & Attractive Color Narrative Box Explaining How the Dentist Carries Out the Procedure */}
                <div className={`rounded-xl p-5 sm:p-6 space-y-3 ${palette.narrativeBox}`}>
                  <h4
                    className={`font-display text-base font-bold tracking-tight ${palette.narrativeHeading}`}
                  >
                    Clinical Procedure Walkthrough by the Dentist
                  </h4>
                  <p className={`text-sm sm:text-[15px] leading-relaxed ${palette.narrativeBody}`}>
                    {proc.dentistExecutionNarrative}
                  </p>

                  {/* 3-Step Execution Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {proc.steps.map((step) => (
                      <div key={step.stepNumber} className={`rounded-lg p-3.5 ${palette.stepCard}`}>
                        <span
                          className={`font-mono text-xs font-bold tabular-nums block mb-1 ${palette.stepNum}`}
                        >
                          {step.stepNumber}
                        </span>
                        <p className={`font-display text-xs font-bold mb-1 ${palette.stepTitle}`}>
                          {step.title}
                        </p>
                        <p className="text-xs leading-relaxed text-slate-600">{step.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unboxed SEO Keyword Trail + Single-Line CTAs */}
                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t rbt-hairline">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#526e61]">
                    {proc.keywords.map((kw, kIdx) => (
                      <React.Fragment key={kw}>
                        {kIdx > 0 && <span aria-hidden="true">·</span>}
                        <span>{kw}</span>
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 text-xs font-semibold rounded-lg border rbt-hairline rbt-heading-text hover:bg-black/5 transition-colors whitespace-nowrap shrink-0"
                    >
                      Ask on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => onSelectForBooking(proc.title)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${palette.actionBtn}`}
                    >
                      Book Procedure
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
