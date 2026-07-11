import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/animation/Reveal";
import bsflPic2 from "@/assets/BSFL project pictures/pic 2.jpeg";
import machiningImg from "@/assets/services/Bioconversion — The BSF Larvae at Work.webp";
import toolRoomImg from "@/assets/services/harvesting.webp";
import fabricationImg from "@/assets/services/pre-processing.webp";
import qualityImg from "@/assets/services/Residual Outputs.webp";
import assemblyImg from "@/assets/website/hero/unloading.webp";

const services = [
  {
    id: "process-engineering",
    title: "Process Engineering",
    description:
      "We translate RFQs, SORs and CAD inputs into feasible manufacturing plans with vendor confirmation, project timelines, quality checklists, control plans and delivery readiness reviews.",
    image: assemblyImg,
  },
  {
    id: "heavy-fabrication",
    title: "Heavy Fabrication",
    description:
      "Our ecosystem supports heavy fabrications up to 6-8 tons per part, including rings, frames, screens, DSS frames and large assemblies for MSW plant equipment.",
    image: fabricationImg,
  },
  {
    id: "precision-machining",
    title: "Precision Machining",
    description:
      "CNC vertical and horizontal machining, VTL, grinding, drilling, tapping and gear hobbing support high-precision parts up to large-format dimensions.",
    image: machiningImg,
  },
  {
    id: "tool-room",
    title: "Tool Room & Fixtures",
    description:
      "Tool design, mould manufacturing, drill jigs, machining jigs, inspection fixtures and measuring fixtures help improve production accuracy and reduce setup time.",
    image: toolRoomImg,
  },
  {
    id: "quality-inspection",
    title: "Quality & Inspection",
    description:
      "Inspection coverage includes dimensional checks, surface roughness, welding quality, runout, material certification, NDT, CMM, 3D scanning and GD&T verification.",
    image: qualityImg,
  },
  {
    id: "plant-equipment",
    title: "Plant Equipment Assembly",
    description:
      "We support equipment such as trommels, CSM mechanisms, screens, rings, frames, forged pinions and machine assemblies with fit, finish and functional verification.",
    image: bsflPic2,
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-main relative z-10">
        <Reveal
          className="text-center"
          variant="fade-up"
          data-anim-start="top 90%"
          data-anim-duration="1.1"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Services
          </span>

          <h2
            data-fly-target="services"
            className="mt-2 text-3xl md:text-4xl font-bold text-foreground"
          >
            Manufacturing Capability <span className="text-primary">Solutions</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
            Zigma brings together engineering, manufacturing partners, quality systems and assembly discipline to deliver heavy-duty machinery and MSW plant equipment from concept to shipment.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative h-80 overflow-hidden rounded-md shadow-lg hover:scale-[1.01] hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/60" />
              <div className="pointer-events-none absolute left-4 top-4 h-px w-0 bg-white/80 transition-all duration-300 group-hover:w-10" />
              <div className="pointer-events-none absolute left-4 top-4 h-0 w-px bg-white/80 transition-all duration-300 group-hover:h-10" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-3">
                <h3 className="text-xl font-semibold leading-tight">
                  {service.title}
                </h3>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 translate-y-6 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <h3 className="text-xl font-semibold leading-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/90 line-clamp-3">
                  {service.description}
                </p>
                <Link
                  to={`/services#${service.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:gap-3 transition-all duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  Read More <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
