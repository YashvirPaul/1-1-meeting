import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { PlanTier, Booking, PRICING_PLANS, OFFICIAL_PHONE_INTL, OFFICIAL_PHONE } from './types';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import PricingPlans from './components/PricingPlans';
import CalendarScheduler from './components/CalendarScheduler';
import HowItWorks from './components/HowItWorks';
import InstagramBanner from './components/InstagramBanner';
import SocialShareBar from './components/SocialShareBar';
import ClientTestimonials from './components/ClientTestimonials';
import WhatsAppBookingModal from './components/WhatsAppBookingModal';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Footer from './components/Footer';
import OfflineNotice from './components/OfflineNotice';

const INITIAL_SEED_BOOKINGS: Booking[] = [
  {
    id: 'BK_90124',
    clientName: 'Rahul Verma',
    clientPhone: '9811234567',
    category: 'Career Roadmap & Freelancing',
    durationMinutes: 35,
    priceRupees: 299,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '02:00 PM',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'BK_90125',
    clientName: 'Pooja Iyer',
    clientPhone: '9744112233',
    category: 'Technical Architecture & Code Review',
    durationMinutes: 45,
    priceRupees: 499,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '05:00 PM',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fdryash_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fdryash_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fdryash_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const [selectedPlan, setSelectedPlan] = useState<PlanTier>(PRICING_PLANS[1]);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fdryash_bookings_v3');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_SEED_BOOKINGS;
  });

  const [totalVisits] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const count = Number(localStorage.getItem('fdryash_visits') || '154');
      const updated = count + 1;
      localStorage.setItem('fdryash_visits', String(updated));
      return updated;
    }
    return 155;
  });

  useEffect(() => {
    localStorage.setItem('fdryash_bookings_v3', JSON.stringify(bookings));
  }, [bookings]);

  // Modals state
  const [whatsappBookingModalOpen, setWhatsappBookingModalOpen] = useState(false);
  const [modalTargetPlan, setModalTargetPlan] = useState<PlanTier>(PRICING_PLANS[1]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBookingModal = (plan?: PlanTier) => {
    if (plan) {
      setModalTargetPlan(plan);
      setSelectedPlan(plan);
    } else {
      setModalTargetPlan(selectedPlan);
    }
    setWhatsappBookingModalOpen(true);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
    setConfirmationModalOpen(true);
  };

  const floatingWhatsAppUrl = `https://wa.me/${OFFICIAL_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent(
    "Hi fdryash! I would like to book a 1:1 video consultation call with you."
  )}`;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 transition-colors duration-150">
      
      <OfflineNotice />

      <Navigation
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenAdmin={() => setAnalyticsOpen(true)}
        onNavigateToSection={scrollToSection}
      />

      <main className="flex-1" id="top">
        
        <HeroSection
          onBookClick={() => handleOpenBookingModal()}
        />

        <SocialShareBar />

        <PricingPlans
          selectedPlan={selectedPlan}
          onSelectPlan={(plan) => setSelectedPlan(plan)}
          onOpenBookingModal={(plan) => handleOpenBookingModal(plan)}
        />

        <CalendarScheduler
          selectedPlan={selectedPlan}
          onSelectPlan={(plan) => setSelectedPlan(plan)}
          existingBookings={bookings}
          onBookingConfirmed={handleBookingConfirmed}
        />

        <HowItWorks />

        <InstagramBanner />

        <ClientTestimonials />

      </main>

      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-6 right-6 z-30">
        <a
          href={floatingWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Contact: 9394389413"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium text-xs shadow-md hover:shadow-lg transition-transform active:scale-95"
        >
          <MessageCircle className="w-4 h-4 text-emerald-500" />
          <span className="hidden sm:inline">WhatsApp ({OFFICIAL_PHONE})</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </aside>

      {/* Direct WhatsApp Booking Modal */}
      <WhatsAppBookingModal
        isOpen={whatsappBookingModalOpen}
        onClose={() => setWhatsappBookingModalOpen(false)}
        initialPlan={modalTargetPlan}
        onBookingSubmitted={handleBookingConfirmed}
      />

      {/* Confirmation Modal */}
      <BookingConfirmationModal
        booking={confirmedBooking}
        onClose={() => setConfirmationModalOpen(false)}
      />

      {/* Host Analytics Dashboard */}
      <AnalyticsDashboard
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
        bookings={bookings}
        totalVisits={totalVisits}
      />

    </div>
  );
}
