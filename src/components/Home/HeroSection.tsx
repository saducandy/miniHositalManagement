import React, { useState, useEffect } from "react";
import { I18nContext } from "../../context/I18nContext";
import { Link } from "react-router-dom";
import { getApiUrl, getImageUrl } from "../../config/api";

type CarouselImage = {
  id: number;
  name: string;
  alternativeText: string | null;
  formats?: {
    medium?: { url: string };
    large?: { url: string };
    thumbnail?: { url: string };
  };
  url: string;
};

type CarouselApiItem = {
  id: number;
  caroselImages?: CarouselImage[];
};

type CarouselApiResponse = {
  data: CarouselApiItem[];
};

const CAROUSEL_INTERVAL_MS = 4000;

export const HeroSection: React.FC = () => {
  const { t } = React.useContext(I18nContext);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(getApiUrl("api/ec-hero-carosels?populate=*"));
        if (!res.ok) return;
        const json: CarouselApiResponse = await res.json();
        const first = json?.data?.[0];
        const images = first?.caroselImages ?? [];
        const urls = images
          .map((img) => {
            const path =
              img.formats?.medium?.url ?? img.formats?.large?.url ?? img.url;
            return path ? getImageUrl(path) : "";
          })
          .filter(Boolean);
        if (!cancelled && urls.length) setCarouselImages(urls);
      } catch {
        // ignore
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (carouselImages.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % carouselImages.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [carouselImages.length]);

  const displayImages =
    carouselImages.length > 0
      ? carouselImages
      : [
          "https://images.pexels.com/photos/5752242/pexels-photo-5752242.jpeg?auto=compress&cs=tinysrgb&w=800",
        ];
  const currentIndex = carouselImages.length > 0 ? activeIndex : 0;

  return (
    <section className="relative min-h-[75vh] bg-gradient-to-br from-brandGreen/10 to-brandYellow/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start h-full pt-12 sm:pt-16 lg:pt-20">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t("hero.title1")}
                <span className="text-brandDeep block">{t("hero.title2")}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* <Link
                to="/appointments"
                className="inline-flex items-center justify-center px-8 py-4 bg-brandYellow text-brandDeep font-semibold rounded-full text-lg hover:bg-brandDeep hover:text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brandDeep focus:ring-offset-2"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t("header.bookAppointment")}
              </Link> */}
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-brandDeep text-brandDeep font-semibold rounded-full text-lg hover:bg-brandDeep hover:text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brandDeep focus:ring-offset-2"
              >
                {t("hero.learnMore")}
              </Link>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {[
                {
                  icon: Users,
                  value: "15K+",
                  label: t("hero.stats.patientsServed"),
                },
                {
                  icon: Award,
                  value: "25+",
                  label: t("hero.stats.yearsExperience"),
                },
                {
                  icon: Clock,
                  value: "98%",
                  label: t("hero.stats.successRate"),
                },
                {
                  icon: Calendar,
                  value: "5000+",
                  label: t("hero.stats.surgeriesPerformed"),
                },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-brandDeep mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Image carousel */}
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
              {displayImages.map((src, index) => (
                <div
                  key={index}
                  className="transition-opacity duration-700 ease-in-out"
                  style={{
                    display: index === currentIndex ? "block" : "none",
                  }}
                >
                  <img
                    src={src}
                    alt={`Hero carousel ${index + 1}`}
                    className="rounded-2xl shadow-2xl w-full h-auto object-cover max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh]"
                  />
                </div>
              ))}
              {displayImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => setActiveIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-6 bg-white/90"
                          : "w-2 bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-brandYellow/30 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brandGreen/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
