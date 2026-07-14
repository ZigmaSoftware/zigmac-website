import { useEffect, useId, useRef, useState, useCallback } from "react";
import type { CSSProperties } from "react";
import {
  Beaker,
  Clock,
  Factory,
  Sprout,
  Trash2,
  Users2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import bgstat from "../../assets/website/background-1.png";

interface ImpactMetric {
  id: string;
  icon: LucideIcon;
  x: number;
  y: number;
  dx?: number;
  dy?: number;
  revealStart: number;
  revealEnd: number;
  titleLines: string[];
  descLines: string[];
  countTarget: number;
  countPrefix?: string;
  countSuffix?: string;
  countDecimals?: number;
}

const CHAIN_PATH =
  "M 63,158 L 9,104 Q -3,92 9,80 L 71,18 Q 83,6 95,18 L 157,80 Q 169,92 157,104 L 95,166 Q 83,178 95,190 L 157,252 Q 169,264 181,252 L 243,190 Q 255,178 243,166 L 181,104 Q 169,92 181,80 L 243,18 Q 255,6 267,18 L 329,80 Q 341,92 329,104 L 267,166 Q 255,178 267,190 L 329,252 Q 341,264 353,252 L 415,190 Q 427,178 415,166 L 353,104 Q 341,92 353,80 L 415,18 Q 427,6 439,18 L 501,80 Q 513,92 501,104 L 439,166 Q 427,178 439,190 L 501,252 Q 513,264 525,252 L 587,190 Q 599,178 587,166 L 525,104";

const VIEWBOX = {
  minX: 40,
  minY: 5,
  width: 540,
  height: 280,
} as const;
const SVG_VIEWBOX = `${VIEWBOX.minX} ${VIEWBOX.minY} ${VIEWBOX.width} ${VIEWBOX.height}`;
const CHAIN_ANIMATION_MS = 60000;
const CHAIN_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const ICON_SIZE = 30;
const ICON_GAP = 13;
const TITLE_LINE_HEIGHT = 13;
const DIVIDER_GAP_TOP = 12;
const DIVIDER_GAP_BOTTOM = 11;
const DESC_LINE_HEIGHT = 11;
const DIVIDER_WIDTH = 66;
const TITLE_FONT_SIZE = 11.5;
const DESC_FONT_SIZE = 9;
const DESC_FONT_WEIGHT = 500;
const metrics: ImpactMetric[] = [
  {
    id: "heavy-fabrication",
    icon: Factory,
    x: 83,
    y: 90,
    dx: 2,
    revealStart: 0.005,
    revealEnd: 0.04,
    titleLines: ["Tons"],
    descLines: ["Heavy fabrication", "per part"],
    countTarget: 8,
    countSuffix: "+ Tons",
  },
  {
    id: "casting-forging",
    icon: Trash2,
    x: 173,
    y: 170,
    dx: -2,
    revealStart: 0.02,
    revealEnd: 0.05,
    titleLines: ["mm"],
    descLines: ["Casting and forging", "diameter capability"],
    countTarget: 3500,
    countSuffix: "+ mm",
  },
  {
    id: "gear-cutting",
    icon: Beaker,
    x: 258,
    y: 82,
    dy: 2,
    revealStart: 0.04,
    revealEnd: 0.07,
    titleLines: ["m"],
    descLines: ["Gear hobbing", "diameter"],
    countTarget: 5,
    countSuffix: " m",
  },
  {
    id: "waterjet-cutting",
    icon: Sprout,
    x: 343,
    y: 164,
    dx: 1,
    dy: 2,
    revealStart: 0.06,
    revealEnd: 0.09,
    titleLines: ["mm"],
    descLines: ["Water jet cutting", "thickness"],
    countTarget: 250,
    countSuffix: "+ mm",
  },
  {
    id: "crane-capacity",
    icon: Users2,
    x: 430,
    y: 89,
    dx: -1,
    revealStart: 0.09,
    revealEnd: 0.12,
    titleLines: ["Tons"],
    descLines: ["Material handling", "crane capacity"],
    countTarget: 25,
    countSuffix: "+ Tons",
  },
  {
    id: "tooling-capacity",
    icon: Clock,
    x: 516,
    y: 170,
    dx: 1,
    revealStart: 0.11,
    revealEnd: 0.14,
    titleLines: ["Tools"],
    descLines: ["Simultaneous tool", "manufacturing"],
    countTarget: 10,
    countSuffix: "+ Tools",
  },
];

const COUNT_UP_DURATION_MS = 1800;

const easeInOutCubic = (progress: number) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

const formatCount = (value: number, decimals = 0) =>
  decimals > 0
    ? Number(value.toFixed(decimals)).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
      })
    : Math.floor(value).toLocaleString();

