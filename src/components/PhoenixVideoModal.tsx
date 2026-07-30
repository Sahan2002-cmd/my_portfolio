'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

export default function PhoenixVideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Check if the user has already seen the intro video in this session
    const hasSeenVideo = sessionStorage.getItem('hasSeenPhoenixVideo');

    const handleFirstClick = () => {
      if (sessionStorage.getItem('hasSeenPhoenixVideo')) return;
      sessionStorage.setItem('hasSeenPhoenixVideo', 'true');
      setIsOpen(true);
    };

    if (!hasSeenVideo) {
      window.addEventListener('click', handleFirstClick, { capture: true, once: true });
    }

    return () => {
      window.removeEventListener('click', handleFirstClick, { capture: true });
    };
  }, []);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#09051b] border border-[#00f5ff]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,245,255,0.2)]">
        {/* Top Controls Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 hover:border-[#00f5ff] transition-all cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-[#00f5ff]" />}
          </button>
          <button
            onClick={handleClose}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 hover:border-rose-500 hover:text-rose-400 transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src="/assets/phoenix_video.mp4"
            autoPlay
            playsInline
            onEnded={handleClose}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-[#0a0624] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-ping" />
            Phoenix Video Intro
          </span>
          <button
            onClick={handleClose}
            className="text-xs text-[#00f5ff] hover:underline font-semibold cursor-pointer"
          >
            Skip Intro &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
