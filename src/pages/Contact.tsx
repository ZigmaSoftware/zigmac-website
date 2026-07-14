import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import erode from "@/assets/website/zigma-picture.webp";
import chennai from "@/assets/contact/Chennai.jpg";
import Delhi from "@/assets/contact/New-Delhi.webp";
import Mumbai from "@/assets/contact/Mumbai.jpg";
import Pune from "@/assets/contact/pune.jpg";
import Uk from "@/assets/contact/UK.jpg";
import Singapore from "@/assets/contact/Singapore.jpg";
import Malaysia from "@/assets/contact/Malaysia.jpg";

import Herobg from '@/assets/website/Office Night.jpeg';

const MAIL_TRIGGER_URL =
  import.meta.env.VITE_CONTACT_MAIL_TRIGGER_URL ||
  "https://zigma.in/zigma_website/mail_trigger.php";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject.trim()) {
      toast.error("Please select an enquiry.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Message is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const submittedName = formData.name.trim() || "Not provided";
      const submittedEmail = formData.email.trim();
      const submittedPhone = formData.phone.trim();
      const submittedSubject = formData.subject.trim();
      const submittedMessage = formData.message.trim();

      const query = new URLSearchParams({
        type: submittedSubject,
        name: submittedName,
        mail: submittedEmail,
        phone_no: submittedPhone,
        message: submittedMessage,
      });

      const apiUrl = `${MAIL_TRIGGER_URL}?${query.toString()}`;
      if (import.meta.env.DEV) {
        console.log("[Contact] mail_trigger request", apiUrl);
      }

      const apiResponse = await fetch(apiUrl, { method: "GET" });
      const apiBodyText = await apiResponse.text().catch(() => "");
      if (!apiResponse.ok) {
        throw new Error(`mail_trigger failed (${apiResponse.status}): ${apiBodyText}`);
      }

      // Some PHP endpoints always return 200; treat explicit failure keywords as an error.
      if (apiBodyText && /fail|error|invalid/i.test(apiBodyText)) {
        throw new Error(`mail_trigger response indicates failure: ${apiBodyText}`);
      }

      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact submission failed:", error);
      toast.error("Could not send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.name === "phone"
      ? e.target.value.replace(/\D/g, "")
      : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const officeLocations = [
    {
      title: "Erode, India (Head Office)",
      image: erode,
      address:
        "178, Indhu Nagar, Palayapalayam, Perundurai Road, Erode - 638012, Tamil Nadu, India",
      mapUrl:
           "https://maps.app.goo.gl/Ec4z5pudFxasqnsa7"
,
    },
     {
      title: "Chennai, India",
      image: chennai,
      address:
        "No 119, Greenways Towers, 1st Floor, St Mary's Road, Abiramapuram, Chennai - 600018",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Greenways+Towers+St+Marys+Road+Abiramapuram+Chennai+600018",
    },

    {
      title: "New Delhi, India",
      image: Delhi,
      address:
        "3rd Floor, Unit No. 306, Worldmark 1, Asset Area No. 11, Delhi Aerocity, New Delhi - 110037",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Worldmark+1+Asset+Area+11+Delhi+Aerocity+New+Delhi+110037",
    },
    {
      title: "Mumbai, India",
      image: Mumbai,
      address:
        "12th Floor, 1201-1203, Meridian Business Centre, Plot No. 27, Sector 30A, Vashi, Navi Mumbai, Maharashtra - 400705",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Meridian+Business+Centre+Sector+30A+Vashi+Navi+Mumbai+400705",
    },
    {
      title: "Pune, India",
      image: Pune,
      address:
        "Unit No. 306, T3, Kohinoor World Towers, Opp. Empire Estate, Old Mumbai - Pune Highway, Pimpri Colony, District Pune - 411018",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Kohinoor+World+Towers+Pimpri+Pune+411018",
    },
   
    {
      title: "United Kingdom",
      image: Uk,
      address:
        "Crown House, Gretton Brook Road, Earlstrees Industrial Estate, Corby, England NN17 4BA",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Crown+House+Gretton+Brook+Road+Earlstrees+Industrial+Estate+Corby+NN17+4BA",
    },
    {
      title: "Malaysia",
      image: Malaysia,
      address:
        "No 4, Jalan Pala 14, Imperial Industrial Park, Permatang Tinggi, 14000 Bukit Mertajam, Malaysia",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=No+4+Jalan+Pala+14+Imperial+Industrial+Park+Permatang+Tinggi+14000+Bukit+Mertajam+Malaysia",
    },
    {
      title: "Singapore",
      image: Singapore,
      address: "103 Penang Road, #05-06, Visioncrest, Singapore 238467",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=103+Penang+Road+05-06+Visioncrest+Singapore+238467",
    },
  ];

  return (
    <div className="min-h-screen bg-background ">
      <Header />
      <main className="scroll-pt-24 lg:scroll-pt-28">


        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Herobg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <div className="max-w-4xl mx-auto">
              <div className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium">
                Let's Connect
              </div>

              <h1 className="mt-3 text-5xl md:text-6xl font-bold leading-tight text-white">
                Talk to Us
              </h1>
              <p className="mt-6 text-lg max-w-2xl mx-auto text-white/90 leading-relaxed">
                For business queries, collaboration opportunities, or to understand our sustainable solutions, get in touch with us.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Get in Touch
                </h2>
                <div className="space-y-5 ">
                  <div className="flex gap-4 p-[18px] bg-card border rounded-lg border-border shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(15,23,42,0.12)]">
                    <div className="w-11 h-11 bg-gradient-to-br from-secondary to-card rounded-lg border border-border flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary " />
                    </div>
                    <div>
                      {/* <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground mb-1">Office</p> */}
                      <h3 className="text-base font-bold text-foreground mb-1.5">HO Address</h3>
                      <p className="text-muted-foreground">
                        178, Indu Nagar, Palayapalayam, <br />
                        Perundurai Road, Erode, Tamilnadu - 638 011, India.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-[18px] bg-card border rounded-lg border-border shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(15,23,42,0.12)]">
                    <div className="w-11 h-11 bg-gradient-to-br from-secondary to-card  rounded-lg border border-border flex items-center justify-center shrink-0">
                      {/* <Mail className="w-5 h-5 text-primary border-rounded-2xl" /> */}
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      {/* <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground mb-1">Email</p> */}
                      <h3 className="text-base font-bold text-foreground mb-1.5">Email Us</h3>
                      <a href="mailto:connect@zigma.in" className="text-primary hover:underline">
                        connect@zigma.in
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 p-[18px] bg-card border rounded-lg border-border shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(15,23,42,0.12)]">
                    <div className="w-11 h-11 bg-gradient-to-br from-secondary to-card rounded-lg border border-border flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      {/* <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground mb-1">Phone</p> */}
                      <h3 className="text-base font-bold text-foreground mb-1.5">Call Us</h3>
                      <a href="tel:+911234567890" className="text-primary hover:underline">
                        0424 222 5157
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card p-8 border border-border shadow-xl shadow-black/10 rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger className="h-12 w-full rounded-lg border border-border bg-transparent px-4 text-foreground [&>span]:text-foreground hover:text-green-700 hover:[&>span]:text-green-700 focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select enquiry" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border border-border bg-card p-1">
                      <SelectItem
                        value="1"
                        className="rounded-md px-3 py-2 pl-3 text-foreground focus:bg-transparent focus:text-green-700 data-[highlighted]:bg-transparent data-[highlighted]:text-green-700 data-[state=checked]:bg-transparent data-[state=checked]:text-foreground [&>span:first-child]:hidden"
                      >
                        General enquiry
                      </SelectItem>
                      <SelectItem
                        value="2"
                        className="rounded-md px-3 py-2 pl-3 text-foreground focus:bg-transparent focus:text-green-700 data-[highlighted]:bg-transparent data-[highlighted]:text-green-700 data-[state=checked]:bg-transparent data-[state=checked]:text-foreground [&>span:first-child]:hidden"
                      >
                        Sales
                      </SelectItem>
                      <SelectItem
                        value="3"
                        className="rounded-md px-3 py-2 pl-3 text-foreground focus:bg-transparent focus:text-green-700 data-[highlighted]:bg-transparent data-[highlighted]:text-green-700 data-[state=checked]:bg-transparent data-[state=checked]:text-foreground [&>span:first-child]:hidden"
                      >
                        Support
                      </SelectItem>
                      <SelectItem
                        value="4"
                        className="rounded-md px-3 py-2 pl-3 text-foreground focus:bg-transparent focus:text-green-700 data-[highlighted]:bg-transparent data-[highlighted]:text-green-700 data-[state=checked]:bg-transparent data-[state=checked]:text-foreground [&>span:first-child]:hidden"
                      >
                        Partnership
                      </SelectItem>
                      <SelectItem
                        value="5"
                        className="rounded-md px-3 py-2 pl-3 text-foreground focus:bg-transparent focus:text-green-700 data-[highlighted]:bg-transparent data-[highlighted]:text-green-700 data-[state=checked]:bg-transparent data-[state=checked]:text-foreground [&>span:first-child]:hidden"
                      >
                        Careers
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0  shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />

                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="h-12  rounded-none border-0 border-b border-border bg-transparent px-0  shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />

                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Contact"
                    className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-foreground shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />

                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={4}
                    required
                    className=" resize-y rounded-none border-0 border-b border-border bg-transparent px-0 text-foreground shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />

                  <Button type="submit" className="rounded-lg px-10" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Address Cards Section */}
        <section className="section-padding">
          <div className="container-main">
            <div className="grid gap-6 md:grid-cols-2">
              {officeLocations.map((office) => (
                <article key={office.title} className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={office.image}
                    alt={office.title}
                    className="h-80 w-full object-cover md:h-96"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" /> */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <h3 className="text-2xl font-bold text-white md:text-[26px]">{office.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-white/90 md:text-lg">
                      {office.address}
                    </p>
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-base font-medium text-white/85 underline underline-offset-4 transition-colors hover:text-white"
                    >
                      View on Map
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section
        <section className="h-96 bg-muted">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5749093395584!2d77.30499631508256!3d28.642073782417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb39e0000001%3A0x70e1d8f4e5e5f8e!2sPatparganj%2C%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </section> */}
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

