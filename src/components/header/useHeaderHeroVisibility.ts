import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type UseHeaderHeroVisibilityArgs = {
  activeDropdown: string | null;
  isMenuOpen: boolean;
};

export const useHeaderHeroVisibility = ({
  activeDropdown,
  isMenuOpen,
}: UseHeaderHeroVisibilityArgs) => {
  const [hasHeroSection, setHasHeroSection] = useState(false);
  const [isHeroActive, setIsHeroActive] = useState(false);
  const [canAutoHideOnHero, setCanAutoHideOnHero] = useState(false);
  const [heroHideArmed, setHeroHideArmed] = useState(false);
  const [isHeroHeaderVisible, setIsHeroHeaderVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let frameId = 0;
    let scrollFrameId = 0;
    let lastHeroActive: boolean | null = null;

    const setupHeroSync = () => {
      const heroEl = document.querySelector<HTMLElement>("[data-header-hero]");

      if (!heroEl) {
        setHasHeroSection(false);
        setIsHeroActive(false);
        return;
      }

      setHasHeroSection(true);

      const syncHeroState = () => {
        const headerHeight = 72;
        const rect = heroEl.getBoundingClientRect();
        const heroStillInView = rect.bottom > headerHeight + 24 && rect.top < window.innerHeight * 0.85;
        if (lastHeroActive !== heroStillInView) {
          lastHeroActive = heroStillInView;
          setIsHeroActive(heroStillInView);
        }
      };

      const scheduleHeroStateSync = () => {
        if (scrollFrameId) return;

        scrollFrameId = window.requestAnimationFrame(() => {
          scrollFrameId = 0;
          syncHeroState();
        });
      };

      syncHeroState();
      window.addEventListener("scroll", scheduleHeroStateSync, { passive: true });
      window.addEventListener("resize", scheduleHeroStateSync);

      cleanup = () => {
        window.removeEventListener("scroll", scheduleHeroStateSync);
        window.removeEventListener("resize", scheduleHeroStateSync);
        if (scrollFrameId) window.cancelAnimationFrame(scrollFrameId);
      };
    };

    frameId = window.requestAnimationFrame(setupHeroSync);

    return () => {
      window.cancelAnimationFrame(frameId);
      cleanup?.();
    };
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncCapability = () => {
      setCanAutoHideOnHero(mediaQuery.matches);
    };

    syncCapability();
    mediaQuery.addEventListener("change", syncCapability);
    return () => mediaQuery.removeEventListener("change", syncCapability);
  }, []);

  useEffect(() => {
    const shouldAutoHide = hasHeroSection && isHeroActive && canAutoHideOnHero && !isMenuOpen;

    if (!shouldAutoHide) {
      setHeroHideArmed(false);
      setIsHeroHeaderVisible(true);
      return;
    }

    setHeroHideArmed(false);
    setIsHeroHeaderVisible(true);

    const timerId = window.setTimeout(() => {
      setHeroHideArmed(true);
      setIsHeroHeaderVisible(false);
    }, 5000);

    return () => window.clearTimeout(timerId);
  }, [hasHeroSection, isHeroActive, canAutoHideOnHero, location.pathname, isMenuOpen]);

  useEffect(() => {
    if (!heroHideArmed) return;

    if (activeDropdown || isMenuOpen) {
      setIsHeroHeaderVisible(true);
    }
  }, [activeDropdown, heroHideArmed, isMenuOpen]);

  const shouldAutoHideHeroHeader = hasHeroSection && isHeroActive && canAutoHideOnHero;
  const isHeroHeaderHidden =
    shouldAutoHideHeroHeader && heroHideArmed && !isHeroHeaderVisible && !isMenuOpen;

  return {
    canAutoHideOnHero,
    heroHideArmed,
    isHeroHeaderHidden,
    isHeroHeaderVisible,
    setHeroHideArmed,
    setIsHeroHeaderVisible,
    shouldAutoHideHeroHeader,
  };
};
