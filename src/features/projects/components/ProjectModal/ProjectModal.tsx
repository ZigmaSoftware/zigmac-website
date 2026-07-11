import { useEffect, type ReactNode } from "react";
import { X, MapPin } from "lucide-react";
import credibilityBg from "@/assets/icons/Credibility.png";
import leafLeft from "@/assets/icons/leaf-left.png";
import leafRight from "@/assets/icons/leaf-right.png";
import type { Project } from "../../types";
import {
  buildCredibilityMarkers,
  getAuthorityLogo,
  getProjectManagementConsultantLogo,
  getSupportedByLogo,
  normalizeProjectModalValue,
  type ProjectModalLogo,
} from "./projectModalPresentation";

// ============ Types ============
interface CredibilityMarker {
  text: string;
  icon: ReactNode;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

interface ProjectDetailCard {
  label: string;
  value: string;
  logo: ProjectModalLogo | null;
}

// ============ Style Constants ============
const SIZES = {
  modalWidth: "max-w-[1100px]",
  modalHeight: "max-h-[95vh]",
};

// ============ Sub-Components ============

const DetailLogo = ({ logo }: { logo: ProjectModalLogo }) => (
  <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center">
    <img
      src={credibilityBg}
      alt=""
      className="absolute inset-0 h-full w-full object-contain opacity-80"
    />
    <img
      src={logo.src}
      alt={logo.alt}
      loading="lazy"
      className={logo.className ?? "relative h-12 w-12 object-contain mb-3"}
    />
  </div>
);

/** Header with title, location badge, and close button */
interface ModalHeaderProps {
  title: string;
  state: string;
  onClose: () => void;
}

const ModalHeader = ({ title, state, onClose }: ModalHeaderProps) => (
  <div className="sticky top-0 z-30 flex items-center justify-between rounded-t-[18px] border-b border-[#d5dce5] bg-[#f3f5f7] px-6 py-5 sm:px-10 sm:py-6">
    <div className="flex flex-1 items-center gap-3 sm:gap-4 ">
      <h2 className="truncate text-2xl font-extrabold leading-tight tracking-[-0.02em]  sm:text-[40px] ">
        {title}
      </h2>
      <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full  px-4 py-1.5">
        <MapPin className="h-4 w-4 text-[#7f8c9f]" />
        <span className="text-sm font-medium text-[#667488]">{state}</span>
      </span>
    </div>

    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="ml-4 flex-shrink-0 rounded-full border border-[#cad2dc] p-2 text-[#98a5b6] transition-colors hover:bg-[#e8edf3] hover:text-[#647589]"
    >
      <X className="h-5 w-5" />
    </button>
  </div>
);

/** Project brief section */
interface ProjectBriefProps {
  description: string;
  inlineDetail?: ProjectDetailCard | null;
}

const ProjectBrief = ({ description, inlineDetail }: ProjectBriefProps) => (
  <section>
    <div className="mb-4 flex items-center gap-2">
      <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1f4c8a]">
        Project Brief
      </span>
    </div>
    <div className="rounded-[14px] border border-[#ced6df] bg-[#eceff3] px-6 py-6 sm:px-8">
      <p className="text-base leading-relaxed text-[#394450]">{description}</p>
      {inlineDetail && (
        <div className="mt-5 border-t border-[#ced6df] pt-5">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            {inlineDetail.logo && <DetailLogo logo={inlineDetail.logo} />}
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#1f4c8a]">
                {inlineDetail.label}
              </p>
              <p className="mt-1 text-lg leading-snug text-[#394450]">{inlineDetail.value}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </section>
);

/** Project details section (Authority, Support, Consultant) */
interface ProjectDetailsProps {
  detailItems: ProjectDetailItem[];
}

interface ProjectDetailItem {
  label: string;
  value?: string | null;
  logo: ProjectModalLogo | null;
}

const getSupportedByLabel = (supportedBy?: string | null) => {
  const normalizedSupportedBy = supportedBy?.trim().toLowerCase() ?? "";
  return normalizedSupportedBy.includes("world bank") ? "Funded By" : "Supported By";
};

const hasProjectDetailValue = (value?: string | null) => {
  const normalizedValue = value?.trim().toLowerCase() ?? "";
  return normalizedValue !== "" && normalizedValue !== "not available";
};

const buildProjectDetailItems = ({
  executingAuthority,
  supportedBy,
  projectManagementConsultant,
}: {
  executingAuthority?: string | null;
  supportedBy?: string | null;
  projectManagementConsultant?: string | null;
}): ProjectDetailItem[] =>
  [
    {
      label: "Executing Authority",
      value: executingAuthority,
      logo: getAuthorityLogo(executingAuthority),
    },
    {
      label: getSupportedByLabel(supportedBy),
      value: supportedBy,
      logo: getSupportedByLogo(supportedBy),
    },
    {
      label: "Project Management Consultant",
      value: projectManagementConsultant,
      logo: getProjectManagementConsultantLogo(projectManagementConsultant),
    },
  ].filter((item) => hasProjectDetailValue(item.value));

const ProjectDetailsSection = ({ detailItems }: ProjectDetailsProps) => {
  const visibleCardCount = detailItems.length;
  if (visibleCardCount <= 1) return null;

  const gridColumnsClass =
    visibleCardCount === 1
      ? "md:grid-cols-1"
      : visibleCardCount === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";
  const detailCardClass =
    visibleCardCount === 1
      ? "mx-auto flex h-full min-h-[150px] w-full max-w-[640px] flex-col items-center justify-center rounded-[14px] border border-[#ced6df] bg-[#eceff3] px-6 py-5"
      : "flex h-full min-h-[220px] flex-col items-center justify-center rounded-[14px] border border-[#ced6df] bg-[#eceff3] px-6 py-6";

  return (
    <section>
      <div className={`grid grid-cols-1 gap-4 ${gridColumnsClass}`}>
        {detailItems.map((detail) => (
          <div
            key={detail.label}
            className={detailCardClass}
          >
            <p className="mb-2 whitespace-nowrap text-center text-sm font-semibold uppercase tracking-wider text-[#1f4c8a]">
              {detail.label}
            </p>
            <p className="text-center text-base text-[#394450]">{normalizeProjectModalValue(detail.value)}</p>
            {detail.logo && (
              <div className="mt-4 flex justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <img
                    src={credibilityBg}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain opacity-80"
                  />
                  <img
                    src={detail.logo.src}
                    alt={detail.logo.alt}
                    loading="lazy"
                    className={detail.logo.className ?? "relative h-14 w-14 object-contain mb-4"}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

/** Single credibility marker card */
interface MarkerCardProps {
  icon: ReactNode;
  text: string;
}

// icons size

const MarkerCard = ({ icon, text }: MarkerCardProps) => 
  <div className="flex h-full items-center gap-5 rounded-lg border border-[#cae4d8] bg-white px-6 py-5 transition-all hover:shadow-md">
    <div className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center">
      <img src={credibilityBg} alt="" className="absolute inset-0 h-full w-full object-contain opacity-80" />
      <span className="relative z-10 flex h-20 w-20 items-center justify-center text-primary">{icon}</span>
    </div>

    <p className="flex-1 text-md  text-justify  ">{text}</p>
  </div>
;

/** Credibility markers section with header */
interface CredibilityMarkersSectionProps {
  markers: CredibilityMarker[];
  projectDetail?: ProjectDetailItem | null;
}

const ProjectDetailMarkerCard = ({ detail }: { detail: ProjectDetailItem }) => (
  <div className="flex h-full items-center gap-5 rounded-lg border border-[#cae4d8] bg-white px-6 py-5 transition-all hover:shadow-md">
    {detail.logo ? <DetailLogo logo={detail.logo} /> : null}
    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#1f4c8a]">
        {detail.label}
      </p>
      <p className="mt-1 text-base leading-relaxed text-[#394450]">{normalizeProjectModalValue(detail.value)}</p>
    </div>
  </div>
);

const CredibilityMarkersSection = ({ markers, projectDetail }: CredibilityMarkersSectionProps) => {
  const totalCards = markers.length + (projectDetail ? 1 : 0);

  return (
    <section>
      {/* Section Header with decorative leaves */}
      <div className="mb-3 flex items-center justify-center  ">
        <img src={leafLeft} alt="" className="h-32 w-10 object-contain opacity-85" />
        <div className="text-center">
          <h3 className="mt-4 text-2xl font-bold uppercase tracking-[0.2em]">
            Credibility Markers
          </h3>
        </div>
        <img src={leafRight} alt="" className="h-32 w-10 object-contain opacity-85" />
      </div>

      {/* Marker Cards Grid */}
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {projectDetail && (
          <div className={totalCards === 1 ? "md:col-span-2" : "h-full"}>
            <ProjectDetailMarkerCard detail={projectDetail} />
          </div>
        )}
        {markers.map((marker, index) => (
          <div key={index} className={totalCards === 1 ? "md:col-span-2" : "h-full"}>
            <MarkerCard icon={marker.icon} text={marker.text} />
          </div>
        ))}
      </div>
    </section>
  );
};

// ============ Main Component ============

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  // Handle Escape key and body overflow
  useEffect(() => {
    if (!project) return;

    const lenis = (window as Window & {
      __lenis?: {
        scroll?: number;
        stop?: () => void;
        start?: () => void;
        scrollTo: (
          target: number | string | HTMLElement,
          options?: { immediate?: boolean; offset?: number },
        ) => void;
      };
    }).__lenis;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const scrollY = typeof lenis?.scroll === "number" ? lenis.scroll : window.scrollY;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;

    window.addEventListener("keydown", handleEscapeKey);
    lenis?.stop?.();
    if (!lenis) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      if (lenis) {
        lenis.start?.();
        lenis.scrollTo(scrollY, { immediate: true });
      } else {
        document.body.style.position = originalBodyPosition;
        document.body.style.top = originalBodyTop;
        document.body.style.width = originalBodyWidth;
        document.body.style.overflow = originalBodyOverflow;
        window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  const detailItems = buildProjectDetailItems({
    executingAuthority: project.executingAuthority,
    supportedBy: project.supportedBy,
    projectManagementConsultant: project.projectManagementConsultant,
  });
  const credibilityMarkers: CredibilityMarker[] = buildCredibilityMarkers(project);
  const loneProjectDetail = detailItems.length === 1 ? detailItems[0] : null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-[2px]" onClick={onClose} />

      {/* Modal Container */}
      <div className={`relative isolate z-10 w-full ${SIZES.modalWidth} ${SIZES.modalHeight} overflow-y-auto rounded-[18px] border border-[#d8dee6] bg-[#f3f5f7] shadow-[0_25px_70px_rgba(15,23,42,0.20)]`}>
        {/* Header Section */}
        <ModalHeader title={project.title} state={project.state} onClose={onClose} />

        {/* Content Section */}
        <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
          <ProjectBrief description={project.desc} />
          <ProjectDetailsSection detailItems={detailItems} />
          {credibilityMarkers.length > 0 && (
            <CredibilityMarkersSection markers={credibilityMarkers} projectDetail={loneProjectDetail} />
          )}
          {credibilityMarkers.length === 0 && loneProjectDetail && (
            <CredibilityMarkersSection markers={[]} projectDetail={loneProjectDetail} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
