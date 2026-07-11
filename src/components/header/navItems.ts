import { stockImages } from "@/config/stockImages";
import preProcessingImg from "@/assets/services/pre-processing.webp";
import residualOutputsImg from "@/assets/services/Residual Outputs.webp";
import bioconversionImg from "@/assets/services/Bioconversion — The BSF Larvae at Work.webp";
import harvestingImg from "@/assets/services/harvesting.webp";
import trommelImg from "@/assets/products/Trommel-1.webp";
import obmsImg from "@/assets/products/OBMS.webp";
import discSeparatorImg from "@/assets/products/Disc Separator.webp";
import adsImg from "@/assets/products/ADS.webp";
import conveyorImg from "@/assets/products/belt-conveyor.webp";
import cycleImg from "@/assets/products/cy2.webp";

export interface DropdownItem {
  name: string;
  path: string;
  image?: string;
  fallbackImage?: string;
  mediaType?: "image" | "video";
}

export interface NavItem {
  name: string;
  path: string;
  megaMenu?: boolean;
  dropdown?: DropdownItem[];
}

export const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  {
    name: "Services",
    path: "/services",
    megaMenu: true,
    dropdown: [
      {
        name: "conveyer Management System",
        path: "/services#conveyor-management-system",
        image: stockImages.services.conveyorManagement,
        fallbackImage: preProcessingImg,
      },
      {
        name: "RDF Co processing System",
        path: "/services#rdf-co-processing-system",
        image: stockImages.services.rdfProcessing,
        fallbackImage: residualOutputsImg,
      },
      {
        name: "Bio Mining System",
        path: "/services#bio-mining-system",
        image: stockImages.services.bioMining,
        fallbackImage: bioconversionImg,
      },
      {
        name: "MRF System",
        path: "/services#mrf-system",
        image: stockImages.services.mrfSystem,
        fallbackImage: harvestingImg,
      },
    ],
  },
  {
    name: "Products",
    path: "/products",
    megaMenu: true,
    dropdown: [
      { name: "Trommels", path: "/products#trommels", image: trommelImg },
      { name: "Conveyors", path: "/products#conveyors", image: conveyorImg },
      { name: "Disc Screen Separator", path: "/products#disc-screen-separator", image: discSeparatorImg },
      { name: "Air Density Separator", path: "/products#air-density-separator", image: adsImg },
      { name: "Over Band Magnetic Separator", path: "/products#over-band-magnetic-separator", image: obmsImg },
      { name: "Cyclone Collector", path: "/products#cyclone-collector", image: cycleImg },
    ],
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "News Room",
    path: "/media",
    dropdown: [
      { name: "In The News", path: "/newsroom" },
      { name: "Testimonials", path: "/testimonials" },
    ],
  },
  {
    name: "People At Zigma",
    path: "/people",
  },
  { name: "Careers", path: "/careers" },
];
