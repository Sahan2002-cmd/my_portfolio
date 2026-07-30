'use client';

import { useState, useEffect, useRef } from 'react';

export default function PhoenixVideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const hasSeenVideo = sessionStorage.getItem('hasSeenPhoenixVideo');
    
    if (!hasSeenVideo) {
      // Mark as seen and open modal immediately on page load
      sessionStorage.setItem('hasSeenPhoenixVideo', 'true');
      setIsOpen(true);
    }
  }, []);

  // When modal opens, try to play
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay blocked, just show the modal
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black animate-fade-in">
      {/* Video Player — muted by default to satisfy browser autoplay policy */}
      <video
        ref={videoRef}
        src="/assets/phoenix_video.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleClose}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Skip Button */}
      <button
        onClick={handleClose}
        className="absolute bottom-8 right-8 z-20 px-6 py-2.5 bg-black/50 hover:bg-black/80 text-white text-sm font-semibold tracking-wider uppercase border border-white/20 hover:border-[#00f5ff] rounded-full backdrop-blur-md transition-all cursor-pointer"
      >
        Skip Intro &rarr;
      </button>
    </div>
  );
}
