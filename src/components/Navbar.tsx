'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Lock, Sun, Moon } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    } else {
      // Default is dark (night mode)
      setTheme('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple intersection observer behavior for active navigation highlights
      const sections = navItems.map((item) =>
        document.getElementById(item.href.substring(1))
      );
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navItems[i].href.substring(1));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-bg-primary/75 backdrop-blur-md border-b border-white/5'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="text-xl font-bold bg-gradient-to-r from-[#00f5ff] to-[#14b8a6] bg-clip-text text-transparent hover:opacity-85 transition-opacity" onClick={(e) => handleLinkClick(e, '#home')}>
          Sahan.dev
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#00f5ff]/15 text-[#00f5ff] border border-[#00f5ff]/35 shadow-[0_0_15px_rgba(0,245,255,0.15)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.name}
              </a>
            );
          })}
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full border border-white/10 text-gray-400 hover:text-[#00f5ff] hover:border-[#00f5ff]/30 hover:bg-[#00f5ff]/10 transition-all hover:cursor-pointer"
            title={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {/* Admin Login Link */}
          <Link
            href="/admin/login"
            className="ml-4 p-2 rounded-full border border-white/10 text-gray-400 hover:text-[#00f5ff] hover:border-[#00f5ff]/30 hover:bg-[#00f5ff]/10 transition-all"
            title="Admin Login"
          >
            <Lock className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle & Admin Link */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-[#00f5ff]"
            title={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            href="/admin/login"
            className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-[#00f5ff]"
          >
            <Lock className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
          >
            {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-bg-primary/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        <div className="flex flex-col gap-2 p-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
