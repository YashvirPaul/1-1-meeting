import { useState } from 'react';
import { Mail, CheckCircle2, MessageCircle, Instagram } from 'lucide-react';
import { OFFICIAL_PHONE, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../types';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    try {
      const existing = JSON.parse(localStorage.getItem('fdryash_subscribers') || '[]');
      existing.push({ email, subscribedAt: new Date().toISOString() });
      localStorage.setItem('fdryash_subscribers', JSON.stringify(existing));
    } catch {
      // fallback
    }
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 pt-16 pb-12 border-t border-neutral-200 dark:border-neutral-800 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Newsletter Section */}
        <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7 space-y-1">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Newsletter & Availability Updates
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Receive occasional technical memos, strategy frameworks, and slot release notices.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Subscribed successfully.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>
                  {error && <p className="text-[11px] text-red-500">{error}</p>}
                </form>
              )}
            </div>

          </div>
        </div>

        {/* 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-2">
            <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
              fdryash
            </span>
            <p className="text-neutral-500 max-w-sm leading-relaxed">
              1:1 video consultation sessions conducted exclusively via WhatsApp. Built for direct clarity, code and strategy audits.
            </p>
            <div className="pt-1 flex flex-col gap-1 font-mono text-[11px] text-neutral-500">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>WhatsApp: +91 {OFFICIAL_PHONE}</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <a 
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 dark:hover:text-white underline underline-offset-2"
                >
                  Instagram: {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 font-mono">
            <h4 className="font-semibold uppercase tracking-wider text-[11px] text-neutral-900 dark:text-white">
              Rates
            </h4>
            <ul className="space-y-1 text-neutral-500">
              <li>25 Mins — ₹199</li>
              <li>35 Mins — ₹299</li>
              <li>45 Mins — ₹499</li>
            </ul>
          </div>

          <div className="space-y-1.5 font-mono">
            <h4 className="font-semibold uppercase tracking-wider text-[11px] text-neutral-900 dark:text-white">
              Verification
            </h4>
            <ul className="space-y-1 text-neutral-500">
              <li>Direct WhatsApp Link</li>
              <li>1:1 Video Consultation</li>
              <li>Instant Confirmation</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400 font-mono">
          <div>
            © {new Date().getFullYear()} fdryash. All calls delivered via WhatsApp Video.
          </div>
          <div>
            <span>Direct WhatsApp Video Calls</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
