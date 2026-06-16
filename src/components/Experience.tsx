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
    location: "Mumbai, MH, IN",
    description: "Founded a full-service digital growth agency serving real estate, D2C startups, and local businesses across Mumbai. Directing Google/Meta Ads architectures, brand identity generation, e-commerce landing pages, client reporting dashboards, and AI-powered content production workflows reducing turnaround by 60%."
  },
  {
    company: "Graphics Walah",
    role: "Lead Graphic & Brand Designer",
    period: "2021 – Present",
    location: "Remote",
    description: "Operating a dynamic visual brand identity studio. Designing custom streetwear apparel collections, bespoke vector logomarks, typographies, and premium social media edits/reels under the commitment: 'Think what you want, I will make it in reality'."
  },
  {
    company: "EPIC Insurance Brokers & Consultants",
    role: "Quality Analyst",
    period: "May 2025 – Dec 2025",
    location: "Mumbai, MH, IN",
    description: "Ensured sales performance quality and product knowledge standards across a BPO telecalling environment within the insurance sector. Monitored agent call quality, tracked KPIs, provided structured feedback to improve conversion, and produced performance reporting for senior management."
  },
  {
    company: "Steez Closet",
    role: "E-commerce Brand Strategist & Digital Marketing Specialist",
    period: "Sep 2024 – Mar 2025",
    location: "Remote",
    description: "Conceptualised and built the merchandise brand end-to-end including visual identity. Launched a complete conversion-optimized Shopify store and executed ROI-focused Facebook and Google Ads campaigns, scaling the brand profitably from zero ad spend."
  },
  {
    company: "AVA LifeSpace, Dream India Builders & Real Estate Firms",
    role: "Team Leader – Real Estate Telecalling",
    period: "Aug 2022 – Mar 2025",
    location: "On-site",
    description: "Led and coached a team of 25+ telecallers across multiple premium real estate projects. Driven 35% increase in sales conversion rates within 6 months, maintained detailed MIS performance dashboards, and optimized high-quality lead pipelines."
  },
  {
    company: "TNQ (BPO)",
    role: "Product Trainer – SBI Life Insurance",
    period: "2022 (6 Months)",
    location: "On-site",
    description: "Trained BPO sales agents on SBI Life Insurance products, policy compliance, and tactical sales scripts. Monitored trainee KPIs, conducted interactive coaching sessions, and worked closely with team leaders to improve conversion metrics."
  },
  {
    company: "Self-Employed",
    role: "Digital Marketing Manager",
    period: "2021 – Present",
    location: "Remote",
    description: "Delivering specialized SEO, Google Ads, and Meta Ads campaigns for global clients in e-commerce, gaming, and technology. Scaled a gaming YouTube channel to 40K+ subscribers using custom AI-powered content generation systems."
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
