/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface LegalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export default function LegalOverlay({ isOpen, onClose, title, content }: LegalOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-3xl flex flex-col"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">{title}</h2>
              <button 
                onClick={onClose}
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto font-sans text-sm text-white/60 leading-relaxed space-y-6">
              {content}
            </div>

            <div className="p-6 border-t border-white/5 bg-white/[0.02] flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-white text-black rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-neon-blue transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
