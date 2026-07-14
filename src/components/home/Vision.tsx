import { useEffect, useMemo, useRef, useState } from "react";
import { Quote } from "lucide-react";

import ShaderGlobe from "@/components/home/ShaderGlobe";

const introText =
  "We partner with Urban Local Bodies and waste generators to address one of urban India's most persistent challenges - organic wet waste. Through scientifically managed Black Soldier Fly processing, we divert waste from landfills and convert it into larvae, organic manure, and frass, creating measurable environmental value at every stage of the process.";

const ITEMS = [
  {
    label: "Our Vision",
    text: "To lead global circular ecosystem transformation by setting the benchmark for a zero-waste future.",
  },
  {
    label: "Our Mission",
    text: "Deliver technology-driven waste management with integrity and with inbuilt Safety, Health and Environmental Standards.",
  },
] as const;

const Vision = () => {
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const quoteText = useMemo(() => introText.replace(/\s+/g, " ").trim(), []);

  useEffect(() => {
    const node = quoteRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsQuoteVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsQuoteVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section-padding bg-muted/30"
      data-anim-start="top 90%"
      data-anim-duration="1.1"
    >
      <div className="container-main">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground md:text-sm">
            Purpose & Strategic Direction
          </p>

          <h2
            data-fly-target="vision"
            className="mt-2 text-3xl font-bold leading-tight text-foreground md:text-4xl"
          >
            Driving Sustainable <span className="text-primary">Change</span>
          </h2>

          <p
            ref={quoteRef}
            className="relative z-10 mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed"
            aria-label={quoteText}
          >
            <span className="mr-2 inline-flex align-middle text-primary/80">
              <Quote className="h-6 w-6 rotate-180 text-primary/80" />
            </span>
            {quoteText.split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                className={`inline transition-[color,opacity,filter] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isQuoteVisible
                    ? "text-foreground/80 opacity-100 blur-0"
                    : "text-muted-foreground/40 opacity-70 blur-[0.5px]"
                }`}
                style={
                  isQuoteVisible
                    ? { transitionDelay: `${Math.min(index * 22, 6200)}ms` }
                    : undefined
                }
              >
                {char}
              </span>
            ))}
            <span className="ml-2 inline-flex align-middle text-primary/80">
              <Quote className="h-6 w-6 text-primary/80" />
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="w-full max-w-md space-y-16 md:space-y-20">
            {ITEMS.map((item) => (
              <div key={item.label}>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground md:text-sm">
                  {item.label}
                </p>

                <div className="mt-4 border-l-[5px] border-primary pl-6 md:pl-8">
                  <h3 className="text-lg font-semibold leading-snug text-foreground">
                    {item.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="flex h-full items-center justify-center">
            <ShaderGlobe />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
