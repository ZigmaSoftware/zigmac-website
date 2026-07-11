import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ANIM_START = "top 90%";
const DEFAULT_ANIM_DURATION = 1.1;
const DEFAULT_ANIM_EASE = "power3.out";

const resolveMotionConfig = (element: Element) => {
  const start = element.getAttribute("data-anim-start") || DEFAULT_ANIM_START;
  const ease = element.getAttribute("data-anim-ease") || DEFAULT_ANIM_EASE;
  const durationAttr = element.getAttribute("data-anim-duration");
  const durationValue = durationAttr ? Number.parseFloat(durationAttr) : Number.NaN;
  const duration =
    Number.isFinite(durationValue) && durationValue > 0 ? durationValue : DEFAULT_ANIM_DURATION;

  return { start, ease, duration };
};

const runFadeUp = (elements: Element[]) => {
  elements.forEach((el) => {
    const { start, ease, duration } = resolveMotionConfig(el);
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 44, force3D: true },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        ease,
        clearProps: "transform,willChange",
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      },
    );
  });
};

const runFadeLeft = (elements: Element[]) => {
  elements.forEach((el) => {
    const { start, ease, duration } = resolveMotionConfig(el);
    gsap.fromTo(
      el,
      { autoAlpha: 0, x: 56, force3D: true },
      {
        autoAlpha: 1,
        x: 0,
        duration,
        ease,
        clearProps: "transform,willChange",
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      },
    );
  });
};

const runStagger = (containers: Element[]) => {
  containers.forEach((container) => {
    const { start, ease, duration } = resolveMotionConfig(container);
    const children = container.querySelectorAll("[data-stagger-item]");
    const targets = children.length > 0 ? Array.from(children) : Array.from(container.children);

    if (targets.length === 0) return;

    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 26, force3D: true },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        stagger: 0.1,
        ease,
        clearProps: "transform,willChange",
        scrollTrigger: {
          trigger: container,
          start,
          once: true,
        },
      },
    );
  });
};

const ScrollAnimator = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const fadeUpEls = gsap.utils.toArray<Element>('[data-animate="fade-up"]');
      const fadeLeftEls = gsap.utils.toArray<Element>('[data-animate="fade-left"]');
      const staggerEls = gsap.utils.toArray<Element>('[data-animate="stagger"]');

      runFadeUp(fadeUpEls);
      runFadeLeft(fadeLeftEls);
      runStagger(staggerEls);

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      ScrollTrigger.clearScrollMemory();
    };
  }, [location.pathname]);

  return null;
};

export default ScrollAnimator;
