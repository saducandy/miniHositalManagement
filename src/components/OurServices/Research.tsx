import React, { useMemo, useState, useEffect, useContext } from "react";
import { getApiUrl, getImageUrl } from "../../config/api";
import { I18nContext } from "../../context/I18nContext";

interface ApiResearch {
  id: number;
  documentId: string;
  mainTitle: string;
  mainTitle_AM: string;
  descreption: string;
  descreption_AM: string;
  button: string;
  button_AM: string;
  publications: number;
  onGoingStudies: number;
  colaborations: number;
  image: {
    url: string;
  } | null;
}

interface ApiResearchJourney {
  id: number;
  documentId: string;
  year: string;
  title: string;
  title_AM: string;
  descreption: string;
  descreption_AM: string;
  image: {
    url: string;
  } | null;
}

interface ApiFeaturedPublication {
  id: number;
  documentId: string;
  title: string;
  title_AM: string;
  descreption: string;
  descreption_AM: string;
  button: string;
  button_AM: string;
  image: {
    url: string;
  } | null;
  pdf_file: {
    url: string;
  } | null;
}

type ResearchItem = {
  id: number;
  year: string;
  title: string;
  desc: string;
  image?: string;
};

type Featured = {
  id: number;
  title: string;
  desc: string;
  image: string;
  button: string;
  pdfUrl?: string;
};

const Research: React.FC = () => {
  const { language } = useContext(I18nContext);
  const [current, setCurrent] = useState(0);
  const [heroData, setHeroData] = useState<{
    mainTitle: string;
    description: string;
    button: string;
    publications: number;
    onGoingStudies: number;
    colaborations: number;
    imageUrl?: string;
  } | null>(null);
  const [researchTimeline, setResearchTimeline] = useState<ResearchItem[]>([]);
  const [featuredPublications, setFeaturedPublications] = useState<Featured[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const total = featuredPublications.length;
  const active = useMemo(
    () => featuredPublications[current],
    [current, featuredPublications]
  );

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Reset current index when featured publications change
  useEffect(() => {
    if (
      featuredPublications.length > 0 &&
      current >= featuredPublications.length
    ) {
      setCurrent(0);
    }
  }, [featuredPublications.length, current]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch hero section data
        const heroRes = await fetch(
          getApiUrl("api/ec-our-service-resarches?populate=*"),
          {
            signal: controller.signal,
          }
        );
        if (!heroRes.ok)
          throw new Error(`Failed to load hero data: ${heroRes.status}`);
        const heroJson: { data: ApiResearch[] } = await heroRes.json();

        // Fetch research journey data
        const journeyRes = await fetch(
          getApiUrl("api/ec-our-service-resarch-journeys?populate=*"),
          { signal: controller.signal }
        );
        if (!journeyRes.ok)
          throw new Error(`Failed to load journey data: ${journeyRes.status}`);
        const journeyJson: { data: ApiResearchJourney[] } =
          await journeyRes.json();

        // Fetch featured publications data
        const featuredRes = await fetch(
          getApiUrl("api/ec-our-service-featured-publications?populate=*"),
          { signal: controller.signal }
        );
        if (!featuredRes.ok)
          throw new Error(
            `Failed to load featured data: ${featuredRes.status}`
          );
        const featuredJson: { data: ApiFeaturedPublication[] } =
          await featuredRes.json();

        // Map hero data
        if (heroJson.data && heroJson.data.length > 0) {
          const hero = heroJson.data[0];
          const imagePath = hero?.image?.url || "";
          const absoluteUrl = getImageUrl(imagePath);
          setHeroData({
            mainTitle: language === "am" ? hero.mainTitle_AM : hero.mainTitle,
            description:
              language === "am" ? hero.descreption_AM : hero.descreption,
            button: language === "am" ? hero.button_AM : hero.button,
            publications: hero.publications,
            onGoingStudies: hero.onGoingStudies,
            colaborations: hero.colaborations,
            imageUrl: absoluteUrl || undefined,
          });
        }

        // Map research journey data
        const mappedJourney: ResearchItem[] = (journeyJson.data || []).map(
          (item) => {
            const imagePath = item?.image?.url || "";
            const absoluteUrl = getImageUrl(imagePath);
            return {
              id: item.id,
              year: item.year,
              title: language === "am" ? item.title_AM : item.title,
              desc: language === "am" ? item.descreption_AM : item.descreption,
              image: absoluteUrl || undefined,
            };
          }
        );
        setResearchTimeline(mappedJourney);

        // Map featured publications data
        const mappedFeatured: Featured[] = (featuredJson.data || []).map(
          (item) => {
            const imagePath = item?.image?.url || "";
            const absoluteUrl = getImageUrl(imagePath);
            const pdfPath = item?.pdf_file?.url || "";
            const pdfUrl = pdfPath ? getImageUrl(pdfPath) : undefined;
            return {
              id: item.id,
              title: language === "am" ? item.title_AM : item.title,
              desc: language === "am" ? item.descreption_AM : item.descreption,
              image: absoluteUrl,
              button: language === "am" ? item.button_AM : item.button,
              pdfUrl: pdfUrl || undefined,
            };
          }
        );
        setFeaturedPublications(mappedFeatured);
      } catch (err: any) {
        if (err?.name !== "AbortError")
          setError(err?.message || "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [language]);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading research data...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return null;
  }

  return (
    <section className="min-h-screen">
      {/* Hero / Banner */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#77A867]/20 via-white to-[#FBCE6E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid md:grid-cols-2 gap-8 md:items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#32705A] tracking-tight">
                  {heroData.mainTitle}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-[#32705A]/90">
                  {heroData.description}
                </p>
                <div className="mt-6">
                  <a
                    href="#archive"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 hover:text-[#32705A] transition-colors"
                  >
                    {heroData.button}
                  </a>
                </div>
              </div>
              <div className="relative">
                {heroData.imageUrl && (
                  <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-[#FBCE6E]/40">
                    <img
                      src={heroData.imageUrl}
                      alt={heroData.mainTitle}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
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
              { n: `${heroData.publications}+`, t: "Publications" },
              { n: `${heroData.onGoingStudies}`, t: "Ongoing Studies" },
              { n: `${heroData.colaborations}`, t: "Collaborations" },
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
      {featuredPublications.length > 0 && (
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
                      href={active.pdfUrl || "#read"}
                      target={active.pdfUrl ? "_blank" : undefined}
                      rel={active.pdfUrl ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 hover:text-[#32705A] transition-colors"
                    >
                      {active.button}
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
      )}

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
