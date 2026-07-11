import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import picture1 from "@/assets/website/hero/career-bg.webp";

import {
  Send,
  Copy,
  MapPin,
  Briefcase,
  Clock3,
} from "lucide-react";

/* ---------------- JOB DATA ---------------- */

type JobOpening = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  qualifications: string[];
  responsibilities: string[];
};

const _jobOpenings: JobOpening[] = [
  // {
  //   id: 1,
  //   title: "Environmental Engineer / Officer",
  //   department: "Operations",
  //   location: "Guwahati, Puducherry, Tirupati, Chittoor, Trichy",
  //   type: "Full-time",
  //   experience: "0-3 years",
  //   summary:
  //     "Lead environmental assessment and remediation programs for landfill and waste-management sites.",
  //   qualifications: [
  //     "BE/ME in Environmental Engineering, or B.Sc/M.Sc in Environmental Science/Chemistry",
  //     "Strong understanding of environmental regulations and compliance",
  //     "Ability to prepare field and technical documentation",
  //   ],
  //   responsibilities: [
  //     "Conduct environmental impact assessments",
  //     "Design and implement remediation strategies",
  //     "Monitor compliance with environmental regulations",
  //     "Prepare technical reports and project documentation",
  //   ],
  // },
  // {
  //   id: 2,
  //   title: "Project Engineer",
  //   department: "Project Management",
  //   location:
  //     "Chennai, Chittoor, Srikalasti, Nellore, Guwahati, Tirupati, Visakhapatnam",
  //   type: "Full-time",
  //   experience: "2-4 years",
  //   summary:
  //     "Execute large-scale waste-management and landfill-reclamation projects with quality, cost, and timeline control.",
  //   qualifications: [
  //     "Diploma / B.E. in any specialization",
  //     "Experience in project planning, reporting, and stakeholder coordination",
  //     "Ability to manage multiple workstreams and site teams",
  //   ],
  //   responsibilities: [
  //     "Oversee project planning and execution",
  //     "Manage project budgets and schedules",
  //     "Coordinate with clients and cross-functional stakeholders",
  //     "Track project risks and ensure timely closure",
  //   ],
  // },
  // {
  //   id: 3,
  //   title: "Machine Operator",
  //   department: "Field Operations",
  //   location: "Pan India (Multiple Sites)",
  //   type: "Full-time",
  //   experience: "0-5 years",
  //   summary:
  //     "Operate and maintain heavy machinery for landfill mining and waste-processing operations.",
  //   qualifications: [
  //     "Hands-on experience with heavy equipment operations",
  //     "Knowledge of LT panels, motors, pumps, and control wiring is preferred",
  //     "Awareness of electrical and site safety standards",
  //   ],
  //   responsibilities: [
  //     "Operate excavators, loaders, and related machinery",
  //     "Perform routine inspection and preventive maintenance",
  //     "Follow safety SOPs and escalation procedures",
  //     "Report and coordinate closure of equipment issues",
  //   ],
  // },
  // {
  //   id: 4,
  //   title: "Stores Executive",
  //   department: "Stores & Logistics",
  //   location: "Puducherry, Kodungaiyur (Chennai)",
  //   type: "Full-time",
  //   experience: "0-3 years",
  //   summary:
  //     "Manage receipt, storage, and issue of materials while maintaining stock registers and ERP records.",
  //   qualifications: [
  //     "Any degree",
  //     "Basic understanding of inventory systems and stock audits",
  //     "Good coordination skills with procurement and site teams",
  //   ],
  //   responsibilities: [
  //     "Monitor inventory levels and reorder points",
  //     "Coordinate with procurement and logistics teams",
  //     "Ensure FIFO practices and periodic stock audits",
  //     "Maintain store hygiene, records, and compliance",
  //   ],
  // },
];

/* ---------------- COMPONENT ---------------- */

