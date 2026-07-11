import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowLeft, 
  Target,
  Recycle,
  Leaf,
  Users,
  Award,
  Clock,
  TrendingUp
} from "lucide-react";

const projectsData = {
  1: {
    id: 1,
    title: "Delhi Landfill Reclamation",
    location: "Delhi, India",
    year: "2023",
    status: "completed",
    description: "Successful reclamation of 50 acres of landfill land, processing over 2 million tons of legacy waste.",
    fullDescription: `The Delhi Landfill Reclamation project stands as one of ZIGMA's most ambitious and successful undertakings. 
    Located in the heart of the national capital, this project transformed a 50-acre environmental hazard into reclaimed land ready for urban development.
    
    The project employed our proprietary bio-mining technology, combined with advanced material recovery systems to process decades of accumulated municipal solid waste. 
    Our team worked tirelessly to ensure minimal environmental impact during the reclamation process, implementing strict air quality and groundwater monitoring protocols.`,
    impact: "Land cleared for urban development",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200",
    stats: { waste: "2M tons", land: "50 acres", recovery: "75%" },
    client: "Municipal Corporation of Delhi",
    duration: "18 months",
    teamSize: "250+",
    highlights: [
      "Processed 2 million tons of legacy waste",
      "Achieved 75% material recovery rate",
      "Created 500+ local employment opportunities",
      "Zero environmental violations throughout project",
      "Implemented advanced leachate treatment system",
      "Recovered valuable materials worth â‚¹50 crores"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600",
    ],
    timeline: [
      { phase: "Site Assessment", duration: "2 months", status: "completed" },
      { phase: "Infrastructure Setup", duration: "3 months", status: "completed" },
      { phase: "Waste Excavation", duration: "8 months", status: "completed" },
      { phase: "Material Segregation", duration: "6 months", status: "completed" },
      { phase: "Land Remediation", duration: "4 months", status: "completed" },
      { phase: "Handover", duration: "1 month", status: "completed" },
    ]
  },
  2: {
    id: 2,
    title: "Gurugram Waste Mining",
    location: "Gurugram, Haryana",
    year: "2022",
    status: "completed",
    description: "Mining and processing of 15-year-old legacy waste dump, recovering valuable materials.",
    fullDescription: `The Gurugram Waste Mining project tackled one of Haryana's most challenging legacy waste sites. 
    Over 15 years of accumulated waste had created significant environmental and health hazards for nearby communities.
    
    Our comprehensive approach involved systematic excavation, advanced sorting technologies, and sustainable disposal methods. 
    The project achieved an impressive 80% waste diversion rate, with recovered materials being recycled or repurposed.`,
    impact: "80% waste diverted from landfill",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
    stats: { waste: "1.5M tons", land: "35 acres", recovery: "80%" },
    client: "Municipal Corporation of Gurugram",
    duration: "14 months",
    teamSize: "180+",
    highlights: [
      "Processed 1.5 million tons of aged waste",
      "Achieved 80% material recovery rate",
      "Restored groundwater quality in surrounding areas",
      "Implemented odor control measures",
      "Created green buffer zone around site",
      "Recovered recyclables worth â‚¹35 crores"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600",
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600",
    ],
    timeline: [
      { phase: "Environmental Assessment", duration: "2 months", status: "completed" },
      { phase: "Equipment Mobilization", duration: "2 months", status: "completed" },
      { phase: "Waste Processing", duration: "7 months", status: "completed" },
      { phase: "Site Restoration", duration: "3 months", status: "completed" },
    ]
  },
  3: {
    id: 3,
    title: "Hyderabad Landfill Remediation",
    location: "Hyderabad, Telangana",
    year: "2021",
    status: "completed",
    description: "Complete remediation of contaminated landfill site with groundwater treatment.",
    fullDescription: `The Hyderabad Landfill Remediation project focused on environmental restoration of a heavily contaminated site. 
    Years of uncontrolled waste dumping had led to severe groundwater contamination and soil degradation.
    
    Our team implemented comprehensive remediation strategies including advanced leachate treatment, soil bioremediation, and groundwater cleanup. 
    The project successfully restored the site to safe environmental standards.`,
    impact: "Environmental restoration achieved",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=1200",
    stats: { waste: "800K tons", land: "25 acres", recovery: "70%" },
    client: "Greater Hyderabad Municipal Corporation",
    duration: "12 months",
    teamSize: "120+",
    highlights: [
      "Remediated 800K tons of waste",
      "Treated 5 million liters of leachate",
      "Restored groundwater to safe levels",
      "Planted 10,000 native trees",
      "Implemented continuous monitoring system",
      "Created community green space"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600",
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600",
    ],
    timeline: [
      { phase: "Contamination Assessment", duration: "2 months", status: "completed" },
      { phase: "Leachate Treatment", duration: "4 months", status: "completed" },
      { phase: "Waste Processing", duration: "4 months", status: "completed" },
      { phase: "Ecological Restoration", duration: "2 months", status: "completed" },
    ]
  },
  4: {
    id: 4,
    title: "Pune Bio-mining Project",
    location: "Pune, Maharashtra",
    year: "2023",
    status: "completed",
    description: "Bio-mining operations at Uruli-Devachi landfill site with material recovery.",
    fullDescription: `The Pune Bio-mining Project at Uruli-Devachi represents a milestone in urban waste management for Maharashtra. 
    This project addressed decades of accumulated waste while implementing sustainable recovery practices.
    
    Using advanced bio-mining techniques, we successfully processed legacy waste, recovering valuable materials and creating space for future development. 
    The project also generated significant local employment and contributed to the circular economy.`,
    impact: "70% material recovery rate",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=1200",
    stats: { waste: "1.2M tons", land: "40 acres", recovery: "70%" },
    client: "Pune Municipal Corporation",
    duration: "16 months",
    teamSize: "200+",
    highlights: [
      "Processed 1.2 million tons of waste",
      "Recovered 840K tons of materials",
      "Generated â‚¹40 crores from recovered materials",
      "Created 400+ jobs for local community",
      "Reduced methane emissions by 60%",
      "Implemented dust suppression systems"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600",
    ],
    timeline: [
      { phase: "Site Preparation", duration: "2 months", status: "completed" },
      { phase: "Bio-mining Operations", duration: "10 months", status: "completed" },
      { phase: "Material Processing", duration: "3 months", status: "completed" },
      { phase: "Site Closure", duration: "1 month", status: "completed" },
    ]
  },
  5: {
    id: 5,
    title: "Ahmedabad Legacy Waste",
    location: "Ahmedabad, Gujarat",
    year: "2020",
    status: "completed",
    description: "Comprehensive landfill mining and site remediation for the municipal corporation.",
    fullDescription: `The Ahmedabad Legacy Waste project transformed a 20-acre dumpsite into a beautiful green space. 
    This project showcased our ability to convert environmental liabilities into community assets.
    
    Working closely with the Ahmedabad Municipal Corporation, we implemented a phased approach that minimized disruption while maximizing recovery. 
    The reclaimed land now serves as a public park, benefiting thousands of residents.`,
    impact: "Site converted to green space",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1200",
    stats: { waste: "600K tons", land: "20 acres", recovery: "65%" },
    client: "Ahmedabad Municipal Corporation",
    duration: "10 months",
    teamSize: "100+",
    highlights: [
      "Transformed dumpsite to public park",
      "Processed 600K tons of legacy waste",
      "Created recreational space for 50,000 residents",
      "Installed solar-powered lighting",
      "Built community amphitheater",
      "Established urban forest with 5,000 trees"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    ],
    timeline: [
      { phase: "Planning & Design", duration: "1 month", status: "completed" },
      { phase: "Waste Excavation", duration: "5 months", status: "completed" },
      { phase: "Land Preparation", duration: "2 months", status: "completed" },
      { phase: "Landscaping", duration: "2 months", status: "completed" },
    ]
  },
  6: {
    id: 6,
    title: "Jaipur Dumpsite Clearance",
    location: "Jaipur, Rajasthan",
    year: "2019",
    status: "completed",
    description: "Complete clearance and remediation of 30-year-old municipal dumpsite.",
    fullDescription: `The Jaipur Dumpsite Clearance project tackled one of Rajasthan's oldest waste accumulation sites. 
    Three decades of waste had created a mountain-like structure that posed significant environmental and safety risks.
    
    Our engineering team developed innovative solutions to safely excavate and process the aged waste. 
    The project not only cleared the site but also recovered valuable materials, demonstrating the economic potential of legacy waste mining.`,
    impact: "Land reclaimed for public use",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
    stats: { waste: "900K tons", land: "28 acres", recovery: "68%" },
    client: "Jaipur Municipal Corporation",
    duration: "15 months",
    teamSize: "150+",
    highlights: [
      "Cleared 30-year-old dumpsite",
      "Processed 900K tons of aged waste",
      "Implemented fire prevention measures",
      "Recovered construction materials worth â‚¹25 crores",
      "Restored natural drainage patterns",
      "Prepared site for housing development"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600",
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600",
    ],
    timeline: [
      { phase: "Risk Assessment", duration: "2 months", status: "completed" },
      { phase: "Fire Mitigation", duration: "1 month", status: "completed" },
      { phase: "Waste Removal", duration: "9 months", status: "completed" },
      { phase: "Site Remediation", duration: "3 months", status: "completed" },
    ]
  },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData[Number(id) as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container-main py-20 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/projects">Back to Projects</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px]">
          <div className="absolute inset-0">
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          <div className="container-main relative h-full flex flex-col justify-end pb-12">
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold w-fit mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Completed Project
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Completed {project.year}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {project.duration}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {project.teamSize} Team Members
              </span>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 bg-card border-y border-border">
          <div className="container-main">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {project.stats.waste}
                </span>
                <p className="text-muted-foreground mt-1">Waste Processed</p>
              </div>
              <div className="border-x border-border">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {project.stats.land}
                </span>
                <p className="text-muted-foreground mt-1">Land Reclaimed</p>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {project.stats.recovery}
                </span>
                <p className="text-muted-foreground mt-1">Recovery Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="container-main">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary" />
                    Project Overview
                  </h2>
                  <div className="prose prose-lg text-muted-foreground">
                    {project.fullDescription.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <Award className="w-6 h-6 text-primary" />
                    Key Highlights
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.highlights.map((highlight, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    Project Timeline
                  </h2>
                  <div className="space-y-4">
                    {project.timeline.map((phase, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{phase.phase}</h4>
                          <span className="text-sm text-muted-foreground">{phase.duration}</span>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <Leaf className="w-6 h-6 text-primary" />
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.gallery.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img}
                        alt={`${project.title} gallery ${idx + 1}`}
                        className="rounded-xl w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Project Info Card */}
                <div className="bg-card rounded-2xl border border-border p-6 sticky top-28">
                  <h3 className="font-bold text-foreground mb-6">
                    Project Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Client</span>
                      <span className="font-medium text-foreground">{project.client}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium text-foreground">{project.location}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium text-foreground">{project.duration}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Team Size</span>
                      <span className="font-medium text-foreground">{project.teamSize}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="font-medium text-foreground">{project.year}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-muted-foreground block mb-2">Impact</span>
                      <span className="font-medium text-primary">{project.impact}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                  <Recycle className="w-10 h-10 mb-4" />
                  <h3 className="font-bold mb-2">
                    Have a Similar Project?
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Contact us to discuss how we can help with your waste management needs.
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link to="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;


