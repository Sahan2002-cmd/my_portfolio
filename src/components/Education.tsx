'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { GraduationCap, Award, X, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const defaultEducation = [
  {
    role: 'Bachelor of Science (Hons.) in Information Technology',
    company: 'Sri Lanka Institute of Information Technology',
    period: '2023 - 2027',
    description: 'Specializing in Information Technology with focus on software development, AI/ML, and full-stack web development.',
  },
  {
    role: 'G.C.E. Advanced Level Examination',
    company: 'Sri Subhuthi National School',
    period: '2021',
    description: 'Science For Technology - B | ICT - C | Engineering Technology - C',
  },
];

const defaultCertificates = [
  {
    title: 'Python Programming Certificate',
    organization: 'University of Moratuwa',
    year: '2026',
    imageKey: 'python',
  },
  {
    title: 'Machine Learning using Python',
    organization: 'Simplilearn',
    year: '2026',
    imageKey: 'ml',
  },
  {
    title: 'AI/ML Engineer Stage 1',
    organization: 'SLIIT',
    year: '2026',
    imageKey: 'aiml',
  },
  {
    title: 'Cyber Security Essentials',
    organization: 'VTA',
    year: '2018',
    imageKey: 'cyber',
  },
  {
    title: 'IT Essentials',
    organization: 'VTA',
    year: '2018',
    imageKey: 'it',
  },
  {
    title: 'Computer Based Application',
    organization: 'VTA',
    year: '2018',
    imageKey: 'cba',
  },
];

