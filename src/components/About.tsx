/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, Globe, Zap, Target } from "lucide-react";
import Magnetic from "./Magnetic";

export default function About() {
  return (
    <section id="about" className="py-24 px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-4 relative">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             className="aspect-square w-full max-w-sm mx-auto rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10"
          >
            <div 
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop')` }}
            />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-neon-purple rounded-full blur-[80px] opacity-20" />
        </div>

        <div className="lg:col-span-8 flex flex-col justify-center h-full">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-neon-purple text-xs uppercase tracking-[0.2em] mb-6"
          >
            Behind the code
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-8"
          >
            Driving ROI through <span className="text-neon-blue">Strategy</span> and <span className="text-white/20">Scalability</span>.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-6 text-white/70 text-lg leading-relaxed font-sans max-w-xl"
          >
            <p>
              I am a results-driven performance marketer and brand builder with 4+ years of hands-on experience in digital marketing, paid media, and SEO.
            </p>
            <p>
              As the founder of BRANDStack Media, I specialize in building brand identities from scratch and executing full-funnel paid campaigns that deliver measurable growth for national and international clients.
            </p>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-12">
            {[
              { label: "Experience", value: "4+ Years" },
              { label: "Converstion Uplift", value: "35%+" },
              { label: "Team Size", value: "25+" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-mono text-[10px] uppercase text-white/40 tracking-widest mb-1">{stat.label}</p>
                <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/5 pt-12">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Core Strengths</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Performance Marketing (Meta/Google)</li>
                <li>Advanced SEO & Analytics</li>
                <li>AI & Automation Workflows</li>
                <li>E-commerce Strategy (Shopify)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Certifications</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Google Analytics (2025)</li>
                <li>AI Tools Workshop (2025)</li>
                <li>Digital Marketing Fundamentals</li>
              </ul>
            </div>
          </div>

          <Magnetic>
            <motion.button 
              whileHover={{ x: 10 }}
              className="mt-16 flex items-center gap-4 group"
            >
              <span className="font-mono text-xs uppercase tracking-widest border-b border-transparent group-hover:border-white transition-all duration-300 py-1">
                Connect with me
              </span>
              <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
