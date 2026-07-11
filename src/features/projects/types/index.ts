/**
 * Project-related type definitions
 */

/** Zone or Package information for projects */
export interface ProjectZone {
  name: string;
  acres: number;
}

export interface ProjectPackage {
  name: string;
  acres: number;
}

/** Represents a single project with all metadata and metrics */
export interface Project {
  id: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'ongoing';
  state: string;
  desc: string;
  project: string;
  focus: string;
  outcome: string;
  metrics: string[];
  waste: number;
  land: number;
  co2: number;
  beforeImage: string;
  afterImage: string;
  packages?: Array<{ name: string; acres: number }>;
  zones?: Array<{ name: string; acres: number }>;
  executingAuthority?: string | null;
  supportedBy?: string | null;
  projectManagementConsultant?: string | null;
}

/** Metric types available for projects */
export type MetricKey = 'waste' | 'land' | 'co2' | 'recovery';

/** Interactive metric displayed in project card details */
export interface InteractiveMetric {
  key: MetricKey;
  label: string;
  railValue: string;
  eyebrow: string;
  title: string;
  displayValue: string;
  unit: string;
  status: string;
  progress: number;
  details: Array<{ label: string; value: string }>;
}

/** Raw project data from sheet */
export interface ProjectSheetRow {
  title: string;
  state: string;
  waste: number | string | null;
  land: number | string | null;
  co2: number | string | null;
  start: string | null;
  end: string | null;
  credibility: string | null;
}

/** Project status enum */
export enum ProjectStatus {
  COMPLETED = 'Completed',
  ONGOING = 'Under Progress',
  ACTIVE = 'Active',
}
