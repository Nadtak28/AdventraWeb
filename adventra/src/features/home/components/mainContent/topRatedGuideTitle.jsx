import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SearchService } from "../../../../api/searchService";
import { updateFilter, clearAllFilters } from "../../../../hooks/searchSlice";
export default function TopRatedGuideTitle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewMore = async () => {
    try {
      // Clear all existing filters first
      dispatch(clearAllFilters());

      // Set filters for events with rating order
      const guideType = {
        id: 1, // Add consistent ID for events
        name: "guide",
        label: "Guides",
        value: "guide", // Add value for consistency
      };

      dispatch(updateFilter({ filterType: "types", value: guideType }));
      dispatch(updateFilter({ filterType: "orderBy", value: "rating" }));
      dispatch(updateFilter({ filterType: "order_type", value: "DESC" }));

      // Create search params for the API call
      const searchParams = {
        types: ["guide"], // Search for events only
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
    <>
      <div className="flex items-center justify-between mb-6">
        {/* Left side: Title */}
        <div className="flex items-center">
          <div className="h-1 w-12 bg-gradient-to-r from-[#519489] to-[#6ba89d] rounded-full mr-4" />
          <h2 className="text-[#101918] dark:bg-gradient-to-r dark:from-white dark:via-[#6ba59b] dark:to-[#519489] dark:bg-clip-text dark:text-transparent text-2xl md:text-3xl font-bold">
            Top-Rated Guides
          </h2>
        </div>

        {/* Right side: View More button (desktop only) */}
        <div className="hidden md:block">
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
              View More Guides
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
          </button>
        </div>
      </div>

      {/* Mobile button (below title) */}
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
            View More Guides
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
        </button>
      </div>
    </>
  );
}
