import { useState, useMemo } from 'react';
import { 
  X, Lock, MessageCircle, Search, Download
} from 'lucide-react';
import { Booking } from '../types';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  totalVisits: number;
}

export default function AnalyticsDashboard({
  isOpen,
  onClose,
  bookings,
  totalVisits
}: AnalyticsDashboardProps) {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [mfaStep, setMfaStep] = useState<'PIN' | 'MFA_OTP'>('PIN');
  const [otpCode, setOtpCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (pinCode === '1234' || pinCode === '9413') {
      setMfaStep('MFA_OTP');
    } else {
      setAuthError('Invalid Security PIN. (Default is 1234)');
    }
  };

  const handleVerifyMFA = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (otpCode.length >= 4) {
      setIsAuthenticated(true);
    } else {
      setAuthError('Please enter 4-digit MFA verification code (e.g. 8888).');
    }
  };

  const metrics = useMemo(() => {
    const totalPotentialRev = bookings.reduce((sum, b) => sum + (b.priceRupees || 0), 0);
    const conversion = totalVisits > 0 ? ((bookings.length / totalVisits) * 100).toFixed(1) : '0';

    const count25 = bookings.filter((b) => b.durationMinutes === 25).length;
    const count35 = bookings.filter((b) => b.durationMinutes === 35).length;
    const count45 = bookings.filter((b) => b.durationMinutes === 45).length;

    return {
      totalBookings: bookings.length,
      potentialRevenue: totalPotentialRev,
      conversionRate: conversion,
      distribution: {
        '25m': count25,
        '35m': count35,
        '45m': count45
      }
    };
  }, [bookings, totalVisits]);

  const filteredBookings = useMemo(() => {
    if (!searchTerm.trim()) return bookings;
    const query = searchTerm.toLowerCase();
    return bookings.filter(
      (b) =>
        b.clientName.toLowerCase().includes(query) ||
        b.clientPhone.includes(query) ||
        (b.category && b.category.toLowerCase().includes(query)) ||
        (b.date && b.date.includes(query))
    );
  }, [bookings, searchTerm]);

  const handleExportCSV = () => {
    const headers = ['Booking ID', 'Client Name', 'WhatsApp Phone', 'Category', 'Duration', 'Price (INR)', 'Date', 'Time Slot'];
    const rows = bookings.map((b) => [
      b.id,
      `"${b.clientName}"`,
      `"+91 ${b.clientPhone}"`,
      `"${b.category}"`,
      `${b.durationMinutes}m`,
      b.priceRupees,
      b.date || 'N/A',
      b.timeSlot || 'N/A'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fdryash_whatsapp_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dashboard-title"
    >
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 px-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
          <div>
            <h3 id="dashboard-title" className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Host Management & WhatsApp Bookings
            </h3>
            <p className="text-xs font-mono text-neutral-500">fdryash portal</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Dashboard"
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {!isAuthenticated ? (
            <div className="max-w-sm mx-auto py-8 text-center space-y-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white mx-auto flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Host Authentication
                </h4>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  Multi-Factor Protection
                </p>
              </div>

              {mfaStep === 'PIN' ? (
                <form onSubmit={handleVerifyPin} className="space-y-3">
                  <input
                    type="password"
                    maxLength={6}
                    autoFocus
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="Enter PIN (1234)"
                    className="w-full text-center tracking-widest text-base font-mono px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  />

                  {authError && <p className="text-xs text-red-500">{authError}</p>}

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Continue to 2FA
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyMFA} className="space-y-3">
                  <p className="text-xs text-neutral-500 font-mono">
                    Enter simulated MFA OTP (8888)
                  </p>
                  <input
                    type="text"
                    maxLength={6}
                    autoFocus
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter OTP (8888)"
                    className="w-full text-center tracking-widest text-base font-mono px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  />

                  {authError && <p className="text-xs text-red-500">{authError}</p>}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMfaStep('PIN')}
                      className="py-2.5 px-3 rounded-xl text-xs font-mono border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      Verify
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
                  <span className="text-neutral-500 block">Total Bookings</span>
                  <span className="text-2xl font-bold text-neutral-900 dark:text-white block mt-1">{metrics.totalBookings}</span>
                  <span className="text-[10px] text-neutral-400">WhatsApp Requests</span>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
                  <span className="text-neutral-500 block">Estimated Value</span>
                  <span className="text-2xl font-bold text-neutral-900 dark:text-white block mt-1">₹{metrics.potentialRevenue}</span>
                  <span className="text-[10px] text-neutral-400">Booked Value</span>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
                  <span className="text-neutral-500 block">Unique Visits</span>
                  <span className="text-2xl font-bold text-neutral-900 dark:text-white block mt-1">{totalVisits}</span>
                  <span className="text-[10px] text-neutral-400">Live Traffic</span>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
                  <span className="text-neutral-500 block">Conversion</span>
                  <span className="text-2xl font-bold text-neutral-900 dark:text-white block mt-1">{metrics.conversionRate}%</span>
                  <span className="text-[10px] text-neutral-400">Visitor to Booking</span>
                </div>
              </div>

              {/* Tier Breakdown */}
              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-mono flex flex-wrap gap-4 text-neutral-600 dark:text-neutral-400">
                <span>25m (₹199): <strong className="text-neutral-900 dark:text-white">{metrics.distribution['25m']}</strong></span>
                <span>35m (₹299): <strong className="text-neutral-900 dark:text-white">{metrics.distribution['35m']}</strong></span>
                <span>45m (₹499): <strong className="text-neutral-900 dark:text-white">{metrics.distribution['45m']}</strong></span>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search bookings..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-mono"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Table */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
                    <tr>
                      <th className="py-2.5 px-3">Client</th>
                      <th className="py-2.5 px-3">WhatsApp</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Slot</th>
                      <th className="py-2.5 px-3 text-right">Connect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-neutral-400">
                          No bookings found.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                          <td className="py-2.5 px-3 font-semibold text-neutral-900 dark:text-white">
                            {b.clientName}
                          </td>
                          <td className="py-2.5 px-3">
                            +91 {b.clientPhone}
                          </td>
                          <td className="py-2.5 px-3 truncate max-w-[150px]">
                            {b.category}
                          </td>
                          <td className="py-2.5 px-3">
                            {b.durationMinutes}m (₹{b.priceRupees})
                          </td>
                          <td className="py-2.5 px-3">
                            {b.date ? `${b.date} · ${b.timeSlot}` : 'Flexible'}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <a
                              href={`https://wa.me/91${b.clientPhone}?text=${encodeURIComponent(
                                `Hi ${b.clientName}, this is fdryash confirming your ${b.durationMinutes}-minute WhatsApp video call on ${b.category}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 text-[11px] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-500" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
