import React, { useState } from "react";

type Program = {
  id: string;
  title: string;
  period: string;
  description: string;
  image?: string;
  details?: string;
};

const programs: Program[] = [
  {
    id: "p1",
    title: "Rural Vision Screening Week",
    period: "Oct 2025",
    description:
      "Mobile teams visited rural kebeles for free eye screening, referrals, and on‑site refraction.",
    image:
      "https://cdn.pixabay.com/photo/2020/04/08/07/19/eye-care-5016057_640.jpg",
    details:
      "Our clinicians screened adults and children, dispensed reading glasses, and scheduled surgical evaluations. Follow‑up clinics were arranged with local health posts to ensure continuity of care.",
  },
  {
    id: "p2",
    title: "School Children Eye Health Campaign",
    period: "Sep–Nov 2025",
    description:
      "Age‑appropriate vision tests, amblyopia and strabismus checks, and parent counseling across city schools.",
    image:
      "https://cdn.pixabay.com/photo/2018/08/17/20/01/eyes-3613710_640.jpg",
    details:
      "Teachers received training to recognize early warning signs. Children requiring further care received vouchers and appointments at the main center.",
  },
  {
    id: "p3",
    title: "Glaucoma Awareness Month",
    period: "May 2025",
    description:
      "Talks, radio spots, and risk screening for early detection of the ‘silent thief of sight’.",
    image:
      "https://cdn.pixabay.com/photo/2020/04/10/23/10/visual-5028083_640.jpg",
    details:
      "Participants at elevated risk received comprehensive testing and were enrolled for regular follow‑ups to protect long‑term vision.",
  },
];

const Outreach: React.FC = () => {
  const [selected, setSelected] = useState<Program | null>(null);
  const close = () => setSelected(null);

  return (
    <section className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867] to-[#FBCE6E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
              Community Outreach Programs
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#32705A]/90">
              Bringing eye care closer to our community
            </p>
          </div>
        </div>
      </div>

      {/* Intro Paragraph */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <p className="text-[15px] sm:text-base leading-relaxed text-[#444]">
            Bahir Dar Specialty Eye Care Center is committed to improving eye
            health in our community. Our outreach programs provide free
            screenings, mobile eye clinics, and awareness campaigns to
            underserved areas.
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
                <div className="text-xs font-medium text-[#77A867] italic">
                  {p.period}
                </div>
                <h3 className="mt-1 text-lg font-bold text-[#32705A] leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => setSelected(p)}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 hover:text-[#32705A] transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-white text-lg sm:text-xl font-semibold">
            Join us in spreading the gift of clear vision.
          </p>
          <div className="mt-4">
            <a
              href="#get-involved"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 hover:text-[#32705A] transition-colors"
            >
              Get Involved
            </a>
          </div>
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
                  <div className="mt-1 text-xs font-medium text-[#77A867] italic">
                    {selected.period}
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
                <p>{selected.details || selected.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Outreach;
