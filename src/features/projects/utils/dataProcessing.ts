/**
 * Data processing and transformation utilities
 */
import { isDateLikeMarker } from './formatting';

/** Normalization map for state names */
export const STATE_NORMALIZATION_MAP: Record<string, string> = {
  tamilnadu: 'Tamil Nadu',
  Keralam: 'Keralam',
  puducherry: 'Puducherry',
  'andhra pradesh': 'Andhra Pradesh',
  gujarat: 'Gujarat',
  maharashtra: 'Maharashtra',
  haryana: 'Haryana',
  assam: 'Assam',
  'uttar pradesh': 'Uttar Pradesh',
};

/**
 * Normalize state name to proper case
 */
export const normalizeState = (value: string): string => {
  const key = value.trim().toLowerCase();
  return STATE_NORMALIZATION_MAP[key] ?? value.trim();
};

/**
 * Build a scope key for lookup (used for official scope descriptions)
 */
export const buildScopeKey = (title: string, state: string): string => {
  return `${title.trim().toLowerCase()}|${state.trim().toLowerCase()}`;
};

/**
 * Split credibility markers from raw text
 * Handles abbreviations and sentence splitting
 */
export const splitCredibilityMarkers = (value: string | null): string[] => {
  if (!value) return [];

  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized || isDateLikeMarker(normalized)) return [];

  const abbreviationMap = new Map<string, string>([
    ['Hon.', 'Hon<dot>'],
    ['Mr.', 'Mr<dot>'],
    ['Mrs.', 'Mrs<dot>'],
    ['Ms.', 'Ms<dot>'],
    ['Dr.', 'Dr<dot>'],
    ['Prof.', 'Prof<dot>'],
  ]);

  let safeText = normalized;
  abbreviationMap.forEach((token, abbr) => {
    // Use split/join for compatibility instead of replaceAll
    safeText = safeText.split(abbr).join(token);
  });

  return safeText
    .split(/\.(?=\s+[A-Z"(])/)
    .map((entry) =>
      entry
        .replace(/<dot>/g, '.')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/[.;]+$/, ''),
    )
    .filter((entry) => entry.length > 0 && !isDateLikeMarker(entry));
};

/**
 * Normalize project key for image lookup
 */
export const normalizeProjectKey = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
};
