'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Briefcase, FileText, X, ExternalLink } from 'lucide-react';

// Hardcoded fallback in case database is empty
const defaultWorkExperience = [
  {
    role: 'Training Bank Associate',
    company: 'Peoples Bank Battaramulla',
    period: 'September 2022 - September 2023',
    description: 'Managed cash deposits, withdrawals, passbook services, cheque processing, account operations, and debit card issuance. Developed strong attention to detail and customer service skills in a professional banking environment.',
  },
];

export default function About() {
  const { experience } = useSelector((state: any) => state.portfolio);
  const [activeAttachment, setActiveAttachment] = useState<any | null>(null);
  
  // Filter for work experience and sort
  const workExperience = experience && experience.length > 0
    ? [...experience].filter((exp: any) => exp.type === 'work').sort((a: any, b: any) => a.order - b.order)
    : defaultWorkExperience;

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 relative"
    >
      <div className="glass-card max-w-4xl w-full p-8 md:p-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
          <span className="bg-gradient-to-r from-[#00f5ff] to-[#14b8a6] bg-clip-text text-transparent">
            About Me
          </span>
        </h2>

        <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg">
          <p>
            I&apos;m a motivated 3rd-year Information Technology undergraduate at SLIIT with practical experience in full-stack web development and a growing interest in AI/ML technologies. My journey in software development has equipped me with strong foundations in building robust applications using modern technologies.
          </p>
          <p>
            I specialize in the MERN stack and have hands-on experience with Java, Python, and various database systems including MySQL, MongoDB, and SQL Server. Through academic and personal projects, I&apos;ve developed solutions for e-commerce platforms, transport systems, insurance management, and more.
          </p>
          <p>
            As a self-motivated team player with strong problem-solving and leadership skills, I&apos;m seeking Software Engineering opportunities to apply my technical knowledge and continuously enhance my professional capabilities.
          </p>
        </div>

        {/* Work Experience Sub-section */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#00f5ff]/10 rounded-lg border border-[#00f5ff]/25 text-[#00f5ff]">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Work Experience</h3>
          </div>

          <div className="space-y-6">
            {workExperience.map((exp: any, index: number) => (
              <div
                key={exp._id || index}
                onClick={() => exp.attachment && setActiveAttachment(exp)}
                className={`p-6 bg-white/3 hover:bg-white/5 border border-white/5 hover:border-[#00f5ff]/20 rounded-xl transition-all duration-300 group ${
                  exp.attachment ? 'cursor-pointer hover:shadow-[0_0_20px_rgba(0,245,255,0.05)]' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-[#00f5ff] transition-colors">
                      {exp.role}
                    </h4>
                    {exp.attachment && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveAttachment(exp);
                        }}
                        className="p-1.5 text-gray-400 hover:text-[#00f5ff] hover:bg-white/5 border border-white/10 rounded-lg transition-all hover:cursor-pointer"
                        title="View Document"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-[#00f5ff] bg-[#00f5ff]/10 px-3 py-1 rounded-full border border-[#00f5ff]/20 w-fit">
                    {exp.period}
                  </span>
                </div>
                <h5 className="text-sm md:text-base font-medium text-gray-400 mb-4">
                  {exp.company}
                </h5>
                {exp.description && (
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Attachment Modal */}
      {activeAttachment && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveAttachment(null)}
        >
          <div
            className="relative bg-[#0d0a21] border border-[#00f5ff]/40 shadow-[0_0_50px_rgba(0,245,255,0.25)] rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveAttachment(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all hover:cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <span className="inline-block text-[#00f5ff] text-xs font-semibold px-2 py-0.5 rounded bg-[#00f5ff]/10 border border-[#00f5ff]/20 mb-3 font-mono">
                {activeAttachment.period}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                {activeAttachment.role}
              </h3>
              <p className="text-sm text-[#00f5ff] mb-6 font-semibold">
                {activeAttachment.company}
              </p>

              {/* Attachment Display */}
              <div className="relative mt-4 bg-white/3 border border-white/10 rounded-xl overflow-hidden min-h-[200px] flex flex-col items-center justify-center p-6">
                {activeAttachment.attachmentType === 'pdf' ? (
                  <div className="flex flex-col items-center justify-center text-center py-6 max-w-sm w-full">
                    <div className="p-4 bg-[#00f5ff]/10 rounded-full border border-[#00f5ff]/25 text-[#00f5ff] mb-4 animate-pulse">
                      <FileText className="w-10 h-10" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2 truncate max-w-xs">
                      {activeAttachment.attachmentName || 'Experience Document.pdf'}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-5">
                      This is an official verification document/PDF attached to Sahan's work experience card. Click below to view it in a new tab.
                    </p>
                    <a
                      href={activeAttachment.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 py-2 px-5 text-xs font-semibold hover:cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Document
                    </a>
                  </div>
                ) : (
                  <div className="relative w-full min-h-[250px] max-h-[400px] flex items-center justify-center">
                    <img
                      src={activeAttachment.attachment}
                      alt={activeAttachment.role}
                      className="max-w-full max-h-[400px] object-contain rounded-lg border border-white/5"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
