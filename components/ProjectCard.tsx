import React from 'react';
import { Project } from '../lib/types';
import { ArrowUpRight, Circle, CheckCircle2, Clock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusIcon = () => {
    switch (project.status) {
      case 'live': return <CheckCircle2 className="w-3 h-3 mr-1.5" />;
      case 'building': return <Clock className="w-3 h-3 mr-1.5" />;
      case 'offline': return <Circle className="w-3 h-3 mr-1.5" />;
    }
  };

  const getStatusBadgeClass = () => {
    switch (project.status) {
      case 'live': return 'bg-status-live/15 text-status-live';
      case 'building': return 'bg-status-building/15 text-status-building';
      case 'offline': return 'bg-white/10 text-text-muted';
    }
  };

  return (
    <a 
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-xl border border-border bg-surface hover:bg-surface-hover hover:border-border-hover hover:-translate-y-0.5 transition-all duration-300 ${project.featured ? 'col-span-1 md:col-span-2 md:row-span-2' : ''}`}
    >
      {/* Thumbnail area */}
      <div className={`relative w-full overflow-hidden ${project.featured ? 'h-64 md:h-80' : 'h-40 md:h-48'}`}>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-accent-glow transition-colors z-10"></div>
        {project.image && (
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        
        {/* Launch Icon - appears on hover */}
        <div className="absolute top-4 right-4 z-20 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
            {project.name}
          </h3>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeClass()}`}>
            {getStatusIcon()}
            {project.status}
          </div>
        </div>
        
        <p className="text-sm text-text-muted card-description">
          {project.description}
        </p>
      </div>
    </a>
  );
}
