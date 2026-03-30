'use client'; // Framer Motion needs client component

import { HeroSection } from '@/components/HeroSection';
import { BentoGrid } from '@/components/BentoGrid';
import { SyncButton } from '@/components/SyncButton';
import projectsData from '@/config/projects.json';
import { Project } from '@/lib/types';

const projects = projectsData as Project[];

export default function Home() {
  return (
    <main>
      <HeroSection />
      
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6 mb-12 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-2 tracking-tight">Active Projects</h2>
            <p className="text-text-muted">A collection of live systems and active builds.</p>
          </div>
          <SyncButton />
        </div>
        
        <BentoGrid projects={projects} />
      </div>
    </main>
  );
}
