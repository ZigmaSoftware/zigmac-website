import React, { useEffect, useState } from 'react';
import trommelImg from '@/assets/products/Trommel-1.webp';
import conveyorImg from '@/assets/products/belt-conveyor.webp';
import discSeparatorImg from '@/assets/products/Disc Separator.webp';
import airDensityImg from '@/assets/products/ADS.webp';
import magneticImg from '@/assets/products/OBMS.webp';
import cycloneImg from '@/assets/products/cy2.webp';

interface MetricItem {
  id: string;
  title: string;
  description: string;
  value: string;
  unit: string;
  image: string;
}

interface FocusSection {
  id: string;
  title: string;
  description: string;
  image: string;
  metricId: string;
  bottomLabel?: string;
}

const METRICS: MetricItem[] = [
  {
    id: 'waste-intake',
    title: 'Waste Intake',
    description: 'Daily organic feed intake at site.',
    value: '50',
    unit: 'TONS / DAY',
    image: trommelImg,
  },
  {
    id: 'land-area',
    title: 'Land Area',
    description: 'Project footprint spread at Brahmapuram.',
    value: '3.4',
    unit: 'ACRES',
    image: conveyorImg,
  },
  {
    id: 'people-employed',
    title: 'People Employed',
    description: 'Current on-ground staffing.',
    value: '25',
    unit: 'WORKFORCE',
    image: discSeparatorImg,
  },
  {
    id: 'contract-period',
    title: 'Contract Period',
    description: 'Execution period for this project.',
    value: '3',
    unit: 'YEARS',
    image: airDensityImg,
  },
  {
    id: 'technology',
    title: 'Technology Type',
    description: 'Processing technology deployed at site.',
    value: 'Pit',
    unit: 'PROCESS',
    image: magneticImg,
  },
  {
    id: 'egg-capacity',
    title: 'Egg Production Capacity',
    description: 'Daily egg production capacity.',
    value: '4',
    unit: 'KGS / DAY',
    image: cycloneImg,
  },
];

const FOCUS_SECTIONS: FocusSection[] = [
  {
    id: 'intake-land',
    title: 'Waste Intake & Land',
    description: 'Waste intake: 50 tons/day | Land area: 3.4 acres',
    image: trommelImg,
    metricId: 'waste-intake',
    bottomLabel: 'Aerial view',
  },
  {
    id: 'operations',
    title: 'Operations',
    description: 'People employed: 25 | Contract period: 3 years',
    image: conveyorImg,
    metricId: 'people-employed',
    bottomLabel: 'Operations',
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'Technology deployed: Pit type BSFL process',
    image: magneticImg,
    metricId: 'technology',
    bottomLabel: 'Harvesting',
  },
  {
    id: 'production-status',
    title: 'Production',
    description: 'Egg production capacity: 4 kgs/day',
    image: cycloneImg,
    metricId: 'egg-capacity',
    bottomLabel: 'Solar drying',
  },
];

