import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Send } from "lucide-react";
import { toast } from "sonner";

const CAREERS_MAIL_API = import.meta.env.VITE_CAREERS_MAIL_API?.trim() || "";
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  coverLetter: "",
};

const CareersApply = (): JSX.Element => {
  const [form, setForm] = useState(initialForm);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragOverResume, setIsDragOverResume] = useState(false);
  const [isRoleLocked, setIsRoleLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleFromQuery = params.get("role")?.trim() ?? "";

    if (!roleFromQuery) return;

    setForm((prev) => ({ ...prev, role: roleFromQuery }));
    setIsRoleLocked(true);
  }, []);

  const isPdfFile = (file: File) =>
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setResumeFile(null);
      return;
    }

    if (!isPdfFile(file)) {
      toast.error("Only PDF files are allowed.");
      setResumeFile(null);
      e.target.value = "";
      return;
    }

    if (file.size > MAX_RESUME_BYTES) {
      toast.error("Resume file is too large. Please upload a PDF under 5MB.");
      setResumeFile(null);
      e.target.value = "";
      return;
    }

    setResumeFile(file);
  };

  const handleResumeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverResume(true);
  };

  const handleResumeDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverResume(false);
  };

  const handleResumeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverResume(false);

    const file = e.dataTransfer.files?.[0] ?? null;
    if (!file) return;

    if (!isPdfFile(file)) {
      toast.error("Only PDF files are allowed.");
      return;
    }

    if (file.size > MAX_RESUME_BYTES) {
      toast.error("Resume file is too large. Please upload a PDF under 5MB.");
      return;
    }

    setResumeFile(file);

    if (resumeInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      resumeInputRef.current.files = dataTransfer.files;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const submittedFullName = form.fullName.trim();
    const submittedEmail = form.email.trim();
    const submittedPhone = form.phone.trim();
    const submittedRole = form.role.trim();
    const submittedMessage = form.coverLetter.trim();

    if (
      !submittedFullName ||
      !submittedEmail ||
      !submittedPhone ||
      !submittedRole ||
      !submittedMessage
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (!resumeFile) {
      toast.error("Please upload your resume PDF.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!CAREERS_MAIL_API) {
        throw new Error("Missing VITE_CAREERS_MAIL_API");
      }

      const payload = new FormData();
      payload.append("fullname", submittedFullName);
      payload.append("mail", submittedEmail);
      payload.append("phone_no", submittedPhone);
      payload.append("role", submittedRole);
      payload.append("resume_pdf", resumeFile);
      payload.append("message", submittedMessage);

      const response = await fetch(CAREERS_MAIL_API, {
        method: "POST",
        body: payload,
      });

      const responseBodyText = await response.text().catch(() => "");

      if (!response.ok) {
        throw new Error(
          `Career mail API failed (${response.status}): ${responseBodyText}`
        );
      }

      if (responseBodyText) {
        try {
          const apiResult = JSON.parse(responseBodyText) as {
            status?: string;
            message?: string;
          };

          if (apiResult.status === "error") {
            throw new Error(apiResult.message || "Career mail API returned an error.");
          }
        } catch (parseError) {
          if (parseError instanceof SyntaxError && /fail|error|invalid/i.test(responseBodyText)) {
            throw new Error(responseBodyText);
          }

          if (!(parseError instanceof SyntaxError)) {
            throw parseError;
          }
        }
      }

      toast.success("Your profile was submitted successfully.");

      setForm(initialForm);
      setResumeFile(null);
      setIsRoleLocked(false);

      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Career mail submission failed:", error);
      toast.error("Could not submit your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="scroll-pt-24">
        <section className="section-padding bg-white pt-28">
          <div className="container-main max-w-3xl">
            <div className="text-center">
              <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
                Career Application
              </p>

              <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                Send Your <span className="text-primary">Profile</span>
              </h1>

              <p className="mt-4 text-muted-foreground">
                Fill in your details and upload your resume. Our team will
                contact you for relevant opportunities.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-4 border border-border bg-card p-5 md:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role You Are Applying For *</Label>
                <Input
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleInputChange}
                  placeholder="Example: Project Engineer"
                  readOnly={isRoleLocked}
                  required
                />

                {isRoleLocked && (
                  <p className="text-xs text-muted-foreground">
                    This role was selected from the Careers page.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="resumeUpload">Upload Resume *</Label>

                <div
                  onDragOver={handleResumeDragOver}
                  onDragLeave={handleResumeDragLeave}
                  onDrop={handleResumeDrop}
                  className={`relative flex min-h-[120px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-3 text-center transition-colors ${
                    isDragOverResume
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/20 hover:border-primary/60"
                  }`}
                >
                  <input
                    id="resumeUpload"
                    type="file"
                    name="resume_pdf"
                    accept=".pdf,application/pdf"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    ref={resumeInputRef}
                    onChange={handleResumeUpload}
                    required
                  />

                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                    <Upload className="h-4 w-4" />
                    Drag & Drop Resume
                  </span>

                  <span className="mt-1.5 px-2 text-sm text-muted-foreground">
                    {resumeFile ? resumeFile.name : "or click to browse file"}
                  </span>

                  <span className="mt-1 text-sm text-muted-foreground/80">
                    PDF only, max 5MB
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">
                  Why are you a fit for this role? *
                </Label>

                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={form.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Share your relevant experience and motivation..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareersApply;
