import React, { useState } from "react";
import {
  Activity,
  Pill,
  Scissors,
  Info,
  Sun,
  Apple,
  Glasses,
  Calendar,
} from "lucide-react";

type Disease = {
  id: string;
  name: string;
  summary: string;
  symptoms: string[];
  treatments: string[];
  image?: string;
  details?: string;
};

const diseases: Disease[] = [
  {
    id: "d1",
    name: "Cataract",
    summary: "Clouding of the eye's lens causing blurry vision and glare.",
    symptoms: ["Blurry vision", "Glare/halos", "Faded colors"],
    treatments: [
      "Updated glasses initially",
      "Cataract surgery (lens replacement)",
      "UV protection",
    ],
    image:
      "https://cdn.pixabay.com/photo/2014/12/10/20/48/medic-563425_640.jpg",
    details:
      "Cataracts typically develop with age or after trauma. Surgery is safe and effective, replacing the cloudy lens with a clear intraocular lens.",
  },
  {
    id: "d2",
    name: "Glaucoma",
    summary: "Damage to the optic nerve often related to high eye pressure.",
    symptoms: [
      "Often asymptomatic early",
      "Peripheral vision loss",
      "Eye pressure may be high",
    ],
    treatments: [
      "Prescription eye drops",
      "Laser procedures",
      "Surgery for advanced cases",
    ],
    image: "https://cdn.pixabay.com/photo/2017/09/20/20/59/eye-2769921_640.jpg",
    details:
      "Glaucoma is a leading cause of irreversible blindness. Early detection through routine exams is critical for preserving vision.",
  },
  {
    id: "d3",
    name: "Myopia (Nearsighted)",
    summary:
      "Distant objects appear blurry; light focuses in front of the retina.",
    symptoms: [
      "Difficulty seeing far",
      "Eyestrain",
      "Headaches after distance work",
    ],
    treatments: [
      "Glasses or contact lenses",
      "Refractive surgery (eligibility dependent)",
      "Myopia control strategies",
    ],
    image:
      "https://cdn.pixabay.com/photo/2018/11/18/10/19/doctor-3822863_640.jpg",
    details:
      "Lifestyle adjustments (more outdoor time, reduced screen distance) and specialty lenses may help slow progression in children.",
  },
  {
    id: "d4",
    name: "Hyperopia (Farsighted)",
    summary: "Near tasks are difficult; light focuses behind the retina.",
    symptoms: ["Eye fatigue on reading", "Headaches", "Blurry near vision"],
    treatments: [
      "Glasses or contact lenses",
      "Refractive surgery (eligibility dependent)",
      "Proper lighting and breaks",
    ],
    image:
      "https://cdn.pixabay.com/photo/2020/12/18/00/43/doctor-5840874_640.png",
    details:
      "Moderate to high hyperopia may cause constant strain. Corrective lenses restore comfortable near work and clarity.",
  },
];

const EyeDiseaseTreatment: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867]/20 via-white to-[#FBCE6E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
              Eye Diseases & Treatments
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#32705A]/90">
              Learn about common eye conditions and their management
            </p>
          </div>
        </div>
      </div>

      {/* Disease Cards */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diseases.map((d) => {
              const isOpen = openId === d.id;
              return (
                <article
                  key={d.id}
                  className={`group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
                    isOpen ? "ring-2 ring-[#FBCE6E]" : ""
                  }`}
                >
                  {d.image && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={d.image}
                        alt={d.name}
                        className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#32705A] leading-snug">
                          {d.name}
                        </h3>
                        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                          {d.summary}
                        </p>
                      </div>
                      <div className="shrink-0 w-10 h-10 rounded-full bg-[#FBCE6E] flex items-center justify-center text-[#1f2937]">
                        <Activity className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-[#32705A]">
                        Common symptoms
                      </h4>
                      <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                        {d.symptoms.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#FBCE6E]" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Treatments */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-[#32705A]">
                        Treatment options
                      </h4>
                      <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                        {d.treatments.map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            {i === 0 ? (
                              <Pill className="h-4 w-4 text-[#FBCE6E] mt-0.5" />
                            ) : i === 1 ? (
                              <Scissors className="h-4 w-4 text-[#FBCE6E] mt-0.5" />
                            ) : (
                              <Info className="h-4 w-4 text-[#FBCE6E] mt-0.5" />
                            )}
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expand / Collapse */}
                    <div className="mt-5 flex items-center justify-between">
                      <button
                        onClick={() => setOpenId(isOpen ? null : d.id)}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                      >
                        {isOpen ? "Hide details" : "View details"}
                      </button>
                      <a
                        href="/contact"
                        className="text-sm font-semibold text-[#32705A] hover:underline"
                      >
                        Contact Us
                      </a>
                    </div>

                    {isOpen && (
                      <div className="mt-4 bg-[#F9FAFB] border border-gray-100 rounded-xl p-4 text-sm text-gray-700">
                        <p>
                          {d.details || "Detailed information coming soon."}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tips / Preventive Care */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#32705A]">
              Prevention & Eye Care Tips
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Adopt healthy habits to protect your vision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: "Routine Exams",
                desc: "Regular eye exams help detect diseases early.",
              },
              {
                icon: Sun,
                title: "UV Protection",
                desc: "Wear UV‑blocking sunglasses and hats in bright sun.",
              },
              {
                icon: Apple,
                title: "Nutrition",
                desc: "Eat leafy greens, fish, nuts, and colorful fruits.",
              },
              {
                icon: Glasses,
                title: "Screen Hygiene",
                desc: "Use the 20‑20‑20 rule, blink often, and keep distance.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="w-14 h-14 bg-[#FBCE6E] rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(t.icon, {
                    className: "h-7 w-7 text-[#1f2937]",
                  })}
                </div>
                <h3 className="text-base font-semibold text-[#32705A]">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {t.desc}
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
            Get expert care — schedule your eye consultation
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

export default EyeDiseaseTreatment;
