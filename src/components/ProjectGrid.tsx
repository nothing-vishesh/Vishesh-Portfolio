/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { Project } from "../types";
import { ExternalLink, Github, X, Play, Sparkles, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const mouseXSpotlight = useMotionValue(0);
  const mouseYSpotlight = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    mouseXSpotlight.set(mouseX);
    mouseYSpotlight.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-[#060606] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00f3ff]/40 hover:bg-[#0c0c0c] transition-all duration-500 cursor-pointer"
      id={`project-${project.id}`}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: useTransform(
            [mouseXSpotlight, mouseYSpotlight],
            ([mx, my]) => `radial-gradient(450px circle at ${mx}px ${my}px, rgba(0, 243, 255, 0.07), transparent 50%)`
          )
        }}
      />
      
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="aspect-video w-full overflow-hidden relative border-b border-white/5"
      >
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/35 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
        
        {/* Play Icon for video projects */}
        {project.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="h-12 w-12 rounded-full bg-black/70 border border-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#00f3ff] group-hover:border-[#00f3ff] group-hover:text-black transition-all duration-500 shadow-xl"
            >
              <Play className="h-5 w-5 ml-0.5 fill-current" />
            </motion.div>
          </div>
        )}

        {/* Gallery indicator for apparel/logo projects */}
        {project.galleryImages && (
          <div className="absolute top-4 right-4 bg-black/75 border border-white/10 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-mono text-white/70 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
            <Sparkles className="h-3 w-3 text-[#00f3ff]" />
            <span>Interactive</span>
          </div>
        )}
      </div>

      <div 
        style={{ transform: "translateZ(50px)" }}
        className="p-5 md:p-6"
      >
        <div className="flex justify-between items-start mb-3 gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className="px-2.5 py-0.5 bg-white/5 border border-white/5 rounded-full text-[9px] font-mono text-white/50 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          {project.link && project.link !== "#" && (
            <ExternalLink 
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.link, "_blank");
              }}
              className="h-4 w-4 text-white/30 hover:text-[#00f3ff] cursor-pointer transition-colors shrink-0" 
            />
          )}
        </div>

        <h3 className="font-display text-lg md:text-xl font-bold mb-2 tracking-tight group-hover:text-[#00f3ff] transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-white/50 text-xs md:text-sm font-sans line-clamp-2 md:line-clamp-3 mb-3 leading-relaxed">
          {project.description}
        </p>

        <div className="h-[1px] w-0 bg-white group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  );
}

