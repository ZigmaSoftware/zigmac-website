import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import worldMapUrl from "../../assets/website/BP-worldmap.webp";

type Marker = {
  name: string;
  coords: [number, number];
  labelPos?: "right" | "left" | "top" | "bottom";
};

const markers: Marker[] = [
  { name: "Canada", coords: [-130, 40], labelPos: "right" },
  { name: "USA", coords: [-110, 20], labelPos: "right" },
  { name: "Portugal", coords: [-19.5, 18 ], labelPos: "left" },
  { name: "UK", coords: [-15, 33], labelPos: "right" },
  { name: "Spain", coords: [-13.5, 15], labelPos: "right" },
  { name: "Kenya", coords: [20, -24.5], labelPos: "right" },
  { name: "Nepal", coords: [70, -1], labelPos: "right" },
  { name: "India", coords: [65, -10.6], labelPos: "right" },
  { name: "Malaysia", coords: [87, -19], labelPos: "left" },
  { name: "Singapore", coords: [90, -25], labelPos: "right" },
  { name: "Philippines", coords: [110, -18], labelPos: "right" },
  { name: "Australia", coords: [125, -55], labelPos: "right" },
  { name: "New Zealand", coords: [135, -70], labelPos: "left" },
];

const MAP_WIDTH = 1061;
const MAP_HEIGHT = 520;
const MARKER_SEQUENCE_DURATION_MS = 6000;
const MARKER_REVEAL_DURATION_MS = 450;

function project([lon, lat]: [number, number]): { x: number; y: number } {
  const x = ((lon + 180) / 360) * MAP_WIDTH;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return { x, y };
}

const BluePlanetSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [markersActivated, setMarkersActivated] = useState(false);
  const [visibleMarkerCount, setVisibleMarkerCount] = useState(0);

  useEffect(() => {
    const sectionEl = sectionRef.current;

    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMarkersActivated(true);
        observer.disconnect();
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(sectionEl);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!markersActivated) return;

    const staggerMs =
      markers.length > 0
        ? MARKER_SEQUENCE_DURATION_MS / markers.length
        : MARKER_SEQUENCE_DURATION_MS;
    const timers = markers.map((_, index) =>
      window.setTimeout(() => {
        setVisibleMarkerCount(index + 1);
      }, Math.round(index * staggerMs)),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [markersActivated]);

  return (
    <section
      ref={sectionRef}
      className="section-padding scroll-mt-24 lg:scroll-mt-28 lg:snap-start bg-background"
    >
      <div className="container-main">
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Our Group Company
          </div>
          <h2 className="mt-3 mb-6 text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Blue Planet Environmental{" "}
            <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
            Zigma is proud to be part of  Blue Planet Environmental Solutions, a Singapore-headquartered company and one of Asia's fastest-growing
            integrated waste management enterprises.
          </p>

          <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
            Founded in 2017, Blue Planet deploys sustainable technologies that
            enable organisations globally to transition from a linear to a
            circular economy, with a comprehensive suite of solutions spanning
            the entire waste management value chain.
          </p>

          <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
            Blue Planet's operations extend from the point of waste generation
            through to collection, segregation, treatment, and processing, right
            through to the sale of energy and other waste-derived fuels and
            products.
          </p>

          <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
            Guided by the United Nations Sustainable Development Goals and a
            commitment to the triple bottom line of People, Planet, and
            Prosperity, Blue Planet drives decarbonisation and promotes
            environmental sustainability across Asia, striving to achieve zero
            waste to landfill and a net positive impact for current and future
            generations.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="https://www.blueplanet.asia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Visit Blue Planet
              <ExternalLink className="w-4 h-4" />
            </a>
            
          </div>
        </div>

        <div className="relative mt-12 mx-auto w-full max-w-[1400px]">
          <div className="relative overflow-hidden rounded-2xl p-3 sm:p-4">
            <img
              src={worldMapUrl}
              alt="World map showing Blue Planet presence"
              loading="lazy"
              className="block w-full h-auto opacity-95"
            />

            <div className="absolute inset-0 pointer-events-none">
              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className="absolute inset-0 h-auto w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {markers.map((m, i) => {
                  const { x, y } = project(m.coords);
                  const isVisible = i < visibleMarkerCount;
                  const labelOffset =
                    m.labelPos === "left"
                      ? { dx: -9, dy: 3, anchor: "end" as const }
                      : m.labelPos === "top"
                        ? { dx: 0, dy: -8, anchor: "middle" as const }
                        : m.labelPos === "bottom"
                          ? { dx: 0, dy: 12, anchor: "middle" as const }
                          : { dx: 9, dy: 3, anchor: "start" as const };

                  return (
                    <g
                      key={m.name}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible
                          ? "translate3d(0, 0, 0) scale(1)"
                          : "translate3d(0, 10px, 0) scale(0.88)",
                        transitionProperty: "opacity, transform",
                        transitionDuration: `${MARKER_REVEAL_DURATION_MS}ms`,
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        transformOrigin: `${x}px ${y}px`,
                      }}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={8}
                        fill="hsl(var(--primary) / 0.14)"
                        className={isVisible ? "animate-marker-pulse" : undefined}
                        style={{
                          animationDelay: `${i * 0.15}s`,
                          transformOrigin: `${x}px ${y}px`,
                        }}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={4}
                        fill="hsl(var(--primary))"
                      />
                      <text
                        x={x + labelOffset.dx}
                        y={y + labelOffset.dy}
                        fontSize={14}
                        fill="hsl(var(--foreground))"
                        textAnchor={labelOffset.anchor}
                        style={{
                          fontFamily: "inherit",
                          paintOrder: "stroke",
                        }}
                        stroke="hsl(var(--background))"
                        strokeWidth={2.6}
                        strokeLinejoin="round"
                      >
                        {m.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BluePlanetSection;
