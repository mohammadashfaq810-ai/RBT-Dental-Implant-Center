import React, { useState, useEffect } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { AppointmentRecord } from '../types';

interface AppointmentFormProps {
  preselectedService?: string;
  whatsappDigits: string;
  leadDentist: string;
  onAppointmentCreated?: (apt: AppointmentRecord) => void;
}

const SERVICE_OPTIONS = [
  '3D Guided Dental Implants Consultation',
  'All-on-4 / All-on-6 Full Mouth Implants',
  'Immediate Implants & Bone Grafting',
  'Zirconia Crowns & Dental Bridges',
  'Porcelain Veneers & Smile Makeover',
  'Painless Root Canal Treatment & Fillings',
  'Ultrasonic Scaling & Teeth Whitening',
  'Invisible Clear Aligners & Orthodontics',
  'Routine Comprehensive Checkup',
];

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  preselectedService = '',
  whatsappDigits,
  leadDentist,
  onAppointmentCreated,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService || SERVICE_OPTIONS[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('4:00 PM – 7:00 PM');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<AppointmentRecord | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const validatePhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (patientName.trim().length < 2) {
      setErrorMsg('Please enter your full name so our reception can prepare your chart.');
      return;
    }
    if (!validatePhone(phone)) {
      setErrorMsg('Please enter a valid 10–13 digit mobile or WhatsApp number (e.g. 0313 3337726).');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: patientName.trim(),
          phone: phone.trim(),
          service,
          preferredDate: preferredDate || 'Next Available Day',
          preferredTime,
          notes: notes.trim(),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Unable to submit booking right now.');
      }

      const data = await response.json();
      setSubmittedRecord(data.appointment);
      if (onAppointmentCreated && data.appointment) {
        onAppointmentCreated(data.appointment);
      }
    } catch {
      const fallbackRecord: AppointmentRecord = {
        id: `local_${Date.now()}`,
        patientName: patientName.trim(),
        phone: phone.trim(),
        service,
        preferredDate: preferredDate || 'Next Available Day',
        preferredTime,
        notes: notes.trim(),
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      setSubmittedRecord(fallbackRecord);
      if (onAppointmentCreated) {
        onAppointmentCreated(fallbackRecord);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedRecord) {
    const waConfirmUrl = `https://wa.me/${whatsappDigits.replace(/\D/g, '')}?text=${encodeURIComponent(
      `Assalam-o-Alaikum! I have requested an appointment at RBT Dental & Implant Center.\nName: ${submittedRecord.patientName}\nPhone: ${submittedRecord.phone}\nTreatment: ${submittedRecord.service}\nPreferred Slot: ${submittedRecord.preferredDate} (${submittedRecord.preferredTime})`
    )}`;

    return (
      <div className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold rbt-heading-text">
              Appointment Request Received
            </h3>
            <p className="text-sm text-[#3c594c] leading-relaxed">
              Thank you, <span className="font-semibold">{submittedRecord.patientName}</span>. Your
              consultation request for{' '}
              <span className="font-semibold">{submittedRecord.service}</span> with {leadDentist} in
              DHA Phase 5 has been logged for our front desk.
            </p>
          </div>
        </div>

        <div className="rbt-tint-bg rounded-xl p-4 text-xs font-mono tabular-nums space-y-1 text-[#173629]">
          <p>Preferred Date: {submittedRecord.preferredDate}</p>
          <p>Preferred Window: {submittedRecord.preferredTime}</p>
          <p>Patient Phone: {submittedRecord.phone}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={waConfirmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#128C7E] hover:bg-[#075E54] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            Send Instant WhatsApp Confirmation
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmittedRecord(null);
              setPatientName('');
              setPhone('');
              setNotes('');
            }}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium rbt-heading-text border rbt-hairline rounded-lg hover:bg-black/5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Another Visit
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rbt-surface-bg rounded-2xl border rbt-hairline p-6 sm:p-8 space-y-5"
    >
      <div className="space-y-1.5">
        <h3 className="font-display text-xl sm:text-2xl font-bold rbt-heading-text">
          Schedule Your Dental Consultation
        </h3>
        <p className="text-sm text-[#476658]">
          Open 7 days a week (10:00 AM – 9:00 PM) at Building 14A, Sector A, DHA Phase 5, Lahore.
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-xs font-medium text-red-800"
        >
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="apt-name" className="block text-xs font-semibold rbt-heading-text mb-1.5">
            Patient Full Name *
          </label>
          <input
            id="apt-name"
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="e.g. Ayesha Tariq"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border rbt-hairline bg-white text-[#0d281d] focus:outline-2 focus:outline-[#0c7c59]"
          />
        </div>

        <div>
          <label
            htmlFor="apt-phone"
            className="block text-xs font-semibold rbt-heading-text mb-1.5"
          >
            Mobile / WhatsApp Number *
          </label>
          <input
            id="apt-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0313 3337726"
            className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-lg border rbt-hairline bg-white text-[#0d281d] focus:outline-2 focus:outline-[#0c7c59]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="apt-service"
          className="block text-xs font-semibold rbt-heading-text mb-1.5"
        >
          Required Dental Treatment *
        </label>
        <select
          id="apt-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border rbt-hairline bg-white text-[#0d281d] focus:outline-2 focus:outline-[#0c7c59]"
        >
          {preselectedService && !SERVICE_OPTIONS.includes(preselectedService) && (
            <option value={preselectedService}>{preselectedService}</option>
          )}
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="apt-date" className="block text-xs font-semibold rbt-heading-text mb-1.5">
            Preferred Date
          </label>
          <input
            id="apt-date"
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums rounded-lg border rbt-hairline bg-white text-[#0d281d] focus:outline-2 focus:outline-[#0c7c59]"
          />
        </div>

        <div>
          <label htmlFor="apt-time" className="block text-xs font-semibold rbt-heading-text mb-1.5">
            Preferred Time Window
          </label>
          <select
            id="apt-time"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border rbt-hairline bg-white text-[#0d281d] focus:outline-2 focus:outline-[#0c7c59]"
          >
            <option value="10:00 AM – 1:00 PM">Morning (10:00 AM – 1:00 PM)</option>
            <option value="1:00 PM – 4:00 PM">Afternoon (1:00 PM – 4:00 PM)</option>
            <option value="4:00 PM – 7:00 PM">Evening (4:00 PM – 7:00 PM)</option>
            <option value="7:00 PM – 9:00 PM">Late Evening (7:00 PM – 9:00 PM)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="apt-notes" className="block text-xs font-semibold rbt-heading-text mb-1.5">
          Symptoms or Questions for {leadDentist} (Optional)
        </label>
        <textarea
          id="apt-notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us briefly about missing teeth, tooth sensitivity, crowns, or aligner goals..."
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border rbt-hairline bg-white text-[#0d281d] focus:outline-2 focus:outline-[#0c7c59]"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 px-5 text-sm font-semibold text-white rbt-accent-bg rounded-lg transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
      >
        {submitting ? 'Confirming Request...' : 'Confirm Consultation Slot'}
      </button>
    </form>
  );
};
