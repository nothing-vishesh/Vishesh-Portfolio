/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Check, Zap, Sparkles, Rocket, Calendar, Users, TrendingUp, Info } from "lucide-react";
import Magnetic from "./Magnetic";
import { useState } from "react";

const benefits = [
  {
    title: "Guaranteed Availability",
    description: "Your project is priority. No more waiting for freelancers to finish other 'high-priority' tasks.",
    icon: <Calendar className="h-6 w-6 text-neon-blue" />
  },
  {
    title: "Reduced Overhead",
    description: "Eliminate the cost and time of full-time hiring while maintaining a consistent expert partner.",
    icon: <Users className="h-6 w-6 text-neon-purple" />
  },
  {
    title: "Continuous Improvement",
    description: "Weekly audits and incremental updates ensure your product never goes stale or falls behind.",
    icon: <TrendingUp className="h-6 w-6 text-white" />
  }
];

const plans = [
  {
    name: "The Pulse",
    description: "Perfect for ensuring your digital asset stays healthy and secure.",
    price: "Custom",
    period: "per month",
    icon: <Zap className="h-5 w-5 text-neon-blue" />,
    features: [
      "Security updates & monitoring",
      "Bug fixes & maintenance",
      "Uptime guarantee",
      "Monthly performance report",
      "Email support (48h response)"
    ]
  },
  {
    name: "The Catalyst",
    description: "For growing brands that need regular content and feature updates.",
    price: "Custom",
    period: "per month",
    icon: <Sparkles className="h-5 w-5 text-neon-purple" />,
    popular: true,
    features: [
      "Everything in The Pulse",
      "UI/UX micro-improvements",
      "Landing page optimizations",
      "Analytics integration",
      "Priority Support (24h response)"
    ]
  },
  {
    name: "The Engine",
    description: "Your dedicated full-stack developer and performance partner.",
    price: "Custom",
    period: "per month",
    icon: <Rocket className="h-5 w-5 text-white" />,
    features: [
      "Unlimited requests (one at a time)",
      "New feature development",
      "Scaling architecture",
      "Performance marketing sync",
      "Instant Slack communication"
    ]
  }
];

export default function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col mb-16 items-center text-center">
        <p className="font-mono text-neon-blue text-xs uppercase tracking-[0.2em] mb-4">Partnership Models</p>
        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Subscription <span className="text-white/20 italic">Hiring</span>
        </h2>
        <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
          Scale your business with dedicated development and maintenance. 
          No recruitment overhead, just consistent performance and growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
        {benefits.map((benefit, i) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              {benefit.icon}
            </div>
            <h4 className="font-display text-xl font-bold mb-3">{benefit.title}</h4>
            <p className="text-sm text-white/40 leading-relaxed">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div 
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-8 rounded-3xl border transition-all duration-500 flex flex-col ${
              plan.popular 
                ? "bg-white/5 border-neon-purple/50 lg:scale-105 z-10" 
                : "bg-black/40 border-white/10 hover:border-white/30"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-purple text-black font-mono text-[10px] uppercase font-bold tracking-widest rounded-full">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                {plan.icon}
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-white/50 leading-relaxed min-h-[40px]">
                {plan.description}
              </p>
            </div>

            <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group/price cursor-help relative">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold font-display">{plan.price}</span>
                <span className="text-xs text-white/30 font-mono uppercase tracking-widest">{plan.period}</span>
              </div>
              <div 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="text-white/20 group-hover/price:text-neon-blue transition-colors"
                title="Personalized quotes provided upon inquiry"
              >
                <Info className="h-4 w-4" />
              </div>

              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-white text-black rounded-xl text-[10px] font-mono uppercase tracking-wider leading-relaxed text-center shadow-2xl z-20"
                  >
                    Personalized quotes are provided upon inquiry based on your specific requirements.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ul className="space-y-4 mb-12 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-white/60">
                  <Check className="h-4 w-4 text-neon-blue shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Magnetic>
              <a 
                href="#contact"
                className={`w-full py-4 rounded-xl font-display font-bold text-center transition-all flex items-center justify-center gap-2 ${
                  plan.popular 
                    ? "bg-white text-black hover:bg-neon-purple" 
                    : "bg-white/5 text-white hover:bg-white hover:text-black border border-white/10"
                }`}
              >
                Inquire Now
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="font-mono text-[10px] uppercase text-white/20 tracking-[0.3em]">
          Flexible Cancellation • Weekly Updates • Strategy-First Approach
        </p>
      </div>
    </section>
  );
}
