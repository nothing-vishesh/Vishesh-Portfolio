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
    description: "Founded a performance branding agency serving real estate, D2C startups, and local businesses. Executed end-to-end Google Ads, Meta Ads, and SEO strategies."
  },
  {
    company: "Steez Closet",
    role: "E-commerce Brand Strategist",
    period: "Sep 2024 – Mar 2025",
    location: "Remote",
    description: "Built the merchandise brand from scratch including naming, logo, and visual identity. Launched a complete Shopify store with optimized UX."
  },
  {
    company: "AVA LifeSpace & Dream India Builders",
    role: "Team Leader – Real Estate Telecalling",
    period: "Aug 2022 – Mar 2025",
    location: "On-site",
    description: "Led a team of 25+ telecallers, driving lead generation and achieving a 35% increase in conversion rates within 6 months."
  },
  {
    company: "Self-Employed",
    role: "Freelance Digital Marketer",
    period: "2021 – Present",
    location: "Remote",
    description: "Delivered SEO, Google Ads, and Meta Ads campaigns for national and international clients across e-commerce and gaming."
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
