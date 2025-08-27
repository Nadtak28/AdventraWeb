import { useState, useRef, useEffect } from "react";

const TopEventCard = ({ event, index, onEventClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`
        min-w-[320px] max-w-[360px] flex-shrink-0
        transition-all duration-[1000ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
        ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-20 scale-80"
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => onEventClick?.(event)}
    >
      <div
        className="relative h-[500px] cursor-pointer group
        bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/20 dark:to-gray-900/10
        backdrop-blur-[20px] rounded-[24px] overflow-hidden
        transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]
        border border-white/20 dark:border-gray-700/30
        hover:translate-y-[-16px] hover:[transform-style:preserve-3d] hover:[transform:translateY(-16px)_rotateX(5deg)]
        hover:shadow-[0_40px_80px_rgba(0,0,0,0.15),0_20px_40px_rgba(81,148,137,0.2)]
        dark:hover:shadow-[0_40px_80px_rgba(0,0,0,0.3),0_20px_40px_rgba(81,148,137,0.3)]"
      >
        {/* Dynamic glow effect following cursor */}
        <div
          className="absolute w-[100px] h-[100px] rounded-full pointer-events-none z-[1]
            bg-gradient-radial from-emerald-600/40 to-transparent filter blur-[20px]
            transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{
            left: `${glowPosition.x}%`,
            top: `${glowPosition.y}%`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Holographic border effect */}
        <div className="absolute inset-0 rounded-[24px] pointer-events-none z-[2]">
          <div
            className="absolute top-0 left-0 w-10 h-10 opacity-0 group-hover:opacity-100
            border-t-2 border-l-2 border-cyan-400 rounded-tl-[24px] 
            transition-all duration-500 animate-[holoPulse_2s_infinite]"
          />
          <div
            className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100
            border-t-2 border-r-2 border-cyan-400 rounded-tr-[24px]
            transition-all duration-500 animate-[holoPulse_2s_infinite]"
          />
          <div
            className="absolute bottom-0 left-0 w-10 h-10 opacity-0 group-hover:opacity-100
            border-b-2 border-l-2 border-cyan-400 rounded-bl-[24px]
            transition-all duration-500 animate-[holoPulse_2s_infinite]"
          />
          <div
            className="absolute bottom-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100
            border-b-2 border-r-2 border-cyan-400 rounded-br-[24px]
            transition-all duration-500 animate-[holoPulse_2s_infinite]"
          />
        </div>

        {/* Crown badge for top events */}
        <div
          className="absolute top-4 right-4 z-[5]
          bg-gradient-to-br from-yellow-400 to-orange-400 text-amber-800
          px-3 py-2 rounded-[20px] flex items-center gap-1
          text-xs font-bold shadow-[0_4px_15px_rgba(255,215,0,0.4)]
          animate-[crownFloat_3s_ease-in-out_infinite]"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 12l5.5 1L12 8l3.5 5L21 12l-2 4H5zm2.7-2h8.6l.9-1.4-2.5-.5L12 14l-2.7-1.9-2.5.5L6.7 14z" />
          </svg>
          <span>TOP</span>
        </div>

        {/* 3D layered image container */}
        <div className="relative h-[200px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center z-[3] transition-all duration-[800ms] ease-out
              group-hover:scale-105"
            style={{
              backgroundImage: `url(${
                event.image ||
                event.images?.[0]?.url ||
                event.videos ||
                event.videos?.[0].url ||
                "https://via.placeholder.com/800x600?text=No+Image+Available"
              })`,
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center z-[2] filter blur-[2px] scale-105
              transition-all duration-[800ms] ease-out group-hover:scale-[1.08]"
            style={{
              backgroundImage: `url(${
                event.image ||
                event.images?.[0]?.url ||
                event.videos ||
                event.videos?.[0].url ||
                "https://via.placeholder.com/800x600?text=No+Image+Available"
              })`,
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center z-[1] filter blur-[4px] scale-110
              transition-all duration-[800ms] ease-out group-hover:scale-[1.12]"
            style={{
              backgroundImage: `url(${
                event.image ||
                event.images?.[0]?.url ||
                event.videos ||
                event.videos?.[0].url ||
                "https://via.placeholder.com/800x600?text=No+Image+Available"
              })`,
            }}
          />

          {/* Prismatic overlay */}
          <div className="absolute inset-0 z-[4] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent
              animate-[prismShift_3s_linear_infinite] skew-x-[-10deg]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent
              animate-[prismShift_3s_linear_infinite] delay-1000 skew-x-[-10deg] hue-rotate-[120deg]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent
              animate-[prismShift_3s_linear_infinite] delay-[2000ms] skew-x-[-10deg] hue-rotate-[240deg]"
            />
          </div>

          {/* Floating stats */}
          <div className="absolute inset-4 z-[5] pointer-events-none">
            <div
              className="absolute top-0 left-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
              rounded-[20px] px-3 py-2 flex items-center gap-1.5 text-xs font-semibold
              border border-white/30 dark:border-gray-700/50 text-amber-500
              scale-0 group-hover:scale-100 transition-all duration-500 delay-100 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>{event.rate || "no rate"}</span>
            </div>
          </div>
        </div>

        {/* Content with glassmorphism effect */}
        <div className="relative h-[calc(100%-200px)] z-[3]">
          <div
            className="absolute inset-0 bg-white/10 dark:bg-gray-800/20 backdrop-blur-[20px]
            p-6 flex flex-col border-t border-white/20 dark:border-gray-700/30"
          >
            <div className="mb-4">
              <h3
                className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-4
                group-hover:text-emerald-600 dark:group-hover:text-[#519489] transition-colors duration-300"
              >
                {event.title || event.name}
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5 
                    rounded-md flex items-center justify-center text-emerald-600 dark:text-[#519489]"
                  >
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Date
                    </div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                      {event.is_limited ? event.starting_date : "no start date"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5 
                    rounded-md flex items-center justify-center text-emerald-600 dark:text-[#519489]"
                  >
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Finish
                    </div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                      {event.is_limited ? event.ending_date : "no end date"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5 
                    rounded-md flex items-center justify-center text-emerald-600 dark:text-[#519489]"
                  >
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Attendees
                    </div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                      {event.is_limited ? event.remaining_tickets : "attend"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive price and booking section */}
            <div className="flex items-center justify-between gap-4 mt-5">
              <div>
                <div className="flex items-baseline gap-0.5 text-emerald-600 dark:text-[#519489] font-bold">
                  <span className="text-sm">$</span>
                  <span className="text-xl">{event.price || "85"}</span>
                </div>
              </div>

              <button
                className="relative bg-gradient-to-r from-emerald-600 to-emerald-500 
                dark:from-[#519589] dark:to-[#519489]
                text-white border-0 px-5 py-2.5 rounded-xl font-semibold text-xs cursor-pointer
                overflow-hidden transition-all duration-300 
                translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_8px_25px_rgba(81,148,137,0.4)]"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transform -translate-x-full group-hover:translate-x-full transition-transform duration-600"
                />

                <span className="relative z-10">Book Now</span>

                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-0
                        group-hover:opacity-100 animate-[particleFloat_2s_linear_infinite]"
                      style={{
                        left: `${20 + i * 10}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes holoPulse {
          0%,
          100% {
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(180deg) brightness(1.2);
          }
        }

        @keyframes crownFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(5deg);
          }
        }

        @keyframes prismShift {
          0% {
            transform: translateX(-100%) skewX(-10deg);
          }
          100% {
            transform: translateX(100%) skewX(-10deg);
          }
        }

        @keyframes dotPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.3);
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          10%,
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TopEventCard;
