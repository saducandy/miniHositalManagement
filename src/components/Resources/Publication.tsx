import React, { useMemo, useState } from "react";

type Publication = {
  id: string;
  title: string;
  authors: string;
  date: string; // ISO date
  abstract?: string;
  link: string;
  type?: string;
};

const samplePublications: Publication[] = [
  {
    id: "p1",
    title: "AI‑Assisted Screening for Diabetic Retinopathy in Primary Care",
    authors: "A. Kebede, S. Mitchell, T. Lemma",
    date: "2025-03-11",
    abstract:
      "Prospective evaluation of a lightweight CNN deployed at point‑of‑care to support rapid triage in low‑resource settings.",
    link: "#",
    type: "Screening",
  },
  {
    id: "p2",
    title: "Outcomes of Community‑Based Cataract Surgery Camps",
    authors: "S. Bekele, G. Abebe",
    date: "2024-09-02",
    abstract:
      "Comparative outcomes and quality‑of‑life improvements following high‑volume outreach MSICS with standardized protocols.",
    link: "#",
    type: "Surgery",
  },
  {
    id: "p3",
    title: "Adherence in Chronic Glaucoma Therapy: A Mixed‑Methods Study",
    authors: "Y. Solomon, M. Getachew",
    date: "2023-06-18",
    abstract:
      "Barriers and facilitators to treatment adherence with implications for community education and follow‑up design.",
    link: "#",
    type: "Glaucoma",
  },
  {
    id: "p4",
    title: "Tele‑Ophthalmology Triage Using Smartphone Adapters",
    authors: "S. Mitchell, T. Lemma",
    date: "2022-11-05",
    abstract:
      "Diagnostic concordance and feasibility for remote anterior/posterior segment triage leveraging low‑cost adapters.",
    link: "#",
    type: "Telemedicine",
  },
];

const PAGE_SIZE = 6;

const Publications: React.FC = () => {
  const [queryYear, setQueryYear] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selected, setSelected] = useState<Publication | null>(null);

  const years = useMemo(() => {
    const set = new Set<string>();
    samplePublications.forEach((p) =>
      set.add(new Date(p.date).getFullYear().toString())
    );
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, []);

  const filtered = useMemo(() => {
    const list =
      queryYear === "all"
        ? samplePublications
        : samplePublications.filter(
            (p) => new Date(p.date).getFullYear().toString() === queryYear
          );
    return list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [queryYear]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goto = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#77A867]/10 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#32705A] tracking-tight">
            Our Publications
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#32705A]/90">
            Explore our research contributions in ophthalmology
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <label
              htmlFor="year"
              className="text-sm font-semibold text-[#32705A]"
            >
              Filter by year
            </label>
            <select
              id="year"
              value={queryYear}
              onChange={(e) => {
                setQueryYear(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
            >
              <option value="all">All</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {pageItems.length} of {filtered.length}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pageItems.map((pub) => {
            const date = new Date(pub.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            });
            return (
              <article
                key={pub.id}
                className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#32705A] leading-snug">
                    {pub.title}
                  </h3>
                  <p className="mt-1 italic text-[#77A867] text-sm">
                    {pub.authors}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{date}</p>
                  {pub.abstract && (
                    <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                      {pub.abstract}
                    </p>
                  )}
                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={pub.link}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                    >
                      View / Download
                    </a>
                    {pub.abstract && (
                      <button
                        onClick={() => setSelected(pub)}
                        className="text-sm font-semibold text-[#32705A] hover:underline"
                      >
                        Read abstract
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => goto(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-[#32705A] disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const active = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => goto(page)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                    active
                      ? "bg-[#FBCE6E] text-[#1f2937]"
                      : "border border-gray-200 text-[#32705A] hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => goto(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-[#32705A] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#32705A] leading-snug">
                    {selected.title}
                  </h3>
                  <p className="mt-1 italic text-[#77A867] text-sm">
                    {selected.authors}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(selected.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="shrink-0 h-9 w-9 rounded-full bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 flex items-center justify-center"
                  aria-label="Close"
                  title="Close"
                >
                  ✕
                </button>
              </div>
              <div className="mt-4 text-sm leading-relaxed text-gray-700">
                <p>{selected.abstract}</p>
              </div>
              <div className="mt-6">
                <a
                  href={selected.link}
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                >
                  View / Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Publications;
