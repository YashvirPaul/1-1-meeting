import { MessageCircle, Instagram, ShieldCheck, ArrowRight, Video, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_PHONE_INTL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../types';

interface HeroSectionProps {
  onBookClick: () => void;
}

export default function HeroSection({ onBookClick }: HeroSectionProps) {
  const directWhatsAppUrl = `https://wa.me/${OFFICIAL_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent(
    "Hi fdryash! I would like to book a 1:1 video consultation call with you."
  )}`;

  return (
    <section className="py-16 sm:py-24 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Editorial Pitch */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Direct WhatsApp Video Call</span>
              <span>·</span>
              <span>1:1 Consultation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.08] text-balance">
              Direct 1:1 strategy & advisory with <span className="underline decoration-1 underline-offset-8">fdryash</span>.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              Book dedicated time for project architecture, code reviews, career roadmap discussions, or strategic problem solving. Enter your details and connect directly on WhatsApp to confirm your slot.
            </p>

            {/* Flat Rates Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                25m <strong className="font-semibold text-neutral-900 dark:text-white">₹199</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                35m <strong className="font-semibold text-neutral-900 dark:text-white">₹299</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                45m <strong className="font-semibold text-neutral-900 dark:text-white">₹499</strong>
              </span>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onBookClick}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Book a Meeting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp: {OFFICIAL_PHONE}</span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>{INSTAGRAM_HANDLE}</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                Instant WhatsApp Booking
              </span>
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-neutral-400" />
                Only WhatsApp Video Call (No Google Meet links)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                No App Download Required
              </span>
            </div>

          </div>

          {/* Minimalist Profile & Credential Card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 p-6 space-y-6">
              
              <div className="flex items-center gap-3.5 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold font-mono text-base tracking-tighter shrink-0">
                  fy
                </div>
                <div>
                  <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                    fdryash
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    Yash Vir Paul · Founder
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                <div className="flex justify-between items-center">
                  <span>Channel</span>
                  <span className="text-neutral-900 dark:text-white font-medium">WhatsApp Video</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>WhatsApp Contact</span>
                  <span className="text-neutral-900 dark:text-white font-medium">+91 {OFFICIAL_PHONE}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rates</span>
                  <span className="text-neutral-900 dark:text-white font-medium">₹199 / ₹299 / ₹499</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Confirmation</span>
                  <span className="text-neutral-900 dark:text-white font-medium">Direct WhatsApp Message</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Click Book, fill in your name, phone number, category, and preferred duration. It immediately opens WhatsApp with everything pre-filled to reserve your meeting.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
