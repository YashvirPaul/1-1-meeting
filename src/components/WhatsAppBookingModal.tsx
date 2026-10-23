import { useState, useEffect } from 'react';
import { X, MessageCircle, ArrowRight, Clock, Tag, User, Phone, CheckCircle2 } from 'lucide-react';
import { 
  PlanTier, 
  Booking, 
  PRICING_PLANS, 
  CONSULTATION_CATEGORIES, 
  OFFICIAL_PHONE, 
  buildWhatsAppBookingMessage, 
  buildWhatsAppUrl 
} from '../types';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: PlanTier;
  initialDate?: string;
  initialTimeSlot?: string;
  onBookingSubmitted: (booking: Booking) => void;
}

export default function WhatsAppBookingModal({
  isOpen,
  onClose,
  initialPlan,
  initialDate,
  initialTimeSlot,
  onBookingSubmitted
}: WhatsAppBookingModalProps) {
  if (!isOpen) return null;

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<25 | 35 | 45>(
    initialPlan?.durationMinutes ? (initialPlan.durationMinutes as 25 | 35 | 45) : 35
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(CONSULTATION_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize when initialPlan changes
  useEffect(() => {
    if (initialPlan?.durationMinutes) {
      setSelectedDuration(initialPlan.durationMinutes as 25 | 35 | 45);
    }
  }, [initialPlan]);

  const currentPlan = PRICING_PLANS.find((p) => p.durationMinutes === selectedDuration) || PRICING_PLANS[1];

  const handleConfirmAndRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!clientName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = clientPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    const finalCategory = selectedCategory === 'Other' && customCategory.trim() 
      ? customCategory.trim() 
      : selectedCategory;

    const message = buildWhatsAppBookingMessage({
      clientName: clientName.trim(),
      clientPhone: cleanPhone,
      category: finalCategory,
      durationMinutes: currentPlan.durationMinutes,
      priceRupees: currentPlan.priceRupees,
      date: initialDate,
      timeSlot: initialTimeSlot
    });

    const newBooking: Booking = {
      id: `BK_${Date.now().toString().slice(-6)}`,
      clientName: clientName.trim(),
      clientPhone: cleanPhone,
      category: finalCategory,
      durationMinutes: currentPlan.durationMinutes,
      priceRupees: currentPlan.priceRupees,
      date: initialDate,
      timeSlot: initialTimeSlot,
      createdAt: new Date().toISOString()
    };

    onBookingSubmitted(newBooking);

    // Directly redirect to WhatsApp number
    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h3 id="booking-modal-title" className="text-base font-bold text-neutral-900 dark:text-white">
              Book 1:1 WhatsApp Video Call
            </h3>
            <p className="text-xs text-neutral-500 font-mono">
              Redirects directly to WhatsApp: +91 {OFFICIAL_PHONE}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Booking Dialog"
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleConfirmAndRedirect} className="p-6 space-y-5">
          
          {/* 1. Name */}
          <div>
            <label htmlFor="modal-name" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Your Name *
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
              <input
                id="modal-name"
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
              />
            </div>
          </div>

          {/* 2. WhatsApp Phone Number */}
          <div>
            <label htmlFor="modal-phone" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              WhatsApp Phone Number *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs text-neutral-400 font-mono">+91</span>
              <input
                id="modal-phone"
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-11 pr-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-mono focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
              />
            </div>
            <p className="text-[11px] text-neutral-500 font-mono mt-1">
              The 1:1 video call will be initiated to this number.
            </p>
          </div>

          {/* 3. Category Selection */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-neutral-400" />
              <span>Select Category *</span>
            </label>
            
            <div className="space-y-1.5">
              {CONSULTATION_CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="accent-neutral-900 dark:accent-white"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Duration Selection: 25 mins, 35 mins, or 45 mins */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Choose Duration *</span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[
                { mins: 25, price: 199 },
                { mins: 35, price: 299 },
                { mins: 45, price: 499 }
              ].map((tier) => (
                <button
                  key={tier.mins}
                  type="button"
                  onClick={() => setSelectedDuration(tier.mins as 25 | 35 | 45)}
                  className={`p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                    selectedDuration === tier.mins
                      ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                  }`}
                >
                  <span className="block text-xs font-mono font-semibold">{tier.mins} Mins</span>
                  <span className="block text-sm font-mono mt-0.5">₹{tier.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Slot indicator if chosen via calendar */}
          {initialDate && initialTimeSlot && (
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
              <span>Selected Slot:</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                {initialDate} at {initialTimeSlot}
              </span>
            </div>
          )}

          {/* Error */}
          {errorMessage && (
            <p className="text-xs text-red-500 font-mono">{errorMessage}</p>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Details to WhatsApp & Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <p className="text-center text-[11px] text-neutral-400 font-mono">
            Direct message will open to +91 {OFFICIAL_PHONE} with your filled details.
          </p>

        </form>

      </div>
    </div>
  );
}
