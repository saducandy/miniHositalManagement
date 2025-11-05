import React, { useState } from "react";
import {
  HeartHandshake,
  HandCoins,
  Building2,
  GraduationCap,
  ShieldCheck,
  CreditCard,
  Smartphone,
  CheckCircle,
} from "lucide-react";

type DonationForm = {
  fullName: string;
  email: string;
  amount: string;
  method: "card" | "mobile" | "bank" | "other";
  recurring: "one_time" | "monthly";
};

const Donate: React.FC = () => {
  const [form, setForm] = useState<DonationForm>({
    fullName: "",
    email: "",
    amount: "",
    method: "card",
    recurring: "one_time",
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const setAmount = (amt: number) =>
    setForm((f) => ({ ...f, amount: String(amt) }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!form.fullName || !form.email || !form.amount) {
      setError("Please complete name, email and amount.");
      return;
    }
    setSubmitting(true);
    try {
      // Placeholder submit. Integrate with payment gateway or backend later.
      await new Promise((r) => setTimeout(r, 600));
      setSuccess(
        "Thank you for your generous support! Your pledge was received."
      );
      setForm({
        fullName: "",
        email: "",
        amount: "",
        method: "card",
        recurring: "one_time",
      });
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen">
      {/* Header / Hero */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867]/20 via-white to-[#FBCE6E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
              Support Our Mission
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#32705A]/90 max-w-3xl mx-auto">
              Your donation helps us provide quality eye care and advance
              ophthalmology in Ethiopia
            </p>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: HandCoins,
                title: "Eye Surgeries",
                desc: "Sponsor life‑changing cataract surgeries for underserved communities.",
              },
              {
                icon: GraduationCap,
                title: "Training & Capacity",
                desc: "Develop skills of clinicians and nurses through workshops and mentorship.",
              },
              {
                icon: Building2,
                title: "Research & Innovation",
                desc: "Advance diagnostics and care models through responsible research.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className="w-12 h-12 bg-[#FBCE6E] rounded-full flex items-center justify-center mb-4">
                  {React.createElement(c.icon, {
                    className: "h-6 w-6 text-[#1f2937]",
                  })}
                </div>
                <h3 className="text-base font-semibold text-[#32705A]">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donation Options */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Options + Suggested amounts */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#32705A] mb-3">
                Donation Options
              </h2>
              <p className="text-sm text-gray-700 mb-5">
                Choose a one‑time or monthly donation. You can also donate via
                bank transfer or mobile money.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[10, 25, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                  >
                    {amt} ETB
                  </button>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: CreditCard, label: "Card Payment" },
                  { icon: Smartphone, label: "Mobile Money" },
                  { icon: Building2, label: "Bank Transfer" },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white p-4 border border-gray-100 shadow-sm flex items-center gap-3"
                  >
                    {React.createElement(m.icon, {
                      className: "h-5 w-5 text-[#FBCE6E]",
                    })}
                    <span className="text-sm text-[#32705A] font-medium">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#32705A] mb-3">
                Make a Donation
              </h2>
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="text-sm font-medium text-[#32705A]">
                      Amount (ETB)
                    </label>
                    <input
                      value={form.amount}
                      onChange={(e) =>
                        setForm({ ...form, amount: e.target.value })
                      }
                      type="number"
                      min={1}
                      className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                      placeholder="50"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="text-sm font-medium text-[#32705A]">
                      Frequency
                    </label>
                    <select
                      value={form.recurring}
                      onChange={(e) =>
                        setForm({ ...form, recurring: e.target.value as any })
                      }
                      className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                    >
                      <option value="one_time">One‑time</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="sm:col-span-1">
                    <label className="text-sm font-medium text-[#32705A]">
                      Payment Method
                    </label>
                    <select
                      value={form.method}
                      onChange={(e) =>
                        setForm({ ...form, method: e.target.value as any })
                      }
                      className="mt-1 w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
                    >
                      <option value="card">Credit / Debit Card</option>
                      <option value="mobile">Mobile Money</option>
                      <option value="bank">Bank Transfer</option>
                      <option value="other">Other</option>
                    </select>
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
                  {submitting ? "Processing..." : "Donate Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Assurance */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-3 bg-[#F9FAFB] border border-gray-100 rounded-2xl px-5 py-4">
            <ShieldCheck className="h-5 w-5 text-[#FBCE6E]" />
            <p className="text-sm text-gray-700">
              Donations are handled securely and used responsibly to support
              patient care, training, and research.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
