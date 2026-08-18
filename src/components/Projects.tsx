'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ExternalLink, Github, Folder, X, Play, Image as ImageIcon } from 'lucide-react';

const defaultProjects = [
  {
    title: 'Epic Computer',
    description: 'E-commerce web application for a computer hardware business, enabling online and in-store purchases. Features AI chatbot support, user management, product management, order & billing management, and showroom billing system.',
    date: 'December 2025',
    techStack: ['MERN Stack'],
    github: 'https://github.com/Sahan2002-cmd',
    attachment: '/assets/images/projects/epic-computer.jpg',
    attachmentType: 'image',
    attachmentName: 'Epic Computer E-Commerce store.jpg',
  },
  {
    title: 'Handicraft Marketplace',
    description: 'Web application for a live business enabling customers to browse and purchase handicrafts online. Developed customer feedback & ticketing management system with integrated chatbot support.',
    date: 'July 2025 - November 2025',
    techStack: ['MERN Stack'],
    github: 'https://github.com/Sahan2002-cmd',
  },
  {
    title: 'Simple Way Transport',
    description: 'Online transport system for booking and managing rides. Developed comprehensive user management module handling authentication, profiles, and role-based access control.',
    date: 'February 2025 - June 2025',
    techStack: ['Java', 'JSP/Servlets', 'MySQL'],
    github: 'https://github.com/Sahan2002-cmd',
  },
  {
    title: 'Vehicle Insurance System',
    description: 'Web application for managing insurance packages, policies, and claims. Built user management system with secure authentication and profile management capabilities.',
    date: 'July 2024 - December 2024',
    techStack: ['PHP', 'MySQL', 'XAMPP'],
    github: 'https://github.com/Sahan2002-cmd',
  },
  {
    title: 'Wellness Mobile App',
    description: 'Mobile application promoting personal wellness and daily health routines. Features include daily habit tracker, hydration reminder, mood journal with emoji selector, and mood trend chart visualization.',
    date: 'Personal Project',
    techStack: ['Kotlin', 'Android Studio'],
    github: 'https://github.com/Sahan2002-cmd',
  },
];

export default function Projects() {
  const { projects } = useSelector((state: any) => state.portfolio);
  const [activeMedia, setActiveMedia] = useState<any | null>(null);

  const activeProjects = projects && projects.length > 0
    ? [...projects].sort((a: any, b: any) => a.order - b.order)
    : defaultProjects;

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 relative"
    >
      <div className="glass-card max-w-5xl w-full p-8 md:p-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
          <span className="bg-gradient-to-r from-[#14b8a6] to-[#00f5ff] bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeProjects.map((project: any, index: number) => (
            <div
              key={project._id || index}
              onClick={() => project.attachment && setActiveMedia(project)}
              className={`project-card flex flex-col justify-between ${
                project.attachment ? 'cursor-pointer hover:shadow-[0_0_25px_rgba(20,184,166,0.08)]' : ''
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-[#00f5ff]">
                      <Folder className="w-5 h-5" />
                    </div>
                    {/* Media indicator badge */}
                    {project.attachment && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/25 text-[#14b8a6]">
                        {project.attachmentType === 'video' ? (
                          <><Play className="w-2.5 h-2.5" /> Preview</>
                        ) : (
                          <><ImageIcon className="w-2.5 h-2.5" /> Preview</>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-gray-400 hover:text-[#00f5ff] hover:bg-white/5 rounded-full transition-all"
                        title="GitHub Code"
                      >
                        <Github className="w-4.5 h-4.5" />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-gray-400 hover:text-[#14b8a6] hover:bg-white/5 rounded-full transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4.5 h-4.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Info */}
                <h3 className="text-xl font-bold text-white mb-2 hover:text-[#00f5ff] transition-colors duration-200">
                  {project.title}
                </h3>
                <span className="inline-block text-[#14b8a6] text-xs font-semibold px-2 py-0.5 rounded-md bg-[#14b8a6]/10 border border-[#14b8a6]/20 mb-4">
                  {project.date}
                </span>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {project.techStack && Array.isArray(project.techStack) ? project.techStack.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#00f5ff]/5 border border-[#00f5ff]/20 text-[#00f5ff]"
                  >
                    {tech}
                  </span>
                )) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Project Media Modal ── */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative bg-[#0d0a21] border border-[#14b8a6]/40 shadow-[0_0_60px_rgba(20,184,166,0.2)] rounded-2xl p-5 md:p-7 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all hover:cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-4 pr-10">
              <span className="inline-block text-[#14b8a6] text-xs font-semibold px-2 py-0.5 rounded bg-[#14b8a6]/10 border border-[#14b8a6]/20 mb-2 font-mono">
                {activeMedia.date}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {activeMedia.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {activeMedia.techStack && activeMedia.techStack.map((tech: string, i: number) => (
                  <span key={i} className="text-xs font-medium px-2 py-0.5 rounded-md bg-[#00f5ff]/5 border border-[#00f5ff]/20 text-[#00f5ff]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Media Area */}
            <div className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden">
              {activeMedia.attachmentType === 'video' ? (
                <video
                  src={activeMedia.attachment}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full max-h-[60vh] object-contain rounded-xl"
                />
              ) : (
                <img
                  src={activeMedia.attachment}
                  alt={activeMedia.attachmentName || activeMedia.title}
                  className="w-full max-h-[60vh] object-contain rounded-xl"
                />
              )}
            </div>

            {/* Caption */}
            {activeMedia.attachmentName && (
              <p className="text-xs text-gray-500 mt-2 text-center truncate">
                {activeMedia.attachmentName}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
