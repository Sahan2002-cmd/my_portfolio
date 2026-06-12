'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import {
  fetchProjects,
  fetchSkills,
  fetchExperience,
  fetchCertificates,
} from '@/store/portfolioSlice';

import ThreeBackground from '@/components/ThreeBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch all portfolio data from database on load
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchExperience());
    dispatch(fetchCertificates());
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-bg-primary text-white overflow-hidden transition-colors duration-300">
      {/* 3D Interactive Canvas Background */}
      <ThreeBackground />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-xs text-gray-500 border-t border-white/5 bg-bg-primary/40 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Sahan Tharaka Dias. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed &amp; Developed with Next.js, Redux, Three.js &amp; Tailwind
          </p>
        </div>
      </footer>
    </div>
  );
}
