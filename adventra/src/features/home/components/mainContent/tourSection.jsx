import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFilter, clearAllFilters } from "../../../../hooks/searchSlice"; // Adjust the import path as needed
import { SearchService } from "../../../../api/searchService"; // Add this import
import TourCard from "./tourCard";

const ToursSection = ({
  title,
  tours,
  onTourClick,
  className = "",
  sectionType,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewMore = async () => {
    try {
      // Clear any existing filters first
      dispatch(clearAllFilters());

      // Set the group_trip type filter
      const groupTripType = {
        id: 2, // Add consistent ID
        name: "group_trip", // Keep snake_case for API
        label: "Group Trips", // Human-readable label
        value: "group_trip", // Value for consistency
      };
      dispatch(updateFilter({ filterType: "types", value: groupTripType }));

      // Set the appropriate ordering based on section type
      if (sectionType === "latest") {
        dispatch(updateFilter({ filterType: "order_type", value: "DESC" }));
        dispatch(updateFilter({ filterType: "orderBy", value: "created_at" }));
        dispatch(updateFilter({ filterType: "status", value: "pending" }));
      } else if (sectionType === "top-rated") {
        dispatch(updateFilter({ filterType: "order_type", value: "DESC" }));
        dispatch(updateFilter({ filterType: "orderBy", value: "rating" }));
        dispatch(updateFilter({ filterType: "status", value: "finished" }));
      }

      // Create search params for the API call
      const searchParams = {
        types: ["group_trip"], // Always search for group trips
        order_type:
          sectionType === "latest"
            ? "DESC"
            : sectionType === "top-rated"
            ? "DESC"
            : "DESC",
        orderBy:
          sectionType === "latest"
            ? "created_at"
            : sectionType === "top-rated"
            ? "rating"
            : "created_at",
        status:
          sectionType === "top-rated"
            ? "finished"
            : sectionType === "latest"
            ? "pending"
            : "pending",
      };

      // Execute the search and wait for it to complete
      await dispatch(SearchService(searchParams));

      // Navigate to the filter results page after search completes
      navigate("/filter-results");
    } catch (error) {
      console.error("Error executing search:", error);
      // Still navigate even if search fails, so user sees the filter page
      navigate("/filter-results");
    }
  };

  return (
    <section
      className={`relative bg-white dark:bg-[#1a1f2e] py-8 px-4 sm:px-6 md:px-8 ${className}`}
    >
      {/* Floating background elements */}
      <div className="absolute top-[10%] right-[10%] w-48 h-48 bg-radial-gradient-teal opacity-10 rounded-full pointer-events-none animate-float" />
      <div className="absolute bottom-[10%] left-[5%] w-36 h-36 bg-radial-gradient-teal-light opacity-8 rounded-full pointer-events-none animate-float-reverse" />

      <div className="section-header text-center mb-10 bg-white dark:bg-[#1a1f2e]">
        <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-teal-500 rounded-sm mx-auto mb-4" />

        {/* Title and View More Button Container */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-teal-600 dark:from-white dark:to-teal-400 bg-clip-text text-transparent">
            {title}
          </h2>

          {/* View More Button */}
          <button
            onClick={handleViewMore}
            className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_8px_25px_rgba(81,148,137,0.3)] transform hover:-translate-y-0.5"
          >
            <span>View More</span>
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

        <div className="text-gray-500 dark:text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
          Discover amazing adventures with our curated tour experiences
        </div>
      </div>

      <div className="tours-container relative bg-white dark:bg-[#1a1f2e]">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-2 px-4 pb-4">
          {tours.map((tour, index) => (
            <TourCard
              key={tour.id}
              tour={tour}
              index={index}
              onTourClick={onTourClick}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .bg-radial-gradient-teal {
          background: radial-gradient(
            circle,
            rgba(81, 148, 137, 0.1) 0%,
            transparent 70%
          );
        }
        .bg-radial-gradient-teal-light {
          background: radial-gradient(
            circle,
            rgba(107, 168, 157, 0.08) 0%,
            transparent 70%
          );
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float 8s ease-in-out infinite reverse;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ToursSection;
