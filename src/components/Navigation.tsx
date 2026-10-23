import { MessageCircle, Sun, Moon, Lock } from 'lucide-react';
import { OFFICIAL_PHONE_INTL } from '../types';

interface NavigationProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAdmin: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Navigation({
  isDarkMode,
  onToggleDarkMode,
  onOpenAdmin,
  onNavigateToSection
}: NavigationProps) {
  const directWhatsAppUrl = `https://wa.me/${OFFICIAL_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent(
    "Hi fdryash, I'm visiting your website and would like to inquire about a 1:1 consultation."
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#top" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          fdryash
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
          <button
            onClick={() => onNavigateToSection('plans')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Sessions
          </button>
          <button
            onClick={() => onNavigateToSection('scheduler')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Calendar
          </button>
          <button
            onClick={() => onNavigateToSection('process')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => onNavigateToSection('reviews')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Feedback
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenAdmin}
            aria-label="Host Portal"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Lock className="w-3 h-3 text-neutral-400" />
            <span>Host</span>
          </button>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>
    </header>
  );
}
