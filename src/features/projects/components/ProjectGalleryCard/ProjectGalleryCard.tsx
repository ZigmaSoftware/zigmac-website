import React, { useMemo, useState } from 'react';
import { MetricKey } from '../../types';
import { ComparisonSlider } from '../ComparisonSlider';
import { generateGalleryConfigFromZones, generateGalleryConfigFromPackages } from '../../utils/galleryConfig';
const ph = "/images/placeholder.svg";
const nseZoneBAfter = ph, nseZoneBBefore = ph;
const nseZoneCAfter = ph, nseZoneCBefore = ph;
const nseZoneEAfter = ph, nseZoneEBefore = ph;
const nseZoneFAfter = ph, nseZoneFBefore = ph;
import atladaraAfterB from '@/assets/before after projects/Atladara - Vadodara/Atladara - after.jpeg';
import atladaraBeforeA from '@/assets/before after projects/Atladara - Vadodara/Atladara before.jpeg';
import atladaraAfterC from '@/assets/before after projects/Atladara - Vadodara/VADODARA - ATLADAR  after.png';
import atladaraBeforeB from '@/assets/before after projects/Atladara - Vadodara/VADODARA-ATLADARbefor.jpeg';
import vendipalayamAfter from '@/assets/before after projects/vendipalayam/VendipalayemAfter.webp';
import vendipalayamBefore from '@/assets/before after projects/vendipalayam/VendipalayemBefore.webp';
import vendipalayamZoneAAfter from '@/assets/before after projects/vendipalayam/Zone-A-After.webp';
import vendipalayamZoneABefore from '@/assets/before after projects/vendipalayam/Zone-ABefore.webp';
import vendipalayamZoneBAfter from '@/assets/before after projects/vendipalayam/Zone-B-After.webp';
import vendipalayamZoneBBefore from '@/assets/before after projects/vendipalayam/Zone-BBefore.webp';
import vendipalayamZoneCAfter from '@/assets/before after projects/vendipalayam/Zone-C-After.webp';
import vendipalayamZoneCBefore from '@/assets/before after projects/vendipalayam/Zone-CBefore.webp';
import vendipalayamZoneDAfter from '@/assets/before after projects/vendipalayam/Zone-DAfter.webp';
import vendipalayamZoneDBefore from '@/assets/before after projects/vendipalayam/Zone-DBefore.webp';
import kdgPackage1Before from '@/assets/before after projects/ongoing/Kdg/KDG-Package1-Before.jpeg';
import kdgPackage3Before from '@/assets/before after projects/ongoing/Kdg/KDG-Package3-Before.jpeg';
import kdgPackage4Before from '@/assets/before after projects/ongoing/Kdg/KDG-Package4-Before.jpeg';
import kdgPackage6Before from '@/assets/before after projects/ongoing/Kdg/KDG-Package6-Before.jpeg';
import pdgPackage3Before from '@/assets/before after projects/PDG/PDG-Package3-Before.webp';
import pdgPackage3After from '@/assets/before after projects/PDG/PDG-Package3-After.webp';
import pdgPackage4Before from '@/assets/before after projects/PDG/PDG-Package4-Before.webp';
import pdgPackage4After from '@/assets/before after projects/PDG/PDG-Package4-After.webp';
import pdgPackage5Before from '@/assets/before after projects/PDG/PDG-Package5-Before.webp';
import pdgPackage5After from '@/assets/before after projects/PDG/PDG-Package5-After.webp';
import makarpuraZone1Before from '@/assets/before after projects/Makarpura-phase-1/Makarpura-Vadodara-Phase-1-zone1-before.jpeg';
import makarpuraZone1After from '@/assets/before after projects/Makarpura-phase-1/Makarpura-Vadodara-Phase-1-zone1-After.jpeg';
import makarpuraZone2Before from '@/assets/before after projects/Makarpura-phase-1/Makarpura-SLF 1-Before (18-07-2020).webp';
import makarpuraZone2After from '@/assets/before after projects/Makarpura-phase-1/Makarpura-SLF2-After31-03-2022.webp';
import makarpuraPhase2Before from '@/assets/before after projects/Makarpura-phase-2/Makarpura-phase-2-before.jpeg';


interface ProjectGalleryCardProps {
  onViewDetails?: () => void;
  variant?: ProjectGalleryVariant;
  // For dynamic data-based gallery
  projectName?: string;
  projectState?: string;
  projectFolder?: string;
  zones?: Array<{ name: string; acres?: number }>;
  packages?: Array<{ name: string; acres?: number }>;
  metrics?: GalleryMetric[];
}
export type ProjectGalleryVariant =
  | 'nagpur-phase-2'
  | 'atladara-vadodara'
  | 'kodungaiyur-chennai'
  | 'vendipalayam-erode'
  | 'perungudi-chennai'
  | 'makarpura-vadodara-phase-1'
  | 'makarpura-vadodara-phase-2';

