'use client';

import { useState, useEffect, useRef } from 'react';

export default function PhoenixVideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const hasSeenVideo = sessionStorage.getItem('hasSeenPhoenixVideo');
    if (!hasSeenVideo) {
      sessionStorage.setItem('hasSeenPhoenixVideo', 'true');
      setIsOpen(true);
    }
  }, []);

  // Attempt autoplay when modal opens
  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    const video = videoRef.current;

    const attemptPlay = () => {
      video.play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // Autoplay blocked (common on mobile) — show tap-to-play UI
          setAutoplayBlocked(true);
          setIsPlaying(false);
        });
    };

    // Wait until the video has enough data before trying to play
    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener('canplay', attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', attemptPlay);
    };
  }, [isOpen]);

  const handleTapToPlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        // Still blocked — close modal so the user isn't stuck
        handleClose();
      });
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
    setIsPlaying(false);
    setAutoplayBlocked(false);
    setIsLoading(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black animate-fade-in">
      {/* Video Player */}
      <video
        ref={videoRef}
        src="/assets/phoenix_video.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleClose}
        onCanPlay={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => { setIsLoading(false); setIsPlaying(true); }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Loading Spinner — shown while buffering */}
      {isLoading && !autoplayBlocked && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Tap-to-Play Overlay — shown when autoplay is blocked (mobile) */}
      {autoplayBlocked && (
        <button
          onClick={handleTapToPlay}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 w-full h-full bg-black/60 backdrop-blur-sm"
          aria-label="Tap to play video"
        >
          {/* Play Icon */}
          <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/40 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95">
            <svg
              className="w-9 h-9 text-white translate-x-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-white/80 text-sm font-semibold tracking-widest uppercase">
            Tap to Play
          </p>
        </button>
      )}

      {/* Skip Button — large touch-friendly target for mobile */}
      <button
        onClick={handleClose}
        className="absolute bottom-8 right-4 sm:right-8 z-20 px-6 py-3 sm:py-2.5 bg-black/50 hover:bg-black/80 active:bg-black/90 text-white text-sm font-semibold tracking-wider uppercase border border-white/20 hover:border-[#00f5ff] rounded-full backdrop-blur-md transition-all cursor-pointer select-none"
        style={{ minWidth: '120px', minHeight: '48px' }}
      >
        Skip Intro &rarr;
      </button>
    </div>
  );
}
