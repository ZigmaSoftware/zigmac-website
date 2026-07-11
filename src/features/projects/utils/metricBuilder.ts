/**
 * Interactive metrics building for projects
 */
import { Project, InteractiveMetric } from '../types';
import { formatIndian } from './formatting';

/** Project limits for progress calculations */
export interface ProjectLimits {
  waste: number;
  land: number;
  co2: number;
}

/**
 * Build interactive metrics from a project
 */
export const buildInteractiveMetrics = (
  project: Project,
  limits: ProjectLimits,
): InteractiveMetric[] => {
  const status = project.status === 'ongoing' ? 'Ongoing' : 'Completed';
  const isOngoing = project.status === 'ongoing';
  const timeline = (project.focus || '')
    .replace(/^Project timeline:\s*/i, '')
    .replace(/\.$/, '')
    .replace(/\s*-\s*/g, ' - ')
    .trim();

  // Build land metric details with packages if available
  const landDetails: Array<{ label: string; value: string }> = [];
  if (project.packages && project.packages.length > 0) {
    project.packages.forEach((pkg) => {
      landDetails.push({ label: pkg.name, value: `${pkg.acres} acres` });
    });
  }

  return [
    {
      key: 'waste',
      label: isOngoing ? 'Estimated waste to be Processed' : 'Waste Processed',
      railValue: project.waste > 0 ? `${formatIndian(project.waste)} m3` : 'No data',
      eyebrow: 'Operations',
      title: isOngoing ? 'Estimated waste to be Processed' : 'Waste Processed',
      displayValue: project.waste > 0 ? formatIndian(project.waste) : '-',
      unit: 'CUBIC METERS',
      status,
      progress: Math.min(100, Math.round((project.waste / limits.waste) * 100)),
      details: [],
    },
    {
      key: 'land',
      label: isOngoing ? 'Target land Reclamation' : 'Land Reclaimed',
      railValue: project.land > 0 ? `${formatIndian(project.land)} Acres` : 'No data',
      eyebrow: 'Restoration',
      title: isOngoing ? 'Target land Reclamation' : 'Land Reclaimed',
      displayValue: project.land > 0 ? formatIndian(project.land) : '-',
      unit: 'ACRES RESTORED',
      status,
      progress: Math.min(100, Math.round((project.land / limits.land) * 100)),
      details: landDetails,
    },
    {
      key: 'co2',
      label: isOngoing ? 'Expected Co2e Mitigation' : 'CO2 Mitigated',
      railValue: project.co2 > 0 ? `${formatIndian(project.co2)} MT` : 'No data',
      eyebrow: 'Climate',
      title: isOngoing ? 'Expected Co2e Mitigation' : 'CO2 Mitigated',
      displayValue: project.co2 > 0 ? formatIndian(project.co2) : '-',
      unit: 'METRIC TONS',
      status,
      progress: Math.min(100, Math.round((project.co2 / limits.co2) * 100)),
      details: [],
    },
    {
      key: 'recovery',
      label: 'Project Status',
      railValue: timeline,
      eyebrow: 'Efficiency',
      title: 'Project Status',
      displayValue: status,
      unit: 'CURRENT PROJECT STAGE',
      status,
      progress: project.status === 'completed' ? 100 : 72,
      details: [
        { label: 'Project Timeline', value: timeline || 'Not available' },
      ],
    },
  ];
};

/**
 * Calculate project limits from an array of projects
 */
export const calculateProjectLimits = (projects: Project[]): ProjectLimits => {
  return projects.reduce(
    (acc, p) => ({
      waste: Math.max(acc.waste, p.waste),
      land: Math.max(acc.land, p.land),
      co2: Math.max(acc.co2, p.co2),
    }),
    { waste: 1, land: 1, co2: 1 },
  );
};
