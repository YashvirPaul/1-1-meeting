import { MessageSquare, CalendarCheck, Tag, Video } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Select Duration & Category',
      desc: 'Choose between 25 mins (₹199), 35 mins (₹299), or 45 mins (₹499) and select what you want to discuss.'
    },
    {
      num: '02',
      title: 'Provide Name & Phone',
      desc: 'Enter your name and WhatsApp mobile number where the video call will take place.'
    },
    {
      num: '03',
      title: 'Direct WhatsApp Dispatch',
      desc: 'Your details are automatically sent directly to fdryash on WhatsApp with zero payment gateway hassle.'
    },
    {
      num: '04',
      title: '1:1 WhatsApp Video Call',
      desc: 'Connect live with fdryash directly on WhatsApp at the scheduled time.'
    }
  ];

  return (
    <section id="process" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="max-w-xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            Process
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            A frictionless booking process designed entirely around direct WhatsApp communication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 space-y-4"
            >
              <div className="text-xs font-mono font-bold text-neutral-400">
                {item.num}
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