const Careers = () => {
  const [selectedJob, _setSelectedJob] = useState<JobOpening | null>(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);

  const careersEmail = "careers@zigma.in";
  const careersMailtoHref =
    "mailto:careers@zigma.in?subject=Career%20Application&body=Hi%20Zigma%20Team%2C%0A%0AI%20would%20like%20to%20share%20my%20profile%20for%20career%20opportunities.%0A%0ARegards%2C";

  const copyCareersEmail = async () => {
    try {
      await navigator.clipboard.writeText(careersEmail);
      toast.success("Email copied to clipboard.");
    } catch {
      toast.error("Could not copy email. Please copy it manually.");
    }
  };

  /* ---------------- ANIMATION ---------------- */

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add("reveal-in");
              observer.unobserve(entry.target);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ---------------- HANDLERS ---------------- */

  const closeJobDetails = () => {
    setIsJobDetailsOpen(false);
  };

  const openApplicationPage = () => {
    const applyUrl = selectedJob
      ? `/careers/apply?role=${encodeURIComponent(selectedJob.title)}`
      : "/careers/apply";
    const popup = window.open(applyUrl, "_blank", "noopener,noreferrer");
    popup?.focus();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>

        {/* HERO */}

        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${picture1})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          {/* <div
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18"
            aria-hidden="true"
          /> */}

          <div className="container-main relative grid items-center justify-items-center text-center">
            <p className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium">
              Careers
            </p>

            <h1 className="mt-3 text-5xl md:text-6xl font-bold leading-tight text-white">
              Build The Future With Zigma
            </h1>

            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-3xl text-center">
              Join us to solve real environmental challenges, shape sustainable infrastructure, and
              grow with teams that value engineering quality and measurable impact.
            </p>

            {/* <div className="mt-8">
              <a
                href="#job-openings"
                className="inline-flex items-center rounded-full border border-primary bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                View Open Roles
              </a>
            </div> */}
          </div>
        </section>

        {/* JOB OPENINGS */}

        {/* <section id="job-openings" className="section-padding">

          <div className="container-main">


            {jobOpenings.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                No openings available at the moment.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobOpenings.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-xl p-5 bg-card hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start mb-3">

                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {job.department}
                      </div>

                      <Building2 className="w-4 h-4 text-primary" />

                    </div>

                    <h3 className="text-lg font-bold mb-2">{job.title}</h3>

                    <p className="text-muted-foreground text-sm mb-4">
                      {job.summary}
                    </p>

                    <Button
                      variant="outline"
                      onClick={() => openJobDetails(job.id)}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      View Details
                    </Button>

                  </div>
                ))}
              </div>
            )}

          </div>

        </section> */}

        {/* JOB DETAILS DIALOG */}

        <Dialog open={isJobDetailsOpen} onOpenChange={setIsJobDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedJob?.title}</DialogTitle>
              <DialogDescription>
                Review role details before starting your application.
              </DialogDescription>
            </DialogHeader>

            {selectedJob && (
              <div className="space-y-6 mt-2">
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground mb-1">Location</p>
                    <p className="text-sm font-medium flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      {selectedJob.location}
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground mb-1">Employment Type</p>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {selectedJob.type}
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground mb-1">Experience</p>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      {selectedJob.experience}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold">About This Role</h4>
                  <p className="text-sm text-muted-foreground mt-2">{selectedJob.summary}</p>
                </div>

                <div>
                  <h4 className="text-base font-semibold">Key Responsibilities</h4>
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {selectedJob.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-base font-semibold">Qualifications</h4>
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {selectedJob.qualifications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={closeJobDetails}>Close</Button>
                  <Button onClick={openApplicationPage}>Apply Now</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>


        {/* VIDEO SECTION */}

        {/* <section className="section-padding">
          <div className="container-main"> */}

            {/* Section Header */}
            {/* <div className="text-center mb-12">

              <div className="text-center mb-10">
                <p className="text-md uppercase tracking-[0.35em] text-muted-foreground">
                  Life at Zigma
                </p>
                <h2 className="text-4xl font-semibold mt-3">
                  We're <span className="text-primary">Hiring</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                  Get a glimpse of our culture and the exciting opportunities waiting for you at Zigma.
                </p>
              </div>
            </div> */}

            {/* 3-Card Video Grid */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {cultureVideos.map((video) => (
                <div
                  key={video.id}
                  className="group relative rounded-2xl overflow-hidden bg-slate-950 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"

                > */}
                  {/* 16:9 aspect container
                  <div className="relative h-[300px] sm:h-[340px] lg:h-[500px]">
                    <video
                      ref={(el) => {
                        videoRefs.current[video.id] = el;
                      }}
                      src={video.src}
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        objectPosition: video.objectPosition ?? "center",
                        transform: `scale(${video.zoom ?? 1})`,
                      }}
                      playsInline
                      autoPlay
                      muted={playingId !== video.id}
                      controls={playingId === video.id}
                      loop={playingId !== video.id}
                      onEnded={() => handleVideoPause(video.id)}
                    /> */}

                    {/* Play Overlay - hidden once playing */}
                      {/* {playingId !== video.id && (
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.52) 100%)" }}
                          onClick={() => handleVideoPlay(video.id)}
                        > */}
                        {/* Play button circle - show on hover and initially */}
                        {/* <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center group-hover:scale-110 group-hover:border-primary transition-all duration-300 bg-black/20 backdrop-blur-sm">
                          <Play className="w-6 h-6 text-white fill-white ml-1" />
                        </div>

                      </div>
                    )} */}

                    {/* Pause Overlay - shown while playing */}
                    {/* {playingId === video.id && (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300"
                        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.52) 100%)" }}
                        onClick={() => handleVideoPause(video.id)}
                      > */}
                        {/* Pause button circle - show on hover */}
                        {/* <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center group-hover:scale-110 group-hover:border-primary transition-all duration-300 bg-black/20 backdrop-blur-sm">
                          <Pause className="w-6 h-6 text-white fill-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section> */}

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-main text-center">
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">
              Join Our Team
            </span>
            <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Ready to Build Your Career With Us?
            </h2>
            <p className="mx-auto mb-10 mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              We're always looking for talented individuals. Send us your resume and
              we'll reach out when a suitable position opens up.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={careersMailtoHref}
                aria-label="Send your profile to careers@zigma.in"
                className="inline-flex items-center gap-2 text-base font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
              >
                <Send className="h-4 w-4" />
                {careersEmail}
              </a>
              <Button variant="outline" onClick={copyCareersEmail}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Email
              </Button>
            </div>
          </div>
        </section>




      </main>

      <Footer />
    </div>
  );
};

export default Careers;


