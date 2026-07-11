import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import trommelImg from "@/assets/products/Trommel-1.webp";
import conveyorImg from "@/assets/products/belt-conveyor.webp";
import discSeparatorImg from "@/assets/products/Disc Separator.webp";
import airDensityImg from "@/assets/products/ADS.webp";
import magneticImg from "@/assets/products/OBMS.webp";
import cycloneImg from "@/assets/products/cy2.webp";

const slides = [
    {
      image: trommelImg,
      title: "Trommels built for dependable waste separation.",
    },
    {
      image: conveyorImg,
      title: "Conveyors engineered for smooth plant material flow.",
    },
    {
      image: discSeparatorImg,
      title: "Disc screen separators for consistent recovery performance.",
    },
    {
      image: airDensityImg,
      title: "Air density separation systems for plant-scale sorting.",
    },
    {
      image: magneticImg,
      title: "Over band magnetic separation for ferrous recovery.",
    },
    {
      image: cycloneImg,
      title: "Cyclone collection systems for cleaner process air.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current) return;
      setCurrent(index);
    },
    [current],
  );

  // Continuous auto slide for all slides
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  // Keep navigation snappy by preloading the upcoming slide only.
  useEffect(() => {
    const nextIndex = (current + 1) % slides.length;
    const nextImage = new Image();
    nextImage.src = slides[nextIndex].image;
  }, [current]);

  return (
    <section
      data-header-hero
      className=" relative min-h-[100svh] flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28 "
    >
      <ScrollToTop />

      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          key={slides[current].image}
          src={slides[current].image}
          alt=""
          aria-hidden="true"
          fetchPriority={current === 0 ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover will-change-transform animate-heroZoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 via-foreground/20 to-transparent" />
      </div>
   

      {/* Content */}
      <div className="container-main relative z-10 ">
        <div className="max-w-3xl text-background transition-all duration-700 ease-out ">
          <div className="relative py-2 overflow-visible">

            {/* Animated Text */}
            <h1
              key={current}
              data-fly-target="hero"
              className="text-3xl md:text-5xl font-semibold text-white leading-[1.42] md:leading-[1.25] opacity-0 translate-x-[-45px] animate-slideIn [text-shadow:0_4px_14px_rgba(0,0,0,0.85),0_14px_36px_rgba(0,0,0,0.65)]"
            >
              {slides[current].title}
            </h1>
             
            {/* <p>
              {slides[current].subtitle}
            </p> */}
          </div>

          {/* <div className="flex  gap-4 mt-4  bg-transparent ">
            <Button variant="heroOutline"  size="lg" asChild className="border " >
              <Link to="/services">Our Services</Link>
            </Button>

            <Button variant="heroOutline" size="lg" asChild className="border ">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div> */}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute inset-x-0 top-24 z-[30] pointer-events-none md:top-28">
        <div className="container-main flex justify-end">
          <div
            className="flex gap-3 pointer-events-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-transparent shadow-md flex items-center justify-center text-white hover:bg-white/10 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-transparent shadow-md flex items-center justify-center text-white hover:bg-white/10 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Indicators - Horizontal sliding lines on right middle */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="container-main relative h-full">
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-6 h-[1px] rounded-full transition-all duration-300 transform -rotate-12 ${
                  index === current
                    ? "bg-white scale-100"
                    : "bg-white/30 scale-75 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
