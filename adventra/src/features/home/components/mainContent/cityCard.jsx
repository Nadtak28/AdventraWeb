import { useState, useRef, useEffect } from "react";

const CityCard = ({ city, index, onCityClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  const tiltStyle = isHovered
    ? {
        transform: `perspective(1000px) rotateX(${
          mousePosition.y / 10
        }deg) rotateY(${-mousePosition.x / 10}deg) scale(1.05)`,
      }
    : {};

  return (
    <div
      ref={cardRef}
      className={`
        min-w-[300px] max-w-[340px] flex-shrink-0 perspective-[1000px]
        transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
      `}
      style={{
        transform: isVisible
          ? "translateY(0) rotateY(0deg)"
          : "translateY(80px) rotateY(-15deg)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => onCityClick?.(city)}
    >
      <div
        className={`
          relative bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900
          rounded-3xl overflow-hidden cursor-pointer group
          transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1)]
          shadow-[0_20px_40px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.04)]
          dark:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_8px_16px_rgba(0,0,0,0.2)]
          border border-white/20 dark:border-gray-700/30
          hover:shadow-[0_30px_60px_rgba(81,148,137,0.15),0_15px_30px_rgba(0,0,0,0.1)]
          dark:hover:shadow-[0_30px_60px_rgba(81,148,137,0.25),0_15px_30px_rgba(0,0,0,0.3)]
        `}
        style={tiltStyle}
      >
        {/* Animated background patterns */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute bg-gradient-to-br from-emerald-600/10 to-emerald-500/5
                dark:from-emerald-400/10 dark:to-emerald-300/5 rounded-full
                opacity-0 group-hover:opacity-100
                animate-[floatBg_4s_ease-in-out_infinite] group-hover:animate-[floatBgActive_3s_ease-in-out_infinite]
                transition-opacity duration-300
              `}
              style={{
                left: `${(i * 30) % 100}%`,
                top: `${Math.floor(i / 4) * 33}%`,
                animationDelay: `${i * 0.3}s`,
                width: `${15 + (i % 3) * 5}px`,
                height: `${15 + (i % 3) * 5}px`,
              }}
            />
          ))}
        </div>

        {/* Main image container */}
        <div className="relative h-[200px] overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-[800ms] ease-out
              group-hover:scale-[1.15] origin-center"
            style={{
              backgroundImage: `url(${
                city.image ||
                city.images?.[0]?.url ||
                city.videos ||
                city.videos?.[0].url ||
                "https://via.placeholder.com/800x600?text=No+Image+Available"
              })`,
            }}
          />

          {/* Gradient mesh overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600
              bg-gradient-to-br from-emerald-600/30 via-transparent to-emerald-500/20"
            />

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600
              bg-gradient-radial from-emerald-600/40 via-transparent to-transparent 
              animate-[meshPulse_4s_ease-in-out_infinite]"
              style={{
                background:
                  "radial-gradient(circle at 30% 70%, rgba(81, 148, 137, 0.4) 0%, transparent 50%)",
              }}
            />

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600
              bg-gradient-to-br from-transparent via-white/10 to-transparent"
            />
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 relative z-[3]">
          <div className="mb-3">
            <h3
              className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1 
              bg-gradient-to-br from-gray-900 to-emerald-600 dark:from-white dark:to-[#519489]
              bg-clip-text text-transparent transition-all duration-300"
            >
              {city.title || city.name}
            </h3>

            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm font-medium">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{city.country || "Explore"}</span>
            </div>
          </div>

          <p
            className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 
            line-clamp-2 overflow-hidden"
          >
            {city.description}
          </p>

          {/* Stats grid */}
          <div
            className="grid grid-cols-3 gap-3 mb-5 py-3 
            border-t border-b border-emerald-600/10 dark:border-emerald-400/20"
          >
            <div className="text-center">
              <div className="text-sm font-bold text-emerald-600 dark:text-[#519489] mb-0.5">
                {city.population || "large"}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Population
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-emerald-600 dark:text-[#519489] mb-0.5">
                {city.tours || "lots of"}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Tours
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-emerald-600 dark:text-[#519489] mb-0.5">
                {city.bestTime || "Year-round"}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Best Time
              </div>
            </div>
          </div>

          {/* Explore button */}
          <div
            className="translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-400 delay-200"
          >
            <button
              className="w-full relative bg-gradient-to-br from-emerald-600 to-emerald-500 dark:from-[#519489] 
              text-white border-0 py-3.5 px-5 rounded-2xl font-semibold text-sm
              flex items-center justify-center gap-2 cursor-pointer overflow-hidden
              transition-all duration-300 hover:translate-y-[-3px]
              hover:shadow-[0_12px_30px_rgba(81,148,137,0.4)]
              dark:hover:shadow-[0_12px_30px_rgba(81,148,137,0.5)]
              before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full
              before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
              before:transition-all before:duration-500 hover:before:left-full"
            >
              <span className="relative z-10">Explore City</span>
              <div
                className="w-4 h-4 relative z-10 transition-transform duration-300 
                group-hover:rotate-45 group-hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Glow effect */}
        <div
          className={`
          absolute inset-[-2px] rounded-[26px] opacity-0 -z-10 filter blur-[20px]
          bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 dark:from-[#519489] 
          transition-opacity duration-300
          ${isHovered ? "opacity-30 dark:opacity-40" : ""}
        `}
        />
      </div>

      <style jsx>{`
        @keyframes floatBg {
          0%,
          100% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translateY(-10px) scale(1);
            opacity: 0.4;
          }
        }

        @keyframes floatBgActive {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.2);
          }
        }

        @keyframes meshPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default CityCard;
