import Reveal from "@/components/animation/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  ArrowRight,
  CheckCircle,
  Cog,
  Factory,
  Gauge,
  Magnet,
  Wrench,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import productHero from "@/assets/products/belt-conveyor.webp";
import trommelImg from "@/assets/products/Trommel-1.webp";
import conveyorsImg from "@/assets/products/belt-conveyor.webp";
import discSeparatorImg from "@/assets/products/Disc Separator.webp";
import airDensityImg from "@/assets/products/ADS.webp";
import magneticImg from "@/assets/products/OBMS.webp";
import cycloneImg from "@/assets/products/cy2.webp";

const SLOW_EASE = "power2.out";

type Product = {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  applications: string[];
  icon: LucideIcon;
};

const products: Product[] = [
  {
    id: "trommels",
    name: "Trommels",
    subtitle: "Rotary screening systems for solid waste separation",
    tagline: "Screening Equipment",
    description:
      "Trommels are engineered for robust and efficient separation in Municipal Solid Waste (MSW) processing plants. Manufactured through controlled fabrication processes, they feature precision-built rings, durable screen frames, and thoroughly verified assemblies to ensure reliable performance and long service life in demanding waste management applications.",
    image: trommelImg,
    features: [
      "Fabricated rings and screen frames",
      "Bar rolling and screen assembly support",
      "Fit, finish and runout verification",
      "Built for heavy-duty waste handling",
    ],
    applications: ["MSW Screening", "Legacy Waste Processing", "Material Separation", "Plant Retrofit"],
    icon: Factory,
  },
  {
    id: "conveyors",
    name: "Conveyors",
    subtitle: "Material handling systems for plant transfer lines",
    tagline: "Transfer Equipment",
    description:
      "Conveyors are designed to provide reliable and efficient material transfer across waste processing and industrial plant operations. Built with robust fabricated structures and precision fit-up, they are configured to match plant layouts, optimize process flow, and ensure dependable performance across varying throughput requirements.",
    image: conveyorsImg,
    features: [
      "Heavy-duty conveyor fabrication",
      "Plant integration support",
      "Alignment and fit-up checks",
      "Configured for process flow handling",
    ],
    applications: ["Material Transfer", "Process Lines", "Feed Systems", "Plant Integration"],
    icon: Cog,
  },
  {
    id: "disc-screen-separator",
    name: "Disc Screen Separator",
    subtitle: "Separation equipment for mixed waste processing",
    tagline: "Separation Systems",
    description:
      "Disc Screen Separators are designed for efficient and reliable separation of mixed waste streams in material recovery and waste processing facilities. Engineered with durable mechanical assemblies and precision fabrication, they ensure consistent sorting performance, improved throughput, and dependable operation in demanding processing environments.",
    image: discSeparatorImg,
    features: [
      "Separator frame fabrication",
      "Rotating disc assembly support",
      "Dimensional and functional checks",
      "Designed for consistent throughput",
    ],
    applications: ["Sorting Lines", "Waste Processing", "Material Recovery", "Screening Stages"],
    icon: Gauge,
  },
  {
    id: "air-density-separator",
    name: "Air Density Separator",
    subtitle: "Air-based separation for light and heavy fractions",
    tagline: "Air Separation",
    description:
      "Air Density Separators are designed to efficiently separate light and heavy materials from mixed waste streams using controlled airflow technology. Built with rugged fabricated structures and precision-engineered components, they deliver reliable performance, improved material recovery, and consistent operation in industrial waste processing and recycling plants.",
    image: airDensityImg,
    features: [
      "Airflow-based separation support",
      "Fabricated duct and frame systems",
      "Operational alignment checks",
      "Built for waste recovery plants",
    ],
    applications: ["Light Fraction Removal", "Recovery Lines", "Waste Sorting", "Plant Upgrades"],
    icon: Wind,
  },
  {
    id: "over-band-magnetic-separator",
    name: "Over Band Magnetic Separator",
    subtitle: "Magnetic separation systems for ferrous recovery",
    tagline: "Magnetic Separation",
    description:
      "Over Band Magnetic Separators are engineered to efficiently recover ferrous materials from bulk waste streams in recycling and waste processing plants. Designed with durable magnet support structures and precision alignment, they provide reliable continuous operation, improve material recovery, and enhance overall process efficiency.",
    image: magneticImg,
    features: [
      "Magnet support structure",
      "Ferrous recovery assistance",
      "Installation and alignment checks",
      "Built for continuous plant duty",
    ],
    applications: ["Ferrous Recovery", "Sorting Plants", "Recycling Lines", "Process Separation"],
    icon: Magnet,
  },
  {
    id: "cyclone-collector",
    name: "Cyclone Collector",
    subtitle: "Dust and particulate collection for process systems",
    tagline: "Collection Systems",
    description:
      "Cyclone Collectors are designed to efficiently separate dust and particulate matter from industrial air streams, ensuring cleaner plant operations and enhanced downstream process performance. Built with robust fabricated shells and duct systems, they provide reliable dust collection, improved air quality, and dependable operation in demanding industrial environments.",
    image: cycloneImg,
    features: [
      "Cyclone shell and duct fabrication",
      "Dust collection support",
      "Flow-path alignment checks",
      "Industrial process integration",
    ],
    applications: ["Dust Collection", "Air Handling", "Process Exhaust", "Plant Ventilation"],
    icon: Wrench,
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section
          data-header-hero
          className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28"
        >
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${productHero})` }}
            aria-hidden="true"
          />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <Reveal
              className="max-w-3xl mx-auto"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <span className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium block">
                Products
              </span>
              <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">
                Plant Products & Components
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                Explore the product range supported by Zigma's manufacturing capability for waste processing and plant infrastructure.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-main">
            <div className="space-y-24">
              {products.map((product, index) => {
                const Icon = product.icon;
                return (
                  <Reveal
                    key={product.id}
                    id={product.id}
                    data-anim-start="top 90%"
                    data-anim-duration="1.45"
                    data-anim-ease={SLOW_EASE}
                    className={`scroll-mt-28 lg:scroll-mt-32 group grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                    }`}
                  >
                    <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <div className="relative overflow-hidden rounded-xl bg-black">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                      <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                        <Icon className="h-4 w-4 text-primary" />
                        {product.tagline}
                      </span>
                      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                        {product.name}
                      </h2>
                      <p className="mt-2 text-base lg:text-lg font-medium italic text-foreground/80 leading-relaxed">
                        {product.subtitle}
                      </p>
                      <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                        {product.description}
                      </p>

                      <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                        Key Capabilities
                      </h4>
                      <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2">
                        {product.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                          Applications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.applications.map((app) => (
                            <span
                              key={app}
                              className="px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Button asChild className="group">
                          <Link to="/contact">
                            Enquire Now
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
