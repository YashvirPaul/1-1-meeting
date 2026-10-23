export interface PlanTier {
  id: '25m' | '35m' | '45m';
  name: string;
  durationMinutes: number;
  priceRupees: number;
  tagline: string;
  description: string;
  features: string[];
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  category: string;
  durationMinutes: number;
  priceRupees: number;
  date?: string;
  timeSlot?: string;
  createdAt: string;
}

export const OFFICIAL_PHONE = "9394389413";
export const OFFICIAL_PHONE_INTL = "+919394389413";
export const INSTAGRAM_URL = "https://www.instagram.com/fdryash?rpxt=ZXg1d2FsdG1rZjRn&utm_source=qr";
export const INSTAGRAM_HANDLE = "@fdryash";

export const CONSULTATION_CATEGORIES = [
  'Technical Architecture & Code Review',
  'Career Roadmap & Freelancing',
  'Product Strategy & MVP Teardown',
  'Business Direction & Growth',
  'General 1:1 Advisory'
];

export const PRICING_PLANS: PlanTier[] = [
  {
    id: '25m',
    name: 'Quick Consultation',
    durationMinutes: 25,
    priceRupees: 199,
    tagline: 'Focused Strategic Review',
    description: 'Targeted single-problem review, immediate technical troubleshooting, or rapid direction alignment.',
    features: [
      '25 minutes 1:1 live WhatsApp video call',
      'Targeted review and actionable next steps',
      'Direct WhatsApp booking confirmation'
    ]
  },
  {
    id: '35m',
    name: 'Advisory Session',
    durationMinutes: 35,
    priceRupees: 299,
    tagline: 'In-Depth Problem Solving',
    description: 'Comprehensive walkthrough for career transitions, product architecture, or business strategies.',
    features: [
      '35 minutes 1:1 live WhatsApp video call',
      'Detailed teardown and personalized roadmap',
      'Direct WhatsApp booking confirmation'
    ]
  },
  {
    id: '45m',
    name: 'Executive Consultation',
    durationMinutes: 45,
    priceRupees: 499,
    tagline: 'Comprehensive Master Session',
    description: 'Full-scope strategic consultation, complete architectural review, and thorough execution plan.',
    features: [
      '45 minutes full 1:1 live WhatsApp video call',
      'End-to-end strategy and project audit',
      'Direct WhatsApp booking confirmation'
    ]
  }
];

export function buildWhatsAppBookingMessage(data: {
  clientName: string;
  clientPhone: string;
  category: string;
  durationMinutes: number;
  priceRupees: number;
  date?: string;
  timeSlot?: string;
}): string {
  const parts = [
    `*New 1:1 WhatsApp Video Call Booking with fdryash*`,
    `---------------------------------------`,
    `👤 *Name:* ${data.clientName}`,
    `📱 *WhatsApp Number:* +91 ${data.clientPhone}`,
    `📂 *Category Selected:* ${data.category}`,
    `⏱️ *Duration Selected:* ${data.durationMinutes} Minutes (₹${data.priceRupees})`
  ];

  if (data.date && data.timeSlot) {
    parts.push(`📅 *Preferred Slot:* ${data.date} at ${data.timeSlot}`);
  }

  parts.push(
    `---------------------------------------`,
    `Hi fdryash, I want to book this video call with you. Please confirm my meeting!`
  );

  return parts.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${OFFICIAL_PHONE_INTL.replace('+', '')}?text=${encoded}`;
}