const useCountUp = (
  target: number,
  decimals: number,
  delayMs: number,
  shouldStart: boolean,
  skipAnimation = false,
) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const start = useCallback(() => {
    startTimeRef.current = 0;
    setCount(0);

    const tick = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / COUNT_UP_DURATION_MS, 1);
      const eased = easeInOutCubic(progress);
      setCount(eased * target);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [target]);

  useEffect(() => {
    if (!shouldStart) {
      cancelAnimationFrame(rafRef.current);
      startTimeRef.current = 0;
      setCount(0);
      return;
    }

    if (skipAnimation) {
      cancelAnimationFrame(rafRef.current);
      startTimeRef.current = 0;
      setCount(target);
      return;
    }

    const timer = setTimeout(start, delayMs);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [delayMs, shouldStart, skipAnimation, start, target]);

  return formatCount(count, decimals);
};

const renderMultilineText = (
  lines: string[],
  startY: number,
  lineHeight: number,
  className: string,
  style?: CSSProperties,
  countLine?: { index: number; value: string; suffix: string },
) => (
  <text textAnchor="middle" className={className} style={style}>
    {lines.map((line, index) => (
      <tspan key={`${line}-${index}`} x="0" y={startY + index * lineHeight}>
        {countLine && countLine.index === index
          ? `${countLine.value}${countLine.suffix}`
          : line}
      </tspan>
    ))}
  </text>
);

const clampProgress = (value: number) => Math.max(0, Math.min(1, value));

const formatProgressPercent = (value: number) => {
  const percent = clampProgress(value) * 100;
  return `${Number(percent.toFixed(2))}%`;
};

const getMetricRevealAnimationName = (metric: ImpactMetric, prefix: string) =>
  `${prefix}-${metric.id}-reveal`;

const getMetricRevealKeyframes = (metric: ImpactMetric, prefix: string) => {
  const start = formatProgressPercent(metric.revealStart);
  const end = formatProgressPercent(metric.revealEnd);

  return `
    @keyframes ${getMetricRevealAnimationName(metric, prefix)} {
      0%, ${start} {
        transform: translateY(0) scale(1);
      }
      ${formatProgressPercent((metric.revealStart + metric.revealEnd) / 2)} {
        transform: translateY(-8px) scale(1.06);
      }
      ${end}, 100% {
        transform: translateY(0) scale(1);
      }
    }
  `;
};

const getMetricRevealAnimation = (metric: ImpactMetric, prefix: string) =>
  `${getMetricRevealAnimationName(metric, prefix)} ${CHAIN_ANIMATION_MS}ms ${CHAIN_EASING} both`;

const MobileMetricCard = ({
  metric,
  prefersReducedMotion,
}: {
  metric: ImpactMetric;
  prefersReducedMotion: boolean;
}) => {
  const Icon = metric.icon;
  const [started, setStarted] = useState(prefersReducedMotion);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStarted(true);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const count = useCountUp(
    metric.countTarget,
    metric.countDecimals ?? 0,
    0,
    started,
    prefersReducedMotion,
  );
  const suffix = metric.countSuffix ?? "";
  const titleFirst = `${count}${suffix}`;
  const restLines = metric.titleLines.slice(1);

  return (
    <article
      ref={ref}
      key={metric.id}
      className="rounded-2xl border border-border/70 bg-background/90 p-5 shadow-sm backdrop-blur-sm"
    >
      <Icon width={24} height={24} strokeWidth={1.75} className="text-foreground/70" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-bold leading-tight text-foreground">
        {titleFirst}{restLines.length > 0 ? " " + restLines.join(" ") : ""}
      </h3>
    
    </article>
  );
};

