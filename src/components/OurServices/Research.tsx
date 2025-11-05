import React, { useMemo, useState } from "react";

type ResearchItem = {
  id: string;
  year: string;
  title: string;
  desc: string;
  image?: string;
  link?: string;
};

type Featured = {
  id: string;
  title: string;
  desc: string;
  image: string;
  link?: string;
};

const researchTimeline: ResearchItem[] = [
  {
    id: "r1",
    year: "2025",
    title: "AI‑Assisted Diabetic Retinopathy Screening",
    desc: "Prospective evaluation of an edge‑deployed CNN model for opportunistic DR screening in primary care settings.",
    image:
      "https://cdn.pixabay.com/photo/2020/12/18/00/43/doctor-5840874_640.png",
  },
  {
    id: "r2",
    year: "2024",
    title: "Cataract Surgical Outcomes Audit",
    desc: "One‑year outcomes analysis of MSICS vs. phacoemulsification across mixed‑resource settings in Amhara region.",
    image:
      "https://cdn.pixabay.com/photo/2018/11/18/10/19/doctor-3822863_640.jpg",
  },
  {
    id: "r3",
    year: "2023",
    title: "Glaucoma Awareness & Adherence Study",
    desc: "Mixed‑methods study evaluating community awareness, time‑to‑diagnosis, and adherence to therapy protocols.",
    image:
      "https://cdn.pixabay.com/photo/2020/09/06/09/59/nurse-5548561_640.png",
  },
  {
    id: "r4",
    year: "2022",
    title: "Tele‑Ophthalmology Pilot",
    desc: "Feasibility and diagnostic concordance of remote anterior and posterior segment triage using smartphone adapters.",
    image: "https://cdn.pixabay.com/photo/2017/09/20/20/59/eye-2769921_640.jpg",
  },
];

const featuredPublications: Featured[] = [
  {
    id: "f1",
    title: "Outcomes of Community‑Based Cataract Camps",
    desc: "Vision restoration metrics, complication rates, and QoL improvements at 6 months post‑op.",
    image:
      "https://cdn.pixabay.com/photo/2014/12/10/20/48/medic-563425_640.jpg",
  },
  {
    id: "f2",
    title: "Machine Vision for Fundus Analysis",
    desc: "Benchmarking segmentation pipelines for optic disc and cup delineation.",
    image:
      "https://cdn.pixabay.com/photo/2018/11/18/10/19/doctor-3822863_640.jpg",
  },
  {
    id: "f3",
    title: "Pediatric Refractive Error Patterns",
    desc: "School‑based screening data set and spectacle uptake analysis.",
    image: "https://cdn.pixabay.com/photo/2017/09/20/20/59/eye-2769921_640.jpg",
  },
];

const Research: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const total = featuredPublications.length;
  const active = useMemo(() => featuredPublications[current], [current]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="min-h-screen">
      {/* Hero / Banner */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867]/20 via-white to-[#FBCE6E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid md:grid-cols-2 gap-8 md:items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
                  Research & Innovation
                </h1>
                <p className="mt-4 text-base sm:text-lg text-[#32705A]/90">
                  Advancing ophthalmology through science and innovation
                </p>
                <div className="mt-6">
                  <a
                    href="#archive"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 hover:text-[#32705A] transition-colors"
                  >
                    View Publications
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-[#FBCE6E]/40">
                  <img
                    src="https://cdn.pixabay.com/photo/2024/12/13/21/21/eye-9266169_640.jpg"
                    alt="Research illustration"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="pointer-events-none absolute -top-4 -right-4 h-20 w-20 rounded-full bg-[#FBCE6E]/30" />
                <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#77A867]/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics / Highlights */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: "20+", t: "Publications" },
              { n: "10", t: "Ongoing Studies" },
              { n: "5", t: "Collaborations" },
            ].map((m) => (
              <div
                key={m.t}
                className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 text-center"
              >
                <div className="text-4xl font-extrabold text-[#FBCE6E]">
                  {m.n}
                </div>
                <div className="mt-1 text-sm font-semibold text-[#32705A]">
                  {m.t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline - non grid */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#32705A] text-center">
            Our Research Journey
          </h2>
          <div className="mt-10 relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FBCE6E] to-transparent" />
            <ol className="space-y-10">
              {researchTimeline.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <li key={item.id} className="relative">
                    <div
                      className={`md:w-1/2 ${
                        isLeft
                          ? "md:pr-10 md:ml-0 md:mr-auto"
                          : "md:pl-10 md:mr-0 md:ml-auto"
                      }`}
                    >
                      <div className="relative">
                        <div
                          className={`hidden md:block absolute top-3 ${
                            isLeft ? "-right-5" : "-left-5"
                          } h-10 w-10 rounded-full bg-[#FBCE6E] ring-4 ring-white`}
                        />
                        <article className="group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                          {item.image && (
                            <div className="aspect-[16/9] w-full overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="inline-flex items-center gap-2">
                              <span className="inline-flex h-7 px-3 items-center justify-center rounded-full text-xs font-semibold bg-[#FBCE6E] text-[#1f2937]">
                                {item.year}
                              </span>
                            </div>
                            <h3 className="mt-2 text-lg font-bold text-[#32705A] leading-snug">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </article>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* Featured Carousel (optional) */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-extrabold text-[#32705A]">
              Featured Publications
            </h3>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={prev}
                className="h-9 w-9 rounded-full bg-[#32705A] text-white hover:opacity-90 flex items-center justify-center"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="h-9 w-9 rounded-full bg-[#32705A] text-white hover:opacity-90 flex items-center justify-center"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <h4 className="text-lg font-bold text-[#32705A]">
                  {active.title}
                </h4>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {active.desc}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {featuredPublications.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 w-2 rounded-full ${
                        i === current ? "bg-[#FBCE6E]" : "bg-gray-300"
                      }`}
                      aria-hidden
                    />
                  ))}
                </div>
                <div className="mt-6">
                  <a
                    href="#read"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 hover:text-[#32705A] transition-colors"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile carousel controls */}
          <div className="sm:hidden mt-6 flex items-center justify-center gap-2">
            <button
              onClick={prev}
              className="h-9 w-9 rounded-full bg-[#32705A] text-white hover:opacity-90 flex items-center justify-center"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="h-9 w-9 rounded-full bg-[#32705A] text-white hover:opacity-90 flex items-center justify-center"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Collaboration CTA */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Partner with us to advance eye care research and innovation
          </h3>
          <div className="mt-6">
            <a
              href="#collaborate"
              className="inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
            >
              Explore Collaborations
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
