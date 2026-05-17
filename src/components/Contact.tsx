/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Mail, ArrowUpRight, Phone, Send } from "lucide-react";
import { useState } from "react";
import LegalOverlay from "./LegalOverlay";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [legalOpen, setLegalOpen] = useState<{type: 'privacy' | 'terms' | null}>({ type: null });

  return (
    <footer id="contact" className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-12 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="max-w-xl">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-mono text-neon-blue text-xs uppercase tracking-[0.2em] mb-6"
            >
              Contact
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight"
            >
              Let's build <br />
              <span className="text-neon-blue italic">the future</span>.
            </motion.h2>
            <p className="text-white/50 text-lg mb-12 max-w-sm leading-relaxed">
              Have a vision that needs to be scaled? Reach out and let's turn data into growth.
            </p>

            <div className="space-y-6">
              <a 
                href="mailto:connect.visheshjaiswal@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-blue group-hover:text-black transition-all">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-white/30 tracking-widest">Email</p>
                  <p className="text-lg font-display">connect.visheshjaiswal@gmail.com</p>
                </div>
              </a>

              <a 
                href="tel:+917219002349"
                className="flex items-center gap-4 group"
              >
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-purple group-hover:text-black transition-all">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-white/30 tracking-widest">Phone</p>
                  <p className="text-lg font-display">+91 7219002349</p>
                </div>
              </a>

              <div className="pt-8 border-t border-white/5">
                <p className="font-mono text-[10px] uppercase text-neon-blue tracking-widest mb-4">Prefer a direct call?</p>
                <Magnetic>
                  <a 
                    href="https://calendar.app.google/eSwTgY9cTt9bYrLp7" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-display font-bold hover:bg-white hover:text-black transition-all group"
                  >
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Book a Strategy Session
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-8 rounded-3xl border border-white/10"
          >
            <form action="https://formspree.io/f/connect.visheshjaiswal@gmail.com" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase text-white/40 tracking-widest ml-4">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-blue transition-colors font-sans text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase text-white/40 tracking-widest ml-4">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-blue transition-colors font-sans text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase text-white/40 tracking-widest ml-4">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+91 00000 00000"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-blue transition-colors font-sans text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase text-white/40 tracking-widest ml-4">Subject</label>
                  <select 
                    name="subject"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-blue transition-colors font-sans text-sm appearance-none"
                  >
                    <option value="growth">Growth Strategy</option>
                    <option value="ads">Paid Media / Ads</option>
                    <option value="web-dev">Web Development</option>
                    <option value="design">Design</option>
                    <option value="webapps">Webapps & SaaS</option>
                    <option value="subscription">Subscription / Retainer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase text-white/40 tracking-widest ml-4">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-blue transition-colors font-sans text-sm resize-none"
                />
              </div>
              <Magnetic>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-white text-black rounded-2xl font-display font-bold flex items-center justify-center gap-3 hover:bg-neon-blue transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </motion.button>
              </Magnetic>
            </form>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="grid grid-cols-2 gap-16 lg:gap-32">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-6">Socials</h4>
              <ul className="space-y-4">
                {[
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/vishesh-jaiswal-51289a327/" },
                  { name: "GitHub", href: "https://github.com/nothing-vishesh" },
                  { name: "X (Twitter)", href: "https://x.com/nothingvishesh" },
                  { name: "Instagram", href: "https://www.instagram.com/isitvishesh?igsh=MTl1OTQxeXg2Nm41YQ==" },
                  { name: "Pinterest", href: "https://in.pinterest.com/isitvishesh/" },
                  { name: "Behance", href: "https://www.behance.net/visheshjaiswal7" },
                  { name: "Threads", href: "https://www.threads.com/@isitvishesh" },
                  { name: "Quora", href: "https://www.quora.com/profile/Vishesh-Jaiswal-81" }
                ].map(link => (
                  <li key={link.name}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="font-display text-lg hover:text-neon-blue transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-6">Directory</h4>
              <ul className="space-y-4">
                {["Home", "Projects", "About", "Contact"].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="font-display text-lg hover:text-neon-purple transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <div className="flex items-center gap-12 font-mono text-[10px] uppercase text-white/30 tracking-widest">
            <span>© 2025 Vishesh Jaiswal</span>
            <button 
              onClick={() => setLegalOpen({ type: 'privacy' })}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setLegalOpen({ type: 'terms' })}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
          
          <div className="flex items-center gap-8 font-mono text-[10px] uppercase text-white/30 tracking-widest">
            <span>Vasai-Virar, Maharashtra, India</span>
          </div>

          <div className="font-display text-sm font-bold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neon-blue" />
            VASAI-VIRAR, IN
          </div>
        </div>
      </div>

      <LegalOverlay 
        isOpen={legalOpen.type === 'privacy'} 
        onClose={() => setLegalOpen({ type: null })}
        title="Privacy Policy"
        content={
          <>
            <section>
              <h3 className="text-white font-bold mb-2">1. Data Collection</h3>
              <p>We collect information you provide directly via our contact form, including your name, email address, phone number, and message. This data is used solely to respond to your inquiries.</p>
            </section>
            <section>
              <h3 className="text-white font-bold mb-2">2. Use of Information</h3>
              <p>Your information is used to provide clinical growth strategies, performance marketing insights, and project-related communication. We do not sell or share your personal data with third-party marketing companies.</p>
            </section>
            <section>
              <h3 className="text-white font-bold mb-2">3. Security</h3>
              <p>We implement industry-standard security measures to protect your data. Form submissions are processed securely through Formspree.</p>
            </section>
          </>
        }
      />

      <LegalOverlay 
        isOpen={legalOpen.type === 'terms'} 
        onClose={() => setLegalOpen({ type: null })}
        title="Terms & Conditions"
        content={
          <>
            <section>
              <h3 className="text-white font-bold mb-2">1. Services</h3>
              <p>Vishesh Jaiswal (BRANDStack Media) provides performance marketing, SEO, brand building, and AI automation services. Specific deliverables and timelines are established on a per-project basis.</p>
            </section>
            <section>
              <h3 className="text-white font-bold mb-2">2. Intellectual Property</h3>
              <p>All content on this portfolio, including code, design, and copy, is the property of Vishesh Jaiswal unless otherwise noted. Unauthorized reproduction is prohibited.</p>
            </section>
            <section>
              <h3 className="text-white font-bold mb-2">3. Professional Disclaimer</h3>
              <p>Growth and ROI figures mentioned are based on past performance and do not guarantee identical results for every business, as marketing outcomes depend on market variables and execution.</p>
            </section>
          </>
        }
      />
    </footer>
  );
}
