import React, { useState } from "react";

type Program = {
  id: string;
  title: string;
  desc: string;
  duration: string;
  image?: string;
  details?: string;
};

const programs: Program[] = [
  {
    id: "et1",
    title: "Ophthalmology Residents Workshop",
    desc: "Hands‑on sessions in diagnostics (OCT, VF), cataract surgery principles, and peri‑op safety.",
    duration: "2 days • Quarterly",
    image:
      "https://cdn.pixabay.com/photo/2020/04/08/07/19/eye-care-5016057_640.jpg",
    details:
      "Interactive modules with case discussions, simulation practice, and outcome audits to build clinical judgment and efficiency.",
  },
  {
    id: "et2",
    title: "Nursing & Patient Experience Training",
    desc: "Communication, triage protocols, infection prevention, and compassionate bedside care standards.",
    duration: "1 day • Monthly",
    image:
      "https://cdn.pixabay.com/photo/2018/08/17/20/01/eyes-3613710_640.jpg",
    details:
      "Role‑specific drills and scenario walk‑throughs to strengthen teamwork, safety, and patient satisfaction across units.",
  },
  {
    id: "et3",
    title: "Community Educators Program",
    desc: "Train‑the‑trainer series for teachers and health workers on early signs and prevention.",
    duration: "4 weeks • Hybrid",
    image:
      "https://cdn.pixabay.com/photo/2020/04/10/23/10/visual-5028083_640.jpg",
    details:
      "Guides, checklists, and basic screening methods to promote early detection and eye health awareness.",
  },
];

const EducationAndTraining: React.FC = () => {
  const [selected, setSelected] = useState<Program | null>(null);
  const close = () => setSelected(null);

  return (
    <section className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867] to-[#FBCE6E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
              Education & Training Programs
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#32705A]/90">
              Empowering healthcare professionals and our community
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <p className="text-[15px] sm:text-base leading-relaxed text-[#444]">
            Bahir Dar Specialty Eye Care Center is committed to advancing
            knowledge in ophthalmology. We provide training for medical
            professionals, workshops for students, and community education
            programs to enhance eye health awareness.
          </p>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <article
              key={p.id}
              className="group rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FBCE6E]"
            >
              {p.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="text-xs font-medium text-[#77A867]">
                  {p.duration}
                </div>
                <h3 className="mt-1 text-lg font-bold text-[#32705A] leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {p.desc}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => setSelected(p)}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 hover:text-[#32705A] transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Highlights Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-extrabold text-[#32705A] text-center">
          How programs are structured
        </h2>
        <div className="mt-6 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { n: 1, t: "Registration" },
            { n: 2, t: "Workshop / Course participation" },
            { n: 3, t: "Certification / Assessment" },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-xl bg-white shadow-sm border border-gray-100 p-6"
            >
              <div className="h-8 w-8 rounded-full bg-[#FBCE6E] text-[#1f2937] font-bold flex items-center justify-center">
                {s.n}
              </div>
              <div className="mt-2 text-sm text-gray-800">{s.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <a
            href="#enroll"
            className="inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
          >
            Join our training programs
          </a>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
            {selected.image && (
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#32705A] leading-snug">
                    {selected.title}
                  </h3>
                  <div className="mt-1 text-xs font-medium text-[#77A867]">
                    {selected.duration}
                  </div>
                </div>
                <button
                  onClick={close}
                  className="shrink-0 h-9 w-9 rounded-full bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 flex items-center justify-center"
                  aria-label="Close"
                  title="Close"
                >
                  ✕
                </button>
              </div>
              <div className="mt-4 max-h-[50vh] overflow-y-auto text-sm leading-relaxed text-gray-700">
                <p>{selected.details || selected.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EducationAndTraining;
