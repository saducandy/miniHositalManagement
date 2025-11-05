import React, { useState } from "react";
import {
  ClipboardList,
  Users,
  MapPin,
  Calendar,
  Megaphone,
  CheckCircle,
  Phone,
} from "lucide-react";

type OutreachForm = {
  fullName: string;
  email: string;
  phone: string;
  type: string;
  location: string;
  date: string;
  volunteers: string;
  notes?: string;
};

const OrganizeOutreach: React.FC = () => {
  const [form, setForm] = useState<OutreachForm>({
    fullName: "",
    email: "",
    phone: "",
    type: "screening",
    location: "",
    date: "",
    volunteers: "",
    notes: "",
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.location ||
      !form.date
    ) {
      setError(
        "Please complete the required fields: name, email, phone, location, date."
      );
      return;
    }
    setSubmitting(true);
    try {
      // Placeholder: Integrate with backend API
      await new Promise((r) => setTimeout(r, 600));
      setSuccess(
        "Thank you! Your outreach proposal has been received. Our team will contact you."
      );
      setForm({
        fullName: "",
        email: "",
        phone: "",
        type: "screening",
        location: "",
        date: "",
        volunteers: "",
        notes: "",
      });
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867]/20 via-white to-[#FBCE6E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
              Organize an Outreach Program
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#32705A]/90 max-w-3xl mx-auto">
              Get involved and help bring quality eye care to the community
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ClipboardList,
                title: "Submit Your Proposal",
                desc: "Fill out the outreach proposal form with details of your plan.",
              },
              {
                icon: Megaphone,
                title: "Coordinate with Our Team",
                desc: "Our staff will review and guide logistics and resources.",
              },
              {
                icon: MapPin,
                title: "Plan Your Event",
                desc: "Set location, date, equipment, and local partners.",
              },
              {
                icon: Users,
                title: "Engage Volunteers",
                desc: "Invite community members and organize roles and shifts.",
              },
              {
                icon: Calendar,
                title: "Conduct Outreach",
                desc: "Execute the event with on‑site guidance from our team.",
              },
              {
                icon: CheckCircle,
                title: "Report & Improve",
                desc: "Share outcomes to help us refine future programs.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className="w-12 h-12 bg-[#FBCE6E] rounded-full flex items-center justify-center mb-4">
                  {React.createElement(s.icon, {
                    className: "h-6 w-6 text-[#1f2937]",
                  })}
                </div>
                <h3 className="text-base font-semibold text-[#32705A]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proposal Form */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-extrabold text-[#32705A] mb-3">
                Outreach Proposal Form
              </h2>
              <p className="text-sm text-gray-700 mb-5">
                Provide as much detail as possible so our team can support you
                effectively.
              </p>
              <form
                onSubmit={onSubmit}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4"
              >
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
                      Proposed Outreach Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) =>
                        setForm({ ...form, type: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                    >
                      <option value="screening">Screening</option>
                      <option value="education">Education</option>
                      <option value="mobile_clinic">Mobile Clinic</option>
                      <option value="surgical_camp">Surgical Camp</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#32705A]">
                      Location
                    </label>
                    <input
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                      type="text"
                      className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                      placeholder="City / District"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#32705A]">
                      Expected Date
                    </label>
                    <input
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      type="date"
                      className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#32705A]">
                      Estimated Volunteers
                    </label>
                    <input
                      value={form.volunteers}
                      onChange={(e) =>
                        setForm({ ...form, volunteers: e.target.value })
                      }
                      type="number"
                      min={0}
                      className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                      placeholder="e.g. 10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#32705A]">
                      Additional Notes
                    </label>
                    <input
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      type="text"
                      className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                      placeholder="Special requests, partner orgs, languages, etc."
                    />
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> {success}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit Proposal"}
                </button>
              </form>
            </div>

            {/* CTA Box */}
            <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-extrabold text-[#32705A]">
                Need Guidance?
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Our outreach coordination team can help you design effective
                programs and connect you with partners.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" /> Contact Us
                </a>
                <a
                  href="/services/outreach"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold border border-[#32705A] text-[#32705A] hover:bg-[#32705A] hover:text-white transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizeOutreach;
