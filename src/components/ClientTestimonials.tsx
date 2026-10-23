interface Review {
  name: string;
  role: string;
  initials: string;
  duration: string;
  amount: string;
  quote: string;
  impact: string;
}

export default function ClientTestimonials() {
  const reviews: Review[] = [
    {
      name: 'Ananya Verma',
      role: 'Frontend Engineer & Freelancer',
      initials: 'AV',
      duration: '35m',
      amount: '₹299',
      quote:
        'The WhatsApp video format is so much better than traditional meeting software. Yash reviewed my project scope in real-time, pinpointed where I was undercharging, and provided clear architectural adjustments.',
      impact: 'Clarified project scope & rate structure'
    },
    {
      name: 'Rohan Mehra',
      role: 'Product Engineer',
      initials: 'RM',
      duration: '45m',
      amount: '₹499',
      quote:
        'Thorough 45-minute teardown of our product roadmap. We avoided two weeks of refactoring by adjusting our backend queue architecture during the call. Direct notes were sent to WhatsApp right after.',
      impact: 'Saved 2+ weeks of redundant refactoring'
    }
  ];

  return (
    <section id="reviews" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="max-w-xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            Feedback
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Client Observations
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Real feedback from past WhatsApp video consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono font-bold text-xs flex items-center justify-center">
                      {rev.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {rev.name}
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        {rev.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {rev.duration} (₹{rev.amount.replace('₹', '')})
                  </span>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800 text-[11px] font-mono text-neutral-500">
                Outcome: <span className="text-neutral-900 dark:text-neutral-200">{rev.impact}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