const projects: Project[] = [
  {
    id: "1",
    title: "Deloitte Data Analytics Simulation",
    description: "Built an interactive React.js performance & pay equality dashboard. Performed advanced analytics on compensation gaps and applied data storytelling using Excel pivot models.",
    tags: ["Data Analytics", "React.js", "Excel Modeling"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "2",
    title: "AI Content Automation Pipeline",
    description: "Designed a full prompt engineering pipeline to auto-generate video assets, scripts, and descriptions, growing a gaming channel to 40K+ subscribers and slashing production time by 60%.",
    tags: ["AI Automation", "Prompt Engineering", "Growth"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "3",
    title: "Full-Funnel Meta Ads Campaign",
    description: "Built and scaled a conversion-driven campaign for a fashion e-commerce startup with layered dynamic targeting and A/B continuous bid optimizations.",
    tags: ["Paid Media", "Meta Ads", "Shopify"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "4",
    title: "BRANDStack Media Hub",
    description: "Led and scaled a full-service performance growth agency serving premium real estate developers, local startups, and e-commerce brands in Mumbai.",
    tags: ["Strategy", "Branding", "Google Ads"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "5",
    title: "Custom Streetwear Apparel Line",
    description: "Complete custom layout of illustrative streetwear concepts, apparel designs, vector prints, and digital clothing line launches developed under the 'Graphics Walah' designer brand.",
    tags: ["Merchandising", "Streetwear", "Graphic Design"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=2000&auto=format&fit=crop",
    link: "#",
    galleryImages: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1500&auto=format&fit=crop"
    ]
  },
  {
    id: "6",
    title: "Vector Logomarks & Identity Systems",
    description: "Designed bespoke corporate logomarks, vector emblems, and digital asset guides, delivering distinct conceptual frameworks aligned with client target guidelines.",
    tags: ["Logo Design", "Identity", "Vector Art"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000&auto=format&fit=crop",
    link: "#",
    galleryImages: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1500&auto=format&fit=crop"
    ]
  },
  {
    id: "7",
    title: "Advanced Sync Gameplay Project",
    description: "High-sync gameplay montage and video sequence displaying frame-perfect edits, custom audio beat alignment, and immersive speed scaling for elite digital creators.",
    tags: ["Video Editing", "Premiere Pro", "Gameplay Sync"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop",
    link: "https://youtu.be/aPo2CmaMPcM?si=0_N1fDbVmm0D2fVZ",
    videoUrl: "https://www.youtube.com/embed/aPo2CmaMPcM?autoplay=1&mute=0"
  },
  {
    id: "8",
    title: "Cinematic Visual Flow Showcase",
    description: "Engaging sound-design layered reel showing creative speed ramps, dynamic zooms, color grades, and ambient track stitching for maximum digital audience retention.",
    tags: ["Cinematic Flow", "Sound Design", "Retaining Editing"],
    image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=2000&auto=format&fit=crop",
    link: "https://youtu.be/x9AOlm3Gjec?si=i1pZy83FVP9b8eUy",
    videoUrl: "https://www.youtube.com/embed/x9AOlm3Gjec?autoplay=1&mute=0"
  },
  {
    id: "9",
    title: "Creative Gaming Promo Demo",
    description: "Visual commercial highlighting heavy overlay styles, transitional wipes, interactive captions, and polished custom title slides to supercharge social media channels.",
    tags: ["Promo Video", "Motion Design", "Gaming Content"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    link: "https://youtu.be/8kyDIHg63MQ?si=ePcfm5bsx4fDBFZK",
    videoUrl: "https://www.youtube.com/embed/8kyDIHg63MQ?autoplay=1&mute=0"
  }
];

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  const handleOpen = (project: Project) => {
    setSelectedProject(project);
    setActiveImageIdx(0);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const handleDiscuss = () => {
    handleClose();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    if (selectedProject?.galleryImages) {
      setActiveImageIdx((prev) => (prev + 1) % selectedProject.galleryImages!.length);
    }
  };

  const prevSlide = () => {
    if (selectedProject?.galleryImages) {
      setActiveImageIdx((prev) => (prev - 1 + selectedProject.galleryImages!.length) % selectedProject.galleryImages!.length);
    }
  };

  return (
    <section id="projects" className="py-24 px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-[#00f3ff] text-xs uppercase tracking-[0.2em] mb-4"
          >
            Curated Works / Graphics Walah Showcase
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Creative <span className="text-white/20 italic">Portfolios</span>
          </motion.h2>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-mono text-xs text-white/40 text-right uppercase tracking-widest hidden md:block"
        >
          Selected Projects / 2024-2026<br />
          Volume 01
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            onClick={() => handleOpen(project)}
          />
        ))}
      </div>

      {/* Immersive Detail Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-[#080808] border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                <div>
                  <div className="flex gap-2 mb-1.5">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono text-white/50 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display text-xl md:text-3xl font-bold uppercase tracking-tight text-white">{selectedProject.title}</h2>
                </div>
                <button 
                  onClick={handleClose}
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Work Container Grid / Preview */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[60vh] space-y-6">
                {/* 1. Embed Players or Gallery */}
                {selectedProject.videoUrl ? (
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black relative">
                    <iframe
                      src={selectedProject.videoUrl}
                      title={selectedProject.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : selectedProject.galleryImages ? (
                  <div className="space-y-4">
                    <div className="relative aspect-[3/2] md:aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                      <img
                        src={selectedProject.galleryImages[activeImageIdx]}
                        alt={`${selectedProject.title} preview`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Left / Right arrows */}
                      <button 
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/80 border border-white/10 hover:border-white flex items-center justify-center text-white hover:bg-[#00f3ff] hover:text-black transition-all"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/80 border border-white/10 hover:border-white flex items-center justify-center text-white hover:bg-[#00f3ff] hover:text-black transition-all"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Thumbnail dots selector */}
                    <div className="flex gap-2 justify-center">
                      {selectedProject.galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIdx(idx)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeImageIdx ? 'w-8 bg-[#00f3ff]' : 'w-2.5 bg-white/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black relative">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Description and Action Call */}
                <div className="space-y-4 font-sans text-sm md:text-md text-white/70 leading-relaxed max-w-3xl">
                  <p>{selectedProject.description}</p>
                  
                  {selectedProject.videoUrl && (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 mt-4">
                      <h4 className="font-mono text-[10px] text-[#00f3ff] uppercase tracking-widest">GraphicsWalah Concept Manifesto</h4>
                      <p className="text-xs text-white/50">
                        Designed with specialized syncing and high-standard resolution format. Use the interactive player above to experience this multimedia presentation in full high fidelity.
                      </p>
                    </div>
                  )}
                  {selectedProject.galleryImages && (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 mt-4">
                      <h4 className="font-mono text-[10px] text-[#00f3ff] uppercase tracking-widest">Creative Statement</h4>
                      <p className="text-xs text-white/50">
                        &quot;Think what you want, I will make it in reality.&quot; Created utilizing custom vector modeling pipelines and illustrative print systems.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/5 bg-white/[0.01] flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="font-mono text-[9px] uppercase text-white/30 tracking-widest">See you on order page!</span>
                <div className="flex gap-4 w-full sm:w-auto">
                  {selectedProject.link && selectedProject.link !== "#" && (
                    <button 
                      onClick={() => window.open(selectedProject.link, "_blank")}
                      className="flex-1 sm:flex-none uppercase tracking-wider font-mono text-[10px] py-2.5 px-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-full transition-all inline-flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Original Link</span>
                    </button>
                  )}
                  <button 
                    onClick={handleDiscuss}
                    className="flex-1 sm:flex-none uppercase tracking-wider font-mono text-[10px] py-2.5 px-5 bg-white text-black hover:bg-[#00f3ff] hover:text-black font-semibold rounded-full transition-all inline-flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Order Design Work</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
