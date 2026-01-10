import React, { useMemo, useState, useEffect, useContext } from "react";
import { getApiUrl, getImageUrl } from "../../config/api";
import { I18nContext } from "../../context/I18nContext";

type ApiPublication = {
  id: number;
  title: string;
  title_AM: string;
  writer: string;
  writer_AM: string;
  date: string;
  miniDescription: string;
  miniDescription_AM: string;
  abstract: string;
  abstract_AM: string;
  button: string;
  button_AM: string;
  linkName: string;
  linkName_AM: string;
  pdf_file?: {
    url?: string;
  } | null;
};

type Publication = {
  id: string;
  title: string;
  authors: string;
  date: string; // ISO date
  miniDescription?: string;
  abstract?: string;
  link: string;
  buttonText: string;
  linkName: string;
  hasPdf: boolean;
};

const PAGE_SIZE = 6;

const Publications: React.FC = () => {
  const { language } = useContext(I18nContext);
  const [queryYear, setQueryYear] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selected, setSelected] = useState<Publication | null>(null);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPublications = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(getApiUrl("api/ec-resources-publications?populate=*"), {
          signal: controller.signal,
        });
        if (!res.ok)
          throw new Error(`Failed to load publications: ${res.status}`);
        const json: { data: ApiPublication[] } = await res.json();

        const mapped: Publication[] = (json.data || []).map((item) => {
          const pdfUrl = item?.pdf_file?.url || "";
          const hasPdf = !!pdfUrl;
          const absoluteUrl = pdfUrl ? getImageUrl(pdfUrl) : "";
          return {
            id: item.id.toString(),
            title: language === "am" ? item.title_AM : item.title,
            authors: language === "am" ? item.writer_AM : item.writer,
            date: item.date,
            miniDescription:
              language === "am"
                ? item.miniDescription_AM
                : item.miniDescription,
            abstract: language === "am" ? item.abstract_AM : item.abstract,
            link: absoluteUrl,
            buttonText: language === "am" ? item.button_AM : item.button,
            linkName: language === "am" ? item.linkName_AM : item.linkName,
            hasPdf: hasPdf,
          };
        });

        setPublications(mapped);
      } catch (err: any) {
        if (err?.name !== "AbortError")
          setError(err?.message || "Failed to load publications");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublications();
    return () => controller.abort();
  }, [language]);

  const years = useMemo(() => {
    const set = new Set<string>();
    publications.forEach((p) =>
      set.add(new Date(p.date).getFullYear().toString())
    );
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [publications]);

  const filtered = useMemo(() => {
    const list =
      queryYear === "all"
        ? publications
        : publications.filter(
            (p) => new Date(p.date).getFullYear().toString() === queryYear
          );
    return list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [queryYear, publications]);

  const totalPages = filtered.length > 0 ? Math.ceil(filtered.length / PAGE_SIZE) : 0;
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Reset to page 1 when filtered list changes (e.g., after filtering or language change)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filtered.length, totalPages, currentPage]);

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
        {isLoading && (
          <div className="text-center text-gray-600 py-12">
            Loading publications...
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 py-12">
            Error: {error}
          </div>
        )}
        {!isLoading && !error && publications.length === 0 && (
          <div className="text-center text-gray-600 py-12">
            No publications available.
          </div>
        )}
        {!isLoading && !error && publications.length > 0 && (
          <>
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
                      {pub.miniDescription && (
                        <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                          {pub.miniDescription}
                        </p>
                      )}
                      <div className="mt-5 flex items-center gap-3">
                        {pub.hasPdf && pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                          >
                            {pub.buttonText}
                          </a>
                        )}
                        {pub.abstract && (
                          <button
                            onClick={() => setSelected(pub)}
                            className="text-sm font-semibold text-[#32705A] hover:underline"
                          >
                            {pub.linkName}
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && filtered.length > 0 && (
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
          </>
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
              {selected.hasPdf && selected.link && (
                <div className="mt-6">
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#32705A] hover:text-white transition-colors"
                  >
                    {selected.buttonText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Publications;
