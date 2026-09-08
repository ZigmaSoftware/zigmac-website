import type { LucideIcon } from "lucide-react";
import { Cog, Recycle, Layers } from "lucide-react";

export const PLACEHOLDER_IMAGE = "/placeholder.svg";

export type CategoryProduct = {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  applications: string[];
  icon: LucideIcon;
};

export type ProductCategory = {
  slug: string;
  name: string;
  shortName: string;
  heroImage: string;
  heroSubtitle: string;
  heroDescription: string;
  products: CategoryProduct[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "afr-preprocessing-solutions",
    name: "AFR Preprocessing",
    shortName: "AFR Preprocessing",
    heroImage: PLACEHOLDER_IMAGE,
    heroSubtitle: "AFR Preprocessing",
    heroDescription:
      "A combination of conveyors, trommels, disc screen separators, magnetic separators and shredders configured as a single preprocessing line, backed by full design, erection, installation and commissioning support.",
    products: [
      {
        slug: "turnkey-machinery-for-afr-preprocessing",
        name: "Turnkey Machinery for AFR Preprocessing",
        subtitle: "Integrated Machine Systems for Cement Plant Alternate Fuel Lines",
        tagline: "AFR Preprocessing",
        description:
          "A combination of conveyors, trommels, disc screen separators, magnetic separators and shredders configured as a single preprocessing line, backed by full design, erection, installation and commissioning support.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Integrated multi-machine preprocessing lines",
          "Handles municipal RDF and industrial/commercial waste feedstock",
          "Turnkey scope: design, erection, installation, commissioning",
          "Engineered for continuous cement plant duty cycles",
        ],
        applications: [
          "Cement Plant AFR Lines",
          "Municipal RDF Preprocessing",
          "Industrial & Commercial Waste Preprocessing",
          "Alternate Fuel Yards",
        ],
        icon: Recycle,
      },
    ],
  },
  {
    slug: "msw-processing-solutions",
    name: "MSW Processing",
    shortName: "MSW Processing",
    heroImage: PLACEHOLDER_IMAGE,
    heroSubtitle: "MSW Processing",
    heroDescription:
      "We supply complete machinery packages for municipal solid waste processing plants, combining trommels, conveyors, disc screen separators, air density separators, magnetic separators and shredders into a single integrated line. As with our AFR solutions, we deliver on a turnkey basis, covering design, erection, installation and commissioning.",
    products: [
      {
        slug: "integrated-machinery-for-msw-processing-plants",
        name: "Integrated Machinery for MSW Processing Plants",
        subtitle: "Complete Processing Lines for Municipal Solid Waste",
        tagline: "MSW Processing",
        description:
          "We supply complete machinery packages for municipal solid waste processing plants, combining trommels, conveyors, disc screen separators, air density separators, magnetic separators and shredders into a single integrated line. As with our AFR solutions, we deliver on a turnkey basis, covering design, erection, installation and commissioning.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Integrated MSW processing lines",
          "Combination of screening, separation and shredding equipment",
          "Configured for legacy waste and daily incoming MSW streams",
          "Full turnkey delivery: design to commissioning",
        ],
        applications: [
          "Municipal Solid Waste Plants",
          "Legacy Waste Processing Sites",
          "Material Recovery Facilities",
        ],
        icon: Cog,
      },
    ],
  },
  {
    slug: "merf-dry-waste-management-solutions",
    name: "MERF Solutions",
    shortName: "MERF Solutions",
    heroImage: PLACEHOLDER_IMAGE,
    heroSubtitle: "MERF Solutions",
    heroDescription:
      "We supply the machinery backbone for Material Enrichment and Recovery Facilities (MERF), combining conveyors, trommels, disc screen separators and magnetic separators to enable efficient sorting and recovery of dry recyclable waste. In line with our other solutions, this is delivered on a turnkey basis, covering design, erection, installation and commissioning.",
    products: [
      {
        slug: "machinery-for-material-enrichment-and-recovery-facilities",
        name: "Machinery for Material Enrichment & Recovery Facilities",
        subtitle: "Dry Waste Sorting and Recovery Equipment",
        tagline: "MERF Solutions",
        description:
          "We supply the machinery backbone for Material Enrichment and Recovery Facilities (MERF), combining conveyors, trommels, disc screen separators and magnetic separators to enable efficient sorting and recovery of dry recyclable waste. In line with our other solutions, this is delivered on a turnkey basis, covering design, erection, installation and commissioning.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Machinery for dry waste sorting and recovery",
          "Combination of screening and separation equipment",
          "Configurable to plant-specific recyclable streams",
          "Turnkey design, erection, installation and commissioning",
        ],
        applications: [
          "Material Enrichment & Recovery Facilities",
          "Dry Waste Sorting Plants",
          "Recyclables Recovery Lines",
          "Urban Local Body MERF Projects",
        ],
        icon: Layers,
      },
    ],
  },
];

export const getCategoryBySlug = (slug: string) =>
  productCategories.find((category) => category.slug === slug);

export const getProductBySlug = (categorySlug: string, productSlug: string) => {
  const category = getCategoryBySlug(categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug);
  return product ? { category, product } : undefined;
};
