import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Leaf, Recycle, Sparkles, Sprout, Trees, Wind } from "lucide-react";

import { isLandPoint } from "./landMaskLookup";

type GlobeCard = {
  lat: number;
  lng: number;
  iconBg: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
};

type GlobePoint = {
  lat: number;
  lng: number;
  sinLat: number;
  cosLat: number;
  sinLng: number;
  cosLng: number;
};

type LandPoint = GlobePoint & {
  color: readonly [number, number, number];
};

type CloudPoint = GlobePoint & {
  density: number;
  tilt: number;
};

type OceanPoint = GlobePoint;

type CanvasState = {
  ctx: CanvasRenderingContext2D;
  size: number;
  landPoints: LandPoint[];
  oceanPoints: OceanPoint[];
  cloudPoints: CloudPoint[];
};

const GLOBE_RADIUS_RATIO = 0.42;
const ROTATION_SPEED = 0.008;
const DRAG_ROTATION_SPEED = 0.008;
const LAND_SPACING_DEG = 2.4;
const CLOUD_SPACING_DEG = 3;
const OCEAN_SPACING_DEG = 9;
const GLOBE_FRAME_MS = 1000 / 15;
const CARD_FRAME_MS = 1000 / 10;
const SCROLL_PAUSE_MS = 180;

const CARDS: GlobeCard[] = [
  {
    lat: 21,
    lng: 78,
    iconBg: "#168A4B",
    icon: <Recycle className="h-[18px] w-[18px]" />,
    title: "Waste to value",
    subtitle: "Organic streams recovered",
  },
  {
    lat: 8,
    lng: 47,
    iconBg: "#247C52",
    icon: <Wind className="h-[18px] w-[18px]" />,
    title: "Cleaner air",
    subtitle: "Lower landfill emissions",
  },
  {
    lat: 37,
    lng: -7,
    iconBg: "#2E7D64",
    icon: <Sprout className="h-[18px] w-[18px]" />,
    title: "Living soil",
    subtitle: "Frass biofertiliser",
  },
  {
    lat: -15,
    lng: -46,
    iconBg: "#6D8B32",
    icon: <Leaf className="h-[18px] w-[18px]" />,
    title: "Natural manure",
    subtitle: "Chemical-free nutrition",
  },
  {
    lat: 28,
    lng: -108,
    iconBg: "#2F6F45",
    icon: <Trees className="h-[18px] w-[18px]" />,
    title: "Greener cities",
    subtitle: "Circular local systems",
  },
  {
    lat: -31,
    lng: 124,
    iconBg: "#A07A28",
    icon: <Sparkles className="h-[18px] w-[18px]" />,
    title: "Zero residue",
    subtitle: "Every output reused",
  },
];

function terrainNoise(lat: number, lng: number) {
  return (
    Math.sin(lat * 0.37 + lng * 0.19) * 0.35 +
    Math.cos(lat * 0.15 - lng * 0.31) * 0.35 +
    Math.sin((lat + lng) * 0.08) * 0.3
  );
}

function makeGlobePoint(lat: number, lng: number): GlobePoint {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  return {
    lat,
    lng,
    sinLat: Math.sin(latRad),
    cosLat: Math.cos(latRad),
    sinLng: Math.sin(lngRad),
    cosLng: Math.cos(lngRad),
  };
}

function projectGlobePoint(point: GlobePoint, sinRotation: number, cosRotation: number) {
  return {
    x: point.cosLat * (point.sinLng * cosRotation + point.cosLng * sinRotation),
    y: point.sinLat,
    z: point.cosLat * (point.cosLng * cosRotation - point.sinLng * sinRotation),
  };
}

function resolveLandColor(lat: number, terrain: number): readonly [number, number, number] {
  if (terrain > 0.62) return [210, 203, 171];
  if (terrain > 0.28 || Math.abs(lat) > 38) return [181, 145, 82];
  return [42, 139, 82];
}

function buildLandPoints(): LandPoint[] {
  const points: LandPoint[] = [];

  for (let lat = -84; lat <= 84; lat += LAND_SPACING_DEG) {
    for (let lng = -180; lng < 180; lng += LAND_SPACING_DEG) {
      if (isLandPoint(lat, lng)) {
        const terrain = terrainNoise(lat, lng);
        points.push({
          ...makeGlobePoint(lat, lng),
          color: resolveLandColor(lat, terrain),
        });
      }
    }
  }

  return points;
}

