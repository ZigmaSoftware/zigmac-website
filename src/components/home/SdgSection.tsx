import { useState } from "react";
import sdg02 from "@/assets/website/sdg-icons/sdg-02.webp";
import sdg03 from "@/assets/website/sdg-icons/sdg-03.png";
import sdg06 from "@/assets/website/sdg-icons/sdg-06.png";
import sdg07 from "@/assets/website/sdg-icons/sdg-07.webp";
import sdg08 from "@/assets/website/sdg-icons/sdg-08.png";
import sdg09 from "@/assets/website/sdg-icons/sdg-09.png";
import sdg11 from "@/assets/website/sdg-icons/sdg-11.png";
import sdg12 from "@/assets/website/sdg-icons/sdg-12.png";
import sdg13 from "@/assets/website/sdg-icons/sdg-13.png";
import sdg14 from "@/assets/website/sdg-icons/sdg-14.webp";
import sdg15 from "@/assets/website/sdg-icons/sdg-15.png";
import sdg17 from "@/assets/website/sdg-icons/sdg-17.png";
import sdgLogo from "@/assets/website/Sustainable-Development-Goals.logo.png";

const GOALS = [
  { id: 2, name: "Zero Hunger", color: "#D4A23C", contribution: "BSF larvae produce protein-rich biomass with 30–40% protein content, offering a sustainable alternative to conventional fish meal and animal feed. The manure and frass generated serve as natural fertilizers, improving agricultural productivity and contributing directly to food security.", img: sdg02 },
  { id: 3, name: "Good Health", color: "#4C9F38", contribution: "By scientifically processing wet waste at source, the technology eliminates open dumping and the associated breeding of disease vectors such as mosquitoes, flies, and rodents. This directly improves public health outcomes in urban areas. The process also suppresses harmful pathogens in waste, reducing community health risks.", img: sdg03 },
  { id: 6, name: "Clean Water", color: "#26BDE2", contribution: "Unprocessed wet waste is a primary source of leachate contamination of groundwater and surface water bodies. The Zigfly process treats leachate within the facility and converts organic waste before it can contaminate water sources, protecting freshwater ecosystems and supporting sanitation goals.", img: sdg06 },
  { id: 7, name: "Clean Energy", color: "#FDB713", contribution: "The oils extracted from BSF larvae have demonstrated application in biodiesel production, offering a renewable, bio-based energy source derived entirely from waste — contributing to the clean energy transition without competing with food crops.", img: sdg07 },
  { id: 8, name: "Decent Work", color: "#A21942", contribution: "The establishment and operation of BSF processing facilities creates direct employment opportunities across waste collection, plant operations, larvae harvesting, product processing, and marketing. The DBFOO model also stimulates private sector investment in the green economy.", img: sdg08 },
  { id: 9, name: "Innovation", color: "#FD6925", contribution: "BSF bioconversion represents a scientifically advanced, innovative approach to waste management — far superior in speed, efficiency, and output value compared to conventional composting, biogas, or vermicomposting technologies. Zigfly's scalable facility model demonstrates replicable green infrastructure for urban India.", img: sdg09 },
  { id: 11, name: "Sustainable Cities", color: "#FD9D24", contribution: "By partnering with Urban Local Bodies to manage municipal wet waste, the technology directly addresses one of urban India's most persistent environmental challenges. It reduces landfill burden, improves city cleanliness, and supports Swachh Bharat Mission objectives — making cities more liveable and sustainable.", img: sdg11 },
  { id: 12, name: "Responsible Production", color: "#BF8B2E", contribution: "The BSF process is the embodiment of circular economy principles — waste from one system becomes the input for another. With near-zero residue and three commercially valuable outputs, the technology maximises resource recovery and minimises waste generation at every stage of the production chain.", img: sdg12 },
  { id: 13, name: "Climate Action", color: "#3F7E44", contribution: "Research demonstrates that manure treated with BSF larvae produces 47 times lower greenhouse gas emissions compared to windrow composting. By diverting organic waste from landfills — a significant source of methane — the Zigfly process directly reduces the carbon footprint of urban waste management.", img: sdg13 },
  { id: 14, name: "Life Below Water", color: "#0082BD", contribution: "BSF larvae serve as a high-quality, sustainable substitute for fish meal in aquaculture feed. This reduces the pressure on wild fish stocks harvested for conventional feed production, directly protecting marine ecosystems and supporting sustainable aquaculture practices.", img: sdg14 },
  { id: 15, name: "Life on Land", color: "#56C02B", contribution: "The organic manure and frass produced enrich soil health and biodiversity. By reducing dependence on chemical fertilizers and returning nutrients to the soil naturally, the process supports healthier terrestrial ecosystems and sustainable land use.", img: sdg15 },
  { id: 17, name: "Partnerships", color: "#19486A", contribution: "The DBFOO model is built on structured, contractual partnerships between private operators like Zigfly and Urban Local Bodies, demonstrating how public-private collaboration can deliver scalable, sustainable solutions to civic challenges. The model is replicable across municipalities nationwide.", img: sdg17 },
] as const;

