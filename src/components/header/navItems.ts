import bioMiningImg from "@/assets/services/landfill_mining.jpg";
import trommelImg from "@/assets/products/Trommel-1.webp";
import preProcessingImg from "@/assets/services/pre-processing.webp";
import residualOutputsImg from "@/assets/services/Residual Outputs.webp";

export interface DropdownItem {
  name: string;
  path: string;
  image?: string;
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
  // {
  //   name: "Services",
  //   path: "/services",
  //   megaMenu: true,
  //   dropdown: [
  //     {
  //       name: "conveyer Management System",
  //       path: "/services#conveyor-management-system",
  //       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZORsjxR5kSBKGExcKnBPSN_urXAW8D3QbdEtZECk7Fg&s=10",
  //     },
  //     {
  //       name: "RDF Co processing System",
  //       path: "/services#rdf-co-processing-system",
  //       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuT7COxD1Rg3I4SWX1w5LWQW50CEEBCZ6jIsve2yHlow&s=10",
  //     },
  //     {
  //       name: "Bio Mining System",
  //       path: "/services#bio-mining-system",
  //       image: bioMiningImg,
  //     },
  //     {
  //       name: "MRF System",
  //       path: "/services#mrf-system",
  //       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUWj8pT_W4y_gS-cv4pGjkO1m5yNcszxKkeVcHcxHplQ&s=10",
  //     },
  //   ],
  // },
  {
    name: "Products",
    path: "/products",
    megaMenu: true,
    dropdown: [
      { name: "Individual Machineries", path: "/products", image: trommelImg },
      { name: "AFR Preprocessing Solutions", path: "/afr-preprocessing-solutions", image: preProcessingImg },
      { name: "MSW Processing Solutions", path: "/msw-processing-solutions", image: bioMiningImg },
      {
        name: "MERF - Dry Waste Management Solutions",
        path: "/merf-dry-waste-management-solutions",
        image: residualOutputsImg,
      },
    ],
  },
  {
    name: "Projects",
    path: "/projects",
    dropdown: [
      { name: "Integrated Alternative Fuel", path: "/projects" },
    ],
  },
  // {
  //   name: "News Room",
  //   path: "/media",
  //   dropdown: [
  //     { name: "In The News", path: "/newsroom" },
  //     { name: "Testimonials", path: "/testimonials" },
  //   ],
  // },
  {
    name: "People At Zigmac",
    path: "/people",
  },
  { name: "Careers", path: "/careers" },
];
