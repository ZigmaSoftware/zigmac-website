import type { LucideIcon } from "lucide-react";
import { Factory, Cog, Gauge, Wind, Magnet, Wrench, Recycle, Flame, Layers } from "lucide-react";

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
    name: "AFR Preprocessing Solutions",
    shortName: "AFR Preprocessing",
    heroImage: PLACEHOLDER_IMAGE,
    heroSubtitle: "Alternative Fuel & Raw Material Preprocessing",
    heroDescription:
      "Solutions engineered to prepare alternative fuel and raw material streams for co-processing, improving quality, consistency and calorific value.",
    products: [
      {
        slug: "afr-solution-1",
        name: "AFR Solution 1",
        subtitle: "Placeholder subtitle for AFR Solution 1",
        tagline: "AFR Preprocessing",
        description:
          "Placeholder description for AFR Solution 1. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Flame,
      },
      {
        slug: "afr-solution-2",
        name: "AFR Solution 2",
        subtitle: "Placeholder subtitle for AFR Solution 2",
        tagline: "AFR Preprocessing",
        description:
          "Placeholder description for AFR Solution 2. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Recycle,
      },
      {
        slug: "afr-solution-3",
        name: "AFR Solution 3",
        subtitle: "Placeholder subtitle for AFR Solution 3",
        tagline: "AFR Preprocessing",
        description:
          "Placeholder description for AFR Solution 3. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Gauge,
      },
      {
        slug: "afr-solution-4",
        name: "AFR Solution 4",
        subtitle: "Placeholder subtitle for AFR Solution 4",
        tagline: "AFR Preprocessing",
        description:
          "Placeholder description for AFR Solution 4. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Layers,
      },
    ],
  },
  {
    slug: "msw-processing-solutions",
    name: "MSW Processing Solutions",
    shortName: "MSW Processing",
    heroImage: PLACEHOLDER_IMAGE,
    heroSubtitle: "Municipal Solid Waste Processing",
    heroDescription:
      "Robust systems for receiving, screening and sorting municipal solid waste streams into recoverable fractions.",
    products: [
      {
        slug: "msw-solution-1",
        name: "MSW Solution 1",
        subtitle: "Placeholder subtitle for MSW Solution 1",
        tagline: "MSW Processing",
        description:
          "Placeholder description for MSW Solution 1. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Factory,
      },
      {
        slug: "msw-solution-2",
        name: "MSW Solution 2",
        subtitle: "Placeholder subtitle for MSW Solution 2",
        tagline: "MSW Processing",
        description:
          "Placeholder description for MSW Solution 2. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Gauge,
      },
      {
        slug: "msw-solution-3",
        name: "MSW Solution 3",
        subtitle: "Placeholder subtitle for MSW Solution 3",
        tagline: "MSW Processing",
        description:
          "Placeholder description for MSW Solution 3. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Magnet,
      },
      {
        slug: "msw-solution-4",
        name: "MSW Solution 4",
        subtitle: "Placeholder subtitle for MSW Solution 4",
        tagline: "MSW Processing",
        description:
          "Placeholder description for MSW Solution 4. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Cog,
      },
    ],
  },
  {
    slug: "merf-dry-waste-management-solutions",
    name: "MERF - Dry Waste Management Solutions",
    shortName: "MERF Dry Waste",
    heroImage: PLACEHOLDER_IMAGE,
    heroSubtitle: "Material Extraction & Recovery Facility",
    heroDescription:
      "Dry waste management systems for sorting, recovering and processing recyclable material fractions at facility scale.",
    products: [
      {
        slug: "merf-solution-1",
        name: "MERF Solution 1",
        subtitle: "Placeholder subtitle for MERF Solution 1",
        tagline: "MERF Dry Waste",
        description:
          "Placeholder description for MERF Solution 1. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Layers,
      },
      {
        slug: "merf-solution-2",
        name: "MERF Solution 2",
        subtitle: "Placeholder subtitle for MERF Solution 2",
        tagline: "MERF Dry Waste",
        description:
          "Placeholder description for MERF Solution 2. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Wind,
      },
      {
        slug: "merf-solution-3",
        name: "MERF Solution 3",
        subtitle: "Placeholder subtitle for MERF Solution 3",
        tagline: "MERF Dry Waste",
        description:
          "Placeholder description for MERF Solution 3. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Wrench,
      },
      {
        slug: "merf-solution-4",
        name: "MERF Solution 4",
        subtitle: "Placeholder subtitle for MERF Solution 4",
        tagline: "MERF Dry Waste",
        description:
          "Placeholder description for MERF Solution 4. Replace this with the actual product name, description and specifications.",
        image: PLACEHOLDER_IMAGE,
        features: [
          "Placeholder feature 1",
          "Placeholder feature 2",
          "Placeholder feature 3",
          "Placeholder feature 4",
        ],
        applications: ["Placeholder Application 1", "Placeholder Application 2", "Placeholder Application 3", "Placeholder Application 4"],
        icon: Cog,
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
