import LatestEventCard from "./latestEventsCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFilter, clearAllFilters } from "../../../../hooks/searchSlice";
import { SearchService } from "../../../../api/searchService"; // Add this import

const LatestEventsSection = ({
  title,
  events,
  onEventClick,
  className = "",
}) => {
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
      dispatch(updateFilter({ filterType: "orderBy", value: "created_at" }));
      dispatch(updateFilter({ filterType: "order_type", value: "DESC" }));

      // Create search params for the API call
      const searchParams = {
        types: ["event"],
        orderBy: "created_at",
        order_type: "DESC",
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
      className={`
      py-10 px-4 sm:px-6 md:px-8 relative overflow-hidden
      bg-white dark:bg-[#1a1f2e] transition-colors duration-300
      ${className}
    `}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute w-[400px] h-[400px] -top-[10%] -right-[10%] 
          bg-gradient-to-br from-red-400 to-red-500 rounded-full dark:from-[#519489] dark:to-[#519489]
          filter blur-[80px] opacity-10 dark:opacity-5
          animate-[gradientFloat_20s_ease-in-out_infinite]"
        />

        <div
          className="absolute w-[300px] h-[300px] -bottom-[10%] -left-[10%] dark:from-white dark:via-[#6ba59b] dark:to-[#519489]
          bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-full 
          filter blur-[80px] opacity-10 dark:opacity-5
          animate-[gradientFloat_20s_ease-in-out_infinite] delay-[10s]"
        />

        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-br from-red-400/10 to-emerald-600/10  
                dark:from-red-400/5 dark:to-emerald-600/5 rounded-full
                animate-[floatShape_6s_ease-in-out_infinite] opacity-30"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                width: `${20 + (i % 4) * 10}px`,
                height: `${20 + (i % 4) * 10}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-12 relative z-[2]">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 dark:from-white dark:via-[#6ba59b] dark:to-[#519489]
            rounded-[10px] flex items-center justify-center text-white
            animate-[iconPulse_3s_ease-in-out_infinite]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <div
            className="w-[60px] h-[3px] bg-gradient-to-r from-red-400 to-emerald-600  dark:from-white dark:via-[#6ba59b] dark:to-[#519489]
            rounded-sm animate-[lineGrow_2s_ease-in-out_infinite]"
          />
        </div>

        <h2
          className="text-[32px] md:text-[42px] font-black mb-4 leading-tight
          bg-gradient-to-r from-red-400 via-emerald-600 to-emerald-500 dark:from-white dark:via-[#6ba59b] dark:to-[#519489]
          bg-clip-text text-transparent"
        >
          {title}
        </h2>

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

        <p
          className="text-gray-500 dark:text-gray-400 text-base leading-relaxed 
          max-w-[600px] mx-auto"
        >
          Discover the newest and most exciting events happening right now
        </p>
      </div>

      {/* Events Container */}
      <div className="relative z-[2]">
        <div
          className="flex gap-6 overflow-x-auto scroll-smooth 
          py-4 px-2 pb-6 scrollbar-hide"
        >
          {events.map((event, index) => (
            <LatestEventCard
              key={event.id}
              event={event}
              index={index}
              onEventClick={onEventClick}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes gradientFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }

        @keyframes floatShape {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes iconPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 20px;
          }
        }

        @keyframes lineGrow {
          0%,
          100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(1.5);
          }
        }
      `}</style>
    </section>
  );
};

export default LatestEventsSection;
