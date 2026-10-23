import { useState } from 'react';
import { CheckCircle2, MessageCircle, Copy, Check, ExternalLink, X } from 'lucide-react';
import { Booking, OFFICIAL_PHONE_INTL, OFFICIAL_PHONE, buildWhatsAppBookingMessage, buildWhatsAppUrl } from '../types';

interface BookingConfirmationModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export default function BookingConfirmationModal({ booking, onClose }: BookingConfirmationModalProps) {
  if (!booking) return null;

  const [copied, setCopied] = useState(false);

  const whatsappMessage = buildWhatsAppBookingMessage({
    clientName: booking.clientName,
    clientPhone: booking.clientPhone,
    category: booking.category,
    durationMinutes: booking.durationMinutes,
    priceRupees: booking.priceRupees,
    date: booking.date,
    timeSlot: booking.timeSlot
  });

  const whatsappRedirectUrl = buildWhatsAppUrl(whatsappMessage);

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    window.open(whatsappRedirectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 id="confirmation-modal-title" className="text-base font-bold text-neutral-900 dark:text-white">
                Booking Details Ready
              </h3>
              <p className="text-xs font-mono text-neutral-500">
                Direct to WhatsApp: +91 {OFFICIAL_PHONE}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Confirmation Modal"
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-3">
            <div className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
              <strong className="text-neutral-900 dark:text-white block font-medium mb-1">
                WhatsApp Redirect Initiated
              </strong>
              If WhatsApp did not open automatically, click the button below to send your details to fdryash to confirm your meeting.
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp Now</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="py-2.5 px-4 rounded-xl text-xs font-mono text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Details Table */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
              <span>Client Name</span>
              <span className="text-neutral-900 dark:text-white font-medium">{booking.clientName}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
              <span>WhatsApp Number</span>
              <span className="text-neutral-900 dark:text-white font-medium">+91 {booking.clientPhone}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
              <span>Category</span>
              <span className="text-neutral-900 dark:text-white font-medium">{booking.category}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
              <span>Duration</span>
              <span className="text-neutral-900 dark:text-white font-medium">{booking.durationMinutes} Minutes (₹{booking.priceRupees})</span>
            </div>
            {booking.date && (
              <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                <span>Slot</span>
                <span className="text-neutral-900 dark:text-white font-medium">{booking.date} · {booking.timeSlot}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
              <span>Channel</span>
              <span className="text-neutral-900 dark:text-white font-medium">WhatsApp Video Call Only</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-center"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}
