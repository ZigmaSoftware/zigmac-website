/**
 * Utility to generate gallery configuration from project zone/package data
 */
import { getProjectImageByRelativePath } from './imageLoading';

export interface GalleryMetric {
  key: 'waste' | 'land' | 'co2' | 'recovery';
  label: string;
  title: string;
  value: string;
  unit: string;
  details?: Array<{ label: string; value: string }>;
}

export interface GalleryTile {
  id: string;
  beforeImage: string;
  afterImage: string;
  label: string;
  metricKey: 'waste' | 'land' | 'co2' | 'recovery';
  landValue?: string;
  isComparison?: boolean;
  showOngoingBadge?: boolean;
}

export interface GalleryConfig {
  title: string;
  state: string;
  metrics: GalleryMetric[];
  tiles: GalleryTile[];
  defaultView?: {
    beforeImage: string;
    afterImage: string;
    isComparison?: boolean;
    showOngoingBadge?: boolean;
  };
}

/**
 * Generate image paths for a zone or package
 * Expects images to follow naming convention: {projectFolder}/{zone|package}-[before|after].*
 */
export function getZoneImages(
  projectFolder: string,
  zoneLabel: string,
): { beforeImage: string; afterImage: string } {
  const zoneName = zoneLabel.toLowerCase().replace(/\s+/g, '-');
  
  const beforePath = `${projectFolder}/${zoneName}-before.jpeg`;
  const afterPath = `${projectFolder}/${zoneName}-after.jpeg`;
  
  const beforeImage = getProjectImageByRelativePath(beforePath);
  const afterImage = getProjectImageByRelativePath(afterPath);
  
  return { beforeImage, afterImage };
}

/**
 * Generate gallery tiles from zone data
 */
export function generateZoneTiles(
  projectFolder: string,
  zones: Array<{ name: string; acres?: number }>,
): GalleryTile[] {
  const metricKeys: ('waste' | 'land' | 'co2' | 'recovery')[] = ['waste', 'land', 'co2', 'recovery'];
  
  return zones.map((zone, index) => {
    const { beforeImage, afterImage } = getZoneImages(projectFolder, zone.name);
    
    return {
      id: `zone-${index}`,
      beforeImage,
      afterImage,
      label: zone.name,
      metricKey: metricKeys[index % metricKeys.length],
      landValue: zone.acres?.toString(),
      isComparison: true,
    };
  });
}

/**
 * Generate gallery tiles from package data
 */
export function generatePackageTiles(
  projectFolder: string,
  packages: Array<{ name: string; acres?: number }>,
): GalleryTile[] {
  const metricKeys: ('waste' | 'land' | 'co2' | 'recovery')[] = ['waste', 'land', 'co2', 'recovery'];
  
  return packages.map((pkg, index) => {
    const { beforeImage, afterImage } = getZoneImages(projectFolder, pkg.name);
    
    return {
      id: `package-${index}`,
      beforeImage,
      afterImage,
      label: pkg.name,
      metricKey: metricKeys[index % metricKeys.length],
      landValue: pkg.acres?.toString(),
      isComparison: false,
      showOngoingBadge: true,
    };
  });
}

/**
 * Generate gallery config from project data with zones
 */
export function generateGalleryConfigFromZones(
  projectName: string,
  state: string,
  projectFolder: string,
  zones: Array<{ name: string; acres?: number }>,
  metrics: GalleryMetric[],
): GalleryConfig {
  return {
    title: projectName,
    state,
    metrics,
    tiles: generateZoneTiles(projectFolder, zones),
  };
}

/**
 * Generate gallery config from project data with packages
 */
export function generateGalleryConfigFromPackages(
  projectName: string,
  state: string,
  projectFolder: string,
  packages: Array<{ name: string; acres?: number }>,
  metrics: GalleryMetric[],
): GalleryConfig {
  return {
    title: projectName,
    state,
    metrics,
    tiles: generatePackageTiles(projectFolder, packages),
  };
}
