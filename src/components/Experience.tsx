/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import Magnetic from "./Magnetic";

const experiences = [
  {
    company: "BRANDStack Media",
    role: "Founder & Performance Marketing Lead",
    period: "Nov 2025 – Present",
    location: "Mumbai",
    description: "Founded a performance branding agency serving real estate, D2C startups, and local businesses. Executing end-to-end Google Ads, Meta Ads, and SEO strategies driving measurable client revenue. Managing AI-powered content workflows to scale production."
  },
  {
    company: "Steez Closet",
    role: "E-commerce Brand Strategist",
    period: "Sep 2024 – Mar 2025",
    location: "Remote",
    description: "Built the merchandise brand entirely from scratch — naming, logo, visual identity. Developed and launched a complete Shopify store with optimized UX, executing ROI-focused Facebook and Google Ads campaigns from zero to a live revenue-generating brand."
  },
  {
    company: "AVA LifeSpace & Dream India Builders",
    role: "Team Leader – Real Estate Telecalling",
    period: "Aug 2022 – Mar 2025",
    location: "On-site",
    description: "Led a team of 25+ telecallers across multiple real estate projects. Achieved a 35% increase in conversion rates within 6 months through targeted training and script optimization. Maintained detailed performance reports for management."
  },
  {
    company: "TNQ (BPO)",
    role: "Product Trainer – SBI Life Insurance",
    period: "6 Months",
    location: "On-site",
    description: "Trained BPO sales agents on SBI Life Insurance products, policies, and sales scripts within a structured telecalling environment. Conducted onboarding and product knowledge sessions, ensuring agents were proficient in insurance terminology."
  },
  {
    company: "Self-Employed",
    role: "Freelancer",
    period: "2021 – Present",
    location: "Remote",
    description: "Delivering SEO, Google Ads, and Meta Ads campaigns for international clients across e-commerce, gaming, and tech. Grew a 40K+ subscriber gaming YouTube channel through AI-powered content automation and strategy."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col mb-16">
        <p className="font-mono text-neon-blue text-xs uppercase tracking-[0.2em] mb-4">Trajectory</p>
        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
          Professional <span className="text-white/20 italic">Path</span>
        </h2>
      </div>

      <div className="space-y-12">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/5 pb-12 last:border-0"
          >
            <div className="md:col-span-3">
              <p className="font-mono text-xs text-white/40 uppercase tracking-widest">{exp.period}</p>
              <p className="text-sm text-neon-blue mt-1">{exp.location}</p>
            </div>
            
            <div className="md:col-span-5">
              <Magnetic strength={0.3}>
                <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-neon-blue transition-colors cursor-default">
                  {exp.role}
                </h3>
              </Magnetic>
              <p className="font-display text-lg text-white/60">
                {exp.company}
              </p>
            </div>

            <div className="md:col-span-4">
              <p className="text-white/50 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
