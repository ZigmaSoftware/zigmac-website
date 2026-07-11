import { useMemo, useState, type CSSProperties } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Reveal from "@/components/animation/Reveal";
import peopleHero from "@/assets/people at zigfly/Zigfly beyond work/74_result.webp";

type TabId = "office" | "beyond";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const ANIMATION_BASE_DURATION = 18;
const ANIMATION_LANE_MULTIPLIERS = [1, 1, 1] as const;

const TABS: { id: TabId; label: string }[] = [
  { id: "office", label: "Our Office" },
  { id: "beyond", label: "Zigmac beyond work" },
];

const TAB_FOLDERS: Record<TabId, string> = {
  office: "office",
  beyond: "Zigfly beyond work",
};

const peopleAssets = import.meta.glob("../assets/people at zigfly/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  import: "default",
});

const toTitle = (fileName: string) =>
  fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const PEOPLE_GALLERIES: Record<TabId, GalleryImage[]> = (Object.keys(TAB_FOLDERS) as TabId[]).reduce(
  (acc, tabId) => {
    const folderName = TAB_FOLDERS[tabId];
    const folderImages = Object.entries(peopleAssets)
      .filter(([path]) => path.includes(`/people at zigfly/${folderName}/`))
      .map(([path, src]) => {
        const fileName = path.split("/").pop() ?? "Zigma gallery image";
        return {
          id: path,
          src: src as string,
          alt: toTitle(fileName),
        };
      })
      .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: "base" }));

    acc[tabId] = folderImages;
    return acc;
  },
  {} as Record<TabId, GalleryImage[]>,
);

const ImageCard = ({ image, index }: { image: GalleryImage; index: number }) => (
  <article className="group overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
    <div
      className="overflow-hidden"
      style={{ aspectRatio: index % 3 === 0 ? "4 / 5" : index % 2 === 0 ? "1 / 1" : "4 / 3" }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    </div>
  </article>
);

const createLaneImages = (images: GalleryImage[]): [GalleryImage[], GalleryImage[], GalleryImage[]] => {
  const lanes: [GalleryImage[], GalleryImage[], GalleryImage[]] = [[], [], []];

  images.forEach((image, index) => {
    lanes[index % 3].push(image);
  });

  return lanes.map((lane) => (lane.length > 0 ? [...lane, ...lane] : lane)) as [
    GalleryImage[],
    GalleryImage[],
    GalleryImage[],
  ];
};

const calculateLaneDurations = (imageCount: number): [number, number, number] => {
  const base = Math.max(ANIMATION_BASE_DURATION, Math.ceil(imageCount / 8) * 12);
  return [
    base,
    base * ANIMATION_LANE_MULTIPLIERS[1],
    base * ANIMATION_LANE_MULTIPLIERS[2],
  ];
};

const getLaneStyle = (duration: number, delay: string): CSSProperties => ({
  animationName: "peopleScrollUp",
  animationDuration: `${duration}s`,
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationDirection: "normal",
  animationDelay: delay,
  willChange: "transform",
});

const People = () => {
  const [activeTab, setActiveTab] = useState<TabId>("office");
  const activeImages = PEOPLE_GALLERIES[activeTab];
  const laneImages = useMemo(() => createLaneImages(activeImages), [activeImages]);
  const laneDurations = useMemo(() => calculateLaneDurations(activeImages.length), [activeImages.length]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Header />

      <style>{`
        @keyframes peopleScrollUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>

      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20 scroll-mt-24 lg:scroll-mt-28">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${peopleHero})` }}
          aria-hidden="true"
        />
        {/* <div className="absolute inset-0 bg-black/35" aria-hidden="true" /> */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/28 to-black/22"
          aria-hidden="true"
        />

        <div className="container-main relative">
          <Reveal variant="fade-up">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/85 md:text-base">
                Our Team
              </p>
              <h1 className="mt-3 text-5xl font-bold leading-tight text-white md:text-6xl">
                Life at Zigmac
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/90 text-center">
                Experience a workplace that values innovation, collaboration and makes a meaningful
                impact. Indulge in an intrapreneurial culture that enables you to find your own
                identity.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="mb-8 flex w-full justify-start gap-0 overflow-x-auto md:justify-center">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap border-b-2 px-5 py-3 text-sm font-medium transition-colors md:px-10 md:py-4 md:text-base ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/70 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeImages.length > 0 ? (
            <div className="mt-5 min-w-0 flex-1">
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {activeImages.map((image, index) => (
                  <ImageCard
                    key={`${activeTab}-mobile-${image.id}`}
                    image={image}
                    index={index}
                  />
                ))}
              </div>

              <div className="hidden md:grid md:grid-cols-3 gap-5">
                {laneImages.map((lane, laneIndex) => (
                  <div
                    key={`${activeTab}-lane-${laneIndex}`}
                    className="overflow-hidden h-[920px]"
                  >
                    <div
                      className="flex flex-col gap-5 hover:[animation-play-state:paused]"
                      style={getLaneStyle(
                        laneDurations[laneIndex],
                        `${laneIndex * -3.5}s`,
                      )}
                    >
                      {lane.map((image, index) => (
                        <div key={`${activeTab}-lane-${laneIndex}-${image.id}-${index}`}>
                          <ImageCard image={image} index={index} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 py-16 text-center text-slate-500">
              <p className="text-sm">No images available for this section yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default People;
