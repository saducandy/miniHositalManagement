import React, { useContext, useEffect, useMemo, useState } from "react";
import { I18nContext } from "../../context/I18nContext";
import { getApiUrl, getImageUrl } from "../../config/api";

type ApiReport = {
  id: number;
  year: string;
  docName: string;
  docName_AM?: string | null;
  descreption: string;
  descreption_AM?: string | null;
  button?: string | null;
  button_AM?: string | null;
  anualReportPdf?: { url?: string | null } | null;
};

type Report = {
  id: number;
  year: string;
  title: string;
  summary: string;
  href: string;
  cta: string;
};

const AnualActivityReports: React.FC = () => {
  const { language } = useContext(I18nContext);
  const [reports, setReports] = useState<ApiReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          getApiUrl("api/ec-about-us-annual-activity-cards?populate=*"),
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error(`Failed to load reports: ${res.status || ""}`);

        const json: { data: ApiReport[] } = await res.json();
        setReports(json.data || []);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError(err?.message || "Failed to load reports");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
    return () => controller.abort();
  }, []);

  const localizedReports: Report[] = useMemo(() => {
    const pick = (en: string, am?: string | null) =>
      language === "am" && am ? am : en;

    return (reports || []).map((r) => ({
      id: r.id,
      year: r.year,
      title: pick(r.docName, r.docName_AM),
      summary: pick(r.descreption, r.descreption_AM),
      href: getImageUrl(r.anualReportPdf?.url || ""),
      cta: pick(r.button || "Download PDF", r.button_AM),
    }));
  }, [language, reports]);

  return (
    <section className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#32705A] to-[#77A867]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight transition-opacity duration-700 ease-out opacity-100">
              Annual Activity Reports
            </h1>
            <p className="mt-4 text-base sm:text-lg font-medium text-white/90">
              A transparent journey of our growth, service, and impact.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-white/10" />
          <div className="absolute bottom-6 right-10 h-24 w-24 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#32705A]">
            Committed to transparency
          </h2>
          <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#444]">
            At Bahir Dar Specialty Eye Care Center, we take pride in sharing our
            yearly progress with our community. Our annual activity reports
            highlight our achievements, innovations, and dedication to advancing
            eye health across Ethiopia.
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && (
            <div className="col-span-full text-center text-gray-600">
              Loading reports...
            </div>
          )}
          {error && (
            <div className="col-span-full text-center text-red-600">
              {error}
            </div>
          )}
          {!isLoading && !error && localizedReports.length === 0 && (
            <div className="col-span-full text-center text-gray-600">
              No reports found.
            </div>
          )}
          {!isLoading &&
            !error &&
            localizedReports.map((r) => (
              <div
                key={r.id || r.year}
                className="group rounded-xl bg-white shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FBCE6E]"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#FBCE6E]/20 flex items-center justify-center ring-2 ring-[#FBCE6E]">
                      <span className="text-sm" aria-hidden>
                        📄
                      </span>
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-[#32705A] leading-tight">
                        {r.year}
                      </div>
                      <div className="text-xs text-gray-500">{r.title}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                    {r.summary}
                  </p>
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <a
                      href={r.href}
                      download
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 transition-colors"
                    >
                      {r.cta}
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-white text-lg sm:text-xl font-semibold">
            Our commitment to transparency and excellence continues — year after
            year.
          </p>
          <div className="mt-5">
            <a
              href="/reports/BDSEC-Annual-Reports-Archive.zip"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 transition-colors"
            >
              Download Archive
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnualActivityReports;