interface GalleryMetric {
  key: MetricKey;
  label: string;
  title: string;
  value: string;
  unit: string;
  details?: Array<{ label: string; value: string }>;
}

interface GalleryTile {
  id: string;
  beforeImage: string;
  afterImage: string;
  label: string;
  metricKey: MetricKey;
  landValue?: string;
  isComparison?: boolean;
  showOngoingBadge?: boolean;
}

interface GalleryDefaultView {
  beforeImage: string;
  afterImage: string;
  isComparison?: boolean;
  showOngoingBadge?: boolean;
}

const GALLERY_CONFIG: Record<
  ProjectGalleryVariant,
  { title: string; state: string; metrics: GalleryMetric[]; tiles: GalleryTile[]; defaultView?: GalleryDefaultView }
> = {
  'nagpur-phase-2': {
    title: 'Nagpur - Phase 2',
    state: 'Maharashtra',
    metrics: [
      { key: 'waste', label: 'Waste Processed', title: 'Waste Processed', value: '600,000', unit: 'TONS' },
      { key: 'land', label: 'Land Reclaimed', title: 'Land Reclaimed', value: '20.5', unit: 'ACRES' },
      { key: 'co2', label: 'CO2 Mitigated', title: 'CO2 Mitigated', value: '415,500', unit: 'METRIC TONS' },
      {
        key: 'recovery',
        label: 'Project Status',
        title: 'Project Status',
        value: 'Completed',
        unit: 'CURRENT PROJECT STAGE',
        details: [{ label: 'Project Timeline', value: '20.09.2021 - 10.02.2024' }],
      },
    ],
    tiles: [
      {
        id: 'tile-1',
        beforeImage: nseZoneBBefore,
        afterImage: nseZoneBAfter,
        label: 'Zone 1',
        metricKey: 'waste',
        landValue: '8.8',
      },
      {
        id: 'tile-2',
        beforeImage: nseZoneCBefore,
        afterImage: nseZoneCAfter,
        label: 'Zone 2',
        metricKey: 'land',
        landValue: '6.5',
      },
      {
        id: 'tile-3',
        beforeImage: nseZoneEBefore,
        afterImage: nseZoneEAfter,
        label: 'Zone 3',
        metricKey: 'co2',
        landValue: '2',
      },
      {
        id: 'tile-4',
        beforeImage: nseZoneFBefore,
        afterImage: nseZoneFAfter,
        label: 'Zone 4',
        metricKey: 'recovery',
        landValue: '8.5',
      },
    ],
  },
  'atladara-vadodara': {
    title: 'Atladara - Vadodara',
    state: 'Gujarat',
    metrics: [
      { key: 'waste', label: 'Waste Processed', title: 'Waste Processed', value: '375,000', unit: 'TONS' },
      { key: 'land', label: 'Land Reclaimed', title: 'Land Reclaimed', value: '19', unit: 'ACRES' },
      { key: 'co2', label: 'CO2 Mitigated', title: 'CO2 Mitigated', value: '259,687.5', unit: 'METRIC TONS' },
      {
        key: 'recovery',
        label: 'Project Status',
        title: 'Project Status',
        value: 'Completed',
        unit: 'CURRENT PROJECT STAGE',
        details: [{ label: 'Project Timeline', value: '16.07.2018 - 26.12.2020' }],
      },
    ],
    tiles: [
      { id: 'tile-1', beforeImage: atladaraBeforeB, afterImage: atladaraAfterC, label: 'Zone 1', metricKey: 'land', landValue: '6.2' },
      { id: 'tile-2', beforeImage: atladaraBeforeA, afterImage: atladaraAfterB, label: 'Zone 2', metricKey: 'co2', landValue: '5.1' },
    ],
  },
  'kodungaiyur-chennai': {
    title: 'Kodungaiyur - Chennai',
    state: 'Tamilnadu',
    metrics: [
      { key: 'waste', label: 'Estimated waste to be Processed', title: 'Estimated waste to be Processed', value: '4,403,088.41', unit: 'TONS' },
      { key: 'land', label: 'Target land Reclamation', title: 'Target land Reclamation', value: '--', unit: 'ACRES' },
      { key: 'co2', label: 'Expected Co2e Mitigation', title: 'Expected Co2e Mitigation', value: '3,049,138.72', unit: 'METRIC TONS' },
      {
        key: 'recovery',
        label: 'Project Status',
        title: 'Project Status',
        value: 'Ongoing',
        unit: 'CURRENT PROJECT STAGE',
        details: [{ label: 'Project Timeline', value: '12.02.2024 - 12.02.2026' }],
      },
    ],
    tiles: [
      {
        id: 'tile-1',
        beforeImage: kdgPackage1Before,
        afterImage: kdgPackage1Before,
        label: 'Package 1',
        metricKey: 'waste',
        landValue: '15.2',
        isComparison: false,
        showOngoingBadge: true,
      },
      {
        id: 'tile-2',
        beforeImage: kdgPackage3Before,
        afterImage: kdgPackage3Before,
        label: 'Package 3',
        metricKey: 'land',
        landValue: '14.8',
        isComparison: false,
        showOngoingBadge: true,
      },
      {
        id: 'tile-3',
        beforeImage: kdgPackage4Before,
        afterImage: kdgPackage4Before,
        label: 'Package 4',
        metricKey: 'co2',
        landValue: '16.5',
        isComparison: false,
        showOngoingBadge: true,
      },
      {
        id: 'tile-4',
        beforeImage: kdgPackage6Before,
        afterImage: kdgPackage6Before,
        label: 'Package 6',
        metricKey: 'recovery',
        landValue: '13.9',
        isComparison: false,
        showOngoingBadge: true,
      },
    ],
  },
  'vendipalayam-erode': {
    title: 'Vendipalayam - Erode',
    state: 'Tamilnadu',
    defaultView: {
      beforeImage: vendipalayamBefore,
      afterImage: vendipalayamAfter,
      isComparison: true,
      showOngoingBadge: false,
    },
    metrics: [
      { key: 'waste', label: 'Waste Processed', title: 'Waste Processed', value: '549,026', unit: 'TONS' },
      { key: 'land', label: 'Land Reclaimed', title: 'Land Reclaimed', value: '17.3', unit: 'ACRES' },
      { key: 'co2', label: 'CO2 Mitigated', title: 'CO2 Mitigated', value: '380,200.505', unit: 'METRIC TONS' },
      {
        key: 'recovery',
        label: 'Project Status',
        title: 'Project Status',
        value: 'Completed',
        unit: 'CURRENT PROJECT STAGE',
        details: [{ label: 'Project Timeline', value: '21.01.2022 - 24.11.2022' }],
      },
    ],
    tiles: [
      {
        id: 'tile-1',
        beforeImage: vendipalayamZoneABefore,
        afterImage: vendipalayamZoneAAfter,
        label: 'Zone A',
        metricKey: 'waste',
        landValue: '4.8',
      },
      {
        id: 'tile-2',
        beforeImage: vendipalayamZoneBBefore,
        afterImage: vendipalayamZoneBAfter,
        label: 'Zone B',
        metricKey: 'land',
        landValue: '4.2',
      },
      {
        id: 'tile-3',
        beforeImage: vendipalayamZoneCBefore,
        afterImage: vendipalayamZoneCAfter,
        label: 'Zone C',
        metricKey: 'co2',
        landValue: '4.5',
      },
      {
        id: 'tile-4',
        beforeImage: vendipalayamZoneDBefore,
        afterImage: vendipalayamZoneDAfter,
        label: 'Zone D',
        metricKey: 'recovery',
        landValue: '3.8',
      },
    ],
  },
  'perungudi-chennai': {
    title: 'Perungudi Phase  1 - Chennai',
    state: 'Tamilnadu',
    metrics: [
      { key: 'waste', label: 'Waste Processed', title: 'Waste Processed', value: '1,730,584.23', unit: 'TONS' },
      { key: 'land', label: 'Land Reclaimed', title: 'Land Reclaimed', value: '94.31', unit: 'ACRES' },
      { key: 'co2', label: 'CO2 Mitigated', title: 'CO2 Mitigated', value: '1,198,429.58', unit: 'METRIC TONS' },
      {
        key: 'recovery',
        label: 'Project Status',
        title: 'Project Status',
        value: 'Completed',
        unit: 'CURRENT PROJECT STAGE',
        details: [{ label: 'Project Timeline', value: '12.10.2021 - 31.09.2024' }],
      },
    ],
    tiles: [
      {
        id: 'tile-1',
        beforeImage: pdgPackage3Before,
        afterImage: pdgPackage3After,
        label: 'Package 3',
        metricKey: 'waste',
        landValue: '35.37',
      },
      {
        id: 'tile-2',
        beforeImage: pdgPackage4Before,
        afterImage: pdgPackage4After,
        label: 'Package 4',
        metricKey: 'land',
        landValue: '22.38',
      },
      {
        id: 'tile-3',
        beforeImage: pdgPackage5Before,
        afterImage: pdgPackage5After,
        label: 'Package 5',
        metricKey: 'co2',
        landValue: '35.49',
      },
    ],
  },
  'makarpura-vadodara-phase-1': {
    title: 'Makarpura - Vadodara - Phase 1',
    state: 'Gujarat',
    metrics: [
      { key: 'waste', label: 'Waste Processed', title: 'Waste Processed', value: '500,000', unit: 'TONS' },
      { key: 'land', label: 'Land Reclaimed', title: 'Land Reclaimed', value: '19', unit: 'ACRES' },
      { key: 'co2', label: 'CO2 Mitigated', title: 'CO2 Mitigated', value: '346,250', unit: 'METRIC TONS' },
      {
        key: 'recovery',
        label: 'Project Status',
        title: 'Project Status',
        value: 'Completed',
        unit: 'CURRENT PROJECT STAGE',
        details: [{ label: 'Project Timeline', value: '10.02.2021 - 24.12.2023' }],
      },
    ],
    tiles: [
      {
        id: 'tile-1',
        beforeImage: makarpuraZone1Before,
        afterImage: makarpuraZone1After,
        label: 'Zone 1',
        metricKey: 'waste',
        landValue: '10.3',
      },
      {
        id: 'tile-2',
        beforeImage: makarpuraZone2Before,
        afterImage: makarpuraZone2After,
        label: 'Zone 2',
        metricKey: 'land',
        landValue: '8.7',
      },
    ],
  },
  'makarpura-vadodara-phase-2': {
    title: 'Makarpura - Vadodara - Phase 2',
    state: 'Gujarat',
    defaultView: {
      beforeImage: makarpuraPhase2Before,
      afterImage: makarpuraPhase2Before,
      isComparison: false,
      showOngoingBadge: true,
    },
    metrics: [
      { key: 'waste', label: 'Estimated waste to be Processed', title: 'Estimated waste to be Processed', value: '200,000', unit: 'TONS' },
      { key: 'land', label: 'Target land Reclamation', title: 'Target land Reclamation', value: '0', unit: 'ACRES' },
      { key: 'co2', label: 'Expected Co2e Mitigation', title: 'Expected Co2e Mitigation', value: '138,500', unit: 'METRIC TONS' },
      {
        key: 'recovery',
        label: 'Project Status',
        title: 'Project Status',
        value: 'Ongoing',
        unit: 'CURRENT PROJECT STAGE',
        details: [{ label: 'Project Timeline', value: '20.01.2026 - Ongoing' }],
      },
    ],
    tiles: [],
  },

};

