/**
 * Hook for building project metrics
 *  */
import { useMemo } from 'react';
import { Project, InteractiveMetric } from '../types';
import { buildInteractiveMetrics, calculateProjectLimits } from '../utils/metricBuilder';

/**
 * Hook to build interactive metrics for a project
 */
export const useProjectMetrics = (
  project: Project,
  allProjects: Project[],
): InteractiveMetric[] => {
  return useMemo(() => {
    const limits = calculateProjectLimits(allProjects);
    return buildInteractiveMetrics(project, limits);
  }, [project, allProjects]);
};
