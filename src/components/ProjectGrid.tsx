/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Project } from "../types";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 hover:bg-[#111111] transition-all duration-500 cursor-pointer"
      id={`project-${project.id}`}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: useTransform(
            [mouseXSpotlight, mouseYSpotlight],
            ([mx, my]) => `radial-gradient(600px circle at ${mx}px ${my}px, rgba(0, 243, 255, 0.1), transparent 40%)`
          )
        }}
      />
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="aspect-video w-full overflow-hidden"
      >
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      <div 
        style={{ transform: "translateZ(80px)" }}
        className="p-6 relative"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/60 uppercase tracking-tight">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <Github className="h-4 w-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
            <ExternalLink className="h-4 w-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold mb-2 tracking-tight group-hover:text-neon-blue transition-colors">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm font-sans line-clamp-2 mb-4 leading-relaxed">
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
    title: "AI Prompt Engineering",
    description: "Designed an AI pipeline for gaming content creators, cutting video script and thumbnail production time by 60%.",
    tags: ["AI Automation", "Prompt Engineering", "Strategy"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "2",
    title: "Steez Closet",
    description: "Built an e-commerce merchandise brand from scratch, including full visual identity and Shopify store development.",
    tags: ["E-commerce", "Branding", "Shopify"],
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "3",
    title: "Facebook Ads Lead Gen",
    description: "Full-funnel Meta Ads campaign for a D2C fashion startup with A/B testing and audience targeting to maximize ROAS.",
    tags: ["Paid Media", "Lead Gen", "Meta Ads"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "4",
    title: "BRANDStack Media",
    description: "Founder of a performance branding agency serving real estate, D2C startups, and international local businesses.",
    tags: ["Agency", "Strategy", "Branding"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  }
];

export default function ProjectGrid() {
  return (
    <section id="projects" className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-neon-blue text-xs uppercase tracking-[0.2em] mb-4"
          >
            Curated Works
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Digital <span className="text-white/20 italic">Architectures</span>
          </motion.h2>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-mono text-xs text-white/40 text-right uppercase tracking-widest hidden md:block"
        >
          Selected Projects / 2024-2025<br />
          Volume 01
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
