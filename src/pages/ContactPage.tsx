import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { AppointmentRecord, SiteConfig } from '../types';
import { AppointmentForm } from '../components/AppointmentForm';

interface ContactPageProps {
  config: SiteConfig;
  preselectedService: string;
  onAppointmentCreated: (apt: AppointmentRecord) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  config,
  preselectedService,
  onAppointmentCreated,
}) => {
  const whatsappUrl = `https://wa.me/${config.whatsappDigits.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Assalam-o-Alaikum RBT Dental & Implant Center! I would like to book an appointment with ${config.leadDentist} in DHA Phase 5, Lahore.`
  )}`;

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'RBT Dental & Implant Center First Floor Building 14A A Block Sector A Phase 5 DHA Lahore'
  )}`;

  return (
    <div className="space-y-16 py-10 sm:py-14 px-5 sm:px-8">
      {/* Header */}
      <section className="max-w-7xl mx-auto space-y-3">
        <p className="text-xs font-semibold text-[#3b594c]">
          Contact &amp; Directions · DHA Phase 5, Lahore
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight rbt-heading-text balance-text">
          Visit RBT Dental &amp; Implant Center or Book Online
        </h1>
        <p className="text-base sm:text-lg text-[#284237] max-w-3xl leading-relaxed">
          Conveniently located in A Block Sector A, DHA Phase 5, Lahore, we welcome patients 7 days
          a week from 10:00 AM to 9:00 PM for dental implants, cosmetic smile makeovers, clear
          aligners, and emergency tooth pain relief.
        </p>
      </section>

      {/* Main Split: Clinic Details + Booking Form */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Contact Card */}
          <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-7 space-y-5">
            <h2 className="font-display text-xl font-bold rbt-heading-text">
              Direct Clinic Contact
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 rbt-accent-text shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold rbt-heading-text">DHA Phase 5 Clinic Address</p>
                  <p className="text-[#284237] mt-0.5 leading-relaxed">{config.addressFull}</p>
                  <p className="text-xs font-mono text-[#526e61] mt-1">
                    Plus Code: {config.plusCode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 rbt-accent-text shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold rbt-heading-text">Reception &amp; Appointments</p>
                  <a
                    href={`tel:${config.phoneDisplay.replace(/\s+/g, '')}`}
                    className="font-mono tabular-nums text-base font-bold rbt-accent-text hover:underline block mt-0.5"
                  >
                    {config.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#128C7E] hover:bg-[#075E54] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                Message on WhatsApp
              </a>
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rbt-heading-text border rbt-hairline rounded-lg hover:bg-black/5 transition-colors whitespace-nowrap shrink-0"
              >
                Open in Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 7-Day Opening Hours Card */}
          <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 rbt-accent-text shrink-0" />
              <h2 className="font-display text-xl font-bold rbt-heading-text">
                Weekly Clinic Hours
              </h2>
            </div>

            <div className="divide-y rbt-hairline">
              {config.schedule.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between py-2.5 text-sm"
                >
                  <span className="font-medium rbt-heading-text">{row.day}</span>
                  <span className="font-mono tabular-nums text-[#284237]">{row.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="lg:col-span-7 space-y-6">
          <AppointmentForm
            preselectedService={preselectedService}
            whatsappDigits={config.whatsappDigits}
            leadDentist={config.leadDentist}
            onAppointmentCreated={onAppointmentCreated}
          />

          {/* Embedded DHA Phase 5 Map */}
          <div className="rbt-surface-bg rounded-2xl border rbt-hairline overflow-hidden">
            <div className="px-6 py-4 border-b rbt-hairline flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-base font-bold rbt-heading-text">
                  Location Map · Sector A, DHA Phase 5, Lahore
                </h3>
                <p className="text-xs text-[#526e61]">
                  First Floor, Building 14A, A Block Sector A ({config.plusCode})
                </p>
              </div>
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold rbt-accent-text hover:underline whitespace-nowrap shrink-0"
              >
                Directions
              </a>
            </div>
            <iframe
              title="RBT Dental & Implant Center DHA Phase 5 Lahore Map"
              src="https://www.google.com/maps?q=First+Floor,+Building+14A,+A+Block+Sector+A,+Phase+5+D.H.A.,+Lahore&output=embed"
              className="w-full h-72 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
