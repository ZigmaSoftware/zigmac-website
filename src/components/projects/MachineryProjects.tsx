import React, { useEffect, useState } from "react";
import bharathiImg1 from "@/assets/projects/Bharathi-VICAT Facility/DJI_20250419105424_0112_D.jpg";
import bharathiImg2 from "@/assets/projects/Bharathi-VICAT Facility/DJI_20250419111908_0125_D.jpg";
import bharathiImg3 from "@/assets/projects/Bharathi-VICAT Facility/DJI_20250419112400_0131_D.jpg";
import bharathiImg4 from "@/assets/projects/Bharathi-VICAT Facility/DJI_20250419112744_0138_D.jpg";
import bharathiImg5 from "@/assets/projects/Bharathi-VICAT Facility/DJI_20250419115013_0151_D.jpg";
import bsfImg1 from "@/assets/projects/BSFL project pictures/pic 1.webp";
import bsfImg2 from "@/assets/projects/BSFL project pictures/pic 2.jpeg";
import bsfImg3 from "@/assets/projects/BSFL project pictures/pic 3.webp";
import bsfImg4 from "@/assets/projects/BSFL project pictures/pic 4.webp";

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

interface Facility {
  id: string;
  title: string;
  state: string;
  metrics: MetricItem[];
  sections: FocusSection[];
}

const FACILITIES: Facility[] = [
  {
    id: "bharathi-vicat",
    title: "Bharathi - VICAT Facility",
    state: "Andhra Pradesh",
    metrics: [
      {
        id: "bharathi-processing",
        title: "Processing Capacity",
        description: "Installed processing capacity at the facility.",
        value: "350",
        unit: "TONS / DAY",
        image: bharathiImg1,
      },
      {
        id: "bharathi-workforce",
        title: "Workforce",
        description: "On-ground staffing at the facility.",
        value: "26",
        unit: "PEOPLE",
        image: bharathiImg2,
      },
      {
        id: "bharathi-storage",
        title: "Storage Capacity",
        description: "Material storage available on site.",
        value: "3,000",
        unit: "TONS",
        image: bharathiImg3,
      },
      {
        id: "bharathi-contract",
        title: "Contract Period",
        description: "Contract duration for operations.",
        value: "5+1",
        unit: "YEAR",
        image: bharathiImg4,
      },
    ],
    sections: [
      {
        id: "bharathi-aerial",
        title: "Aerial View",
        description: "Aerial facility view and plant layout.",
        image: bharathiImg1,
        metricId: "bharathi-processing",
        bottomLabel: "Aerial view",
      },
      {
        id: "bharathi-operations",
        title: "Operations",
        description: "Processing and handling on the facility floor.",
        image: bharathiImg2,
        metricId: "bharathi-workforce",
        bottomLabel: "Operations",
      },
      {
        id: "bharathi-storage",
        title: "Storage",
        description: "Material storage and handling at the facility.",
        image: bharathiImg3,
        metricId: "bharathi-storage",
        bottomLabel: "Storage",
      },
      {
        id: "bharathi-contract",
        title: "Contract",
        description: "Commissioned project and execution scope.",
        image: bharathiImg4,
        metricId: "bharathi-contract",
        bottomLabel: "Contract",
      },
      {
        id: "bharathi-overview",
        title: "Overview",
        description: "Additional overview of the Bharathi facility.",
        image: bharathiImg5,
        metricId: "bharathi-processing",
        bottomLabel: "Overview",
      },
    ],
  },
  {
    id: "brahmapuram-bsfl",
    title: "Brahmapuram Project",
    state: "Keralam",
    metrics: [
      {
        id: "bsf-intake",
        title: "Waste Intake",
        description: "Daily organic feed intake at site.",
        value: "50",
        unit: "TONS / DAY",
        image: bsfImg1,
      },
      {
        id: "bsf-land",
        title: "Land Area",
        description: "Project footprint spread at Brahmapuram.",
        value: "3.4",
        unit: "ACRES",
        image: bsfImg2,
      },
      {
        id: "bsf-workforce",
        title: "People Employed",
        description: "Current on-ground staffing.",
        value: "25",
        unit: "WORKFORCE",
        image: bsfImg3,
      },
      {
        id: "bsf-capacity",
        title: "Production Capacity",
        description: "Daily project production capacity.",
        value: "4",
        unit: "KGS / DAY",
        image: bsfImg4,
      },
    ],
    sections: [
      {
        id: "bsf-waste",
        title: "Waste Intake",
        description: "Waste intake and site view.",
        image: bsfImg1,
        metricId: "bsf-intake",
        bottomLabel: "Waste intake",
      },
      {
        id: "bsf-land",
        title: "Land Area",
        description: "Site area and facility footprint.",
        image: bsfImg2,
        metricId: "bsf-land",
        bottomLabel: "Land area",
      },
      {
        id: "bsf-operations",
        title: "Operations",
        description: "On-ground operations and staffing.",
        image: bsfImg3,
        metricId: "bsf-workforce",
        bottomLabel: "Operations",
      },
      {
        id: "bsf-production",
        title: "Production",
        description: "Production and process documentation.",
        image: bsfImg4,
        metricId: "bsf-capacity",
        bottomLabel: "Production",
      },
    ],
  },
];

