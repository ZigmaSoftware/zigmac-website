import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1));
      let attempts = 0;

      const scrollToHashTarget = (immediate = false) => {
        const target = document.getElementById(targetId);

        if (!target) {
          if (attempts < 12) {
            attempts += 1;
            window.setTimeout(() => scrollToHashTarget(immediate), 120);
          }
          return;
        }

        const top = Math.max(
          target.getBoundingClientRect().top + window.scrollY - 120,
          0,
        );

        if (window.__lenis) {
          window.__lenis.scrollTo(top, {
            duration: immediate ? 0 : 1.1,
            immediate,
          });
          return;
        }

        window.scrollTo({ top, left: 0, behavior: immediate ? "auto" : "smooth" });
      };

      // Jump instantly on the first pass so the visitor never sees the page
      // start at the top with its entrance animations playing before landing
      // on the target — a visible smooth-scroll-through would flash that.
      scrollToHashTarget(true);

      // Reveal/GSAP entrance animations above the target can still be settling
      // (their elements start translated before ScrollTrigger fires them), which
      // shifts page layout after the first jump. Re-measure and correct once
      // things have had time to settle so the final position is accurate.
      const settleTimer = window.setTimeout(() => scrollToHashTarget(true), 700);
      return () => window.clearTimeout(settleTimer);
    }

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
