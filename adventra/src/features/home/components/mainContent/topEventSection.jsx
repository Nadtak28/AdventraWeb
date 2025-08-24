import TopEventCard from "./topEventCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFilter, clearAllFilters } from "../../../../hooks/searchSlice";
import { SearchService } from "../../../../api/searchService"; // Add this import

const TopEventsSection = ({ title, events, onEventClick, className = "" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewMore = async () => {
    try {
      // Clear all existing filters first
      dispatch(clearAllFilters());

      // Set filters for events with rating order
      const eventType = {
        id: 1, // Add consistent ID for events
        name: "event",
        label: "Events",
        value: "event", // Add value for consistency
      };

      dispatch(updateFilter({ filterType: "types", value: eventType }));
      dispatch(updateFilter({ filterType: "orderBy", value: "rating" }));
      dispatch(updateFilter({ filterType: "order_type", value: "DESC" }));

      // Create search params for the API call
      const searchParams = {
        types: ["event"], // Search for events only
        orderBy: "rating", // Sort by rating
        order_type: "DESC", // Descending order (highest rating first)
      };

      // Execute the search and wait for it to complete
      await dispatch(SearchService(searchParams));

      // Navigate to filter results page after search completes
      navigate("/filter-results");
    } catch (error) {
      console.error("Error executing search:", error);
      // Still navigate even if search fails, so user sees the filter page
      navigate("/filter-results");
    }
  };

  return (
    <section
      className={`relative overflow-hidden bg-white dark:bg-[#1a1f2e] px-4 py-15 sm:px-6 md:px-8 ${className}`}
    >
      {/* Futuristic background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-50 animate-pulse">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(81, 148, 137, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(81, 148, 137, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Energy beams */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 w-0.5 h-full opacity-0 animate-pulse blur-sm"
              style={{
                left: `${i * 10}%`,
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(81, 148, 137, 0.5) 50%, transparent 100%)",
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        {/* Holographic rings */}
        <div className="absolute inset-0">
          <div
            className="absolute w-50 h-50 border border-teal-400/30 rounded-full top-[10%] right-[10%] animate-spin"
            style={{ animationDuration: "15s" }}
          />
          <div
            className="absolute w-37.5 h-37.5 border border-teal-400/30 rounded-full bottom-[20%] left-[15%] animate-spin"
            style={{ animationDuration: "25s", animationDirection: "reverse" }}
          />
          <div
            className="absolute w-25 h-25 border border-teal-400/30 rounded-full top-[60%] right-[30%] animate-spin"
            style={{ animationDuration: "18s" }}
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12">
        {/* Glow orb */}
        <div className="relative inline-block mb-6">
          <div
            className="w-15 h-15 rounded-full blur-md animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(81, 148, 137, 0.8) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Title container with View More button */}
        <div className="mb-5 relative">
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight"
            style={{ textShadow: "0 0 20px rgba(81, 148, 137, 0.5)" }}
          >
            {title}
          </h2>

          {/* View More Button */}
          <div className="absolute top-0 right-0 hidden md:block">
            <button
              onClick={handleViewMore}
              className="group relative px-6 py-3 bg-gradient-to-r from-[#519489] to-[#6ba89e] 
                text-white rounded-full font-semibold text-sm cursor-pointer
                overflow-hidden transition-all duration-300 
                hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_8px_25px_rgba(81,148,137,0.4)]
                border border-[#519489]/20 backdrop-blur-sm"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                transform -translate-x-full group-hover:translate-x-full transition-transform duration-600"
              />

              <span className="relative z-10 flex items-center gap-2">
                View More Events
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>

              {/* Particle effects */}
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

          {/* Mobile View More Button */}
          <div className="block md:hidden mt-4">
            <button
              onClick={handleViewMore}
              className="group relative px-8 py-3 bg-gradient-to-r from-[#519489] to-[#6ba89e] 
                text-white rounded-full font-semibold text-sm cursor-pointer
                overflow-hidden transition-all duration-300 
                hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_8px_25px_rgba(81,148,137,0.4)]
                border border-[#519489]/20 backdrop-blur-sm"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                transform -translate-x-full group-hover:translate-x-full transition-transform duration-600"
              />

              <span className="relative z-10 flex items-center gap-2">
                View More Events
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>

              {/* Particle effects */}
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

        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-2xl mx-auto">
          Handpicked premium events with the highest ratings and most exclusive
          experiences
        </p>
      </div>

      {/* Events showcase */}
      <div className="relative z-10">
        <div className="flex gap-8 overflow-x-auto scroll-smooth py-5 px-2 pb-8 scrollbar-hide">
          {events.map((event, index) => (
            <TopEventCard
              key={event.id}
              event={event}
              index={index}
              onEventClick={onEventClick}
            />
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes beamPulse {
          0%,
          100% {
            opacity: 0;
            transform: scaleY(0);
          }
          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes orbGlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @keyframes segmentPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scaleX(1);
          }
          50% {
            opacity: 1;
            transform: scaleX(1.2);
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

        .animate-grid-pulse {
          animation: gridPulse 4s ease-in-out infinite;
        }

        .animate-beam-pulse {
          animation: beamPulse linear infinite;
        }

        .animate-orb-glow {
          animation: orbGlow 3s ease-in-out infinite;
        }

        .animate-segment-pulse {
          animation: segmentPulse 2s ease-in-out infinite;
        }

        /* Dark mode scroll fade adjustments */
        .dark .scroll-fade-left {
          background: linear-gradient(
            to right,
            rgb(17 24 39 / 1),
            rgb(17 24 39 / 0)
          );
        }

        .dark .scroll-fade-right {
          background: linear-gradient(
            to left,
            rgb(17 24 39 / 1),
            rgb(17 24 39 / 0)
          );
        }
      `}</style>
    </section>
  );
};

export default TopEventsSection;