export const ProjectGalleryCard: React.FC<ProjectGalleryCardProps> = ({
  onViewDetails,
  variant = 'nagpur-phase-2',
  projectName,
  projectState,
  projectFolder,
  zones,
  packages,
  metrics: dynamicMetrics,
}) => {
  // Determine which config to use: dynamic or variant-based
  const config = useMemo(() => {
    if (projectName && projectState && projectFolder && dynamicMetrics) {
      if (zones && zones.length > 0) {
        return generateGalleryConfigFromZones(projectName, projectState, projectFolder, zones, dynamicMetrics);
      }
      if (packages && packages.length > 0) {
        return generateGalleryConfigFromPackages(projectName, projectState, projectFolder, packages, dynamicMetrics);
      }
    }
    return GALLERY_CONFIG[variant];
  }, [projectName, projectState, projectFolder, zones, packages, dynamicMetrics, variant]);

  const { title, state, metrics, tiles, defaultView } = config;
  const [activeMetric, setActiveMetric] = useState<MetricKey>('waste');
  
  // Initialize active tile: null if no defaultView and no tiles, otherwise first tile
  const [activeTileId, setActiveTileId] = useState<string | null>(
    !defaultView && tiles.length > 0 ? 'tile-1' : null,
  );
  const [detailsOpen, setDetailsOpen] = useState(false);

  const currentMetric = useMemo(
    () => metrics.find((metric) => metric.key === activeMetric) ?? metrics[0],
    [activeMetric, metrics],
  );

  const currentTile = useMemo(
    () => (activeTileId ? tiles.find((tile) => tile.id === activeTileId) ?? tiles[0] : null),
    [activeTileId, tiles],
  );
  const sliderBeforeImage = currentTile?.beforeImage ?? defaultView?.beforeImage ?? tiles[0]?.beforeImage;
  const sliderAfterImage = currentTile?.afterImage ?? defaultView?.afterImage ?? tiles[0]?.afterImage;
  const isComparison = currentTile?.isComparison ?? defaultView?.isComparison ?? true;
  const showOngoingBadge = currentTile?.showOngoingBadge ?? defaultView?.showOngoingBadge ?? false;
  
  // Use landValue if available in current tile, otherwise use metric value
  const metricDisplayValue =
    currentTile?.landValue && activeMetric === 'land'
      ? currentTile.landValue
      : currentMetric.value;

  return (
    <article className="flex flex-col gap-4">
      <div className="flex text-left gap-2 flex-col md:flex-row md:items-center">
        <h2 className="text-3xl leading-tight text-slate-900 font-bold">{title}</h2>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {state}
        </span>
      </div>

      <div
        className="flex flex-col lg:flex-row lg:h-[520px] bg-card rounded-2xl overflow-hidden border border-border"
        style={{ boxShadow: '0 16px 44px rgba(0,0,0,0.18)' }}
      >
        <div className="relative min-h-[520px] lg:flex-1 bg-black">
          <ComparisonSlider
            beforeSrc={sliderBeforeImage}
            afterSrc={sliderAfterImage}
            isComparison={isComparison}
            showOngoingBadge={showOngoingBadge}
          />

          <div className="absolute left-4 right-4 bottom-4 z-20 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tiles.map((tile) => {
              const isActive = tile.id === activeTileId;
              return (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => {
                    // Toggle logic: if clicking active tile and there's a default view, deselect
                    if (activeTileId === tile.id && defaultView) {
                      setActiveTileId(null);
                      setActiveMetric('waste');
                      setDetailsOpen(false);
                      return;
                    }
                    setActiveTileId(tile.id);
                    setActiveMetric('land');
                    setDetailsOpen(true);
                  }}
                  className={`group relative overflow-hidden rounded-md border bg-black/30 transition-all ${
                    isActive
                      ? 'border-primary ring-2 ring-primary/80 shadow-[0_0_0_1px_rgba(255,255,255,0.35)]'
                      : 'border-white/35 hover:border-white/70'
                  }`}
                >
                  <img
                    src={tile.afterImage}
                    alt={`${tile.label} thumbnail`}
                    className="h-20 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="pointer-events-none absolute left-2 bottom-1.5 text-[11px] font-semibold tracking-wide text-white">
                    {tile.label}
                  </span>
                  {isActive && (
                    <span className="pointer-events-none absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {detailsOpen && (
            <div className="absolute top-4 right-4 z-30 hidden max-w-[310px] rounded-xl border border-border bg-background/95 p-4 backdrop-blur-sm lg:block">
              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                aria-label="Close metric details"
                className="absolute right-3 top-3 h-8 w-8 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="mx-auto"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-foreground pr-10">{currentMetric.title}</h3>
              <p
                className={`mt-2 font-semibold text-primary break-words ${
                  /[A-Za-z]/.test(metricDisplayValue)
                    ? 'text-4xl leading-tight'
                    : 'text-4xl leading-none'
                }`}
              >
                {metricDisplayValue}
              </p>
              <p className="text-xs tracking-[0.16em] text-muted-foreground mt-1">{currentMetric.unit}</p>
              {currentMetric.details && currentMetric.details.length > 0 ? (
                <div className="mt-5 pt-4 border-t border-border space-y-4">
                  {currentMetric.details.map((item) => (
                    <div key={item.label}>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-foreground leading-relaxed break-words">{item.value}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>

        <aside className="flex flex-col border-t lg:border-t-0 border-border bg-card lg:w-[19%] lg:h-full lg:border-l">
          <div className="p-5 border-b border-border">
            <p className="text-lg font-semibold text-muted-foreground">Project Metrics</p>
          </div>

          <div className="flex flex-col lg:flex-1 lg:min-h-0 lg:overflow-y-auto">
            {metrics.map((metric) => {
              const isActive = metric.key === activeMetric;
              return (
                <button
                  key={metric.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveMetric(metric.key);
                    setDetailsOpen(true);
                  }}
                  className={`group border-b h-20 border-border text-left px-5 py-4 transition-colors ${
                    isActive ? 'bg-primary/10' : 'hover:bg-muted/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-base ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {metric.label}
                    </span>
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
              onClick={onViewDetails}
              disabled={!onViewDetails}
              className={`w-full rounded-xl border font-semibold py-3 px-4 transition-colors ${
                onViewDetails
                  ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  : 'border-primary/40 text-primary/50 cursor-not-allowed'
              }`}
            >
              Credibility Markers
            </button>
          </div>
        </aside>
      </div>
    </article>
  );
};
