import React, { useContext, useEffect, useMemo, useState } from "react";
import { I18nContext } from "../../context/I18nContext";
import { getApiUrl, getImageUrl } from "../../config/api";

type ApiAward = {
  id: number;
  title: string;
  title_AM?: string | null;
  yearAndName: string;
  yearAndName_AM?: string | null;
  descreption: string;
  descreption_AM?: string | null;
  image?: {
    url?: string | null;
    formats?: { small?: { url?: string | null } | null } | null;
  } | null;
};

type Award = {
  id: number;
  title: string;
  meta: string; // year or issuer
  description: string;
  image?: string;
};

const AwardsAndRecognitions: React.FC = () => {
  const { language } = useContext(I18nContext);
  const [awards, setAwards] = useState<ApiAward[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchAwards = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          getApiUrl("api/ec-about-us-award-cards?populate=*"),
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error(`Failed to load awards: ${res.status || ""}`);

        const json: { data: ApiAward[] } = await res.json();
        setAwards(json.data || []);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError(err?.message || "Failed to load awards");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAwards();
    return () => controller.abort();
  }, []);

  const localizedAwards: Award[] = useMemo(() => {
    const pick = (en: string, am?: string | null) =>
      language === "am" && am ? am : en;

    return (awards || []).map((award) => {
      const preferredImage =
        award.image?.formats?.small?.url || award.image?.url || "";
      return {
        id: award.id,
        title: pick(award.title, award.title_AM),
        meta: pick(award.yearAndName, award.yearAndName_AM),
        description: pick(award.descreption, award.descreption_AM),
        image: getImageUrl(preferredImage) || undefined,
      };
    });
  }, [awards, language]);

  return (
    <section className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#32705A] to-[#77A867]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight transition-opacity duration-700 ease-out opacity-100">
              Awards & Recognitions
            </h1>
            <p className="mt-4 text-base sm:text-lg font-medium text-white/90">
              Honoring our journey of excellence in eye care.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-white/10" />
          <div className="absolute bottom-6 right-10 h-24 w-24 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Intro Paragraph */}
      <div className="bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#32705A]">
            A tradition of trusted care
          </h2>
          <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#444]">
            At Bahir Dar Specialty Eye Care Center, our commitment to quality,
            innovation, and patient satisfaction has earned us recognition from
            both local and international organizations. Every award reflects our
            ongoing mission to bring exceptional eye care to our community.
          </p>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && (
            <div className="col-span-full text-center text-gray-600">
              Loading awards...
            </div>
          )}
          {error && (
            <div className="col-span-full text-center text-red-600">
              {error}
            </div>
          )}
          {!isLoading && !error && localizedAwards.length === 0 && (
            <div className="col-span-full text-center text-gray-600">
              No awards found.
            </div>
          )}
          {!isLoading &&
            !error &&
            localizedAwards.map((award) => (
              <div
                key={award.id || award.title}
                className="group rounded-xl bg-white shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FBCE6E]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center mb-4 bg-[#FBCE6E]/20 ring-2 ring-[#FBCE6E] overflow-hidden">
                    {award.image ? (
                      <img
                        src={award.image}
                        alt={award.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#FBCE6E"
                        className="h-7 w-7"
                        aria-hidden
                      >
                        <path d="M17 3h-2V2a1 1 0 10-2 0v1H7a1 1 0 00-1 1v2a4 4 0 004 4h.06A5.01 5.01 0 0011 14.9V17H9a1 1 0 000 2h6a1 1 0 100-2h-2v-2.1A5.01 5.01 0 0013.94 10H14a4 4 0 004-4V4a1 1 0 00-1-1zm-8 5a2 2 0 01-2-2V5h4v1a2 2 0 01-2 2zm8 0a2 2 0 01-2-2V5h4v1a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#32705A]">
                    {award.title}
                  </h3>
                  <p className="text-sm italic text-[#77A867] mt-0.5">
                    {award.meta}
                  </p>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Highlight Banner */}
      <div className="bg-gradient-to-r from-[#32705A] to-[#77A867]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-white text-lg sm:text-xl font-semibold">
            Excellence recognized. Vision inspired.
          </p>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-[#FBCE6E]" />
        </div>
      </div>
    </section>
  );
};

export default AwardsAndRecognitions;
