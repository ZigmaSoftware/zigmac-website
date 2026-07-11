import { type FC, useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bg from "@/assets/website/hero/bsf visit.webp";
import Reveal from "@/components/animation/Reveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const SLOW_EASE = "power2.out";

type Testimonial = {
  id: string;
  name: string;
  designation: string;
  quote: string;
  rating?: number;
};

type SiteVisitImage = {
  src: string;
  alt: string;
};

const testimonials: Testimonial[] = [
  {
    id: "saleena-vg-nair",
    name: "Saleena V. G. Nair",
    designation: "Addl. District Judge, Ernakulum, Keralam.",
    quote: "Really impressed by the technology adopted by Zigma. Best wishes to the project.",
    rating: 5,
  },
  {
    id: "dinesan-cheruvat",
    name: "Dr. Dinesan Cheruvat IAS",
    designation: "Director (Rural), LSGD, Keralam",
    quote: "Biomining of organic waste seems to be a feasible solution even for bulk waste.",
    rating: 5,
  },
  {
    id: "gaurav-borse",
    name: "Gaurav Borse",
    designation: "Agronomist and General Manager (Agro), Zydex Industries, Maharashtra",
    quote: "Good. It is really good project of giving good solution to problems of city wastes.",
    rating: 5,
  },
  {
    id: "t-shemeera-kunhu",
    name: "T Shemeera Kunhu (HOD)",
    designation: "Assistant Professor, PTM Government College Perinthalmanna, Keralam",
    quote: "Mr. Shiva explained the process well. Very interesting process. The solar drier was a new idea which one learned.",
    rating: 5,
  },
  {
    id: "jancy-p-joseph",
    name: "Jancy P. Joseph",
    designation: "DyDC & DPMU - KSWMP, Local Self Government Department, Government of Keralam",
    quote: "Great initiative.",
    rating: 5,
  },
  {
    id: "krishnan-mn",
    name: "Er. Krishnan M.N.",
    designation: "Senior Environmental Engineer (KSPCB), Palakkad, Keralam",
    quote: "The plant is well operated, disposal to combined unit systematically for inspection.",
    rating: 5,
  },
  {
    id: "prathibha-ganesan",
    name: "Dr. Prathibha Ganesan",
    designation: "Principal Scientist - Climate Resilience, M. S. Swaminathan Research Foundation (MSSRF), Chennai",
    quote: "Well maintained plant.",
    rating: 5,
  },
  {
    id: "rajinder-chauhan",
    name: "Rajinder Chauhan",
    designation: "Project Officer, Department of Urban Development, Government of Himachal Pradesh",
    quote: "Good waste. Doing a good job towards environment. Well maintained.",
    rating: 5,
  },
  {
    id: "sukanya-sundaran",
    name: "Sukanya Sundaran",
    designation: "Young Professional at Suchitwa Mission, Ernakulam, Keralam",
    quote: "Well maintained and equipped.",
    rating: 5,
  },
  {
    id: "jessy-antony",
    name: "Prof. Jessy Antony",
    designation: "Municipal Councillor, Thodupuzha Municipality, Idukki, Keralam",
    quote: "A team of 24 councillors and 4 staff visited Brahmapuram plant as a part of study tour. We also studied about the process of management of biodegradable waste using Black Soldier Fly.",
    rating: 5,
  },
  {
    id: "mp-jackson",
    name: "M. P. Jackson",
    designation: "Chairman, Irinjalakuda Municipality, Thrissur, Keralam",
    quote: "Plant working is very good.",
    rating: 5,
  },
  {
    id: "venu-rajamony",
    name: "Venu Rajamony",
    designation: "Former Indian Ambassador to the Netherlands, Chairman, Future Kerala Mission, Jain University, Kochi, Keralam.",
    quote: "Visited the facility and was given detailed explanation by Santhosh. This work being done by Zigma is most important. We need to find effective and sustainable solutions for the waste we create. All the best!",
    rating: 5,
  },
];

const TESTIMONIAL_CARDS = [...testimonials, ...testimonials] as const;

const siteVisitModules = import.meta.glob<string>(
  "@/assets/Testimonials/Visits/*.{webp,png,jpg,jpeg}",
  {
    eager: true,
    import: "default",
  }
);

const getFileName = (path: string): string => path.split("/").pop() ?? path;

const compareVisitImagePaths = ([pathA]: [string, string], [pathB]: [string, string]): number =>
  getFileName(pathA).localeCompare(getFileName(pathB), undefined, {
    numeric: true,
    sensitivity: "base",
  });

const SITE_VISIT_IMAGES: SiteVisitImage[] = Object.entries(siteVisitModules)
  .sort(compareVisitImagePaths)
  .map(([path, src], index) => ({
    src,
    alt: `Zigma site visit ${getFileName(path).replace(/\.[^.]+$/, "") || index + 1}`,
  }));

interface VisitorsSliderProps {
  images: SiteVisitImage[];
}

const VISITORS_SLIDER_DELAY = 5000;

const SiteVisitCard: FC<{ image: SiteVisitImage }> = ({ image }) => (
  <figure className="group relative aspect-square overflow-hidden bg-muted shadow-[0_14px_35px_rgba(15,23,42,0.12)]">
    <img
      src={image.src}
      alt={image.alt}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
    <div
      className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent"
      aria-hidden="true"
    />
  </figure>
);

const VisitorsSlider: FC<VisitorsSliderProps> = ({ images }) => {
  const [api, setApi] = useState<CarouselApi>();
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  const clearAutoSlide = useCallback((): void => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  }, []);

  const restartAutoSlide = useCallback((): void => {
    clearAutoSlide();

    if (!api || images.length <= 1 || isHoveredRef.current) return;

    autoSlideRef.current = setInterval(() => {
      api.scrollNext();
    }, VISITORS_SLIDER_DELAY);
  }, [api, clearAutoSlide, images.length]);

  useEffect(() => {
    if (!api) return;

    restartAutoSlide();

    return () => {
      clearAutoSlide();
    };
  }, [api, clearAutoSlide, restartAutoSlide]);

  useEffect(() => clearAutoSlide, [clearAutoSlide]);

  const handleManualAction = useCallback(
    (action: () => void): void => {
      clearAutoSlide();
      action();
      restartAutoSlide();
    },
    [clearAutoSlide, restartAutoSlide]
  );

  const handleMouseEnter = (): void => {
    isHoveredRef.current = true;
    clearAutoSlide();
  };

  const handleMouseLeave = (): void => {
    isHoveredRef.current = false;
    restartAutoSlide();
  };

  const totalSlides = api?.scrollSnapList().length ?? images.length;

  return (
    <div
      className="w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true, slidesToScroll: 1, duration: 45 }}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="-ml-5 py-2 md:-ml-7">
          {images.map((image) => (
            <CarouselItem
              key={image.src}
              className="basis-full pl-5 md:basis-1/2 md:pl-7 lg:basis-1/3"
            >
              <SiteVisitCard image={image} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {totalSlides > 1 ? (
        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => handleManualAction(() => api?.scrollPrev())}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/25 bg-white text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              aria-label="Previous visitor slide"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => handleManualAction(() => api?.scrollNext())}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/25 bg-white text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              aria-label="Next visitor slide"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const getLoopPoint = () => scroller.scrollWidth / 2;

    const setLoopStart = () => {
      scroller.scrollLeft = getLoopPoint();
    };

    setLoopStart();

    const timer = window.setInterval(() => {
      if (isPausedRef.current) return;

      scroller.scrollLeft += 1;
      if (scroller.scrollLeft >= getLoopPoint()) {
        scroller.scrollLeft = 0;
      }
    }, 16);

    const handleResize = () => setLoopStart();
    window.addEventListener("resize", handleResize);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("resize", handleResize);
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const scrollCardsRight = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    isPausedRef.current = true;
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    scroller.scrollBy({ left: 320, behavior: "smooth" });

    resumeTimerRef.current = window.setTimeout(() => {
      isPausedRef.current = false;
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background">
      <style>{`
        .testimonial-marquee {
          overflow-x: hidden;
          overflow-y: visible;
          position: relative;
          min-height: 256px;
        }

        .testimonial-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          align-items: flex-start;
        }

        .testimonial-marquee-card {
          flex-shrink: 0;
          height: 234px;
          width: 280px;
          user-select: none;
          transform: translateY(0);
          transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
        }

        .testimonial-scroller {
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          min-height: 256px;
          padding: 0.3rem 0 0.55rem;
        }

        .testimonial-scroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <Header />
      <main>
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20 scroll-mt-24 lg:scroll-mt-28">
          <img
            src={bg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/35"
            aria-hidden="true"
          />

          <div className="container-main relative text-center">
            <Reveal
              className="mx-auto max-w-4xl"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <p className="text-lg font-medium uppercase tracking-[0.35em] text-white/85">
                Testimonials
              </p>
              <h1 className="mt-3 text-5xl font-bold leading-tight text-white md:text-6xl">
                Voices That Validate Our Impact
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/90">
                Hear directly from industry leaders, government officials, and partners who have witnessed our circular waste-to-value transformation.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-10 md:py-12">
          <div className="container-main">
            <Reveal
              variant="fade-up"
              data-anim-start="top 92%"
              data-anim-duration="1.4"
              data-anim-ease={SLOW_EASE}
              className="mx-auto mb-6 max-w-2xl text-center md:mb-8"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:text-xs">
                Featured Testimonials
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                What Our Clients <span className="text-primary">Say</span>
              </h2>
            </Reveal>

            <Reveal
              variant="fade-up"
              data-anim-start="top 88%"
              data-anim-duration="1.2"
              data-anim-ease={SLOW_EASE}
              className="relative"
            >
              <div className="testimonial-marquee group">
                <div
                  ref={scrollerRef}
                  className="testimonial-scroller"
                  onMouseEnter={() => {
                    isPausedRef.current = true;
                  }}
                  onMouseLeave={() => {
                    isPausedRef.current = false;
                  }}
                >
                  <div className="testimonial-track">
                    {TESTIMONIAL_CARDS.map((testimonial, index) => (
                      <article
                        key={`card-${testimonial.id}-${index}`}
                        className="testimonial-marquee-card group relative z-0 flex flex-col rounded-xl border border-gray-200 bg-white p-3.5 shadow-[0_4px_12px_rgba(15,23,42,0.08)] hover:z-10 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)]"
                      >
                        <div className="mb-2 flex items-center gap-0.5">
                          {Array.from({ length: testimonial.rating ?? 0 }).map((_, starIndex) => (
                            <span key={starIndex} className="text-[11px] leading-none text-yellow-400">
                              {"\u2605"}
                            </span>
                          ))}
                        </div>

                        <blockquote className="h-[102px] flex-none">
                          <p className="line-clamp-5 text-[13px] leading-5 text-foreground">
                            <span className="text-primary">"</span>
                            <span className="font-medium">{testimonial.quote}</span>
                            <span className="text-primary">"</span>
                          </p>
                        </blockquote>

                        <div className="mt-auto border-t border-gray-200 pt-2.5">
                          <p className="line-clamp-1 text-[11px] font-semibold leading-tight text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-muted-foreground">
                            {testimonial.designation}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-2 z-20 flex items-center">
                  <button
                    type="button"
                    onClick={scrollCardsRight}
                    className="pointer-events-none flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/95 text-foreground opacity-0 shadow-[0_10px_24px_rgba(15,23,42,0.14)] transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 hover:scale-105 hover:border-primary hover:text-primary"
                    aria-label="Slide testimonials"
                  >
                    <ChevronRight size={18} strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-padding overflow-hidden bg-background">
          <div className="container-main text-center">
            <Reveal
              variant="fade-up"
              data-anim-start="top 90%"
              data-anim-duration="1.3"
              data-anim-ease={SLOW_EASE}
              className="mx-auto max-w-3xl"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:text-xs">
                Site Visits
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-4xl">
                Witnessing Change <span className="text-primary">On the Ground</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                Leaders and officials visiting our sites to see the transformation firsthand
              </p>
            </Reveal>

            <Reveal
              variant="fade-up"
              data-anim-start="top 86%"
              data-anim-duration="1.2"
              data-anim-ease={SLOW_EASE}
              className="mt-10"
            >
              <VisitorsSlider images={SITE_VISIT_IMAGES} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
