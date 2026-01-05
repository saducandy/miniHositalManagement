import React from "react";
import {
  ShieldCheck,
  Microscope,
  Building2,
  Layers,
  GraduationCap,
  Phone,
  ClipboardList,
  Stethoscope,
  CheckCircle,
} from "lucide-react";

const WhatToExpect: React.FC = () => {
  return (
    <section className="min-h-screen">
      {/* Header / Hero */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867]/20 via-white to-[#FBCE6E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
              What to Expect
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#32705A]/90">
              Your journey to better eye health with Bahir Dar Specialty Eye
              Care Center
            </p>
          </div>
        </div>
      </div>

      {/* Expectation Cards */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Professional Care",
                desc: "Receive attentive care from experienced ophthalmologists and nurses dedicated to your well‑being.",
              },
              {
                icon: Microscope,
                title: "State‑of‑the‑Art Equipment",
                desc: "Benefit from modern diagnostic and treatment technologies for accurate, timely care.",
              },
              {
                icon: Building2,
                title: "Comfortable Environment",
                desc: "Clean, safe, and welcoming spaces designed to put you at ease throughout your visit.",
              },
              {
                icon: Layers,
                title: "Comprehensive Services",
                desc: "From routine eye exams to advanced surgeries, receive complete care in one center.",
              },
              {
                icon: GraduationCap,
                title: "Patient Education",
                desc: "Clear guidance on eye health, prevention tips, and treatment plans tailored to you.",
              },
              {
                icon: ShieldCheck,
                title: "Compassion & Respect",
                desc: "Culturally sensitive, patient‑first care at every step of your eye‑care journey.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className="w-14 h-14 bg-[#FBCE6E] rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(c.icon, {
                    className: "h-7 w-7 text-[#1f2937]",
                  })}
                </div>
                <h3 className="text-lg font-bold text-[#32705A]">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#32705A]">
              Your Visit, Step by Step
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Know what happens from booking to follow‑up.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                title: "Book Appointment",
                desc: "Reserve online or call our reception team for assistance.",
              },
              {
                icon: ClipboardList,
                title: "Arrival & Registration",
                desc: "Check in at reception, complete forms, and prepare for triage.",
              },
              {
                icon: Stethoscope,
                title: "Consultation & Tests",
                desc: "Undergo examination and diagnostic tests as needed.",
              },
              {
                icon: CheckCircle,
                title: "Treatment & Follow‑up",
                desc: "Receive care plan, medications, or surgery scheduling as advised.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm"
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

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready for clearer vision? Book your appointment today
          </h3>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;
