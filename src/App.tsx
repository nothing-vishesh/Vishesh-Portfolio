/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import About from "./components/About";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Onboarding from "./components/Onboarding";
import WorkspaceDashboard from "./components/WorkspaceDashboard";
import ThreeCanvas from "./components/ThreeCanvas";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-neon-blue selection:text-black">
      <div className="noise" />
      <Onboarding />
      <ThreeCanvas />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-neon-blue origin-left z-[60]" 
        style={{ scaleX }} 
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <WorkspaceDashboard />
        <Experience />
        <Testimonials />
        <Pricing />
        <ProjectGrid />
      </main>

      <Contact />

      {/* Decorative noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