export default function Education() {
  const { experience, certificates } = useSelector((state: any) => state.portfolio);
  const [activeCert, setActiveCert] = useState<any | null>(null);
  const [activeEduAttachment, setActiveEduAttachment] = useState<any | null>(null);

  const getStatusBadge = (status?: string) => {
    const s = status || 'Finished';
    if (s === 'Continue') {
      return (
        <span className="text-[10px] md:text-xxs px-2 py-0.5 rounded-full font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
          In Progress
        </span>
      );
    }
    if (s === 'Hold') {
      return (
        <span className="text-[10px] md:text-xxs px-2 py-0.5 rounded-full font-semibold bg-slate-500/10 border border-slate-500/20 text-slate-300">
          On Hold
        </span>
      );
    }
    if (s === 'Stop') {
      return (
        <span className="text-[10px] md:text-xxs px-2 py-0.5 rounded-full font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-400">
          Stopped
        </span>
      );
    }
    return (
      <span className="text-[10px] md:text-xxs px-2 py-0.5 rounded-full font-semibold bg-[#00f5ff]/10 border border-[#00f5ff]/20 text-[#00f5ff]">
        Completed
      </span>
    );
  };

  const educationItems = experience && experience.length > 0
    ? [...experience].filter((exp: any) => exp.type === 'education').sort((a: any, b: any) => a.order - b.order)
    : defaultEducation;

  const certificateItems = certificates && certificates.length > 0
    ? certificates
    : defaultCertificates;

  // Resolve certificate image file path
  const getCertImagePath = (key: string) => {
    if (key === 'ml') {
      return '/assets/images/certificates/ml-cert.jpg';
    }
    // No images exist for other certificates in the backup assets, return null or fallback
    return null;
  };

  return (
    <section
      id="education"
      className="min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 relative"
    >
      <div className="glass-card max-w-4xl w-full p-8 md:p-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#00f5ff]/10 rounded-lg border border-[#00f5ff]/25 text-[#00f5ff]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Education</h2>
            </div>

            <div className="space-y-6">
              {educationItems.map((edu: any, index: number) => (
                <div
                  key={edu._id || index}
                  className="p-5 bg-white/2 hover:bg-white/4 border border-white/5 hover:border-[#00f5ff]/20 rounded-xl transition-all duration-300"
                >
                  <span className="inline-block text-[#00f5ff] text-xs font-semibold px-2 py-0.5 rounded bg-[#00f5ff]/10 border border-[#00f5ff]/20 mb-3">
                    {edu.period}
                  </span>
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h4 className="text-base md:text-lg font-bold text-white leading-snug">
                      {edu.role}
                    </h4>
                    {edu.attachment && (
                      <button
                        onClick={() => setActiveEduAttachment(edu)}
                        className="p-1.5 text-gray-400 hover:text-[#00f5ff] hover:bg-white/5 border border-white/10 rounded-lg transition-all hover:cursor-pointer flex-shrink-0"
                        title="View Document"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <h5 className="text-xs md:text-sm font-semibold text-gray-400 mb-3">
                    {edu.company}
                  </h5>
                  {edu.description && (
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#00f5ff]/10 rounded-lg border border-[#00f5ff]/25 text-[#00f5ff]">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Certifications</h2>
            </div>

            <p className="text-gray-400 text-xs md:text-sm mb-6">
              Click on any certificate to view details or credentials.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              {certificateItems.map((cert: any, index: number) => (
                <button
                  key={cert._id || index}
                  onClick={() => setActiveCert(cert)}
                  className="flex items-center justify-between p-4 bg-white/2 hover:bg-[#00f5ff]/10 border border-white/5 hover:border-[#00f5ff]/40 rounded-xl transition-all duration-300 group text-left w-full hover:-translate-y-0.5"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h4 className="text-xs md:text-sm font-bold text-white group-hover:text-[#00f5ff] transition-colors leading-snug">
                        {cert.title}
                      </h4>
                      {getStatusBadge(cert.status)}
                    </div>
                    <p className="text-gray-400 text-xxs md:text-xs">
                      {cert.organization} &bull; {cert.year}
                    </p>
                  </div>
                  <FileText className="w-4 h-4 text-gray-500 group-hover:text-[#00f5ff] transition-colors flex-shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative bg-[#0d0a21] border border-[#00f5ff]/40 shadow-[0_0_50px_rgba(0,245,255,0.25)] rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <span className="inline-block text-[#00f5ff] text-xs font-semibold px-2 py-0.5 rounded bg-[#00f5ff]/10 border border-[#00f5ff]/20 mb-3">
                {activeCert.year}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                {activeCert.title}
              </h3>
              <p className="text-sm text-[#00f5ff] mb-6 font-semibold">
                Issued by {activeCert.organization}
              </p>

              {/* Certificate Image or Fallback */}
              <div className="relative mt-4 bg-white/3 border border-white/10 rounded-xl overflow-hidden min-h-[200px] flex flex-col items-center justify-center p-6">
                {activeCert.attachment ? (
                  activeCert.attachmentType === 'pdf' ? (
                    <div className="flex flex-col items-center justify-center text-center py-6 max-w-sm w-full">
                      <div className="p-4 bg-[#00f5ff]/10 rounded-full border border-[#00f5ff]/25 text-[#00f5ff] mb-4 animate-pulse">
                        <FileText className="w-10 h-10" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2 truncate max-w-xs">
                        {activeCert.attachmentName || 'Certificate Document.pdf'}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-5">
                        This is an official verification document/PDF uploaded by the administrator. Click below to view it in a new tab.
                      </p>
                      <a
                        href={activeCert.attachment}
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
                        src={activeCert.attachment}
                        alt={activeCert.title}
                        className="max-w-full max-h-[400px] object-contain rounded-lg border border-white/5"
                      />
                    </div>
                  )
                ) : getCertImagePath(activeCert.imageKey) ? (
                  <div className="relative w-full h-[300px]">
                    <Image
                      src={getCertImagePath(activeCert.imageKey)!}
                      alt={activeCert.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center max-w-sm">
                    <div className="p-4 bg-[#00f5ff]/10 rounded-full border border-[#00f5ff]/25 text-[#00f5ff] mb-4">
                      <ImageIcon className="w-10 h-10" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2">Verified Credential</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      This certificate is verified by SLIIT/VTA/University of Moratuwa. The formal documentation resides in Sahan&apos;s academic transcript portfolio.
                    </p>
                    {activeCert.credentialId && (
                      <span className="text-xxs font-mono bg-white/5 text-gray-300 px-3 py-1 rounded border border-white/10">
                        Cred ID: {activeCert.credentialId}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Education Experience Attachment Modal */}
      {activeEduAttachment && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveEduAttachment(null)}
        >
          <div
            className="relative bg-[#0d0a21] border border-[#00f5ff]/40 shadow-[0_0_50px_rgba(0,245,255,0.25)] rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveEduAttachment(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all hover:cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <span className="inline-block text-[#00f5ff] text-xs font-semibold px-2 py-0.5 rounded bg-[#00f5ff]/10 border border-[#00f5ff]/20 mb-3 font-mono">
                {activeEduAttachment.period}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                {activeEduAttachment.role}
              </h3>
              <p className="text-sm text-[#00f5ff] mb-6 font-semibold">
                {activeEduAttachment.company}
              </p>

              {/* Attachment Display */}
              <div className="relative mt-4 bg-white/3 border border-white/10 rounded-xl overflow-hidden min-h-[200px] flex flex-col items-center justify-center p-6">
                {activeEduAttachment.attachmentType === 'pdf' ? (
                  <div className="flex flex-col items-center justify-center text-center py-6 max-w-sm w-full">
                    <div className="p-4 bg-[#00f5ff]/10 rounded-full border border-[#00f5ff]/25 text-[#00f5ff] mb-4 animate-pulse">
                      <FileText className="w-10 h-10" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2 truncate max-w-xs">
                      {activeEduAttachment.attachmentName || 'Education Document.pdf'}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-5">
                      This is an official verification document/PDF attached to Sahan's education card. Click below to view it in a new tab.
                    </p>
                    <a
                      href={activeEduAttachment.attachment}
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
                      src={activeEduAttachment.attachment}
                      alt={activeEduAttachment.role}
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
