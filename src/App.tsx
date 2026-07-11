import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import RouteMeta from "@/components/RouteMeta";
import SmoothScrollProvider from "@/components/animation/SmoothScrollProvider";

const ScrollAnimator = lazy(() => import("@/components/ScrollAnimator"));
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
// const Awards = lazy(() => import("./pages/Awards"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Products = lazy(() => import("./pages/Products"));
const Careers = lazy(() => import("./pages/Careers"));
const CareersApply = lazy(() => import("./pages/CareersApply"));
const NotFound = lazy(() => import("./pages/NotFound"));
const People = lazy(() => import("./pages/People"));
const Projects = lazy(() => import("./pages/Projects"));
const Policies = lazy(() => import("./pages/Policies"));
// const AwardsandRecognition = lazy(() => import("./pages/AwardsandRecognition"));
// const Publications = lazy(() => import("./pages/Publications"));
// const Newsletters = lazy(() => import("./pages/Newsletters"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Newsroom = lazy(() => import("./pages/Newsroom"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const RouteFallback = () => (
  <div
    className="min-h-screen bg-background flex items-center justify-center px-6"
    aria-busy="true"
    aria-live="polite"
  >
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Loading</p>
        <p className="mt-2 text-sm text-muted-foreground">Preparing the next page.</p>
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SmoothScrollProvider>
        <BrowserRouter
          // basename="/"
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
          <RouteMeta />
          <Suspense fallback={null}>
            <ScrollAnimator />
          </Suspense>
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/awards" element={<Awards />} /> */}
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/products" element={<Products />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/careers/apply" element={<CareersApply />} />
                <Route path="/media" element={<Navigate to="/newsroom" replace />} />
                <Route path="/mediacp" element={<Navigate to="/newsroom" replace />} />
                <Route path="/people" element={<People />} />
                <Route path="/policies" element={<Policies />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/newsroom" element={<Newsroom />} />
                <Route path="/ongoingprojects" element={<Navigate to="/projects?tab=ongoing" replace />} />
                <Route path="/completedprojects" element={<Navigate to="/projects?tab=completed" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </SmoothScrollProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
