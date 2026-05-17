/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 50;
      const y = (clientY / window.innerHeight - 0.5) * 50;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue rounded-full blur-[160px] opacity-10 -z-10 pointer-events-none" />
      
      <motion.div
        style={{ y: y1, x: mouseX, rotateY: useTransform(mouseX, [-25, 25], [-5, 5]), rotateX: useTransform(mouseY, [-25, 25], [5, -5]) }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col"
      >
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-white/40 mb-8"
        >
          Performance Marketer | Brand Builder | SEO & Paid Media
        </motion.p>
        
        <h1 className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.85] font-bold tracking-tighter uppercase mb-8">
          <motion.span 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Performance
          </motion.span>
          <motion.span 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-white/10 italic"
          >
            Strategist
          </motion.span>
        </h1>

        <motion.div 
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col md:flex-row md:items-center gap-8 md:gap-24"
        >
          <p className="max-w-sm text-white/50 font-sans text-sm leading-relaxed">
            4+ years of driving growth through data-driven performance marketing, high-impact SEO, and AI-powered content automation.
          </p>
          
          <div className="flex flex-wrap gap-8 md:gap-12 border-l border-white/10 pl-8">
            <div>
              <p className="font-mono text-[10px] uppercase text-white/40 tracking-widest mb-1">Founder</p>
              <p className="text-xs font-display">BRANDStack Media</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase text-white/40 tracking-widest mb-1">Location</p>
              <p className="text-xs font-display">Vasai-Virar, MH, IN</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase text-white/40 tracking-widest mb-1">CV</p>
              <a href="#" className="text-xs border-b border-white/20 hover:border-white transition-colors">Download Resume</a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20"
      >
        <ChevronDown />
      </motion.div>
      
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 font-mono text-[10px] text-white/20 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
        <span>Scroll to explore</span>
        <div className="h-24 w-[1px] bg-white/10 mx-auto" />
        <span>V.2025</span>
      </div>
    </section>
  );
}