function buildCloudPoints(): CloudPoint[] {
  const points: CloudPoint[] = [];

  for (let lat = -58; lat <= 58; lat += CLOUD_SPACING_DEG) {
    for (let lng = -180; lng < 180; lng += CLOUD_SPACING_DEG) {
      const stream =
        Math.sin((lng + lat * 3.2) * 0.055) +
        Math.cos((lng * 0.8 - lat * 4.4) * 0.042);
      const storm =
        Math.sin((lng + 18) * 0.12) * Math.cos((lat - 8) * 0.18) +
        Math.sin((lng - 112) * 0.09) * Math.cos((lat + 23) * 0.15);
      const density = stream * 0.42 + storm * 0.28 + Math.sin((lat + lng) * 0.19) * 0.18;

      if (density > 0.42) {
        points.push({
          ...makeGlobePoint(lat, lng),
          density: Math.min(1, density),
          tilt: Math.sin((lng * Math.PI) / 180) * 0.7,
        });
      }
    }
  }

  return points;
}

function buildOceanPoints(): OceanPoint[] {
  const points: OceanPoint[] = [];

  for (let lat = -70; lat <= 70; lat += OCEAN_SPACING_DEG) {
    for (let lng = -180; lng < 180; lng += OCEAN_SPACING_DEG) {
      if (!isLandPoint(lat, lng)) {
        points.push(makeGlobePoint(lat, lng));
      }
    }
  }

  return points;
}

let cachedLandPoints: LandPoint[] | undefined;
let cachedOceanPoints: OceanPoint[] | undefined;
let cachedCloudPoints: CloudPoint[] | undefined;

function getLandPoints() {
  cachedLandPoints ??= buildLandPoints();
  return cachedLandPoints;
}

function getOceanPoints() {
  cachedOceanPoints ??= buildOceanPoints();
  return cachedOceanPoints;
}

function getCloudPoints() {
  cachedCloudPoints ??= buildCloudPoints();
  return cachedCloudPoints;
}

function latLngToVec3(latDeg: number, lngDeg: number, rotation: number) {
  const lat = (latDeg * Math.PI) / 180;
  const lng = (lngDeg * Math.PI) / 180 + rotation;

  return {
    x: Math.cos(lat) * Math.sin(lng),
    y: Math.sin(lat),
    z: Math.cos(lat) * Math.cos(lng),
  };
}

