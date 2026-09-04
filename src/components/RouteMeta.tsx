import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type RouteMetaEntry = {
  description: string;
  title: string;
};

const SITE_NAME = "Zigmac";
const DEFAULT_META: RouteMetaEntry = {
  title: "Manufacturing Capability",
  description:
    "Zigmac delivers machinery manufacturing, heavy fabrication, precision machining, assembly and inspection support for waste-management infrastructure.",
};

const ROUTE_META: Record<string, RouteMetaEntry> = {
  "/": {
    title: "Home",
    description:
      "Explore Zigmac's machinery manufacturing capability for MSW plant equipment, heavy fabrication, machining, assembly and quality inspection.",
  },
  "/about": {
    title: "About",
    description:
      "Learn about Zigmac, our leadership, manufacturing ecosystem, and approach to engineered waste-management infrastructure.",
  },
  "/awards": {
    title: "Awards",
    description:
      "See the awards and recognitions earned by Zigmac for environmental services and innovation.",
  },
  "/awardsandrecognition": {
    title: "Awards and Recognition",
    description:
      "Browse Zigmac's awards and recognition across environmental impact, landfill remediation, and sustainability.",
  },
  "/careers": {
    title: "Careers",
    description:
      "Explore open roles at Zigmac and build a career in engineering, project delivery, manufacturing and sustainability.",
  },
  "/careers/apply": {
    title: "Apply",
    description:
      "Submit your application to Zigmac for current and future career opportunities.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Get in touch with Zigmac for machinery manufacturing enquiries, RFQs, partnerships and technical discussions.",
  },
  "/newsletters": {
    title: "Newsletters",
    description:
      "Read Zigmac newsletters covering projects, milestones, and circular economy updates.",
  },
  "/newsroom": {
    title: "Newsroom",
    description:
      "Browse media coverage, project news, and public updates from Zigmac.",
  },
  "/people": {
    title: "People",
    description:
      "Meet the leadership and team behind Zigmac's engineering and waste-management infrastructure initiatives.",
  },
  "/policies": {
    title: "Policies",
    description:
      "Review governance, privacy, whistleblower, and compliance policies for Zigmac.",
  },
  "/products": {
    title: "Equipment",
    description:
      "Discover Zigmac equipment categories including trommel systems, CSM assemblies, gear and ring parts, jigs and fixtures.",
  },
  "/afr-preprocessing-solutions": {
    title: "AFR Preprocessing Solutions",
    description:
      "Explore Zigmac's AFR preprocessing solutions engineered to prepare alternative fuel and raw material streams for co-processing.",
  },
  "/msw-processing-solutions": {
    title: "MSW Processing Solutions",
    description:
      "Explore Zigmac's MSW processing solutions for receiving, screening and sorting municipal solid waste streams.",
  },
  "/merf-dry-waste-management-solutions": {
    title: "MERF - Dry Waste Management Solutions",
    description:
      "Explore Zigmac's MERF dry waste management solutions for sorting, recovering and processing recyclable material.",
  },
  "/projects": {
    title: "Projects",
    description:
      "Explore Zigmac projects in waste processing, plant infrastructure and environmental restoration.",
  },
  "/projects/gallery": {
    title: "Projects Gallery",
    description:
      "View project galleries showing before-and-after outcomes across Zigmac remediation and recovery sites.",
  },
  "/publications": {
    title: "Publications",
    description:
      "Access reports, advisories, case studies, and technical publications curated by Zigmac.",
  },
  "/services": {
    title: "Services",
    description:
      "Review Zigmac services in machinery process planning, heavy fabrication, precision machining, quality inspection and assembly.",
  },
  "/testimonials": {
    title: "Testimonials",
    description:
      "Read testimonials and partner perspectives on Zigmac's work and delivery outcomes.",
  },
  "/waste-management-showcase": {
    title: "Waste Management Showcase",
    description:
      "Explore Zigmac's waste management showcase and service presentation.",
  },
};

const ensureMetaTag = (name: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  return tag;
};

const RouteMeta = () => {
  const location = useLocation();

  useEffect(() => {
    const entry = ROUTE_META[location.pathname] ?? DEFAULT_META;
    document.title = `${entry.title} | ${SITE_NAME}`;
    ensureMetaTag("description").content = entry.description;
  }, [location.pathname]);

  return null;
};

export default RouteMeta;
