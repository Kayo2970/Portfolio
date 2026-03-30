import React from 'react';
import { ProjectCard } from './ProjectCard';
import { Project } from '../lib/types';
import { motion } from 'framer-motion';

interface BentoGridProps {
  projects: Project[];
}

export function BentoGrid({ projects }: BentoGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto px-6 pb-24 auto-rows-min"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants} className={project.featured ? 'md:col-span-2 md:row-span-2' : ''}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
