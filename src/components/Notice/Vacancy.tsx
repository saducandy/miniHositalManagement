import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  FileText,
  CheckCircle,
} from "lucide-react";

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  summary: string;
};

const jobs: Job[] = [
  {
    id: "j1",
    title: "Ophthalmologist (Cataract Surgeon)",
    department: "Surgery",
    location: "Bahir Dar",
    type: "Full-time",
    summary:
      "Lead cataract services, participate in surgical camps, and mentor residents in MSICS/phaco techniques.",
  },
  {
    id: "j2",
    title: "Optometrist",
    department: "OPD",
    location: "Bahir Dar",
    type: "Full-time",
    summary:
      "Provide comprehensive refraction, low vision assessment, and pre/post‑operative care.",
  },
  {
    id: "j3",
    title: "Nurse (Theatre)",
    department: "Operating Theatre",
    location: "Bahir Dar",
    type: "Contract",
    summary:
      "Support peri‑operative workflows, infection prevention, and patient experience in theatre.",
  },
];

type ApplicationForm = {
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resumeFile?: File | null;
};

const Vacancy: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState<ApplicationForm>({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resumeFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const openApply = (job: Job) => {
    setSelectedJob(job);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resumeFile: null,
    });
    setSuccessMsg(null);
    setErrorMsg(null);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, resumeFile: f }));
  };

  const submitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);
    if (!form.fullName || !form.email || !form.phone || !form.resumeFile) {
      setErrorMsg(
        "Please complete name, email, phone, and attach your resume."
      );
      return;
    }
    setIsSubmitting(true);
    try {
      // Placeholder: integrate upload/API
      await new Promise((r) => setTimeout(r, 700));
      setSuccessMsg(
        "Application submitted successfully. Thank you for applying!"
      );
    } catch (e: any) {
      setErrorMsg(e?.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867]/20 via-white to-[#FBCE6E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
              Careers at BDSEC
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#32705A]/90">
              Join our team and help us provide world‑class eye care
            </p>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {jobs.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-700 mb-6">
                There are currently no open positions.
              </p>
              <a
                href="/resources/publications"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
              >
                Subscribe for Updates
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-[#32705A] leading-snug">
                      {job.title}
                    </h3>
                    <Briefcase className="h-5 w-5 text-[#FBCE6E]" />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#FBCE6E]" />{" "}
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#FBCE6E]" />{" "}
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#FBCE6E]" />{" "}
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {job.summary}
                  </p>
                  <div className="mt-5">
                    <button
                      onClick={() => openApply(job)}
                      className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedJob(null);
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#32705A] leading-snug">
                    Apply for {selectedJob.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedJob.department} • {selectedJob.location} •{" "}
                    {selectedJob.type}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="shrink-0 h-9 w-9 rounded-full bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white"
                >
                  ✕
                </button>
              </div>

              {successMsg ? (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> {successMsg}
                </div>
              ) : (
                <form onSubmit={submitApplication} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#32705A]">
                        Full Name
                      </label>
                      <input
                        value={form.fullName}
                        onChange={(e) =>
                          setForm({ ...form, fullName: e.target.value })
                        }
                        type="text"
                        className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#32705A]">
                        Email
                      </label>
                      <input
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        type="email"
                        className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#32705A]">
                        Phone
                      </label>
                      <input
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        type="tel"
                        className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                        placeholder="+251 9XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#32705A]">
                        Resume / CV
                      </label>
                      <div className="mt-1 flex items-center gap-3">
                        <label className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors cursor-pointer">
                          <FileText className="h-4 w-4 mr-2" /> Choose File
                          <input
                            onChange={handleFile}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                        </label>
                        <span className="text-xs text-gray-600 truncate max-w-[50%]">
                          {form.resumeFile
                            ? form.resumeFile.name
                            : "PDF/DOC up to 5MB"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#32705A]">
                      Cover Letter (optional)
                    </label>
                    <textarea
                      value={form.coverLetter}
                      onChange={(e) =>
                        setForm({ ...form, coverLetter: e.target.value })
                      }
                      rows={4}
                      className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                      placeholder="Briefly describe your experience and motivation"
                    />
                  </div>
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                      {errorMsg}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Vacancy;
