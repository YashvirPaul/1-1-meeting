import { Check, Clock, ArrowRight, Video, MessageCircle } from 'lucide-react';
import { PlanTier, PRICING_PLANS } from '../types';

interface PricingPlansProps {
  selectedPlan: PlanTier;
  onSelectPlan: (plan: PlanTier) => void;
  onOpenBookingModal: (plan: PlanTier) => void;
}

export default function PricingPlans({ selectedPlan, onSelectPlan, onOpenBookingModal }: PricingPlansProps) {
  return (
    <section id="plans" className="py-20 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            Pricing
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Consultation Tiers
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Click Book to enter your details and connect directly on WhatsApp to confirm your meeting.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isSelected = selectedPlan.id === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => onSelectPlan(plan)}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors cursor-pointer border ${
                  isSelected
                    ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-900/80 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950'
                }`}
              >
                <div>
                  {/* Duration & Channel */}
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{plan.durationMinutes} Minutes</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" />
                      <span>WhatsApp Call</span>
                    </span>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-neutral-100 dark:border-neutral-800/80 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-neutral-900 dark:text-white font-mono tabular-nums">
                      ₹{plan.priceRupees}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      INR / call
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 text-xs text-neutral-600 dark:text-neutral-400">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Book Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPlan(plan);
                    onOpenBookingModal(plan);
                  }}
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Book {plan.durationMinutes}m via WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
