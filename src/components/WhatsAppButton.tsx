import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  whatsappDigits: string;
  leadDentist: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  whatsappDigits,
  leadDentist,
}) => {
  const message = encodeURIComponent(
    `Assalam-o-Alaikum RBT Dental & Implant Center! I would like to inquire about an appointment with ${leadDentist} in DHA Phase 5, Lahore.`
  );
  const href = `https://wa.me/${whatsappDigits.replace(/\D/g, '')}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with RBT Dental & Implant Center"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white shadow-lg transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap shrink-0"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="hidden sm:inline text-sm font-semibold">WhatsApp Clinic</span>
    </a>
  );
};
