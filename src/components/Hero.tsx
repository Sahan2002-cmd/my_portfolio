'use client';

import Image from 'next/image';
import { Github, Linkedin, ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-height-screen min-h-screen flex items-center justify-center pt-24 pb-12 px-6 sm:px-12 relative overflow-hidden"
    >
      <div className="glass-card max-w-4xl w-full p-8 md:p-12 animate-fade-up relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Profile Picture */}
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#00f5ff] to-[#14b8a6] rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#00f5ff]/40">
              <Image
                src="/assets/images/profile.jpeg"
                alt="Sahan Tharaka Dias"
                fill
                priority
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* Intro Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              <span className="neon-text text-glow">Sahan Tharaka Dias</span>
            </h1>
            <p className="text-lg md:text-xl text-[#14b8a6] font-medium tracking-wide mb-6">
              IT Undergraduate | Full-Stack Developer | AI/ML Enthusiast
            </p>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-8 max-w-xl">
              Building innovative web solutions with the MERN stack and exploring the frontiers of AI/ML technologies. Passionate about creating seamless digital experiences that solve real-world problems.
            </p>

            {/* CTA Buttons & Socials */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="btn-primary flex items-center gap-2 text-sm md:text-base cursor-pointer"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/assets/documents/Sahan Dias CV.pdf"
                download="Sahan_Dias_CV.pdf"
                className="btn-outline flex items-center gap-2 text-sm md:text-base"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start mt-8 border-t border-white/5 pt-6 w-full">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Connect:</span>
              <a
                href="https://github.com/Sahan2002-cmd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#00f5ff]/15 hover:text-[#00f5ff] border border-white/10 hover:border-[#00f5ff]/30 transition-all"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sahantharaka-dias-b01322339"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#00f5ff]/15 hover:text-[#00f5ff] border border-white/10 hover:border-[#00f5ff]/30 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