const MobileMetricsGrid = ({ prefersReducedMotion }: { prefersReducedMotion: boolean }) => (
  <div className="grid gap-4 sm:grid-cols-2 md:hidden">
    {metrics.map((metric) => (
      <MobileMetricCard
        key={metric.id}
        metric={metric}
        prefersReducedMotion={prefersReducedMotion}
      />
    ))}
  </div>
);

const MetricNode = ({
  metric,
  hasAnimated,
  shouldAnimate,
  prefersReducedMotion,
  metricAnimationPrefix,
  metricShadowFilterId,
}: {
  metric: ImpactMetric;
  hasAnimated: boolean;
  shouldAnimate: boolean;
  prefersReducedMotion: boolean;
  metricAnimationPrefix: string;
  metricShadowFilterId: string;
}) => {
  const Icon = metric.icon;
  const metricX = metric.x + (metric.dx ?? 0);
  const metricY = metric.y + (metric.dy ?? 0);
  const titleHeight = (metric.titleLines.length - 1) * TITLE_LINE_HEIGHT;
  const descHeight = (metric.descLines.length - 1) * DESC_LINE_HEIGHT;
  const totalHeight =
    ICON_SIZE + ICON_GAP + titleHeight + DIVIDER_GAP_TOP + DIVIDER_GAP_BOTTOM + descHeight;
  const topY = -totalHeight / 2;
  const iconY = topY + ICON_SIZE / 2;
  const titleStartY = topY + ICON_SIZE + ICON_GAP;
  const dividerY = titleStartY + titleHeight + DIVIDER_GAP_TOP;
  const descStartY = dividerY + DIVIDER_GAP_BOTTOM;

  const delayMs = prefersReducedMotion ? 0 : metric.revealStart * CHAIN_ANIMATION_MS;
  const count = useCountUp(
    metric.countTarget,
    metric.countDecimals ?? 0,
    delayMs,
    hasAnimated,
    prefersReducedMotion,
  );

  return (
    <g transform={`translate(${metricX}, ${metricY})`}>
      <g
        style={{
          opacity: 1,
          transformOrigin: "center",
          transformBox: "fill-box",
          animation: shouldAnimate
            ? getMetricRevealAnimation(metric, metricAnimationPrefix)
            : undefined,
          filter: `url(#${metricShadowFilterId})`,
        }}
      >
        <Icon
          x={-ICON_SIZE / 2}
          y={iconY - ICON_SIZE / 2}
          width={ICON_SIZE}
          height={ICON_SIZE}
          strokeWidth={1.35}
          className="text-foreground/70"
        />
        {renderMultilineText(
          metric.titleLines,
          titleStartY,
          TITLE_LINE_HEIGHT,
          "fill-slate-800 font-bold dark:fill-foreground",
          { fontSize: TITLE_FONT_SIZE },
          { index: 0, value: count, suffix: metric.countSuffix ?? "" },
        )}
        <line
          x1={-DIVIDER_WIDTH / 2}
          y1={dividerY}
          x2={DIVIDER_WIDTH / 2}
          y2={dividerY}
          stroke="hsl(var(--foreground) / 0.3)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {renderMultilineText(
          metric.descLines,
          descStartY,
          DESC_LINE_HEIGHT,
          "fill-foreground font-medium",
          { fontSize: DESC_FONT_SIZE, fontWeight: DESC_FONT_WEIGHT },
        )}
      </g>
    </g>
  );
};

