'use client';

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-bg-primary">
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Ambient Radial Glowing Orbs */}
      <div 
        className="absolute top-[-15%] left-[-15%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full blur-[110px] animate-drift-1"
        style={{
          background: 'radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)',
          opacity: 'var(--blob-opacity)',
        }}
      />
      <div 
        className="absolute bottom-[-15%] right-[-15%] w-[75vw] h-[75vw] max-w-[900px] max-h-[900px] rounded-full blur-[120px] animate-drift-2"
        style={{
          background: 'radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)',
          opacity: 'var(--blob-opacity)',
        }}
      />
    </div>
  );
}

