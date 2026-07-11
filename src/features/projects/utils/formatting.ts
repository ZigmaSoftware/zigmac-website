/**
 * Formatting utilities for metrics and numbers
 */

/**
 * Format a number with Indian locale (e.g., 10,00,000)
 */
export const formatIndian = (value: number): string => {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: value % 1 === 0 ? 0 : 3,
  });
};

/**
 * Format metric numbers with proper units and fallback
 */
export const formatMetricNumber = (value: number, digits = 2): string => {
  return value > 0
    ? value.toLocaleString('en-IN', { maximumFractionDigits: digits })
    : 'Not reported';
};

/**
 * Convert value to number, handling strings and null
 */
export const toNumber = (value: number | string | null): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const normalized = value.replace(/,/g, '').trim();
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

/**
 * Check if a string looks like a date (DD.MM.YYYY or DD-MM-YYYY or DD/MM/YYYY)
 */
export const isDateLikeMarker = (value: string): boolean => {
  return /^\d{1,2}[./-]\d{1,2}[./-]\d{2,4}$/.test(value.trim());
};
