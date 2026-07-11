import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useLocation } from "react-router-dom";

const GlassFly = () => {
  const flyRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);

    const fly = flyRef.current;
    if (!fly) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let flyTimeline: gsap.core.Timeline | undefined;
    let loadTimeout: number | undefined;
    let resizeTimeout: number | undefined;
    let pathRefreshTimeout: number | undefined;
    let cursorFollowIdleTimeout: number | undefined;
    let isCursorFollowing = false;

    const clearCursorFollowIdle = () => {
      if (!cursorFollowIdleTimeout) return;
      window.clearTimeout(cursorFollowIdleTimeout);
      cursorFollowIdleTimeout = undefined;
    };

    const getFlyPoint = () => ({
      x: Number(gsap.getProperty(fly, "x")) || window.innerWidth * 0.72,
      y: Number(gsap.getProperty(fly, "y")) || window.innerHeight * 0.28,
    });

    const createInfinitePath = (startPoint = getFlyPoint()) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const marginX = Math.max(72, width * 0.08);
      const marginY = Math.max(72, height * 0.1);

      return [
        startPoint,
        { x: width - marginX, y: marginY },
        { x: width * 0.26, y: height * 0.24 },
        { x: width * 0.82, y: height * 0.42 },
        { x: width * 0.2, y: height * 0.62 },
        { x: width * 0.74, y: height - marginY },
        { x: width * 0.14, y: height * 0.78 },
      ];
    };

    const startInfiniteFlight = (startPoint = getFlyPoint()) => {
      flyTimeline?.kill();

      const motionPathPoints = createInfinitePath(startPoint);

      gsap.set(fly, {
        x: motionPathPoints[0].x,
        y: motionPathPoints[0].y,
        opacity: 1,
        xPercent: -50,
        yPercent: -50,
      });

      fly.classList.add("is-moving");
      fly.classList.remove("is-resting");

      flyTimeline = gsap.timeline({
        repeat: -1,
      });

      flyTimeline.to(fly, {
        motionPath: {
          path: motionPathPoints,
          curviness: 1.5,
          autoRotate: 90,
          alignOrigin: [0.5, 0.5],
        },
        ease: "power1.inOut",
        duration: 22,
      });
    };

    const pauseAutoPath = () => {
      flyTimeline?.pause();
    };

    const resumeAutoPath = () => {
      clearCursorFollowIdle();
      isCursorFollowing = false;
      startInfiniteFlight(getFlyPoint());
    };

    const beginCursorFollow = () => {
      if (prefersReducedMotion) return;
      if (!isCursorFollowing) {
        pauseAutoPath();
        isCursorFollowing = true;
      }
      clearCursorFollowIdle();
      fly.classList.add("is-moving");
    };

    const scheduleCursorFollowRelease = () => {
      clearCursorFollowIdle();
      cursorFollowIdleTimeout = window.setTimeout(() => {
        resumeAutoPath();
      }, 700);
    };

    const handleWindowPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      beginCursorFollow();
      gsap.to(fly, {
        x: event.clientX,
        y: event.clientY,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
      scheduleCursorFollowRelease();
    };

    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });

    if (prefersReducedMotion) {
      return () => {
        clearCursorFollowIdle();
        window.removeEventListener("pointermove", handleWindowPointerMove);
      };
    }

    const buildFlyPath = () => {
      startInfiniteFlight();
    };

    const scheduleFlyPathRefresh = () => {
      if (pathRefreshTimeout) window.clearTimeout(pathRefreshTimeout);
      pathRefreshTimeout = window.setTimeout(buildFlyPath, 140);
    };

    const handleLoad = () => {
      loadTimeout = window.setTimeout(buildFlyPath, 100);
    };

    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(buildFlyPath, 250);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", scheduleFlyPathRefresh, { passive: true });

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", scheduleFlyPathRefresh);
      clearCursorFollowIdle();
      if (loadTimeout) window.clearTimeout(loadTimeout);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      if (pathRefreshTimeout) window.clearTimeout(pathRefreshTimeout);
      window.removeEventListener("pointermove", handleWindowPointerMove);
      flyTimeline?.kill();
    };
  }, [location.pathname]);

  return (
    <div ref={flyRef} id="glass-fly" className="glass-fly" aria-hidden="true">
      <div className="glass-fly-visual">
        <div className="fly-wing wing-left" />
        <div className="fly-wing wing-right" />
        <div className="fly-body">
          <div className="fly-head" />
          <div className="fly-thorax" />
          <div className="fly-abdomen" />
        </div>
      </div>
    </div>
  );
};

export default GlassFly;

