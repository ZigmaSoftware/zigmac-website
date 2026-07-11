import React, { useState, useEffect, useRef } from 'react';
import { Project, MetricKey } from '../../types';
import { ComparisonSlider } from '../ComparisonSlider';
import { useProjectMetrics } from '../../hooks/useProjectMetrics';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  onViewDetails: (id: number) => void;
  allProjects: Project[];
  isComparison?: boolean;
}

/**
 * Project card component with metrics and image slider
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetails,
  allProjects,
  isComparison = true,
}) => {
  const [metaVisible, setMetaVisible] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const metricItems = useProjectMetrics(project, allProjects);
  const [activeMetric, setActiveMetric] = useState<MetricKey | null>(null);

  const currentMetric = metricItems.find((item) => item.key === activeMetric);
  const displayTitle = project.title.replace(/\s*-\s*/g, ' - ');

  const metaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveMetric(null);
    setDetailsOpen(false);
  }, [project.id, metricItems]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    if (metaRef.current) {
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setMetaVisible(true);
        },
        { rootMargin: '0px 0px -60px 0px', threshold: 0.1 },
      );
      o.observe(metaRef.current);
      observers.push(o);
    }

    if (cardRef.current) {
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setCardRevealed(true);
            o.disconnect();
          }
        },
        { rootMargin: '0px 0px -80px 0px', threshold: 0.1 },
      );
      o.observe(cardRef.current);
      observers.push(o);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <article id={`proj-${project.id}`} className="flex flex-col gap-4">
      <div ref={metaRef} className="flex text-left gap-2 flex-col md:flex-row md:items-center">
        <div
          style={{
            opacity: metaVisible ? 1 : 0,
            transform: metaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition:
              'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms',
          }}
        >
          <h2 className="text-3xl leading-tight text-slate-900 font-bold">{displayTitle}</h2>
        </div>
        <div
          style={{
            opacity: metaVisible ? 1 : 0,
            transform: metaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition:
              'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms',
          }}
        >
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {project.state}
          </span>
        </div>
      </div>

      <div
        ref={cardRef}
        className="flex flex-col lg:flex-row lg:h-[520px] bg-card rounded-2xl overflow-hidden relative border border-border"
        style={{
          boxShadow: '0 16px 44px rgba(0,0,0,0.18)',
          opacity: cardRevealed ? 1 : 0,
          transform: cardRevealed ? 'translateY(0)' : 'translateY(32px)',
          transition:
            'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms',
        }}
      >
        <div className="relative min-h-[520px] lg:flex-1">
          <ComparisonSlider
            beforeSrc={project.beforeImage}
            afterSrc={project.afterImage}
            isComparison={isComparison}
          />

          <div
            className={`overflow-hidden border-t border-border transition-[max-height,opacity,transform] duration-500 lg:absolute lg:top-4 lg:right-4 lg:bottom-auto lg:z-30 lg:w-[30%] lg:rounded-xl lg:border ${
              detailsOpen
                ? 'max-h-[360px] opacity-100 translate-y-0 lg:max-h-none lg:translate-x-0'
                : 'max-h-0 opacity-0 -translate-y-2 lg:max-h-0 lg:translate-x-5 lg:translate-y-0 lg:pointer-events-none'
            }`}
            aria-hidden={!detailsOpen}
          >
            {currentMetric && (
              <div className="p-4 md:p-5 text-foreground bg-background/95 backdrop-blur-sm relative">
                <button
                  type="button"
                  onClick={() => {
                    setDetailsOpen(false);
                    setActiveMetric(null);
                  }}
                  aria-label="Collapse metric details"
                  className="absolute right-4 top-4 h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="mx-auto"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <h3 className="text-2xl font-semibold text-foreground leading-tight mb-4">
                  {currentMetric.title}
                </h3>
                <p
                  className={`font-semibold text-primary mb-1 break-words ${
                    /[A-Za-z]/.test(currentMetric.displayValue)
                      ? 'text-2xl md:text-3xl leading-tight'
                      : 'text-4xl md:text-4xl leading-none'
                  }`}
                >
                  {currentMetric.displayValue}
                </p>
                <p className="text-sm tracking-[0.18em] text-muted-foreground">{currentMetric.unit}</p>

                <div className="mt-5 pt-4 border-t border-border space-y-4">
                  {currentMetric.details.map((item) => (
                    <div key={item.label}>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-foreground leading-relaxed break-words">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col border-t lg:border-t-0 border-border bg-card lg:w-[15.8%] lg:h-full lg:border-l">
          <div className="p-5 border-b border-border">
            <p className="text-lg font-semibold text-muted-foreground">Project Metrics</p>
          </div>

          <div className="flex flex-col lg:flex-1 lg:min-h-0 lg:overflow-y-auto">
            {metricItems.map((item) => {
              const isActive = item.key === activeMetric;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveMetric(item.key);
                    setDetailsOpen(true);
                  }}
                  className={`group border-b h-20 border-border text-left px-5 py-4 transition-colors ${
                    isActive ? 'bg-primary/10' : 'hover:bg-muted/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`text-base ${
                          isActive ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <svg
                      className="h-4 w-4 text-muted-foreground group-hover:text-foreground"
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

          <div className="mt-auto p-5">
            <button
              type="button"
              onClick={() => onViewDetails(project.id)}
              className="w-full rounded-xl border border-primary text-primary font-semibold py-3 px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Credibility Markers
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

