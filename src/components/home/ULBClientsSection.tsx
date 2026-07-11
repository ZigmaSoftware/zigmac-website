const ULB_LOGOS = import.meta.glob(
  "../../assets/ULB Logos/*.{png,jpg,jpeg,svg,webp}",
  { eager: true, import: "default" },
) as Record<string, string>;

const normalizeLogoName = (value: string) =>
  value
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\(\s*/g, " (")
    .replace(/\s*\)/g, ")")
    .trim();

const allTiles = Object.entries(ULB_LOGOS)
  .map(([filePath, src]) => {
    const fileName = filePath.split("/").pop() ?? filePath;
    return { name: normalizeLogoName(fileName), src };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const doubled = [...allTiles, ...allTiles];

export default function ULBClientsSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="container-main mb-8 text-center md:mb-12">
        <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Our Esteemed Clients
        </p>
        <h2 className="mt-3 text-2xl font-bold text-foreground md:text-4xl">
          Trusted by <span className="text-primary">Urban Local Bodies</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          Partnering with Urban Local Bodies across India to deliver transformative civic
          solutions.
        </p>
      </div>

      <div className="container-main group relative overflow-hidden">
        <div className="flex gap-10 w-max animate-partners-marquee items-center py-3 group-hover:[animation-play-state:paused]">
          {doubled.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex h-20 w-32 shrink-0 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 hover:bg-card hover:shadow-lg"
            >
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                className="max-h-20 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
