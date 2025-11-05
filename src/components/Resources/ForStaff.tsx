import React, { useMemo, useState } from "react";

type SopItem = {
  id: string;
  title: string;
  department: string;
  category: string;
  date: string; // ISO string
  version?: string;
  description?: string;
  link: string; // file or viewer link
};

const sampleSOPs: SopItem[] = [
  {
    id: "s1",
    title: "Patient Triage & Intake Workflow",
    department: "OPD",
    category: "Clinical",
    date: "2025-01-10",
    version: "v3.2",
    description:
      "Standardized triage, visual acuity checks, and infection prevention at point of entry.",
    link: "#",
  },
  {
    id: "s2",
    title: "Pre‑Op Cataract Preparation Checklist",
    department: "Surgery",
    category: "Peri‑operative",
    date: "2024-10-02",
    version: "v1.8",
    description:
      "Checklist for consent, lens calculation, antisepsis, and anesthetic safety.",
    link: "#",
  },
  {
    id: "s3",
    title: "Instrument Sterilization & CSSD Protocols",
    department: "CSSD",
    category: "Quality & Safety",
    date: "2024-06-21",
    version: "v2.0",
    description:
      "Validated sterilization cycles, tracking logs, and biological indicators handling.",
    link: "#",
  },
  {
    id: "s4",
    title: "Glaucoma Follow‑up & Medication Counseling",
    department: "OPD",
    category: "Clinical",
    date: "2023-12-05",
    version: "v1.3",
    description:
      "Follow‑up cadence, adherence checks, and drop‑instillation education.",
    link: "#",
  },
];

const departments = ["All", "OPD", "Surgery", "CSSD"] as const;
const categories = [
  "All",
  "Clinical",
  "Peri‑operative",
  "Quality & Safety",
] as const;

const StaffSOPs: React.FC = () => {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState<(typeof departments)[number]>("All");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<SopItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleSOPs
      .filter((s) => (dept === "All" ? true : s.department === dept))
      .filter((s) => (cat === "All" ? true : s.category === cat))
      .filter((s) =>
        q
          ? [s.title, s.department, s.category, s.description || ""]
              .join(" ")
              .toLowerCase()
              .includes(q)
          : true
      )
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [query, dept, cat]);

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#77A867]/10 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#32705A] tracking-tight">
            Staff SOPs & Guidelines
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#32705A]/90">
            Access hospital standard operating procedures and guidelines
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search SOPs..."
                className="w-full rounded-lg border border-gray-200 pl-10 pr-3 py-2 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                🔎
              </span>
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="sr-only" htmlFor="dept">
              Department
            </label>
            <select
              id="dept"
              value={dept}
              onChange={(e) => setDept(e.target.value as any)}
              className="w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="sr-only" htmlFor="cat">
              Category
            </label>
            <select
              id="cat"
              value={cat}
              onChange={(e) => setCat(e.target.value as any)}
              className="w-full rounded-lg border-gray-200 text-sm focus:ring-[#77A867] focus:border-[#77A867]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SOP Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((s) => {
            const date = new Date(s.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            });
            return (
              <article
                key={s.id}
                className="group rounded-xl bg-white border border-gray-100 shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#32705A] leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-1 italic text-[#77A867] text-sm">
                    {s.department} • {s.category}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {date}
                    {s.version ? ` • ${s.version}` : ""}
                  </p>
                  {s.description && (
                    <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                      {s.description}
                    </p>
                  )}
                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={s.link}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                    >
                      View / Download
                    </a>
                    <button
                      onClick={() => setSelected(s)}
                      className="text-sm font-semibold text-[#32705A] hover:underline"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-gray-600 py-12">
            No SOPs match your filters.
          </div>
        )}
      </div>

      {/* Modal Preview */}
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
                    {selected.department} • {selected.category}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(selected.date).toLocaleDateString()}{" "}
                    {selected.version ? `• ${selected.version}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="shrink-0 h-9 w-9 rounded-full bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                  aria-label="Close"
                  title="Close"
                >
                  ✕
                </button>
              </div>
              {selected.description && (
                <div className="mt-4 text-sm leading-relaxed text-gray-700">
                  <p>{selected.description}</p>
                </div>
              )}
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

export default StaffSOPs;
