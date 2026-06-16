/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Globe, Zap, Target, X, CheckCircle2, TrendingUp, BarChart3 } from "lucide-react";
import Magnetic from "./Magnetic";

const CaseStudySkeleton = () => (
  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-white/10" />
        <div className="h-4 bg-white/10 rounded w-24" />
      </div>
      <div className="h-4 w-4 bg-white/10 rounded" />
    </div>
    <div className="h-8 bg-white/10 rounded w-1/2 mb-2" />
    <div className="h-3 bg-white/10 rounded w-full mb-1" />
    <div className="h-3 bg-white/10 rounded w-2/3" />
  </div>
);

interface CaseStudy {
  title: string;
  metric: string;
  desc: string;
  icon: React.ReactNode;
  fullStory: {
    challenge: string;
    action: string;
    result: string[];
  };
}

const caseStudies: CaseStudy[] = [
  { 
    title: "Eco-Lifestyle D2C", 
    metric: "4.8x ROAS", 
    desc: "Scale-up of a sustainable home goods brand through aggressive Meta Ads testing and Shopify optimization.",
    icon: <Target className="h-4 w-4 text-neon-blue" />,
    fullStory: {
      challenge: "The client was stuck at 1.5x ROAS with stagnant revenue. Their customer acquisition cost (CAC) was nearly equal to their AOV, making scaling impossible.",
      action: "I completely overhauled their creative strategy, shifting to high-energy UGC and comparison 'Problem/Solution' hooks. I also implemented advanced server-side tracking (CAPI) to fix data attribution gaps.",
      result: [
        "Achieved a consistent 4.8x ROAS over 6 months",
        "Scaled monthly spend from $5k to $45k profitably",
        "Reduced churn rate by 12% through post-purchase email automation"
      ]
    }
  },
  { 
    title: "Fintech SaaS SEO", 
    metric: "+210% Traffic", 
    desc: "Organic dominance for a B2B payment gateway by targeting high-intent long-tail keywords.",
    icon: <Globe className="h-4 w-4 text-neon-purple" />,
    fullStory: {
      challenge: "A competitive fintech space meant high CPCs ($15+ per click). The client needed a sustainable way to acquire leads without burning through cash.",
      action: "We focused on a 'Topic Cluster' strategy, creating 25+ pillar pages around specialized payment regulations and compliance. I also led a technical SEO audit that fixed 404 loops and improved Core Web Vitals.",
      result: [
        "Organic inbound leads increased by 140% YoY",
        "Search visibility for 'secure payment gateway' jumped to Top 3",
        "Reduced reliance on paid ads by 30% while maintaining lead volume"
      ]
    }
  },
  { 
    title: "AI Ops Automation", 
    metric: "-75% Manual Work", 
    desc: "Custom AI pipelines for a recruitment firm to automate resume screening and initial outreach.",
    icon: <Zap className="h-4 w-4 text-white" />,
    fullStory: {
      challenge: "Recruiters were spending 4 hours a day manually sorting through resumes and sending templated emails, leading to burnout and missed high-quality candidates.",
      action: "I built a custom LLM-powered pipeline that scored resumes against job descriptions and drafted hyper-personalized first-touch messages based on the candidate's LinkedIn history.",
      result: [
        "Saved an average of 18 hours per week per recruiter",
        "Improved interview booking rate from 8% to 22%",
        "Integration allowed for 24/7 lead processing without human intervention"
      ]
    }
  },
  { 
    title: "E-com Retention Hub", 
    metric: "32% LTV Lift", 
    desc: "Implementing a data-driven loyalty and subscription model for a premium wellness brand.",
    icon: <TrendingUp className="h-4 w-4 text-neon-blue" />,
    fullStory: {
      challenge: "High one-time purchase rate but low repeat customers. The brand's survival depended on increasing customer lifetime value.",
      action: "We launched a 'VIP Club' subscription using Recharge and designed a custom loyalty portal. I set up predictive analytics to trigger SMS 're-fill' reminders based on average usage cycles.",
      result: [
        "Customer LTV increased by 32% in the first quarter",
        "Subscription-based revenue now accounts for 45% of total sales",
        "Zero-discount loyalty strategy preserved brand premium feel"
      ]
    },
  },
  { 
    title: "Real Estate Lead Gen", 
    metric: "400+ Leads/Mo", 
    desc: "Local dominant strategy for a luxury real estate group in a highly competitive metro market.",
    icon: <Target className="h-4 w-4 text-neon-purple" />,
    fullStory: {
      challenge: "The agency relied on portals like Zillow which were becoming prohibitively expensive. They wanted to own their lead source.",
      action: "Localized Google Search and YouTube ads targeting affluent zip codes. I developed a high-converting 'Home Valuation' landing page with an interactive map to capture high-intent sellers.",
      result: [
        "Lead quality improved by 40% compared to aggregated portal leads",
        "Cost Per Lead (CPL) decreased from $65 to $22",
        "Established the team as the #1 luxury specialist in their target area"
      ]
    }
  },
  { 
    title: "EdTech Performance", 
    metric: "12x Scale", 
    desc: "Scaling an online certification platform from India to Global markets (US/UK/EU).",
    icon: <BarChart3 className="h-4 w-4 text-white" />,
    fullStory: {
      challenge: "Domestic saturation limited growth. The client feared high CPLs in international markets would erode their margins.",
      action: "I executed a multi-regional test strategy, optimizing landing pages for local cultural nuances. We used 'Value-Based Bidding' to deprioritize low-intent free-trial seekers.",
      result: [
        "Successfully entered 4 new global markets within 5 months",
        "Revenue increased 12x while maintaining a target 3.2x ROAS",
        "Built a global brand presence with 500k+ students globally"
      ]
    }
  }
];

