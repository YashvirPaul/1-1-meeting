import { Instagram, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../types';

export default function InstagramBanner() {
  return (
    <section className="py-14 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Follow on Instagram
                </h3>
                <span className="text-xs font-mono text-neutral-500">
                  {INSTAGRAM_HANDLE}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Technical updates, strategic notes, and slot announcements.
              </p>
            </div>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors whitespace-nowrap"
          >
            <span>Follow {INSTAGRAM_HANDLE}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>

        </div>

      </div>
    </section>
  );
}
