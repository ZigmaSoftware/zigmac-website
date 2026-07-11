/**
 * Shared motion system - single source of truth for animation
 * durations, easings, and reusable motion presets across the app.
 *
 * Use these instead of per-page inline values to keep motion coherent.
 */

/* Durations (seconds) */
export const duration = {
  fast: 0.18,
  base: 0.28,
  slow: 0.42,
  hero: 0.7,
  page: 0.5,
} as const;

/* Easings */
export const ease = {
  standard: [0.22, 1, 0.36, 1] as [number, number, number, number],
  emphasized: [0.16, 1, 0.3, 1] as [number, number, number, number],
  out: [0, 0, 0.2, 1] as [number, number, number, number],
  inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

/* Transition presets */
export const transition = {
  fast: { duration: duration.fast, ease: ease.standard },
  base: { duration: duration.base, ease: ease.standard },
  slow: { duration: duration.slow, ease: ease.standard },
  hero: { duration: duration.hero, ease: ease.emphasized },
  spring: { type: "spring" as const, stiffness: 260, damping: 20 },
} as const;

/* Enter / exit presets */
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: transition.slow },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transition.base },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: transition.base },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: transition.hero },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: transition.hero },
  },
} as const;

/* Stagger helper */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/* Reduced motion helper */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Returns motion props that respect prefers-reduced-motion.
 * Useful for animation helpers that accept a props object.
 */
export const safeMotionProps = (
  props: Record<string, unknown>,
): Record<string, unknown> => {
  if (prefersReducedMotion()) {
    return {};
  }
  return props;
};