const ChainGraphic = ({
  hasAnimated,
  prefersReducedMotion,
}: {
  hasAnimated: boolean;
  prefersReducedMotion: boolean;
}) => {
  const graphicId = useId().replace(/:/g, "");
  const chainAnimationName = `${graphicId}-chain-draw`;
  const metricAnimationPrefix = `${graphicId}-metric`;
  const titleId = `${graphicId}-chain-graphic-title`;
  const shapeId = `${graphicId}-stats-chain-shape`;
  const chainGlowFilterId = `${graphicId}-chain-glow`;
  const metricShadowFilterId = `${graphicId}-metric-shadow`;
  const metricRevealKeyframes = metrics
    .map((metric) => getMetricRevealKeyframes(metric, metricAnimationPrefix))
    .join("\n");
  const shouldAnimate = hasAnimated && !prefersReducedMotion;
  const chainStrokeStyle = {
    strokeDasharray: 4000,
    strokeDashoffset: prefersReducedMotion ? 0 : 4000,
    animation: shouldAnimate
      ? `${chainAnimationName} ${CHAIN_ANIMATION_MS}ms ${CHAIN_EASING} forwards`
      : undefined,
  };

  return (
    <div className="pb-2">
      <style>{`
        @keyframes ${chainAnimationName} {
          to {
            stroke-dashoffset: 0;
          }
        }
        ${metricRevealKeyframes}
      `}</style>
      <svg
        viewBox={SVG_VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby={titleId}
        className="mx-auto block w-full max-w-[760px] overflow-visible"
      >
        {/* <title id={titleId}>Z</title> */}
        <defs>
          <path id={shapeId} d={CHAIN_PATH} />
          <filter id={chainGlowFilterId} x="-10%" y="-18%" width="120%" height="136%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="hsl(var(--foreground))"
              floodOpacity="0.12"
            />
          </filter>
          <filter id={metricShadowFilterId} x="-24%" y="-24%" width="148%" height="160%">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="10"
              floodColor="#020617"
              floodOpacity="0.14"
            />
          </filter>
        </defs>

        <use
          href={`#${shapeId}`}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ ...chainStrokeStyle, filter: `url(#${chainGlowFilterId})` }}
        />
        <use
          href={`#${shapeId}`}
          fill="none"
          stroke="hsl(var(--background))"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={chainStrokeStyle}
        />

        {metrics.map((metric) => (
          <MetricNode
            key={metric.id}
            metric={metric}
            hasAnimated={hasAnimated}
            shouldAnimate={shouldAnimate}
            prefersReducedMotion={prefersReducedMotion}
            metricAnimationPrefix={metricAnimationPrefix}
            metricShadowFilterId={metricShadowFilterId}
          />
        ))}
      </svg>
    </div>
  );
};

const StatsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasAnimated(true);
      return;
    }

    const element = statsRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const videoSrc = "/videos/Machinery%20video.webm";

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-scroll opacity-[0.18]"
        style={{ backgroundImage: `url(${bgstat})` }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-background/70" />

      <div className="container-main relative z-10 py-16 md:py-10">
        <div className="mb-10 text-center md:mb-14">
          <p className="mt-8 text-xs uppercase tracking-[0.35em] text-muted-foreground md:text-sm">
            Why Zigmac
          </p>
          <h2
            data-fly-target="stats"
            className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl"
          >
            Proven Manufacturing <span className="text-primary">Range</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-md leading-relaxed text-muted-foreground md:text-lg">
            Our manufacturing ecosystem combines heavy fabrication, machining, cutting, tool room, heat treatment and inspection capability for demanding MSW plant equipment.
          </p>
        </div>

        <div ref={statsRef} className="w-full">
          <MobileMetricsGrid prefersReducedMotion={prefersReducedMotion} />
          <div className="hidden md:block">
            <ChainGraphic
              hasAnimated={hasAnimated}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </div>

      <div className="group relative mx-auto w-full overflow-hidden border border-border shadow-xl">
        <div className="relative w-full pt-[56.25%]">
          {videoPlaying ? (
            <video
              src={videoSrc}
              title="Zigmac "
              className="absolute inset-0 h-full w-full"
              controls
              autoPlay
              playsInline
            />
          ) : (
            <button
              className="absolute inset-0 h-full w-full bg-black flex items-center justify-center group/play"
              onClick={() => setVideoPlaying(true)}
              aria-label="Play video"
            >
              <video
                src={videoSrc}
                className="absolute inset-0 h-full w-full object-cover opacity-70"
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover/play:bg-white/30 transition">
                <svg className="h-7 w-7 text-white fill-white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
