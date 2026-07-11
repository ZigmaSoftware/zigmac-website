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

      const scrollToHashTarget = () => {
        const target = document.getElementById(targetId);

        if (!target) {
          if (attempts < 12) {
            attempts += 1;
            window.setTimeout(scrollToHashTarget, 120);
          }
          return;
        }

        const top = Math.max(
          target.getBoundingClientRect().top + window.scrollY - 120,
          0,
        );

        if (window.__lenis) {
          window.__lenis.scrollTo(top, {
            duration: 1.1,
          });
          return;
        }

        window.scrollTo({ top, left: 0, behavior: "smooth" });
      };

      scrollToHashTarget();
      return;
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
