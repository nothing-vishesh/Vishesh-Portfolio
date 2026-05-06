/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote } from "lucide-react";
import Magnetic from "./Magnetic";

const SkeletonCard = () => (
  <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl animate-pulse">
    <div className="h-6 bg-white/10 rounded w-full mb-4" />
    <div className="h-6 bg-white/10 rounded w-5/6 mb-4" />
    <div className="h-6 bg-white/10 rounded w-4/6 mb-12" />
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-white/10" />
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-24" />
        <div className="h-2 bg-white/10 rounded w-16" />
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    quote: "Vishesh transformed our Meta strategy. We saw a 40% reduction in CAC within the first two months. His technical approach to creative testing is unparalleled.",
    name: "Arjun Mehta",
    role: "Founder, D2C Apparel Co.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "The AI content pipeline Vishesh built for us is a game-changer. What used to take our team 15 hours now happens in less than 4. Highly recommend for any scaling brand.",
    name: "Sarah Jenkins",
    role: "Content Lead, Gaming Studio",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "As a real estate leader, I've worked with many marketers, but Vishesh's data-first mindset stands out. He doesn't just bring leads; he brings qualified conversations.",
    name: "Sanjay Gupta",
    role: "Director, Dream India Builders",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Our organic traffic doubled in six months thanks to the SEO framework Vishesh implemented. He bridges the gap between technical complexity and ROI perfectly.",
    name: "Elena Rossi",
    role: "Marketing Manager, E-commerce Group",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "The custom SaaS dashboard Vishesh developed has streamlined our entire client onboarding. It's rare to find someone who understands both code and growth marketing so deeply.",
    name: "David Chen",
    role: "COO, Fintech Solutions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "We struggled with Google Ads for years until we brought Vishesh on board. Our ROAS went from 1.8x to 4.5x in just a single quarter. Absolute professional.",
    name: "Priya Sharma",
    role: "Marketing Head, Lifestyle Brand",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Vishesh doesn't just build websites; he builds conversion engines. Our landing page conversion rate jumped from 3% to nearly 9% after his redesign.",
    name: "Marcus Thorne",
    role: "E-com Entrepreneur",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "His ability to automate lead follow-ups via AI has saved us countless hours and significantly improved our booking rate. He's a true technical polymath.",
    name: "Ananya Iyer",
    role: "Global Sales Lead, Tech Corp",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate real-world data fetching delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col mb-16 text-center md:text-left">
        <p className="font-mono text-neon-purple text-xs uppercase tracking-[0.2em] mb-4">Validation</p>
        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
          Client <span className="text-white/20 italic">Voices</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="contents"
            >
              {[1, 2, 3, 4].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="contents"
            >
              {testimonials.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group relative bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl overflow-hidden hover:border-neon-purple/50 transition-colors"
                >
                  <div className="absolute top-0 right-0 p-8 text-white/5">
                    <Quote className="h-16 w-16 rotate-180" />
                  </div>

                  <div className="relative z-10">
                    <p className="text-xl md:text-2xl font-display font-medium leading-relaxed mb-12 text-white/80 group-hover:text-white transition-colors">
                      "{t.quote}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img src={t.image} alt={t.name} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white">{t.name}</h4>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-16 flex justify-center">
        <Magnetic>
          <a 
            href="#contact"
            className="px-12 py-4 rounded-full border border-white/10 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Work with me
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