export default function About() {
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);
  const [isLoadingCases, setIsLoadingCases] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingCases(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="py-24 px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-4 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-neon-purple rounded-full blur-[120px] opacity-10 animate-pulse" />
          <div className="relative z-10 p-8 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <div className="h-48 w-48 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="h-full w-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                <Globe className="h-20 w-20 text-white/10" />
              </div>
            </div>
          </div>
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
              I am a results-driven professional with 5+ years of experience spanning data analytics, digital marketing, and operations. Over my career, I've designed interactive data dashboards, handled advanced MIS reporting, and managed high-impact SEO and ROI-focused paid campaigns.
            </p>
            <p>
              As the founder of BRANDStack Media, I specialize in building brand identities from scratch and executing full-funnel paid campaigns. I have a proven track record of managing clients across real estate, D2C, and e-commerce, while streamlining workflows using AI-powered automation.
            </p>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-12">
            {[
              { label: "Experience", value: "5+ Years" },
              { label: "Conversion Uplift", value: "35%+" },
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

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/5 pt-12">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Technical Stack</h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li className="flex items-center gap-2"><div className="h-1 w-1 bg-neon-blue rounded-full" /> Analytics: Excel, Google Analytics, Dashboards</li>
                <li className="flex items-center gap-2"><div className="h-1 w-1 bg-neon-blue rounded-full" /> Paid Media: Google Ads, Meta Ads, A/B Testing</li>
                <li className="flex items-center gap-2"><div className="h-1 w-1 bg-neon-blue rounded-full" /> Web: React, WordPress, Shopify, Elementor</li>
                <li className="flex items-center gap-2"><div className="h-1 w-1 bg-neon-blue rounded-full" /> AI: Prompt Engineering & Workflow Automation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Certifications</h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-neon-purple" /> Deloitte Data Analytics (Forage, 2026)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-neon-purple" /> Google Analytics (Google Skillshop, 2025)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-neon-purple" /> AI Tools Workshop (ULSA, 2025)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-neon-purple" /> Intro to AI (Great Learning, 2024)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-neon-purple" /> Digital Marketing Fundamentals (IIDE)</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-white/5">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-8">Case Studies & Benchmarks</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[300px]">
              <AnimatePresence mode="wait">
                {isLoadingCases ? (
                  <motion.div 
                    key="skeletons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="contents"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <CaseStudySkeleton key={n} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="contents"
                  >
                    {caseStudies.map((caseStudy, i) => (
                      <motion.div
                        key={caseStudy.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setActiveCase(caseStudy)}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-blue/50 hover:bg-white/[0.07] transition-all group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5">
                              {caseStudy.icon}
                            </div>
                            <p className="font-display font-bold text-sm tracking-tight">{caseStudy.title}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-neon-blue group-hover:translate-x-1 transition-all" />
                        </div>
                        <h5 className="font-display text-2xl font-bold text-white mb-2">{caseStudy.metric}</h5>
                        <p className="text-xs text-white/40 leading-relaxed font-sans line-clamp-2">{caseStudy.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Magnetic>
            <motion.a 
              href="#contact"
              whileHover={{ x: 10 }}
              className="mt-16 flex items-center gap-4 group cursor-pointer"
            >
              <span className="font-mono text-xs uppercase tracking-widest border-b border-transparent group-hover:border-white transition-all duration-300 py-1">
                Explore partnership
              </span>
              <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.a>
          </Magnetic>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeCase && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setActiveCase(null)}
                className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {activeCase.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">{activeCase.title}</h3>
                    <p className="font-mono text-[10px] uppercase text-neon-blue tracking-widest">{activeCase.metric} Highlight</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-mono text-[10px] uppercase text-white/30 tracking-widest mb-3">The Challenge</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{activeCase.fullStory.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[10px] uppercase text-white/30 tracking-widest mb-3">The Strategy</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{activeCase.fullStory.action}</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <h4 className="font-mono text-[10px] uppercase text-neon-purple tracking-widest mb-6">Key Results</h4>
                    <div className="space-y-4">
                      {activeCase.fullStory.result.map((res, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-neon-purple mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-white/80">{res}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveCase(null)}
                  className="mt-12 w-full py-4 bg-white text-black rounded-2xl font-display font-bold hover:bg-neon-blue transition-all"
                >
                  Back to Portfolio
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
