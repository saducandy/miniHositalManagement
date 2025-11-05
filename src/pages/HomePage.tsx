import React from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../components/Home/HeroSection";
import { ServicesPreview } from "../components/Home/ServicesPreview";
import { testimonials, faqs } from "../data/mockData";
import { Star, Quote, Plus, Minus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { I18nContext } from "../context/I18nContext";

export const HomePage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div>
      <HeroSection />
      <ServicesPreview />

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeTestimonialsHeader />
          <TestimonialsCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeFaqHeader />

          <div className="space-y-4">
            {faqs.map((faq: any) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                  aria-expanded={expandedFaq === faq.id}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {typeof faq.question === "string"
                        ? faq.question
                        : faq.question?.[
                            React.useContext(I18nContext).language
                          ] || faq.question?.en}
                    </h3>
                    {expandedFaq === faq.id ? (
                      <Minus className="h-5 w-5 text-gray-600" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      {typeof faq.answer === "string"
                        ? faq.answer
                        : faq.answer?.[
                            React.useContext(I18nContext).language
                          ] || faq.answer?.en}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brandGreen to-brandDeep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {React.useContext(I18nContext).t("home.cta.heading")}
          </h2>
          <p className="text-xl text-[#FBCE6E] mb-8">
            {React.useContext(I18nContext).t("home.cta.subtitle")}
          </p>
          <Link
            to="/appointments"
            className="inline-block bg-brandYellow text-brandDeep px-8 py-4 rounded-full text-lg font-semibold hover:bg-brandDeep hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brandDeep transform hover:scale-105"
          >
            {React.useContext(I18nContext).t("home.cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
};

const HomeTestimonialsHeader: React.FC = () => {
  const { t } = React.useContext(I18nContext);
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        {t("home.testimonials.heading")}
      </h2>
      <p className="text-xl text-gray-600">{t("home.testimonials.subtitle")}</p>
    </div>
  );
};

const HomeFaqHeader: React.FC = () => {
  const { t } = React.useContext(I18nContext);
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        {t("home.faq.heading")}
      </h2>
      <p className="text-xl text-gray-600">{t("home.faq.subtitle")}</p>
    </div>
  );
};

const TestimonialsCarousel: React.FC = () => {
  const [visible, setVisible] = useState(3);
  const { language } = React.useContext(I18nContext);
  const total = testimonials.length;
  const localized = useMemo(
    () =>
      testimonials.map((t: any) => ({
        ...t,
        patientName:
          typeof t.patientName === "string"
            ? t.patientName
            : t.patientName?.[language] || t.patientName?.en || "",
        review:
          typeof t.review === "string"
            ? t.review
            : t.review?.[language] || t.review?.en || "",
        treatment:
          typeof t.treatment === "string"
            ? t.treatment
            : t.treatment?.[language] || t.treatment?.en || "",
      })),
    [language]
  );
  const quadrupled = useMemo(
    () => localized.concat(localized, localized, localized),
    [localized]
  );
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [offsetPx, setOffsetPx] = useState(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive visible count: 1 (sm), 2 (md), 3 (lg+)
  useEffect(() => {
    const computeVisible = () => {
      const w = window.innerWidth;
      if (w < 768) return 1; // < md
      if (w < 1024) return 2; // md
      return 3; // lg+
    };
    const onResize = () => setVisible(computeVisible());
    setVisible(computeVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Measure widths after mount and on resize
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const full = trackRef.current.scrollWidth; // width for quadrupled content
        setSingleSetWidth(full / 4);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // Continuous animation
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const speedPxPerSec = 80; // tune speed
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setOffsetPx((prev) => {
        const delta = isPaused ? 0 : speedPxPerSec * dt;
        const next = prev + delta;
        if (singleSetWidth > 0 && next >= singleSetWidth * 2) {
          // wrap inside the middle band to avoid ever reaching edges
          return next - singleSetWidth;
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [singleSetWidth, isPaused]);

  // Card width is container width / visible
  const slidePercent = 100 / Math.max(visible, 1);

  // Manual controls move by one card width
  const jumpPx = singleSetWidth / total;
  const prev = () =>
    setOffsetPx((v) => (v - jumpPx + singleSetWidth) % singleSetWidth);
  const next = () => setOffsetPx((v) => (v + jumpPx) % singleSetWidth);

  // Indicator index
  const indicatorActive =
    Math.floor(
      (offsetPx % (singleSetWidth || 1)) / (singleSetWidth / total || 1)
    ) % total;

  return (
    <div className="relative">
      <div className="overflow-hidden -mx-4" ref={containerRef}>
        <div
          ref={trackRef}
          className="flex"
          style={{ transform: `translateX(-${offsetPx}px)` }}
        >
          {quadrupled.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="flex-none px-4"
              style={{ width: `${slidePercent}%` }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col">
                <div className="flex items-center mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <div className="mb-6 flex-1">
                  <Quote className="h-8 w-8 text-[#FBCE6E] mb-4" />
                  <p className="text-gray-600 leading-relaxed">{t.review}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{t.patientName}</p>
                  <p className="text-sm text-gray-600">{t.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
        <button
          onClick={prev}
          className="px-4 py-2 rounded-full border border-[rgba(119,168,103,0.4)] text-[#32705A] hover:bg-[rgba(119,168,103,0.08)] w-full sm:w-auto text-center"
          aria-label="Previous testimonials"
        >
          Previous
        </button>
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-center order-last sm:order-none">
          <button
            onClick={() => setIsPaused((p) => !p)}
            className={`px-4 py-2 rounded-full ${
              isPaused
                ? "bg-[rgba(119,168,103,0.12)] text-[#32705A] border border-[rgba(119,168,103,0.4)]"
                : "bg-brandDeep text-white hover:brightness-110"
            } w-full sm:w-auto`}
            aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          <div className="flex items-center space-x-2">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === indicatorActive ? "bg-brandDeep" : "bg-gray-300"
                }`}
                aria-hidden
              />
            ))}
          </div>
        </div>
        <button
          onClick={next}
          className="px-4 py-2 rounded-full bg-brandDeep text-white hover:brightness-110 w-full sm:w-auto"
          aria-label="Next testimonials"
        >
          Next
        </button>
      </div>
    </div>
  );
};
