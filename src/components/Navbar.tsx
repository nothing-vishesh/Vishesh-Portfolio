/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
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
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-sm"
      id="navbar"
    >
      <div className="flex items-center gap-3">
        <Magnetic>
          <div className="h-10 w-10 rounded-full border-2 border-white flex items-center justify-center font-display font-bold text-sm tracking-tighter cursor-pointer">
            VJ
          </div>
        </Magnetic>
        <div className="flex flex-col -gap-1">
          <span className="font-display text-lg font-bold tracking-tighter uppercase leading-none">Vishesh</span>
          <span className="font-display text-lg font-bold tracking-tighter uppercase leading-none text-white/40">Jaiswal</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
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

      <Magnetic>
        <a 
          href="#contact"
          className="hidden md:block px-6 py-2 border border-white/20 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
        >
          Hire Me
        </a>
      </Magnetic>
    </motion.nav>
  );
}
