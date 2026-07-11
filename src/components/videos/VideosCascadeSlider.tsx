import { useCallback, useEffect, useRef } from "react";
import { Play } from "lucide-react";

export interface VideoCascadeSlide {
  id: string;
  title: string;
  label: string;
  poster: string;
  src: string;
}

type SlidePosition = "now" | "prev" | "next" | "hidden";

interface VideosCascadeSliderProps {
  slides: VideoCascadeSlide[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onPlayVideo?: (video: VideoCascadeSlide) => void;
  paused?: boolean;
}

function getPosition(index: number, current: number, total: number): SlidePosition {
  if (index === current) return "now";
  if (index === (current - 1 + total) % total) return "prev";
  if (index === (current + 1) % total) return "next";
  return "hidden";
}

const POSITION_CLASSES: Record<SlidePosition, string> = {
  now: "opacity-100 z-10 [transform:translateY(-50%)_translateX(-50%)_scale(1)]",
  prev: "hidden md:block opacity-100 z-[1] [transform:translateY(-50%)_translateX(calc(-50%-240px))_scale(0.84)] lg:[transform:translateY(-50%)_translateX(calc(-50%-300px))_scale(0.84)]",
  next: "hidden md:block opacity-100 z-[1] [transform:translateY(-50%)_translateX(calc(-50%+240px))_scale(0.84)] lg:[transform:translateY(-50%)_translateX(calc(-50%+300px))_scale(0.84)]",
  hidden: "opacity-0 z-0 pointer-events-none [transform:translateY(-50%)_translateX(-50%)_scale(0.7)]",
};

function ChevronLeft() {
  return (
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

interface VideoSlideCardProps {
  slide: VideoCascadeSlide;
  position: SlidePosition;
  onClick: () => void;
  onPlayVideo?: (video: VideoCascadeSlide) => void;
}

function VideoSlideCard({ slide, position, onClick, onPlayVideo }: VideoSlideCardProps) {
  return (
    <div
      className={[
        `absolute left-1/2 top-1/2 w-[88vw] max-w-[560px] transition-[transform,opacity,filter] [transition-duration:1400ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] will-change-transform`,
        position === "prev" || position === "next" ? "brightness-[0.9]" : "brightness-100",
        POSITION_CLASSES[position],
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onClick}
        className="group w-full overflow-hidden rounded-2xl border border-border bg-card text-left"
      >
        <div className="relative h-[300px] bg-slate-100 p-3 md:h-[320px] lg:h-[360px]">
          <img
            src={slide.poster}
            alt={slide.title}
            className="h-full w-full object-cover rounded-lg transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg" />
          
          {/* Play Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlayVideo?.(slide);
            }}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur transition-transform hover:scale-110 group-hover:scale-110"
            aria-label={`Play ${slide.title}`}
          >
            <Play size={20} fill="currentColor" className="ml-0.5" />
          </button>
        </div>
      </button>
    </div>
  );
}

const VideosCascadeSlider = ({
  slides,
  currentIndex,
  onIndexChange,
  onPlayVideo,
  paused = false,
}: VideosCascadeSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % slides.length);
  }, [currentIndex, onIndexChange, slides.length]);

  const goPrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, onIndexChange, slides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const interval = setInterval(goNext, 3000);
    return () => clearInterval(interval);
  }, [goNext, paused, slides.length]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-5xl px-10 md:px-16"
      >
        {/* Navigation Buttons - Left */}
        {slides.length > 1 && (
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-border md:h-12 md:w-12"
          aria-label="Previous video"
        >
          <ChevronLeft />
        </button>
        )}

        {/* Slides Container */}
        <div className="relative h-[360px] w-full md:h-[400px] lg:h-[420px]">
          {slides.map((slide, index) => {
            const position = getPosition(index, currentIndex, slides.length);

            return (
              <VideoSlideCard
                key={slide.id}
                slide={slide}
                position={position}
                onClick={() => onIndexChange(index)}
                onPlayVideo={onPlayVideo}
              />
            );
          })}
        </div>

        {/* Navigation Buttons - Right */}
        {slides.length > 1 && (
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-border md:h-12 md:w-12"
          aria-label="Next video"
        >
          <ChevronRight />
        </button>
        )}
      </div>
    </div>
  );
};

export default VideosCascadeSlider;