export default function SDGSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? GOALS[activeIdx] : null;
  const radius = 155;
  const center = 210;

  return (
    <section className="bg-background section-padding">
      <div className="container-main">

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-12">
          <div className="flex w-full justify-center overflow-visible lg:w-1/2">
            <div
              className="relative h-[260px] w-[260px] select-none sm:h-[380px] sm:w-[380px] md:h-[420px] md:w-[420px]"
              onClick={() => setActiveIdx(null)}
            >
              <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.619] sm:scale-[0.905] md:scale-100">
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 420 420"
                >
                  {GOALS.map((_, i) => {
                    const angle = (i / GOALS.length) * 2 * Math.PI - Math.PI / 2;
                    const x2 = center + radius * Math.cos(angle);
                    const y2 = center + radius * Math.sin(angle);

                    return (
                      <line
                        key={i}
                        x1={center}
                        y1={center}
                        x2={x2}
                        y2={y2}
                        stroke={activeIdx === i ? GOALS[i].color : "rgba(0,0,0,0.08)"}
                        strokeWidth={activeIdx === i ? 2 : 1}
                        style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
                      />
                    );
                  })}
                </svg>

                {GOALS.map((goal, i) => {
                  const angle = (i / GOALS.length) * 2 * Math.PI - Math.PI / 2;
                  const x = center + radius * Math.cos(angle);
                  const y = center + radius * Math.sin(angle);
                  const isActive = activeIdx === i;

                  return (
                    <button
                      key={goal.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIdx(isActive ? null : i);
                      }}
                      className="absolute h-16 w-16 overflow-hidden rounded-full transition-all duration-300 focus:outline-none"
                      style={{
                        left: x - 32,
                        top: y - 32,
                        transform: isActive ? "scale(1.2)" : "scale(1)",
                        boxShadow: isActive
                          ? `0 0 0 4px ${goal.color}, 0 0 0 9px rgba(255,255,255,0.96), 0 14px 30px rgba(15,23,42,0.24)`
                          : "0 0 0 7px rgba(255,255,255,0.94), 0 10px 24px rgba(15,23,42,0.14)",
                        zIndex: isActive ? 20 : 10,
                      }}
                    >
                      <span
                        className="flex h-full w-full items-center justify-center rounded-full p-2"
                        style={{ backgroundColor: goal.color }}
                      >
                        <img src={goal.img} alt={goal.name} className="h-full w-full object-contain" />
                      </span>
                    </button>
                  );
                })}

                <div
                  className="pointer-events-none absolute rounded-full bg-white shadow-md"
                  style={{ left: center - 52, top: center - 52, width: 104, height: 104, padding: 6 }}
                >
                  <img
                    src={sdgLogo}
                    alt="UN Sustainable Development Goals"
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            {active ? (
              <div
                className="rounded-2xl p-6 transition-all duration-500"
                style={{
                  backgroundColor: `${active.color}18`,
                  border: `1px solid ${active.color}44`,
                }}
              >
                <div className="mb-4 flex items-center gap-4">
                  <img src={active.img} alt={active.name} className="h-14 w-14 rounded-xl" />
                  <div>
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: active.color }}
                    >
                      Goal {active.id}
                    </span>
                    <h3 className="mt-0.5 text-lg font-bold text-foreground">{active.name}</h3>
                  </div>
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: `${active.color}15` }}
                >
                  <p className="text-base leading-relaxed text-foreground">
                    {active.contribution}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">

                <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  Sustainability
                </span>
                <h2 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                  Our Commitment to the <br />
                  <span className="text-primary">UN Sustainable Development Goals</span>

                </h2>

                <p className="text-base leading-relaxed text-muted-foreground text-justify md:text-lg">
                  As part of the Blue Planet Group, Zigma embeds sustainability into the core of its mission. By advancing the Triple Bottom Line of People, Planet, and Prosperity, every initiative is designed to create enduring value for communities and ecosystems.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground text-justify md:text-lg">
                  Guided by the United Nations Sustainable Development Goals, our operations strengthen public health, safeguard water resources, and build more resilient cities through circular waste solutions.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground text-justify md:text-lg">
                  Zigfly's BSF technology contributes meaningfully to 12 of the 17 UN Sustainable Development Goals, making it one of the most multi-dimensional environmental interventions available to urban local bodies today.
                </p>
                <p className="text-sm italic text-muted-foreground/60">
                  Click any goal icon to see our impact.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
