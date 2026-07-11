import React, { useState } from 'react';

interface ComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  isComparison?: boolean;
  showOngoingBadge?: boolean;
}

/**
 * Before/After comparison slider component
 */
export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeSrc,
  afterSrc,
  isComparison = true,
  showOngoingBadge = true,
}) => {
  const [revealed, setRevealed] = useState(false);
  const sliderPos = revealed ? '100%' : '15%';

  if (!isComparison) {
    // For ongoing projects, just show the image with status badge
    return (
      <div className="relative flex-1 min-h-[520px] h-full w-full overflow-hidden select-none bg-slate-950">
        <img
          src={beforeSrc}
          alt="Project"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(130deg,rgba(0,0,0,.25) 0%,transparent 55%)' }}
        />
        {showOngoingBadge && (
          <span className="absolute left-3 top-3 z-[15] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-bold tracking-widest bg-orange-400/90 border border-orange-200/70 text-white shadow-lg shadow-orange-900/30 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            Ongoing
          </span>
        )}
      </div>
    );
  }

  // Comparison mode with slider
  return (
    <div
      className="relative flex-1 min-h-[520px] h-full w-full cursor-pointer overflow-hidden select-none bg-slate-950"
      onClick={() => setRevealed((r) => !r)}
    >
      {/* After panel (base) */}
      <div className="absolute inset-0 z-[5]">
        <img
          src={afterSrc}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover transition-transform [transition-duration:800ms]"
          style={{ transform: revealed ? 'scale(1)' : 'scale(1.08)' }}
          draggable={false}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(310deg,rgba(0,40,10,.2) 0%,transparent 55%)' }}
        />
      </div>

      {/* Before panel (clipped overlay) */}
      <div
        className="absolute inset-0 z-[10] transition-all [transition-duration:800ms]"
        style={{
          clipPath: `inset(0 calc(100% - ${sliderPos}) 0 0 round 0 ${revealed ? '0px' : '20px'} ${revealed ? '0px' : '20px'} 0)`,
          transition: 'clip-path 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <img
          src={beforeSrc}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover transition-transform [transition-duration:800ms]"
          style={{ transform: revealed ? 'scale(1.04)' : 'scale(1)' }}
          draggable={false}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(130deg,rgba(0,0,0,.25) 0%,transparent 55%)' }}
        />
      </div>

      {/* Shadow on before-panel edge */}
      <div
        className="absolute top-0 bottom-0 z-[11] pointer-events-none transition-all [transition-duration:800ms]"
        style={{
          left: 0,
          width: sliderPos,
          boxShadow: revealed ? '-5px 0 22px rgba(0,0,0,.5)' : '10px 0 30px rgba(0,0,0,.4)',
          borderRadius: revealed ? '0' : '0 20px 20px 0',
          transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1), border-radius 0.8s, box-shadow 0.8s',
        }}
      />

      {/* Labels */}
      <span className="absolute left-3 top-3 z-[15] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-bold tracking-widest bg-black/50 border border-white/20 text-white backdrop-blur-sm">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Before
      </span>
      <span className="absolute right-3 top-3 z-[15] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-bold tracking-widest bg-primary/90 border border-white/20 text-white backdrop-blur-sm">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        After
      </span>

      {/* Click hint */}
      <span
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[12] pointer-events-none rounded-full p-1 text-[0.50rem] font-bold tracking-wide bg-black/60 text-white"
        style={{ opacity: revealed ? 0.5 : 0.85, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }}
      >
        {revealed ? 'Click to Hide' : 'Click to Reveal Before Image'}
      </span>
    </div>
  );
};