const BSFLorganicwaste: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [autoIndex, setAutoIndex] = useState(0);

  const shouldAutoPlay =
    !hoveredSection && !selectedSection && !selectedMetric;
  const autoSectionId = shouldAutoPlay ? FOCUS_SECTIONS[autoIndex]?.id ?? null : null;
  const effectiveHoveredSection = hoveredSection ?? autoSectionId;

  useEffect(() => {
    if (!shouldAutoPlay) return;
    const timer = window.setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % FOCUS_SECTIONS.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [shouldAutoPlay]);

  const activeSection =
    FOCUS_SECTIONS.find((section) => section.id === effectiveHoveredSection) ??
    FOCUS_SECTIONS.find((section) => section.id === selectedSection) ??
    FOCUS_SECTIONS[0];

  const currentMetric =
    METRICS.find((metric) => metric.id === selectedMetric) ??
    METRICS[0];

  const currentImage = effectiveHoveredSection ? activeSection.image : currentMetric.image;

  return (
    <article id="bsfl-organic-waste" className="flex flex-col gap-4">
      <div className="flex text-left gap-2 flex-col md:flex-row md:items-center">
        <h2 className="text-3xl leading-tight text-slate-900 font-bold">Brahmapuram - Kochi</h2>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          Keralam
        </span>
      </div>

      <div
        className="flex flex-col lg:flex-row lg:h-[520px] bg-card rounded-2xl overflow-hidden relative border border-border"
        style={{ boxShadow: '0 16px 44px rgba(0,0,0,0.18)' }}
      >
      <div className="relative min-h-[520px] lg:flex-1 bg-black">
        <div className="absolute inset-0 transition-opacity duration-500 overflow-hidden">
          <img
            src={currentImage}
            alt="Zigma project visual"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
              effectiveHoveredSection ? 'scale-105' : ''
            }`}
          />
        
        </div>

        <div className="relative h-full flex z-20">
          {FOCUS_SECTIONS.map((section, index) => (
            <button
              key={section.id}
              type="button"
              className="relative overflow-hidden cursor-pointer transition-all duration-500 ease-out group text-left"
              style={{ flex: effectiveHoveredSection === section.id ? 1.45 : 1 }}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => {
                setSelectedSection(section.id);
                setSelectedMetric(section.metricId);
                setDetailsOpen(true);
              }}
            >
              {index < FOCUS_SECTIONS.length - 1 && (
                <div className="absolute right-0 top-0 h-full w-[1.5px] bg-white/25 z-20" />
              )}

              {section.bottomLabel && (
                <div
                  className="absolute bottom-4 left-4 z-20 text-white font-semibold text-base tracking-wide"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}
                >
                  {section.bottomLabel}
                </div>
              )}

              {selectedSection === section.id && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 to-emerald-300 z-30" />
              )}
            </button>
          ))}
        </div>

        <div
          className={`overflow-hidden border-t border-border transition-[max-height,opacity,transform] duration-500 lg:absolute lg:top-4 lg:right-4 lg:bottom-auto lg:z-30 lg:w-[30%] lg:rounded-xl lg:border ${
            detailsOpen
              ? 'max-h-[320px] opacity-100 translate-y-0 lg:max-h-[320px] lg:translate-x-0'
              : 'max-h-0 opacity-0 -translate-y-2 lg:max-h-0 lg:translate-x-5 lg:translate-y-0 lg:pointer-events-none'
          }`}
          aria-hidden={!detailsOpen}
        >
          <div className="p-4 md:p-5 text-foreground bg-background/95 backdrop-blur-sm relative">
            <button
              type="button"
              onClick={() => setDetailsOpen(false)}
              aria-label="Collapse metric details"
              className="absolute right-3 top-3 h-8 w-8 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mx-auto"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            <h3 className="text-xl font-semibold text-foreground leading-tight mb-2 pr-10">{currentMetric.title}</h3>
            <p
              className={`font-semibold text-primary mb-1 break-words ${
                /[A-Za-z]/.test(currentMetric.value)
                  ? 'text-2xl md:text-3xl leading-tight'
                  : 'text-4xl md:text-5xl leading-none'
              }`}
            >
              {currentMetric.value}
            </p>
            <p className="text-xs tracking-[0.16em] text-muted-foreground">{currentMetric.unit}</p>

          </div>
        </div>
      </div>

      <div className="flex flex-col border-t lg:border-t-0 border-border bg-card lg:w-[18%] lg:h-full lg:border-l">
        <div className="p-5 border-b border-border">
          <p className="text-lg font-semibold text-muted-foreground">Project Metrics</p>
        </div>

        <div className="flex flex-col lg:flex-1 lg:min-h-0 lg:overflow-y-auto">
          {METRICS.map((item) => {
            const isActive = item.id === selectedMetric;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setSelectedMetric(item.id);
                  setDetailsOpen(true);
                }}
                className={`group border-b h-20 border-border text-left px-5 py-4 transition-colors ${
                  isActive ? 'bg-primary/10' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-base ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{item.title}</span>
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      </div>
    </article>
  );
};

export default BSFLorganicwaste;
