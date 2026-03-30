import React from 'react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 border-b border-border overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #111111 0%, #000000 70%)',
          zIndex: 0
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-px bg-accent"></div>
          <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-accent">
            Project Launchpad
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Everything I'm building.<br className="hidden md:block" /> One place.
        </motion.h1>
        
        <motion.p 
          className="text-base md:text-lg text-text-muted max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Kayomarz M Pavri — Developer, Brand Strategist, Event Architect.
          <br className="mb-2" />
          Click any card to launch the project.
        </motion.p>
      </div>
    </section>
  );
}
