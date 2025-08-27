import { useState, useRef, useEffect } from "react";

const LatestEventCard = ({ event, index, onEventClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState([]);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 1000);

    onEventClick?.(event);
  };

  return (
    <div
      ref={cardRef}
      className={`
        min-w-[350px] max-w-[400px] flex-shrink-0 
        transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]
        ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-[60px]"
        }
      `}
      style={{
        transform: isVisible
          ? "translateX(0) rotateY(0)"
          : "translateX(-60px) rotateY(20deg)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className={`
        relative bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900
        rounded-[20px] overflow-hidden cursor-pointer group
        transition-all duration-[600ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
        shadow-[0_15px_35px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.07)]
        dark:shadow-[0_15px_35px_rgba(0,0,0,0.3),0_5px_15px_rgba(0,0,0,0.2)]
        border border-white/80 dark:border-gray-700/50
        hover:translate-y-[-12px] hover:scale-[1.02]
        hover:shadow-[0_30px_60px_rgba(81,148,137,0.2),0_15px_30px_rgba(0,0,0,0.15)]
dark:hover:shadow-[0_30px_60px_rgba(81,148,137,1),0_15px_30px_rgba(0,0,0,0.25)]
      `}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute w-5 h-5 rounded-full pointer-events-none z-10
              bg-gradient-radial from-emerald-600/60 to-transparent dark:from-white dark:via-[#6ba59b] dark:to-[#519489]
              animate-[rippleEffect_1s_ease-out_forwards]"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
            }}
          />
        ))}

        {/* Animated background waves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          <div
            className={`
            absolute w-[200%] h-[200%] opacity-0
            bg-gradient-to-r from-transparent via-emerald-600/10 to-transparent
            animate-[waveAnimation_6s_linear_infinite]
            group-hover:opacity-100 transition-opacity duration-300
          `}
          />
          <div
            className={`
            absolute w-[200%] h-[200%] opacity-0
            bg-gradient-to-r from-transparent via-emerald-600/10 to-transparent
            animate-[waveAnimation_8s_linear_infinite] delay-[2s]
            group-hover:opacity-100 transition-opacity duration-300
          `}
          />
          <div
            className={`
            absolute w-[200%] h-[200%] opacity-0
            bg-gradient-to-r from-transparent via-emerald-600/10 to-transparent dark:from-white dark:via-[#6ba59b] dark:to-[#519489]
            animate-[waveAnimation_10s_linear_infinite] delay-[4s]
            group-hover:opacity-100 transition-opacity duration-300
          `}
          />
        </div>

        {/* Event date badge */}
        <div
          className="absolute top-5 left-5 z-[5]
          bg-gradient-to-br from-red-400 to-red-500 text-white dark:from-white dark:via-[#6ba59b] dark:to-[#519489]
          p-2 rounded-xl text-center font-bold text-xs
          shadow-[0_4px_15px_rgba(255,107,107,0.4)]
          scale-90 group-hover:scale-100 transition-transform duration-300"
        ></div>

        {/* Content wrapper */}
        <div className="relative z-[2]">
          {/* Image section */}
          <div className="relative h-45 overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-[800ms] ease-out
                group-hover:scale-110 group-hover:rotate-1"
              style={{
                backgroundImage: `url(${
                  event.image || event.images?.[0]?.url
                })`,
              }}
            />

            {/* Animated overlay */}
            <div
              className="absolute inset-0 
              bg-gradient-to-t from-black/30 to-black/10
              transition-opacity duration-300"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]"
              />
            </div>

            {/* Status indicators */}
            <div className="absolute top-5 right-5 flex flex-col gap-2 z-[5]">
              <div
                className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 
                rounded-xl text-[11px] font-semibold flex items-center gap-1
                transform translate-x-[60px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100
                transition-all duration-400"
              >
                <div className="w-1.5 h-1.5 bg-green-400 dark:from-white dark:via-[#6ba59b] dark:to-[#519489] rounded-full animate-pulse" />
                <span>New</span>
              </div>

              <div
                className="bg-gradient-to-br from-emerald-600 to-emerald-500 dark:from-white dark:via-[#6ba59b] dark:to-[#519489] text-white px-2 py-1
                rounded-xl text-[11px] font-semibold flex items-center gap-1
                transform translate-x-[60px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100
                transition-all duration-400 delay-100"
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>{event.category || "Event"}</span>
              </div>
            </div>

            {/* Quick action buttons */}
          </div>

          {/* Content section */}
          <div className="p-6">
            <div className="mb-4">
              <h3
                className="text-xl font-bold text-gray-900 dark:text-white mb-2 
                leading-tight group-hover:text-emerald-600 dark:group-hover:text-[#519489] 
                transition-colors duration-300"
              >
                {event.title || event.name}
              </h3>

              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {event.is_limited ? (
                    <span>
                      start at: {event.starting_date} <br />
                      end at: {event.ending_date}
                    </span>
                  ) : (
                    "no limit for this event"
                  )}
                </div>
              </div>
            </div>

            <p
              className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5 
              line-clamp-2 overflow-hidden"
            >
              {event.description}
            </p>

            {/* Event stats */}
            <div
              className="grid grid-cols-3 gap-4 mb-6 py-4 
              border-t border-b border-emerald-600/10 dark:border-[#519489]"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5 
                  rounded-lg flex items-center justify-center text-emerald-600 dark:text-[#519489]"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-.83.67-1.5 1.5-1.5S12 9.67 12 10.5V11h2V9c0-1.66-1.34-3-3-3H7c-1.66 0-3 1.34-3 3v2H1v7h3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-emerald-600 dark:text-[#519489]">
                    {event.is_limited ? event.remaining_tickets : "no limit "}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Remaining Tickets
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5 
                  rounded-lg flex items-center justify-center text-emerald-600 dark:text-[#519489]"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-emerald-600 dark:text-[#519489]">
                    {event.rate || "no rate"}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Rating
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5 
                  rounded-lg flex items-center justify-center text-emerald-600 dark:text-[#519489]"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-emerald-600 dark:text-[#519489]">
                    ${event.price || "45"}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Price
                  </div>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div
              className="transform translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
              transition-all duration-400 delay-200"
            >
              <button
                className="w-full relative bg-gradient-to-br from-emerald-600 to-emerald-500  dark:from-[#6ba59b] dark:to-[#519489]
                text-white border-0 py-3.5 px-6 rounded-xl font-semibold text-sm
                flex items-center justify-center gap-2 cursor-pointer overflow-hidden
                transition-all duration-300 hover:translate-y-[-2px]
                hover:shadow-[0_10px_25px_rgba(81,148,137,0.4)]"
              >
                <span>Register Now</span>
                <div className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transform -translate-x-full group-hover:translate-x-full transition-transform duration-600"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rippleEffect {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(20);
            opacity: 0;
          }
        }

        @keyframes waveAnimation {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LatestEventCard;
