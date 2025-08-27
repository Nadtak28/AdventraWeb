import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "../../../tour/mainContent/animatedSection";

function TourHero({
  tourImages,
  tourVideos,
  tourStats,
  price,
  reviewCounts,
  rate,
  name,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // merge both into one media array with type
  const media = [
    ...(tourImages?.map((url) => ({ type: "image", url })) || []),
    ...(tourVideos?.map((url) => ({ type: "video", url })) || []),
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % media.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);

  // autoplay logic: images advance after delay, videos advance after ending
  useEffect(() => {
    // clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    const current = media[currentIndex];
    if (!current) return;

    if (current.type === "image") {
      // auto-advance after 3 seconds for images
      timerRef.current = setTimeout(() => {
        next();
      }, 3000);
    } else if (current.type === "video") {
      // autoplay video
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex]);

  return (
    <AnimatedSection>
      <section className="relative">
        {/* Media Carousel */}
        <div className="relative aspect-video rounded-2xl overflow-hidden group shadow-2xl">
          <div
            className="flex transition-transform duration-500 ease-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {media.map((item, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 bg-black flex items-center justify-center"
              >
                {item.type === "image" ? (
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url('${item.url}')` }}
                  />
                ) : (
                  <video
                    ref={index === currentIndex ? videoRef : null}
                    src={item.url}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    onEnded={next}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {media.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Status Badge */}
          <div className="absolute top-6 left-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold text-white backdrop-blur-sm ${
                tourStats === "active" ? "bg-[#519489]/80" : "bg-yellow-500/80"
              }`}
            >
              {tourStats === "active" ? "Available" : "Pending"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-[#519489]">
            <a href="#" className="hover:underline transition-colors">
              Tours
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold dark:text-white text-gray-900 leading-tight">
            {name || "Amazing Tour Experience"}
          </h1>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(parseFloat(rate || 0))
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold dark:text-white text-gray-900">
                {rate || "0.0"}
              </span>
            </div>
            <span className="text-gray-600 dark:text-white">
              ({reviewCounts || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#519489]">
              ${parseFloat(price || 0).toLocaleString()}
            </span>
            <span className="text-gray-600 dark:text-white">per person</span>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

export default TourHero;
