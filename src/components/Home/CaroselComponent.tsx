import { useEffect, useRef, useState } from "react";

type HeroCarouselProps = {
  displayImages?: string[];
};

export default function HeroCarousel({
  displayImages = [],
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1,
    );
  };

  // ✅ Autoplay
  useEffect(() => {
    if (isPaused || displayImages.length <= 1) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, displayImages.length]);

  // ✅ Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) nextSlide(); // swipe left
    if (distance < -50) prevSlide(); // swipe right
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
        {/* Slides */}
        <div className="relative w-full h-full">
          {displayImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Hero carousel ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh] rounded-2xl transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        {/* Left Arrow */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur"
            >
              ‹
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur"
            >
              ›
            </button>
          </>
        )}

        {/* Dots */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {displayImages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
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
      <div className="pointer-events-none absolute -top-4 -right-4 w-72 h-72 bg-brandYellow/30 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-8 -left-8 w-64 h-64 bg-brandGreen/20 rounded-full blur-3xl"></div>
    </div>
  );
}
