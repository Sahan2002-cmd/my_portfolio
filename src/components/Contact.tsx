'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Download } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess('Your message has been sent successfully! Sahan will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 relative"
    >
      <div className="glass-card max-w-5xl w-full p-8 md:p-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
          <span className="bg-gradient-to-r from-[#00f5ff] to-[#14b8a6] bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              I&apos;m actively seeking Software Engineering internship opportunities and always open to collaborating on innovative projects. Let&apos;s connect and create something amazing together!
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#00f5ff] group-hover:bg-[#00f5ff]/10 group-hover:border-[#00f5ff]/40 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Email</h4>
                  <a
                    href="mailto:sahantharakadias@gmail.com"
                    className="text-white hover:text-[#00f5ff] font-semibold text-sm md:text-base transition-colors"
                  >
                    sahantharakadias@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#00f5ff] group-hover:bg-[#00f5ff]/10 group-hover:border-[#00f5ff]/40 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Phone</h4>
                  <a
                    href="tel:+94770554324"
                    className="text-white hover:text-[#00f5ff] font-semibold text-sm md:text-base transition-colors"
                  >
                    +94 77 055 4324
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#00f5ff] group-hover:bg-[#00f5ff]/10 group-hover:border-[#00f5ff]/40 transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Location</h4>
                  <p className="text-white font-semibold text-sm md:text-base">
                    Battaramulla, Sri Lanka
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
              <a
                href="https://github.com/Sahan2002-cmd"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2 text-xs py-2 px-4 w-full sm:w-auto hover:cursor-pointer"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sahantharaka-dias-b01322339"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2 text-xs py-2 px-4 w-full sm:w-auto hover:cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="/assets/documents/Sahan Dias CV.pdf"
                download="Sahan_Dias_CV.pdf"
                className="btn-primary flex items-center justify-center gap-2 text-xs py-2 px-4 w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          </div>

          {/* Form Side (7 Cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
            {success && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm leading-relaxed">
                {success}
              </div>
            )}
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-sm leading-relaxed">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Collaboration Opportunity"
                className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Hi Sahan, I would like to discuss..."
                className="w-full bg-white/2 border border-white/10 hover:border-white/20 focus:border-[#00f5ff] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
