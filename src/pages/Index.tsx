import { lazy, Suspense, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";

const StatsSection = lazy(() => import("@/components/home/StatsSection"));
const Vision = lazy(() => import("@/components/home/Vision"));
const PartnersSection = lazy(() => import("@/components/home/PartnersSection"));
const ULBClientsSection = lazy(() => import("@/components/home/ULBClientsSection"));


const Index = () => {
  const [showDeferredSections, setShowDeferredSections] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const reveal = () => setShowDeferredSections(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        reveal,
        { timeout: 1200 },
      );
    } else {
      timeoutId = setTimeout(reveal, 450);
    }

    return () => {
      if (idleId !== undefined && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (
          window as Window & { cancelIdleCallback: (id: number) => void }
        ).cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        {showDeferredSections && (
          <Suspense fallback={null}>
            <StatsSection />
            <Vision />
            {/* <ServicesSection />        */}
            <ULBClientsSection />
            <PartnersSection />
          </Suspense>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