const FacilityCard: React.FC<{ facility: Facility }> = ({ facility }) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [autoIndex, setAutoIndex] = useState(0);

  const shouldAutoPlay = !hoveredSection && !selectedSection && !selectedMetric;
  const autoSectionId = shouldAutoPlay ? facility.sections[autoIndex]?.id ?? null : null;
  const effectiveHoveredSection = hoveredSection ?? autoSectionId;

  useEffect(() => {
    if (!shouldAutoPlay) return;
    const timer = window.setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % facility.sections.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [shouldAutoPlay, facility.sections.length]);

  const activeSection =
    facility.sections.find((section) => section.id === effectiveHoveredSection) ??
    facility.sections.find((section) => section.id === selectedSection) ??
    facility.sections[0];

  const currentMetric =
    facility.metrics.find((metric) => metric.id === selectedMetric) ??
    facility.metrics[0];

  const currentImage = effectiveHoveredSection ? activeSection.image : currentMetric.image;

  return (
    <article className="flex flex-col gap-4">
      <div className="flex text-left gap-2 flex-col md:flex-row md:items-center">
        <h2 className="text-3xl leading-tight text-slate-900 font-bold">{facility.title}</h2>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {facility.state}
        </span>
      </div>

      <div
        className="flex flex-col lg:flex-row lg:h-[520px] bg-card rounded-2xl overflow-hidden relative border border-border"
        style={{ boxShadow: "0 16px 44px rgba(0,0,0,0.18)" }}
      >
        <div className="relative min-h-[520px] lg:flex-1 bg-black">
          <div className="absolute inset-0 transition-opacity duration-500 overflow-hidden">
            <img
              src={currentImage}
              alt={facility.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                effectiveHoveredSection ? "scale-105" : ""
              }`}
            />
          </div>

          <div className="relative h-full flex z-20">
            {facility.sections.map((section, index) => (
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
                {index < facility.sections.length - 1 && (
                  <div className="absolute right-0 top-0 h-full w-[1.5px] bg-white/25 z-20" />
                )}

                {section.bottomLabel && (
                  <div
                    className="absolute bottom-4 left-4 z-20 text-white font-semibold text-base tracking-wide"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}
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
                ? "max-h-[320px] opacity-100 translate-y-0 lg:max-h-[320px] lg:translate-x-0"
                : "max-h-0 opacity-0 -translate-y-2 lg:max-h-0 lg:translate-x-5 lg:translate-y-0 lg:pointer-events-none"
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mx-auto">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <h3 className="text-xl font-semibold text-foreground leading-tight mb-2 pr-10">{currentMetric.title}</h3>
              <p
                className={`font-semibold text-primary mb-1 break-words ${
                  /[A-Za-z]/.test(currentMetric.value)
                    ? "text-2xl md:text-3xl leading-tight"
                    : "text-4xl md:text-5xl leading-none"
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
            {facility.metrics.map((item) => {
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
                  className={`group border-b h-28 border-border text-left px-5 py-4 transition-colors ${
                    isActive ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-base ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.title}
                    </span>
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

const MachineryProjects: React.FC = () => {
  return (
    <article id="machinery-projects" className="flex flex-col gap-6">
      <div className="flex flex-col gap-8">
        {FACILITIES.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </div>
    </article>
  );
};

export default MachineryProjects;
