import React, { useState, useEffect, useContext } from "react";
import { getApiUrl, getImageUrl } from "../../config/api";
import { I18nContext } from "../../context/I18nContext";

type ApiNewsItem = {
  id: number;
  date: string;
  title: string;
  title_AM: string;
  descreption: string;
  descreption_AM: string;
  button: string;
  button_AM: string;
  fullDescription: string;
  fullDescription_AM: string;
  image?: {
    url?: string;
  } | null;
};

type NewsItem = {
  id: string;
  date: string;
  formattedDate: string;
  title: string;
  description: string;
  image: string;
  content: string;
  buttonText: string;
};

const News: React.FC = () => {
  const { language } = useContext(I18nContext);
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const close = () => setSelected(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          getApiUrl("api/ec-about-us-news-cards?populate=*"),
          {
            signal: controller.signal,
          }
        );
        if (!res.ok)
          throw new Error(`Failed to load news: ${res.status}`);
        const json: { data: ApiNewsItem[] } = await res.json();

        const mapped: NewsItem[] = (json.data || []).map((item) => {
          const imageUrl = item?.image?.url || "";
          const absoluteImageUrl = imageUrl ? getImageUrl(imageUrl) : "";
          const dateObj = new Date(item.date);
          const formattedDate = dateObj.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return {
            id: item.id.toString(),
            date: item.date,
            formattedDate: formattedDate,
            title: language === "am" ? item.title_AM : item.title,
            description:
              language === "am" ? item.descreption_AM : item.descreption,
            image: absoluteImageUrl,
            content:
              language === "am"
                ? item.fullDescription_AM
                : item.fullDescription,
            buttonText: language === "am" ? item.button_AM : item.button,
          };
        });

        // Sort by date (newest first)
        mapped.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setNewsItems(mapped);
      } catch (err: any) {
        if (err?.name !== "AbortError")
          setError(err?.message || "Failed to load news");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
    return () => controller.abort();
  }, [language]);
  return (
    <section className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#32705A] to-[#77A867]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight transition-opacity duration-700 ease-out opacity-100">
              News & Updates
            </h1>
            <p className="mt-4 text-base sm:text-lg font-medium text-white/90">
              Stay informed with the latest from Bahir Dar Specialty Eye Care
              Center.
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
            Latest at a glance
          </h2>
          <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#444]">
            From medical breakthroughs to community outreach, Bahir Dar
            Specialty Eye Care Center remains at the forefront of innovation and
            service. Explore our latest updates and see how we’re making a
            difference.
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading && (
          <div className="text-center text-gray-600 py-12">
            Loading news...
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 py-12">Error: {error}</div>
        )}
        {!isLoading && !error && newsItems.length === 0 && (
          <div className="text-center text-gray-600 py-12">
            No news available.
          </div>
        )}
        {!isLoading && !error && newsItems.length > 0 && (
          <>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {newsItems.map((item) => (
                <article
                  key={item.id}
                  className="group rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FBCE6E]"
                >
                  {item.image && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-xs font-medium text-[#77A867]">
                      {item.formattedDate}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-[#32705A] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={() => setSelected(item)}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-[#FBCE6E] text-[#1f2937] hover:bg-[#fbce6e]/90 hover:text-[#32705A] transition-colors"
                      >
                        {item.buttonText}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Closing Banner */}
      <div className="bg-gradient-to-r from-[#77A867] to-[#32705A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-white text-lg sm:text-xl font-semibold">
            “Sharing our milestones. Inspiring better vision for tomorrow.”
          </p>
        </div>
      </div>

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
                    {selected.formattedDate}
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
                <p>{selected.content || selected.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
