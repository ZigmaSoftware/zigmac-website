import { useMemo } from "react";

const CEMENT_LOGOS = import.meta.glob(
  "../../assets/Cement Svgs/*.{png,jpg,jpeg,svg,webp}",
  { eager: true, import: "default" },
) as Record<string, string>;

const normalizeLogoName = (value: string) =>
  value
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const allPartners = Object.entries(CEMENT_LOGOS)
  .map(([filePath, src]) => {
    const fileName = filePath.split("/").pop() ?? filePath;
    return { name: normalizeLogoName(fileName), logo: src };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof allPartners;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div
        className={`flex gap-10 w-max items-center py-3 group-hover:[animation-play-state:paused] ${
          reverse
            ? "animate-partners-marquee-reverse"
            : "animate-partners-marquee"
        }`}
      >
        {doubled.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 hover:bg-card hover:shadow-lg"
          >
            <img
              src={p.logo}
              alt={p.name}
              loading="lazy"
              className="max-h-16 max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const PartnersSection = () => {
  const row1 = useMemo(() => allPartners.slice(0, Math.ceil(allPartners.length / 2)), []);
  const row2 = useMemo(() => allPartners.slice(Math.ceil(allPartners.length / 2)), []);

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="container-main mb-8 text-center md:mb-12">
        <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Trusted Partners
        </p>
        <h2 className="mt-3 text-2xl font-bold text-foreground md:text-4xl">
          Partnerships with <span className="text-primary">Cement Producers</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          We convert legacy waste into high-calorific RDF for co-processing in cement kilns,
          reducing landfill burden and fossil fuel dependency while advancing measurable
          decarbonization outcomes.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
};

export default PartnersSection;
