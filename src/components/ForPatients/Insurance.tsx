import React from "react";
import {
  ShieldCheck,
  CreditCard,
  FileCheck,
  Building2,
  CheckCircle,
  BadgeCheck,
  Phone,
} from "lucide-react";

type Provider = {
  id: string;
  name: string;
  logo: string;
};

const providers: Provider[] = [
  {
    id: "p1",
    name: "MedSure",
    logo: "https://dummyimage.com/120x60/32705a/ffffff&text=MedSure",
  },
  {
    id: "p2",
    name: "VisionCare",
    logo: "https://dummyimage.com/120x60/77a867/ffffff&text=VisionCare",
  },
  {
    id: "p3",
    name: "HealthPlus",
    logo: "https://dummyimage.com/120x60/fbce6e/1f2937&text=HealthPlus",
  },
  {
    id: "p4",
    name: "SecureLife",
    logo: "https://dummyimage.com/120x60/32705a/ffffff&text=SecureLife",
  },
  {
    id: "p5",
    name: "OptiShield",
    logo: "https://dummyimage.com/120x60/77a867/ffffff&text=OptiShield",
  },
];

const Insurance: React.FC = () => {
  return (
    <section className="min-h-screen">
      {/* Header / Hero */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867]/10 via-white to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
              Insurance & Coverage
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#32705A]/90">
              Making your eye care affordable and accessible
            </p>
          </div>
        </div>
      </div>

      {/* Providers */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-extrabold text-[#32705A] mb-6 text-center">
            Accepted Insurance Providers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
            {providers.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-center hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coverage Details */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#32705A]">
              Coverage Details
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Typical coverage varies by provider and plan. Check with your
              insurer for specifics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Covered Services",
                desc: "Consultations, diagnostics (OCT, VF), minor procedures, and many surgical services.",
              },
              {
                icon: CreditCard,
                title: "Co‑pays & Deductibles",
                desc: "Some plans require co‑pays or deductibles. Pay any out‑of‑pocket at the front desk.",
              },
              {
                icon: FileCheck,
                title: "Claims Processing",
                desc: "We assist with forms and electronic claims submission for faster turnaround.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm"
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

      {/* How to Use Insurance */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#32705A]">
              How to Use Your Insurance
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Bring your documents and we’ll guide you through each step.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-decimal list-inside">
            {[
              {
                icon: BadgeCheck,
                title: "Bring Insurance Card",
                desc: "Present a valid insurance card at registration.",
              },
              {
                icon: Building2,
                title: "Verify Coverage",
                desc: "Our front desk will confirm eligibility and benefits.",
              },
              {
                icon: CreditCard,
                title: "Co‑payment",
                desc: "Pay any required co‑pay or deductible per your plan.",
              },
              {
                icon: FileCheck,
                title: "Submit Documents",
                desc: "We help file claims electronically or provide necessary forms.",
              },
            ].map((s, i) => (
              <li
                key={i}
                className="rounded-2xl bg-[#F9FAFB] p-6 border border-gray-100 shadow-sm"
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
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need help with insurance eligibility? We’re here to assist
          </h3>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* <a
              href="/appointments"
              className="inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
            >
              Check Eligibility
            </a> */}
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-semibold border-2 border-white text-white hover:bg-white hover:text-[#32705A] transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" /> Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insurance;
