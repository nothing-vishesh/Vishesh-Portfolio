/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Magnetic from "./Magnetic";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Exp", href: "#experience" },
  { name: "Portal", href: "#workspace" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Pricing", href: "#pricing" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-6 backdrop-blur-md bg-black/10"
        id="navbar"
      >
        <div className="flex items-center gap-3">
          <Magnetic strength={0.1}>
            <div className="h-10 w-10 rounded-full border-2 border-white flex items-center justify-center font-display font-bold text-sm tracking-tighter cursor-pointer">
              VJ
            </div>
          </Magnetic>
          <div className="flex flex-col -gap-1">
            <span className="font-display text-lg font-bold tracking-tighter uppercase leading-none">Vishesh</span>
            <span className="font-display text-lg font-bold tracking-tighter uppercase leading-none text-white/40">Jaiswal</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Magnetic key={item.name} strength={0.2}>
              <motion.a
                href={item.href}
                whileHover={{ y: -2 }}
                className="group relative font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors py-2 px-1"
              >
                {item.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-blue transition-all duration-300 group-hover:w-full"
                />
              </motion.a>
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Magnetic strength={0.1}>
            <a 
              href="#contact"
              className="hidden sm:block px-6 py-2 border border-white/20 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Hire Me
            </a>
          </Magnetic>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white/50 hover:text-white transition-colors relative z-50"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-4xl font-bold tracking-tighter uppercase hover:text-neon-blue transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-8 px-12 py-4 bg-white text-black font-display font-bold uppercase tracking-widest rounded-full"
              >
                Hire Me
              </motion.a>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20 font-mono text-[10px] uppercase tracking-widest">
              <span>© 2025 Vishesh Jaiswal</span>
              <div className="flex gap-6">
                <span>LI</span>
                <span>TW</span>
                <span>GH</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
