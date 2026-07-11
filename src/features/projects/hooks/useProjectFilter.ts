/**
 * Hook for managing project filters
 */
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Project } from '../types';

/**
 * Hook to manage project state filtering
 */
export const useProjectFilter = (projects: Project[]) => {
  const states = useMemo(() => Array.from(new Set(projects.map((p) => p.state))), [projects]);
  const [selectedState, setSelectedState] = useState<string>(states[0] || '');

  const filteredProjects = useMemo(
    () => projects.filter((p) => p.state === selectedState),
    [projects, selectedState],
  );
  const firstProjectId = filteredProjects[0]?.id;

  const handleStateSelect = useCallback((state: string) => {
    setSelectedState(state);
  }, []);

  // Ensure selected state is valid
  useEffect(() => {
    if (!states.length) return;
    if (!selectedState || !states.includes(selectedState)) {
      setSelectedState(states[0]);
    }
  }, [states, selectedState]);

  // Scroll to first project when state changes
  useEffect(() => {
    if (!firstProjectId) return;

    // Use setTimeout to ensure DOM is updated
    setTimeout(() => {
      const el = document.getElementById(`proj-${firstProjectId}`);
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 130,
        behavior: 'smooth',
      });
    }, 0);  
  }, [selectedState, firstProjectId]);

  return {
    states,
    selectedState,
    filteredProjects,
    handleStateSelect,
  };
};
