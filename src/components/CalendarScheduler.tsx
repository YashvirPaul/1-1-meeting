import { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight, Video, AlertCircle, MessageCircle, Tag } from 'lucide-react';
import { 
  PlanTier, 
  Booking, 
  PRICING_PLANS, 
  CONSULTATION_CATEGORIES, 
  OFFICIAL_PHONE, 
  buildWhatsAppBookingMessage, 
  buildWhatsAppUrl 
} from '../types';

interface CalendarSchedulerProps {
  selectedPlan: PlanTier;
  onSelectPlan: (plan: PlanTier) => void;
  existingBookings: Booking[];
  onBookingConfirmed: (newBooking: Booking) => void;
}

export default function CalendarScheduler({
  selectedPlan,
  onSelectPlan,
  existingBookings,
  onBookingConfirmed
}: CalendarSchedulerProps) {
  // Generate next 14 available days
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        iso: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        monthName: d.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].iso);
  const [selectedSlot, setSelectedSlot] = useState<string>('11:30 AM');

  // Form states
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(CONSULTATION_CATEGORIES[0]);
  const [errorMessage, setErrorMessage] = useState('');

  const allTimeSlots = [
    { time: '10:00 AM', label: 'Morning' },
    { time: '11:30 AM', label: 'Morning' },
    { time: '02:00 PM', label: 'Afternoon' },
    { time: '03:30 PM', label: 'Afternoon' },
    { time: '05:00 PM', label: 'Evening' },
    { time: '06:30 PM', label: 'Evening' },
    { time: '08:00 PM', label: 'Night' },
    { time: '09:15 PM', label: 'Night' }
  ];

  const bookedSlotsOnDate = useMemo(() => {
    return existingBookings
      .filter((b) => b.date === selectedDate)
      .map((b) => b.timeSlot);
  }, [existingBookings, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
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

    if (!selectedDate || !selectedSlot) {
      setErrorMessage('Please choose a date and an available slot.');
      return;
    }

    const bookingData: Booking = {
      id: `BK_${Date.now().toString().slice(-6)}`,
      clientName: clientName.trim(),
      clientPhone: cleanPhone,
      category: selectedCategory,
      durationMinutes: selectedPlan.durationMinutes,
      priceRupees: selectedPlan.priceRupees,
      date: selectedDate,
      timeSlot: selectedSlot,
      createdAt: new Date().toISOString()
    };

    onBookingConfirmed(bookingData);

    // Build WhatsApp message and redirect to WhatsApp number directly
    const message = buildWhatsAppBookingMessage({
      clientName: clientName.trim(),
      clientPhone: cleanPhone,
      category: selectedCategory,
      durationMinutes: selectedPlan.durationMinutes,
      priceRupees: selectedPlan.priceRupees,
      date: selectedDate,
      timeSlot: selectedSlot
    });

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const formattedSelectedDate = useMemo(() => {
    const d = new Date(selectedDate);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }, [selectedDate]);

  return (
    <section id="scheduler" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            Direct WhatsApp Booking
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Schedule Your 1:1 Video Call
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Fill in your details below. Clicking book will directly transfer your details to fdryash on WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Selection (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Name and WhatsApp Phone Number */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                1. Your Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="clientName" className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="clientName"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                  />
                </div>

                <div>
                  <label htmlFor="clientPhone" className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-neutral-400 font-mono">+91</span>
                    <input
                      id="clientPhone"
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-11 pr-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-mono focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Category Selection & Duration Selection */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                <span>2. Select Category</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CONSULTATION_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Duration Options */}
              <div className="pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                  Duration & Pricing
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRICING_PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => onSelectPlan(plan)}
                      className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                        selectedPlan.id === plan.id
                          ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-white'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                      }`}
                    >
                      <span className="block text-xs font-mono">{plan.durationMinutes} Mins</span>
                      <span className="block text-sm font-mono mt-0.5 font-bold">₹{plan.priceRupees}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Date & Slot Selection */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>3. Choose Date & Time</span>
                </h3>
                <span className="text-xs font-mono text-neutral-500">
                  {formattedSelectedDate}
                </span>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {availableDates.map((item) => {
                  const isCurrent = item.iso === selectedDate;
                  return (
                    <button
                      key={item.iso}
                      type="button"
                      onClick={() => setSelectedDate(item.iso)}
                      className={`p-2 rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer border ${
                        isCurrent
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white'
                          : 'bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase opacity-75">{item.dayName}</span>
                      <span className="text-sm font-bold font-mono my-0.5">{item.dayNumber}</span>
                      <span className="text-[9px] opacity-75">{item.monthName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {allTimeSlots.map((slot) => {
                  const isBooked = bookedSlotsOnDate.includes(slot.time);
                  const isSelected = selectedSlot === slot.time;

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`py-2 px-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                        isBooked
                          ? 'opacity-30 border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 cursor-not-allowed'
                          : isSelected
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white font-bold'
                          : 'bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                      }`}
                    >
                      <span className="block text-xs font-mono font-semibold">{slot.time}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & WhatsApp Booking Button (Col 5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-6">
              
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Booking Overview
                </h3>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  Direct WhatsApp Transfer
                </p>
              </div>

              <div className="space-y-3 text-xs border-y border-neutral-100 dark:border-neutral-800 py-4 font-mono">
                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                  <span>Category</span>
                  <span className="text-neutral-900 dark:text-white font-medium truncate max-w-[200px] text-right">{selectedCategory}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                  <span>Duration</span>
                  <span className="text-neutral-900 dark:text-white font-medium">{selectedPlan.durationMinutes} Minutes</span>
                </div>
                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                  <span>Price</span>
                  <span className="text-base font-bold text-neutral-900 dark:text-white">₹{selectedPlan.priceRupees}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                  <span>Slot</span>
                  <span className="text-neutral-900 dark:text-white font-medium">{formattedSelectedDate} · {selectedSlot}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                  <span>Target WhatsApp</span>
                  <span className="text-neutral-900 dark:text-white font-medium">+91 {OFFICIAL_PHONE}</span>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Direct WhatsApp Book Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book Now & Send to WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-center text-[11px] text-neutral-500 font-mono leading-relaxed">
                Submitting takes your name, phone, selected category, and duration directly to fdryash on WhatsApp to confirm your meeting.
              </p>

            </div>
          </div>

        </form>

      </div>
    </section>
  );
}
