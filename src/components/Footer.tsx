import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ChevronUp, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import zigmaBpLogo from "@/assets/icons/zigmac -bp.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-slate-200 via-white to-slate-100 text-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(148,163,184,0.14),transparent_50%)]" />
        </div>

        <div className="container-main py-6 lg:py-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_2.5fr_1.8fr] gap-4 lg:gap-x-4 lg:gap-y-5">
            <div className="flex flex-col gap-8">
              <Link to="/" data-fly-target="footer-logo" className="flex items-center gap-3 mb-4">
                <img
                  src={zigmaBpLogo}
                  alt="Zigma Blue Planet"
                  className="h-16 w-auto object-contain"
                  loading="lazy"
                />
              </Link>

              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/share/18kiMiyZRp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 hover:bg-[#1877F2] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/zigfly_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 hover:bg-[#000000] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M18.244 2H21.5l-7.38 8.43L22 22h-6.87l-5.39-7.05L3.5 22H.244l7.89-9.01L2 2h7l4.89 6.43L18.244 2z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/zigfly/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 hover:bg-[#0A66C2] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/zigfly_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 hover:bg-[#E1306C] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@zigfly_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 hover:bg-[#FF0000] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                {[
                  { label: "Home", path: "/" },
                  { label: "About Us", path: "/about" },
                  { label: "Services", path: "/services" },
                  { label: "Products", path: "/products" },
                  { label: "Projects", path: "/projects" },
                  { label: "News Room", path: "/newsroom" },
                  { label: "Testimonials", path: "/testimonials" },
                  { label: "People At Zigma", path: "/people" },
                  { label: "Careers", path: "/careers" },
                  { label: "Contact", path: "/contact" },
                  // { label: "Governance Policies", path: "/about" },
                  // { label: "Awards and Recognition", path: "/awardsandrecognition" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-foreground/70 hover:text-primary transition-all duration-300 text-md hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1.5 flex-shrink-0" />
                  <span className="text-foreground/70 text-md">
                    178, Indu Nagar, Palayapalayam,
                    Perundurai Road, Erode, Tamilnadu - 638 011, India.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href="mailto:connect@zigma.in" className="text-foreground/70 hover:text-primary text-md transition-colors">
                    connect@zigma.in
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="tel:+914242225157" className="text-foreground/70 hover:text-primary text-md transition-colors">
                    0424 222 5157
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-foreground/20 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-foreground/60 text-sm">
              © {new Date().getFullYear()} Zigma Global Environ Solutions Pvt Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/policies" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                Privacy Policy & Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </>
  );
};

export default Footer;
