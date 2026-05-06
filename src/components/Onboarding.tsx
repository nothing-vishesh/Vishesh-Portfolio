/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Zap, Rocket, CheckCircle2, ChevronRight, X } from "lucide-react";

const steps = [
  {
    title: "Performance First",
    description: "I build conversion engines, not just websites. My focus is on ROI, ROAS, and scalable growth through data-driven performance marketing.",
    icon: <Zap className="h-8 w-8 text-neon-blue" />,
    color: "from-neon-blue/20 to-transparent"
  },
  {
    title: "AI-Powered Efficiency",
    description: "Leverage custom AI pipelines to automate your content and workflows. What takes teams hours now happens in minutes.",
    icon: <Sparkles className="h-8 w-8 text-neon-purple" />,
    color: "from-neon-purple/20 to-transparent"
  },
  {
    title: "Subscription Hiring",
    description: "Need a dedicated partner? My subscription models offer guaranteed availability and continuous improvement without the overhead of full-time hiring.",
    icon: <Rocket className="h-8 w-8 text-white" />,
    color: "from-white/10 to-transparent"
  }
];

export default function Onboarding() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      const timer = setTimeout(() => setIsVisible(true), 1500); // Small delay for effect
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-b ${steps[currentStep].color} opacity-30 transition-colors duration-700`} />

            <div className="relative p-8 md:p-12 flex flex-col items-center text-center">
              <button 
                onClick={handleComplete}
                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="h-20 w-20 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center mb-10 shadow-inner group">
                <motion.div
                  key={currentStep}
                  initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  {steps[currentStep].icon}
                </motion.div>
              </div>

              <motion.div
                key={`text-${currentStep}`}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 mb-12"
              >
                <h3 className="font-display text-3xl font-bold tracking-tight text-white">
                  {steps[currentStep].title}
                </h3>
                <p className="text-white/50 leading-relaxed max-w-sm mx-auto">
                  {steps[currentStep].description}
                </p>
              </motion.div>

              {/* Progress Dots */}
              <div className="flex gap-2 mb-10">
                {steps.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      i === currentStep ? "w-8 bg-neon-blue" : "w-1.5 bg-white/10"
                    }`} 
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-white text-black rounded-2xl font-display font-bold flex items-center justify-center gap-2 hover:bg-neon-blue transition-all active:scale-95"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Explore Portfolio <CheckCircle2 className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next Concept <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <button 
                onClick={handleComplete}
                className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors"
              >
                Skip intro
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
