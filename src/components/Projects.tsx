'use client';

import { useSelector } from 'react-redux';
import { ExternalLink, Github, Folder } from 'lucide-react';

const defaultProjects = [
  {
    title: 'Epic Computer',
    description: 'E-commerce web application for a computer hardware business, enabling online and in-store purchases. Features AI chatbot support, user management, product management, order & billing management, and showroom billing system.',
    date: 'December 2025',
    techStack: ['MERN Stack'],
    github: 'https://github.com/Sahan2002-cmd',
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
              className="project-card flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-[#00f5ff]">
                    <Folder className="w-5 h-5" />
                  </div>
                  
                  {/* Project Links */}
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
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
    </section>
  );
}
