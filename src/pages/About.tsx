import { useEffect, useRef } from 'react';
import { FileText, Shield, Lock, Users, ArrowUpRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/animation/Reveal';
import hero from '@/assets/website/zigma-picture.webp';
import globeSvg from '@/assets/website/contact_globe.svg';
import BluePlanetSection from '@/components/home/BluePlanetSection';

import Pdf1 from '@/assets/Pdf Files/ABAC-AML-Policies-Zigma-Global.pdf';
import Pdf2 from '@/assets/Pdf Files/Amended_Zigma-Global-Whistle-Blower-Policy-Clean.pdf';
import Pdf3 from '@/assets/Pdf Files/Zigma-Privacy-Policy.pdf';
import Pdf4 from '@/assets/Pdf Files/Zigma_PDPA Policy.pdf';



gsap.registerPlugin(ScrollTrigger);

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const SLOW_EASE = 'power2.out';

const leaderImageModules = import.meta.glob('../assets/Leaders/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

const getLeaderImage = (fileName: string): string | undefined =>
  leaderImageModules[`../assets/Leaders/${fileName}`] as string | undefined;

type Leader = {
  group: 'Promoters and CoFounders' | 'Management Team';
  name: string;
  designation?: string;
  image?: string;
  linkedin?: string;
};

const policies = [
  {
    id: 'abac-aml',
    title: 'ABAC & AML Policies',
    description: 'Anti-bribery, anti-corruption, and anti-money laundering framework with governance controls.',
    updated: 'February 2024',
    file: Pdf1,
    icon: Shield,
    accent: 'from-[hsl(145_63%_32%)] to-[hsl(145_63%_32%)]'
  },
  {
    id: 'whistleblower',
    title: 'Whistle Blower Policy',
    description: 'Confidential reporting channels, protection against retaliation, and investigation procedures.',
    updated: 'October 2025',
    file: Pdf2,
    icon: Users,
    accent: 'from-[hsl(145_63%_32%)] to-[hsl(145_63%_32%)]'
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect personal data across our digital and on-site operations.',
    updated: 'December 2025',
    file: Pdf3,
    icon: Lock,
    accent: 'from-[hsl(145_63%_32%)] to-[hsl(145_63%_32%)]'
  },
  {
    id: 'pdpa',
    title: 'PDPA Policy',
    description: 'Personal Data Protection compliance with strong governance and security controls.',
    updated: 'September 2025',
    file: Pdf4,
    icon: FileText,
    accent: 'from-[hsl(145_63%_32%)] to-[hsl(145_63%_32%)]'
  }
];

const leaders: Leader[] = [
  {
    group: 'Promoters and CoFounders',
    name: 'Boopathy Dharmaraj',
    image: getLeaderImage('Boopathy Dharmaraj.webp'),
    designation: 'Managing Director & Co-Founder',
    linkedin: 'https://www.linkedin.com/in/boopathy-dharmaraj-6b64b0ba/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'Ku Tha Ilangovan',
    image: getLeaderImage('KTI.webp'),
    designation: 'Director & Co-Founder',
    linkedin: 'https://www.linkedin.com/in/ilangovan-thangavelu-kugalur-a44084185/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'Anand Thangaraj',
    image: getLeaderImage('ANAND THANGARAJ.webp'),
    designation: 'Director',
    linkedin: 'https://www.linkedin.com/in/anand-thangaraj-b421b8400/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'K P Mutharasu',
    image: getLeaderImage('K P Mutharasu.webp'),
    designation: ' Promoter & Co- Founder',
    linkedin: 'https://www.linkedin.com/in/mutharasu-k-p-125b2546/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'Vijayan S',
    designation: 'Promoter',
    image: getLeaderImage('Vijayan.webp'),
    // linkedin: 'https://www.linkedin.com/in/vijayan-s/', / / FIX: was incorrectly pointing to Anand Thangaraj's profile
  },
  {
    group: 'Promoters and CoFounders',
    name: 'Nagesh Prabhu Chinivartha',
    image: getLeaderImage('NAGESH PRABHU.webp'),
    designation: 'Promoter & Co- Founder',
    linkedin: 'https://www.linkedin.com/in/nageshprabhu/',
  },

  {
    group: 'Management Team',
    name: 'A Rajasekaran',
    image: getLeaderImage('Aghoramoorthy Rajasekaran.webp'),
    designation: 'President - Technical',
    linkedin: 'https://www.linkedin.com/in/aghoramoorthy-rajasekaran-54479521/',
  },
  {
    group: 'Management Team',
    name: 'Senthil Annamalai',
    image: getLeaderImage('Senthil Annamalai.webp'),
    designation: 'Chief Operating Officer',
    linkedin: 'https://www.linkedin.com/in/senthil-annamalai-b3b38258/',
  },
  {
    group: 'Management Team',
    name: 'Maran V',
    image: getLeaderImage('Maran.webp'),
    designation: 'Vice President - Research & Product  Development',
    // linkedin: 'https://www.linkedin.com/in/maaran-9b1a8614a/',
  },
  {
    group: 'Management Team',
    name: 'Sridhar Jagannathan',
    image: getLeaderImage('Sridhar Jagannathan.webp'),
    designation: 'Vice President - Operations',
    linkedin: 'https://www.linkedin.com/in/sridhar-jagannathan-00a52444/',
  },
  {
    group: 'Management Team',
    name: 'Shankar Raman C V',
    image: getLeaderImage('Shankar Raman.webp'),
    designation: 'Vice President - Business Development',
    linkedin: 'https://www.linkedin.com/in/shankar-raman-c-v-64528611/',
  },
  {
    group: 'Management Team',
    name: 'Varun Boralkar',
    image: getLeaderImage('Varun Boralkar.webp'),
    designation: 'Vice President - Strategic Business Group',
    linkedin: 'https://www.linkedin.com/in/varun-boralkar-aa085a15/',
  },
  {
    group: 'Management Team',
    name: 'Mohan Kumaar S',
    image: getLeaderImage('Mohan kumar.webp'),
    designation: 'General Manager - AFR',
    linkedin: 'https://www.linkedin.com/in/mohan-kumaar-subramaniam-a3b064175/',
  },
  {
    group: 'Management Team',
    name: 'Sivasankarapandian P',
    image: getLeaderImage('ShivashankaraPandian.webp'),
    designation: 'General Manager - Finance & Accounts',
    linkedin: 'https://www.linkedin.com/in/sivasankarapandian-ssp-b35152392/', // FIX: was incorrectly pointing to Mohan Kumar's profile
  },
];

const isReducedMotionPreferred = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;
const leaderGroups: Array<Leader['group']> = ['Promoters and CoFounders', 'Management Team'];

const SectionTitle = ({ label, title }: { label: string; title: JSX.Element | string }) => (
  <div>
    <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
    <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
  </div>
);

const About = (): JSX.Element => {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const prefersReducedMotion = isReducedMotionPreferred();

  useEffect(() => {
    const section = heroSectionRef.current;
    const image = heroImageRef.current;

    if (!section || !image || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { y: 0, scale: 1.1 },
        {
          y: 80,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="scroll-pt-24 lg:snap-y lg:snap-proximity">
        <section
          id="about-hero"
          ref={heroSectionRef}
          data-no-animate
          className="relative box-border flex min-h-[100svh] items-center overflow-hidden pt-20 scroll-mt-24 lg:scroll-mt-28 lg:snap-start"
        >
          <img
            ref={heroImageRef}
            src={hero}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center">
            <Reveal
              className="w-full items-center justify-items-center text-center"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <div className="text-lg font-medium uppercase tracking-[0.35em] text-white/85">
                Our Journey
              </div>
              <h1 className="mt-3 text-5xl font-bold leading-tight text-white md:text-5xl">
               Milestones That Shaped Us
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/90">
                Explore the defining moments that transformed our vision into a global footprint. Each year marks a new chapter in growth, innovation, and impact.
              </p>
            </Reveal>
          </div>
        </section>

        <section
          data-no-animate
          className="section-padding relative overflow-hidden scroll-mt-24 lg:scroll-mt-28 lg:snap-start"
          style={{ background: 'linear-gradient(135deg, hsl(145 40% 97%) 0%, hsl(0 0% 100%) 50%, hsl(145 30% 96%) 100%)' }}
        >
          {/* Globe SVG background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 select-none sm:h-[360px] sm:w-[360px] lg:h-[560px] lg:w-[560px]"
          >
            <img
              src={globeSvg}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full opacity-[.25] drop-shadow-[0_0_20px_rgba(22,101,52,0.2)] motion-safe:animate-[spin_40s_linear_infinite] motion-reduce:animate-none"
            />
          </div>

          <div className="container-main relative">
            <Reveal
              className="mt-8 max-w-5xl mx-auto"
              data-anim-start="top 92%"
              data-anim-duration="1.5"
              data-anim-ease={SLOW_EASE}
            >
              <div className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Our Company
              </div>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Zigma Global Environ <span className="text-primary">Solutions</span>
              </h2>
              <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
                In 2015, while exploring various waste streams, our founders discovered a stark reality: India had no solution for its growing legacy waste crisis. Open dump yards across the country were overflowing with decades of mismanaged municipal solid waste, and the nation was grappling with the absence of a clear, scientific pathway to address it.
              </p>
              <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
                This realization became the turning point. A group of serial entrepreneurs from South India - experienced in steel manufacturing, TMT bars, billets, UPVC profiles, hospitality, and IT infrastructure - saw in this challenge an opportunity to do something truly transformative, not just for communities but for the country at large.
              </p>
              <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
                Determined to find answers, they traveled across Germany, South Africa, Thailand, China, and South Korea, studying how these nations tackled municipal solid waste. Out of this exploration emerged Zigma: a company dedicated to pioneering solutions for legacy waste management.
              </p>
              <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
                At the heart of our operations lies a low-carbon emission model that scientifically segregates and remediates decades of accumulated waste. What began as a quest to solve India's most pressing environmental challenge has evolved into a mission with global resonance - turning neglected dump yards into opportunities for renewal, sustainability, and impact.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://zigma.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Visit Zigma
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <BluePlanetSection/>

        <section
          data-no-animate
          className="section-padding scroll-mt-24 lg:scroll-mt-28 "
        >
          <div className="container-main flex flex-col">
            <Reveal data-anim-start="top 92%" data-anim-duration="1.45" data-anim-ease={SLOW_EASE}>
              <SectionTitle
                label="Meet Our Management Team"
                title={
                  <>
                    Leadership Driving Sustainable <span className="text-primary">Excellence</span>
                  </>
                }
              />
            </Reveal>

            {leaderGroups.map((group) => (
              <div key={group} className="mt-8 first:mt-6">
                <h3 className="mb-4 text-xl font-semibold text-slate-900">{group.replace('CoFounders', 'Co-Founders')}</h3>
                <div className="grid grid-cols-1 gap-y-14 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-3 xl:gap-x-10">
                  {leaders
                    .filter((leader) => leader.group === group)
                    .map((leader) => (
                      <article
                        key={`${leader.group}-${leader.name}`}
                        className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                          <div className="relative h-full w-full">
                            {leader.image ? (
                              <img
                                src={leader.image}
                                alt={leader.name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover object-center"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-slate-100">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-600">
                                  {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                              </div>
                            )}

                            {/* LinkedIn icon */}
                            {leader.linkedin ? (
                              <a
                                href={leader.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${leader.name} on LinkedIn`}
                                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0A66C2] bg-white/95 text-[#0A66C2] shadow-sm transition-colors duration-200 hover:bg-[#0A66C2] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2"
                              >
                                <span className="text-sm font-extrabold leading-none">in</span>
                              </a>
                            ) : null}

                            {/* Name pill */}
                            <div className="absolute bottom-6 left-0">
                              <div className="bg-white rounded-r-full px-6 py-4 shadow-md min-w-[260px]">
                                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                  {leader.name}
                                </h3>

                                {leader.designation && (
                                  <p className="text-sm text-slate-700 mt-1 leading-tight">
                                    {leader.designation}
                                  </p>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Policies Grid */}
        <section className=" container-main section-padding">
          <div className="flex flex-col gap-3 mb-10 ">


            <div id="policies" className="text-center">

              <p className="text-xs md:text-sm uppercase tracking-[0.35em]  text-muted-foreground">
                Governance Policy Library
              </p>

              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Compliance & Ethical <span className="text-primary">Framework</span>

              </h2>
              <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-center text-sm md:text-lg  ">
                Each document is reviewed on a defined cycle and versioned for audit traceability.

              </p>
            </div>
          </div>

          <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
            {policies.map((policy) => {
              const Icon = policy.icon;
              return (
                <article
                  key={policy.id}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`h-1.5 w-full rounded-t-2xl bg-gradient-to-r ${policy.accent}`} />
                  <div className=" p-6  flex h-full flex-col">
                    <div className="flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center">
                        <Icon className="w-8 h-8 text-[hsl(145_63%_32%)]" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground text-center">
                      {policy.title}
                    </h3>
                    <p className="mt-3 text-md text-muted-foreground text-center">
                      {policy.description}
                    </p>


                    <div className="mt-auto pt-6 flex flex-col gap-3">

                      <a
                        href={policy.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-[hsl(145_63%_32%)] hover:text-[hsl(145_63%_32%)]"
                      >
                        View
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
};

export default About;

