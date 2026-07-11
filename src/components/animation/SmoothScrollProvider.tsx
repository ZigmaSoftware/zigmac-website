import { useEffect, type ReactNode } from "react";

type LenisLike = {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { duration?: number; immediate?: boolean; offset?: number },
  ) => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let isActive = true;
    let lenis: LenisLike | null = null;
    let cleanupTicker: (() => void) | undefined;

    const init = async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        gsap.registerPlugin(ScrollTrigger);

        const imported = await import("lenis");
        const Lenis = imported.default;

        if (!isActive || !Lenis) return;

        lenis = new Lenis({
          duration: 0.8,
          smoothWheel: true,
          touchMultiplier: 1.2,
          wheelMultiplier: 0.8,
        });

        window.__lenis = lenis;
        lenis.scrollTo(window.scrollY, { immediate: true });

        const updateScroll = () => ScrollTrigger.update();
        gsap.ticker.lagSmoothing(500, 33);

        const raf = (timeInSeconds: number) => {
          if (!lenis) return;
          lenis.raf(timeInSeconds * 1000);
        };

        gsap.ticker.add(raf);
        ScrollTrigger.addEventListener("refresh", updateScroll);
        ScrollTrigger.refresh();

        cleanupTicker = () => {
          ScrollTrigger.removeEventListener("refresh", updateScroll);
          gsap.ticker.remove(raf);
        };
      } catch {
        // Graceful fallback when lenis is not installed in the local environment.
      }
    };

    void init();

    return () => {
      isActive = false;
      if (cleanupTicker) cleanupTicker();
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
