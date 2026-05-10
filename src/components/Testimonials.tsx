/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Send, Star, User, Briefcase, MessageSquare, AlertCircle } from "lucide-react";
import Magnetic from "./Magnetic";
import { db, OperationType, handleFirestoreError } from "../lib/firebase";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

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

interface Review {
  id?: string;
  name: string;
  role: string;
  feedback: string;
  createdAt: any;
  isApproved: boolean;
}

const staticTestimonials = [
  {
    quote: "Vishesh transformed our Meta strategy. We saw a 40% reduction in CAC within the first two months. His technical approach to creative testing is unparalleled.",
    name: "Arjun Mehta",
    role: "Founder, D2C Apparel Co."
  },
  {
    quote: "The AI content pipeline Vishesh built for us is a game-changer. What used to take our team 15 hours now happens in less than 4. Highly recommend for any scaling brand.",
    name: "Sarah Jenkins",
    role: "Content Lead, Gaming Studio"
  }
];

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    feedback: ""
  });

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(fetchedReviews);
      setIsLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, "reviews");
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.feedback) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await addDoc(collection(db, "reviews"), {
        ...formData,
        createdAt: serverTimestamp(),
        isApproved: true // Auto-approved as requested
      });
      setSuccess(true);
      setFormData({ name: "", role: "", feedback: "" });
      setTimeout(() => {
        setShowForm(false);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      handleFirestoreError(err, OperationType.CREATE, "reviews");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-24 px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="text-center md:text-left">
          <p className="font-mono text-neon-purple text-xs uppercase tracking-[0.2em] mb-4">Validation</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
            Client <span className="text-white/20 italic">Voices</span>
          </h2>
        </div>
        
        <Magnetic>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-3 rounded-full bg-white text-black font-display font-medium text-sm flex items-center gap-2 hover:bg-neon-blue transition-colors"
          >
            {showForm ? "Cancel" : "Leave a Review"}
            {!showForm && <MessageSquare className="h-4 w-4" />}
          </button>
        </Magnetic>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-16"
          >
            <div className="max-w-2xl mx-auto p-8 rounded-[32px] bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <h3 className="font-display text-2xl font-bold mb-6 text-center">Share Your Feedback</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-white/40 tracking-widest ml-1">Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-neon-blue outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-white/40 tracking-widest ml-1">Role / Company</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                      <input 
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        placeholder="CEO @ BrandName"
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-neon-blue outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase text-white/40 tracking-widest ml-1">Feedback</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.feedback}
                    onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                    placeholder="Tell us about your experience working with Vishesh..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-sm focus:border-neon-blue outline-none transition-all resize-none"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-xs font-mono bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-2 text-green-400 text-xs font-mono bg-green-400/10 p-4 rounded-xl border border-green-400/20">
                    <Send className="h-4 w-4" />
                    Review submitted successfully and is now live!
                  </div>
                )}

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-white text-black font-display font-bold hover:bg-neon-blue transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                  {!isSubmitting && <Send className="h-4 w-4" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
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
              {/* Combine static and live reviews */}
              {[...staticTestimonials, ...reviews].map((t: any, i) => (
                <motion.div 
                  key={t.id || `static-${i}`}
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
                      "{t.quote || t.feedback}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                        {t.image ? (
                          <img src={t.image} alt={t.name} className="h-full w-full object-cover" loading="lazy" />
                        ) : (
                          <User className="h-6 w-6 text-white/20" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white flex items-center gap-2">
                          {t.name}
                          {!t.id && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px] px-1.5 py-0.5 rounded-full border border-neon-blue/30 text-neon-blue uppercase">Verified</motion.span>}
                        </h4>
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
            Start your project
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
