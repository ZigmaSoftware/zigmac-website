import Reveal from "@/components/animation/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { stockImages } from "@/config/stockImages";
import conveyorImg from "@/assets/services/pre-processing.webp";
import rdfImg from "@/assets/services/Residual Outputs.webp";
import bioMiningImg from "@/assets/services/Bioconversion — The BSF Larvae at Work.webp";
import mrfImg from "@/assets/services/harvesting.webp";

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const SLOW_EASE = "power2.out";

const renderFeatureText = (feature: string): ReactNode => {
  const [head, ...rest] = feature.split(":");
  if (rest.length === 0) return feature;
  return (
    <>
      {head.trim()}: {rest.join(":").trim()}
    </>
  );
};

const services = [
  {
    id: "conveyor-management-system",
    title: "conveyer Management System",
    eyebrow: "Material Flow",
    image: stockImages.services.conveyorManagement,
    fallbackImage: conveyorImg,
    description:
      "Conveyor management systems coordinate plant transfer lines, helping maintain reliable material flow between receiving, sorting and processing zones.",
    features: [
      "Transfer control: plant routing, feed points and discharge alignment.",
      "Structure support: fabrication and fit-up for conveyor frames and guards.",
      "Process integration: linked with upstream and downstream equipment.",
      "Maintenance ready: built for routine inspection and service access.",
    ],
  },
  {
    id: "rdf-co-processing-system",
    title: "RDF Co-processing System",
    eyebrow: "Fuel Preparation",
    image: stockImages.services.rdfProcessing,
    fallbackImage: rdfImg,
    description:
      "RDF co-processing systems prepare recovered fractions for use in industrial fuel blending and thermal recovery applications.",
    features: [
      "Feed preparation: sorting, size reduction and material conditioning.",
      "Consistency: controlled output for downstream co-processing use.",
      "Recovery focus: support for waste-to-fuel workflows.",
      "Plant fit: designed around existing process infrastructure.",
    ],
  },
  {
    id: "bio-mining-system",
    title: "Bio Mining System",
    eyebrow: "Legacy Waste Recovery",
    image: stockImages.services.bioMining,
    fallbackImage: bioMiningImg,
    description:
      "Bio mining systems support recovery and reclamation of legacy waste streams through biological and mechanical processing stages.",
    features: [
      "Material recovery: separation of reusable and inert fractions.",
      "Site rehabilitation: supports landfill and legacy dump remediation.",
      "Process stages: screening, handling and residue management.",
      "Sustainable approach: reduces disposal load and recovers value.",
    ],
  },
  {
    id: "mrf-system",
    title: "MRF System",
    eyebrow: "Sorting Infrastructure",
    image: stockImages.services.mrfSystem,
    fallbackImage: mrfImg,
    description:
      "Material recovery facility systems are designed for sorting, segregation and recovery of recyclable fractions in waste-processing plants.",
    features: [
      "Sorting flow: manual and mechanical segregation support.",
      "Recovery output: improves recyclables capture and baling readiness.",
      "Layout support: plant-ready arrangement for operator workflow.",
      "Operational focus: built for day-to-day municipal waste handling.",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section
          data-header-hero
          className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28"
        >
          <img
            src={stockImages.services.hero}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-slate-950/55" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <Reveal
              className="max-w-3xl mx-auto"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <div className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium">
                Services
              </div>
              <h1 className="text-5xl md:text-5xl font-bold leading-tight text-white mt-3">
                Waste Processing Services
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
                A focused service lineup for plant planning, material movement, fuel preparation and recovery systems.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-main">
            <div className="space-y-24">
              {services.map((service, index) => (
                <Reveal
                  key={service.id}
                  id={service.id}
                  data-anim-start="top 90%"
                  data-anim-duration="1.45"
                  data-anim-ease={SLOW_EASE}
                  className={`scroll-mt-28 lg:scroll-mt-32 grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="overflow-hidden rounded-2xl shadow-xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                        onError={(event) => {
                          if (service.fallbackImage && event.currentTarget.src !== service.fallbackImage) {
                            event.currentTarget.src = service.fallbackImage;
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                      {service.eyebrow}
                    </span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed text-justify">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8 mt-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-foreground">{renderFeatureText(feature)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button asChild className="w-28">
                        <Link to="/contact">Enquire Now</Link>
                      </Button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-main text-center">
            <Reveal data-anim-start="top 92%" data-anim-duration="1.45" data-anim-ease={SLOW_EASE}>
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Build With Confidence
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Need a Service Scope Defined?
              </h2>
              <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                Share your requirement and we can help match the right system architecture, layout and execution plan.
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">Contact Us Today</Link>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
