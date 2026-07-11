import { Project, ProjectSheetRow } from "../types";
import { formatMetricNumber, toNumber } from "../utils/formatting";
import {
  buildScopeKey,
  normalizeProjectKey,
  normalizeState,
  splitCredibilityMarkers,
} from "../utils/dataProcessing";
import { resolveProjectImages, getPlaceholderImage } from "../utils/imageLoading";
import { OFFICIAL_SCOPE_BY_KEY } from "./scopes";
import projectDetails from "../../../../project_details.json";

export interface ProjectSheetRowWithStatus extends ProjectSheetRow {
  status: "completed" | "ongoing";
}

type ProjectDetailsRow = {
  sno: number;
  project_brief: string | null;
  project_name: string | null;
  state: string | null;
  waste_processed: number | string | null;
  actual_quantity_cleared: number | string | null;
  land_reclaimed: number | string | null;
  schedule_progress: string | null;
  start: string | null;
  end: string | null;
  co2_mitigated: number | string | null;
  credibility_markers: string | null;
  project_status: string | null;
  executing_authority?: string | null;
  supported_by?: string | null;
  project_management_consultant?: string | null;
  packages?: Array<{ name: string; acres: number }>;
  zones?: Array<{ name: string; acres: number }>;
};

const PROJECT_DETAILS_BY_KEY: Record<string, ProjectDetailsRow> = (() => {
  const rows = (projectDetails as { projects?: ProjectDetailsRow[] })?.projects ?? [];
  const map: Record<string, ProjectDetailsRow> = {};

  for (const row of rows) {
    const title = row.project_name?.trim();
    const state = row.state?.trim();
    if (!title || !state) continue;

    map[buildScopeKey(title, state)] = row;
    map[buildScopeKey(title, normalizeState(state))] = row;
  }

  return map;
})();

const PROJECT_DETAILS_BY_NORMALIZED_KEY: Record<string, ProjectDetailsRow> = (() => {
  const rows = (projectDetails as { projects?: ProjectDetailsRow[] })?.projects ?? [];
  const map: Record<string, ProjectDetailsRow> = {};

  for (const row of rows) {
    const title = row.project_name?.trim();
    const state = row.state?.trim();
    if (!title || !state) continue;

    const titleKey = normalizeProjectKey(title);
    const stateKey = normalizeState(state).trim().toLowerCase();
    map[`${titleKey}|${stateKey}`] = row;
  }

  return map;
})();

const DETAILS_TITLE_KEY_ALIASES: Record<string, string> = {
  [normalizeProjectKey("Pallavaram")]: normalizeProjectKey("Pallavapuram"),
  [normalizeProjectKey("Tiruchirappalli- Phase 1")]: normalizeProjectKey("Tiruchirapalli- Phase 1"),
  [normalizeProjectKey("Tiruchirappalli- Phase 2")]: normalizeProjectKey("Tiruchirapalli- Phase 2"),
  [normalizeProjectKey("Tiruchirappalli- Phase 3")]: normalizeProjectKey("Tiruchirapalli- Phase 3"),
  [normalizeProjectKey("Sullurupeta")]: normalizeProjectKey("Sullurpet"),
  [normalizeProjectKey("Nayudupeta")]: normalizeProjectKey("Naidupet"),
  [normalizeProjectKey("Kammiyampettai- Cuddalore")]: normalizeProjectKey("Kamiyanpettai- Cuddalore"),
  [normalizeProjectKey("Pachayankuppam- Cuddalore")]: normalizeProjectKey("Panchayankuppam- Cuddalore"),
  [normalizeProjectKey("Atmakur")]: normalizeProjectKey("Atmakur(N)"),
};

const getProjectDetails = (title: string, rawState: string): ProjectDetailsRow | undefined => {
  const exact =
    PROJECT_DETAILS_BY_KEY[buildScopeKey(title, rawState)] ??
    PROJECT_DETAILS_BY_KEY[buildScopeKey(title, normalizeState(rawState))];
  if (exact) return exact;

  const stateKey = normalizeState(rawState).trim().toLowerCase();
  const titleKey = normalizeProjectKey(title);

  return (
    PROJECT_DETAILS_BY_NORMALIZED_KEY[`${titleKey}|${stateKey}`] ??
    PROJECT_DETAILS_BY_NORMALIZED_KEY[`${DETAILS_TITLE_KEY_ALIASES[titleKey] ?? titleKey}|${stateKey}`]
  );
};