function drawGlobe(
  ctx: CanvasRenderingContext2D,
  size: number,
  rotation: number,
  landPoints: LandPoint[],
  oceanPoints: OceanPoint[],
  cloudPoints: CloudPoint[],
) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * GLOBE_RADIUS_RATIO;

  ctx.clearRect(0, 0, size, size);

  const baseGradient = ctx.createRadialGradient(
    cx - radius * 0.36,
    cy - radius * 0.5,
    radius * 0.1,
    cx,
    cy,
    radius * 1.08,
  );
  baseGradient.addColorStop(0, "#66B8E7");
  baseGradient.addColorStop(0.28, "#1F87C6");
  baseGradient.addColorStop(0.68, "#0F5F9E");
  baseGradient.addColorStop(1, "#083D70");

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = baseGradient;
  ctx.fill();

  const sinRotation = Math.sin(rotation);
  const cosRotation = Math.cos(rotation);
  const cloudRotation = rotation * 1.12 + 0.24;
  const sinCloudRotation = Math.sin(cloudRotation);
  const cosCloudRotation = Math.cos(cloudRotation);

  oceanPoints.forEach((point) => {
    const { x, y, z } = projectGlobePoint(point, sinRotation, cosRotation);
    if (z < 0.08) return;
    const px = cx + x * radius;
    const py = cy - y * radius;
    const alpha = Math.max(0, Math.min(0.16, z * 0.1));
    ctx.beginPath();
    ctx.fillStyle = `rgba(180,225,244,${alpha.toFixed(3)})`;
    ctx.arc(px, py, 0.7 + z * 0.7, 0, Math.PI * 2);
    ctx.fill();
  });

  landPoints.forEach((point) => {
    const { x, y, z } = projectGlobePoint(point, sinRotation, cosRotation);
    if (z < -0.05) return;

    const px = cx + x * radius;
    const py = cy - y * radius;
    const light = Math.max(0, Math.min(1, (x * -0.35 + y * 0.58 + z * 0.78 + 0.35) / 1.45));
    const color = point.color;
    const shade = 0.58 + light * 0.56;
    const alpha = 0.65 + light * 0.28;
    const dotSize = 2.4 + light * 1.15;

    ctx.beginPath();
    ctx.fillStyle = `rgba(${Math.round(color[0] * shade)}, ${Math.round(
      color[1] * shade,
    )}, ${Math.round(color[2] * shade)}, ${alpha.toFixed(2)})`;
    ctx.arc(px, py, dotSize, 0, Math.PI * 2);
    ctx.fill();
  });

  cloudPoints.forEach((point) => {
    const { x, y, z } = projectGlobePoint(point, sinCloudRotation, cosCloudRotation);
    if (z < 0.02) return;

    const px = cx + x * radius;
    const py = cy - y * radius;
    const alpha = Math.max(0, Math.min(0.46, (z + 0.12) * point.density * 0.32));
    const cloudSize = 2.2 + point.density * 3.6;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
    ctx.ellipse(px, py, cloudSize * 1.8, cloudSize, point.tilt, 0, Math.PI * 2);
    ctx.fill();
  });

  const highlight = ctx.createRadialGradient(
    cx - radius * 0.42,
    cy - radius * 0.48,
    radius * 0.04,
    cx - radius * 0.28,
    cy - radius * 0.34,
    radius * 0.62,
  );
  highlight.addColorStop(0, "rgba(255,255,255,0.42)");
  highlight.addColorStop(0.45, "rgba(255,255,255,0.12)");
  highlight.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = highlight;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  const edgeGradient = ctx.createRadialGradient(cx, cy, radius * 0.58, cx, cy, radius);
  edgeGradient.addColorStop(0, "rgba(0,0,0,0)");
  edgeGradient.addColorStop(0.68, "rgba(0,0,0,0.06)");
  edgeGradient.addColorStop(1, "rgba(2,19,37,0.46)");
  ctx.fillStyle = edgeGradient;
  ctx.fill();
  ctx.restore();
}

function CheckBadge() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 13l4 4L19 7"
          stroke="#7A827D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    </span>
  );
}

function FloatingCard({
  card,
  size,
  rotation,
}: {
  card: GlobeCard;
  size: number;
  rotation: number;
}) {
  const radius = size * GLOBE_RADIUS_RATIO;
  const { x, y, z } = latLngToVec3(card.lat, card.lng, rotation);
  const visible = z > -0.15;
  const opacity = visible ? Math.max(0, Math.min(1, (z + 0.15) / 0.35)) : 0;
  const cardScale = Math.max(0.72, Math.min(1, size / 560));

  return (
    <div
      className="pointer-events-none absolute flex items-center whitespace-nowrap text-left transition-opacity duration-150"
      style={{
        left: "50%",
        top: "50%",
        opacity,
        transform: `translate(${x * radius - 2}px, ${-y * radius - 2}px) scale(${cardScale})`,
        transformOrigin: "left center",
        willChange: "transform, opacity",
        zIndex: Math.round(z * 100),
      }}
    >
      <div
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-[0_8px_18px_rgba(15,23,42,0.16)]"
        style={{ background: card.iconBg }}
      >
        {card.icon}
      </div>
      <div className="-ml-4 flex items-center gap-4 rounded-[14px] bg-white/90 py-2 pl-7 pr-3 shadow-[0_12px_30px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5 backdrop-blur-md">
        <div>
          <p className="text-sm font-semibold leading-snug text-slate-900">{card.title}</p>
          <p className="text-xs leading-snug text-slate-500">{card.subtitle}</p>
        </div>
        <CheckBadge />
      </div>
    </div>
  );
}

const DottedGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasStateRef = useRef<CanvasState | null>(null);
  const rotationRef = useRef(0);
  const scrollPauseUntilRef = useRef(0);
  const dragRef = useRef({
    isDragging: false,
    pointerId: 0,
    startX: 0,
    startRotation: 0,
  });
  const [size, setSize] = useState(480);
  const [cardRotation, setCardRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const landPoints = useMemo(getLandPoints, []);
  const oceanPoints = useMemo(getOceanPoints, []);
  const cloudPoints = useMemo(getCloudPoints, []);

  const drawCurrentGlobe = useCallback((nextRotation = rotationRef.current) => {
    const state = canvasStateRef.current;
    if (!state) return;

    drawGlobe(
      state.ctx,
      state.size,
      nextRotation,
      state.landPoints,
      state.oceanPoints,
      state.cloudPoints,
    );
  }, []);

  const updateRotation = useCallback((nextRotation: number, syncCards = true) => {
    rotationRef.current = nextRotation;
    drawCurrentGlobe(nextRotation);
    if (syncCards) setCardRotation(nextRotation);
  }, [drawCurrentGlobe]);

  useEffect(() => {
    const updateSize = () => {
      const node = containerRef.current;
      if (!node) return;
      const nextSize = Math.max(280, Math.min(600, Math.round(node.clientWidth)));
      setSize((currentSize) => (currentSize === nextSize ? currentSize : nextSize));
    };

    updateSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }

    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      {
        rootMargin: "240px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pauseForScroll = () => {
      scrollPauseUntilRef.current = performance.now() + SCROLL_PAUSE_MS;
    };

    window.addEventListener("scroll", pauseForScroll, { passive: true });
    window.addEventListener("wheel", pauseForScroll, { passive: true });
    window.addEventListener("touchmove", pauseForScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", pauseForScroll);
      window.removeEventListener("wheel", pauseForScroll);
      window.removeEventListener("touchmove", pauseForScroll);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !isInView) {
      drawCurrentGlobe();
      return;
    }

    let raf = 0;
    let lastCanvasFrame = 0;
    let lastCardFrame = 0;

    const tick = (time: number) => {
      if (!dragRef.current.isDragging && time < scrollPauseUntilRef.current) {
        raf = window.requestAnimationFrame(tick);
        return;
      }

      if (time - lastCanvasFrame >= GLOBE_FRAME_MS) {
        const elapsed = lastCanvasFrame > 0 ? time - lastCanvasFrame : 1000 / 60;
        const frameScale = Math.min(3, elapsed / (1000 / 60));

        if (!dragRef.current.isDragging) {
          rotationRef.current += ROTATION_SPEED * frameScale;
        }

        drawCurrentGlobe(rotationRef.current);
        lastCanvasFrame = time;
      }

      if (time - lastCardFrame >= CARD_FRAME_MS) {
        setCardRotation(rotationRef.current);
        lastCardFrame = time;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [drawCurrentGlobe, isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelSize = Math.round(size * dpr);

    if (canvas.width !== pixelSize) canvas.width = pixelSize;
    if (canvas.height !== pixelSize) canvas.height = pixelSize;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvasStateRef.current = { ctx, size, landPoints, oceanPoints, cloudPoints };
    drawCurrentGlobe();

    return () => {
      canvasStateRef.current = null;
    };
  }, [cloudPoints, drawCurrentGlobe, landPoints, oceanPoints, size]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startRotation: rotationRef.current,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.isDragging || event.pointerId !== drag.pointerId) return;

    updateRotation(drag.startRotation + (event.clientX - drag.startX) * DRAG_ROTATION_SPEED);
    event.preventDefault();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.isDragging || event.pointerId !== drag.pointerId) return;

    dragRef.current = { ...drag, isDragging: false };
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      updateRotation(rotationRef.current - 0.18);
      event.preventDefault();
    }
    if (event.key === "ArrowRight") {
      updateRotation(rotationRef.current + 0.18);
      event.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Eco impact globe. Drag left or right to rotate."
      tabIndex={0}
      className={`relative mx-auto aspect-square w-full max-w-[600px] touch-none select-none overflow-visible outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onKeyDown={handleKeyDown}
      onPointerCancel={endDrag}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block" aria-hidden="true" />
      {CARDS.map((card) => (
        <FloatingCard key={card.title} card={card} rotation={cardRotation} size={size} />
      ))}
    </div>
  );
};

export default DottedGlobe;
