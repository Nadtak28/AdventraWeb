import { useState, useRef, useEffect } from "react";

const TourCard = ({ tour, index, onTourClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`min-w-[320px] max-w-[380px] flex-shrink-0 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{
        transform: isVisible ? "rotateX(0deg)" : "rotateX(15deg)",
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onTourClick?.(tour)}
    >
      <div className="relative bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden transition-all duration-500 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.1),0_1px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3),0_1px_8px_rgba(0,0,0,0.2)] border border-white/80 dark:border-gray-700/50 backdrop-blur-sm cursor-pointer group hover:-translate-y-4 hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(81,148,137,0.25),0_10px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_25px_50px_rgba(81,148,137,0.15),0_10px_30px_rgba(0,0,0,0.4)]">
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r from-teal-600 to-teal-500 rounded-full transition-opacity duration-300 ${
                isHovered ? "opacity-60" : "opacity-0"
              }`}
              style={{
                left: `${20 + i * 15}%`,
                animation: `floatParticle ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Main card content */}
        <div className="relative z-20">
          {/* Image container with overlay effects */}
          <div className="relative h-56 overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
              style={{
                backgroundImage: `url(${
                  tour.image || tour.images?.[0]?.url || "/assets/hero-img.png"
                })`,
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Floating price tag */}
            <div
              className={`absolute top-4 left-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-3 py-2 rounded-2xl font-semibold text-sm shadow-[0_4px_15px_rgba(81,148,137,0.3)] transition-all duration-300 ${
                isHovered
                  ? "scale-105 -translate-y-0.5 shadow-[0_8px_25px_rgba(81,148,137,0.4)]"
                  : "scale-90"
              }`}
              style={{
                transitionTimingFunction:
                  "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              <span>From ${tour.price || "299"}</span>
            </div>

            {/* Rating badge */}
            <div
              className={`absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-2.5 py-1.5 rounded-2xl flex items-center gap-1 transition-all duration-500 ease-out ${
                isHovered
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-8 opacity-0"
              }`}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < (tour.rating || 4)
                        ? "text-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {tour.rating || "4.5"}
              </span>
            </div>
          </div>

          {/* Content section */}
          <div className="p-5">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5 leading-tight transition-colors duration-300 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                {tour.title || tour.name}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{tour.location || "Various Locations"}</span>
              </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {tour.description}
            </p>

            <div className="flex gap-4 mb-5">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{tour.duration || "3-5 days"}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span>{tour.groupSize || "8-12 people"}</span>
              </div>
            </div>

            {/* Action button */}
            <div
              className={`transition-all duration-300 ease-out ${
                isHovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2.5 opacity-0"
              }`}
            >
              <button className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white border-none py-3 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(81,148,137,0.3)] cursor-pointer">
                <span>Book Now</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0%,
          100% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) scale(1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default TourCard;