const formatTimelineDate = (input: string | null | undefined): string => {
  const raw = input?.trim();
  if (!raw) return "Not available";
  if (/ongoing/i.test(raw)) return "Ongoing";

  const isoMatch = raw.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})(?:[ T].*)?$/);
  if (isoMatch) {
    const [, yyyy, mm, dd] = isoMatch;
    const dayNum = Number(dd);
    const monthNum = Number(mm);
    const yearNum = Number(yyyy);

    if (
      Number.isFinite(dayNum) &&
      Number.isFinite(monthNum) &&
      Number.isFinite(yearNum) &&
      monthNum >= 1 &&
      monthNum <= 12 &&
      dayNum >= 1 &&
      dayNum <= new Date(yearNum, monthNum, 0).getDate()
    ) {
      return `${String(dayNum).padStart(2, "0")}.${String(monthNum).padStart(2, "0")}.${String(
        yearNum,
      ).padStart(4, "0")}`;
    }
  }

  const parts = raw.split(/[./-]/).map((part) => part.trim());
  if (parts.length !== 3) return raw;

  const [day, month, year] = parts;
  if (!day || !month || !year) return raw;

  const dayNum = Number(day);
  const monthNum = Number(month);
  const yearNum = Number(year);

  if (!Number.isFinite(dayNum) || !Number.isFinite(monthNum) || !Number.isFinite(yearNum)) {
    return raw;
  }

  const isValidDate =
    monthNum >= 1 &&
    monthNum <= 12 &&
    dayNum >= 1 &&
    dayNum <= new Date(yearNum, monthNum, 0).getDate();
  if (!isValidDate) return raw;

  const dd = String(dayNum).padStart(2, "0");
  const mm = String(monthNum).padStart(2, "0");
  const yyyy = String(yearNum).padStart(4, "0");
  return `${dd}.${mm}.${yyyy}`;
};

const transformRowToProject = (row: ProjectSheetRowWithStatus, id: number): Project => {
  const title = row.title.trim();
  const details = getProjectDetails(title, row.state);
  const state = normalizeState(row.state);
  const waste = toNumber(details?.waste_processed ?? row.waste);
  const land = toNumber(details?.land_reclaimed ?? row.land);
  const co2 = toNumber(details?.co2_mitigated ?? row.co2);
  const periodStart = formatTimelineDate(details?.start ?? row.start);
  const periodEnd = formatTimelineDate(details?.end ?? row.end);
  const markers = splitCredibilityMarkers(details?.credibility_markers ?? row.credibility);
  const officialScope = OFFICIAL_SCOPE_BY_KEY[buildScopeKey(title, row.state)]?.trim();
  const projectBrief = details?.project_brief?.trim();
  const isCompleted = row.status === "completed";

  const resolvedImages = resolveProjectImages(title);
  const rawEnd = details?.end ?? row.end;
  const isCompletelyFinished = isCompleted && rawEnd !== "Ongoing" && !rawEnd?.includes("Ongoing");
  const images = isCompletelyFinished
    ? resolvedImages
    : {
        beforeImage:
          resolvedImages.beforeImage !== getPlaceholderImage()
            ? resolvedImages.beforeImage
            : getPlaceholderImage(),
        afterImage:
          resolvedImages.afterImage !== getPlaceholderImage()
            ? resolvedImages.afterImage
            : getPlaceholderImage(),
      };

  return {
    id,
    title,
    subtitle: isCompleted ? "Project Completed" : "Project Under Progress",
    status: row.status,
    state,
    desc: projectBrief || officialScope || `${title} legacy waste remediation project in ${state}.`,
    project: `Waste processed: ${formatMetricNumber(waste, 2)} m3. Land reclaimed: ${formatMetricNumber(land, 2)} acres.`,
    focus: `Project timeline: ${periodStart} - ${periodEnd}.`,
    outcome: `CO2 mitigated: ${formatMetricNumber(co2, 3)} MT.`,
    metrics: markers,
    waste,
    land,
    co2,
    beforeImage: images.beforeImage,
    afterImage: images.afterImage,
    packages: details?.packages,
    executingAuthority: details?.executing_authority,
    supportedBy: details?.supported_by,
    projectManagementConsultant: details?.project_management_consultant,
  };
};

export const mapRowsToProjects = (rows: ProjectSheetRowWithStatus[], startId = 1): Project[] =>
  rows.map((row, idx) => transformRowToProject(row, startId + idx));

