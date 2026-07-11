import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntegratedAFProjects from "@/components/projects/IntegratedAFProjects";

const Projects: React.FC = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="max-w-[1400px] mx-auto px-[5%] pb-10 pt-28 md:pt-32">
      <IntegratedAFProjects />
    </main>
    <Footer />
  </div>
);

export default Projects;
