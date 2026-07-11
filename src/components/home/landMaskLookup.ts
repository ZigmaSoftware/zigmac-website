import { ACCURATE_LAND_MASK } from "./accurateLandMask";

// Grid covers lat 84..-84 step 1.2deg (140 rows), lng -180..180 step 1.2deg (301 cols)
const LAT_START = 84;
const LAT_STEP = 1.2;
const LNG_START = -180;
const LNG_STEP = 1.2;
const ROWS = ACCURATE_LAND_MASK.length;
const COLS = ACCURATE_LAND_MASK[0].length;

export function isLandPoint(lat: number, lng: number): boolean {
  const row = Math.round((LAT_START - lat) / LAT_STEP);
  let col = Math.round((lng - LNG_START) / LNG_STEP);

  if (row < 0 || row >= ROWS) return false;
  col = ((col % COLS) + COLS) % COLS;

  return ACCURATE_LAND_MASK[row][col] === ".";
}
