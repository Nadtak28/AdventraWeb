import React, { useState } from "react";
import { useSelector } from "react-redux";
import FilterPage from "../../../search&Filter/filterPage";

const SearchBar = ({ placeholder = "Search for tours, events, and more" }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { filters } = useSelector((state) => state.search);

  // Count active filters
  const activeFiltersCount =
    filters.types.length +
    filters.cities.length +
    filters.countries.length +
    filters.languages.length +
    filters.categories.length +
    (filters.only_offer ? 1 : 0) +
    (filters.contains ? 1 : 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    (filters.status ? 1 : 0);

  const handleSearchClick = () => {
    setIsFilterOpen(true);
  };

  return (
    <>
      <div className="mb-8 relative">
        <label className="flex flex-col min-w-40 !h-12 max-w-lg mx-auto">
          <div
            className={`flex w-full flex-1 items-stretch rounded-2xl h-full transition-all duration-300 ${
              isFocused
                ? "shadow-lg shadow-[#519489]/20 scale-[1.02]"
                : "shadow-md"
            }`}
          >
            {/* Search Icon */}
            <div className="text-[#519489] flex border-none bg-gradient-to-r from-[#e8f5f3] to-[#f0f9f7] dark:from-gray-800 dark:to-gray-700 items-center justify-center pl-4 rounded-l-2xl border-r-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
                className={`transition-transform duration-300 ${
                  isFocused ? "scale-110" : ""
                }`}
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </div>

            {/* Search Input */}
            <input
              placeholder={placeholder}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onClick={handleSearchClick}
              readOnly
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-none text-[#101918] dark:text-white focus:outline-0 focus:ring-0 border-none bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 from-[#e8f5f3] to-[#f0f9f7] focus:border-none h-full placeholder:text-[#519489]/60 dark:placeholder:text-gray-400 px-4 pl-2 text-base font-normal leading-normal transition-all duration-300 cursor-pointer"
            />

            {/* Filter Button */}
            <button
              onClick={handleSearchClick}
              className={`bg-gradient-to-r from-[#e8f5f3] to-[#f0f9f7] dark:from-gray-800 dark:to-gray-700 border-none rounded-r-2xl px-4 flex items-center justify-center transition-all duration-300 hover:from-[#d0ebe8] hover:to-[#e0f3f0] dark:hover:from-gray-700 dark:hover:to-gray-600 relative ${
                isFocused ? "scale-110" : ""
              }`}
            >
              <svg
                className="w-5 h-5 text-[#519489]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#519489] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </label>

        {/* Active filters indicator */}
        {activeFiltersCount > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 justify-center animate-fade-in">
            {filters.types.map((type, index) => (
              <span
                key={type.id || index}
                className="px-3 py-1 bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white text-xs rounded-full shadow-sm animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {type.icon && <span className="mr-1">{type.icon}</span>}
                {type.label || type.name}
              </span>
            ))}
            {filters.contains && (
              <span className="px-3 py-1 bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white text-xs rounded-full shadow-sm animate-scale-in">
                🔍 "{filters.contains}"
              </span>
            )}
            {filters.only_offer && (
              <span className="px-3 py-1 bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white text-xs rounded-full shadow-sm animate-scale-in">
                💰 Offers Only
              </span>
            )}
            {filters.cities.length > 0 && (
              <span className="px-3 py-1 bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white text-xs rounded-full shadow-sm animate-scale-in">
                📍 {filters.cities.length} Cities
              </span>
            )}
            {filters.countries.length > 0 && (
              <span className="px-3 py-1 bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white text-xs rounded-full shadow-sm animate-scale-in">
                🌍 {filters.countries.length} Countries
              </span>
            )}
            {filters.categories.length > 0 && (
              <span className="px-3 py-1 bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white text-xs rounded-full shadow-sm animate-scale-in">
                🏷️ {filters.categories.length} Categories
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="px-3 py-1 bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white text-xs rounded-full shadow-sm animate-scale-in">
                💵 {filters.minPrice || "0"} - {filters.maxPrice || "∞"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterPage
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Add some custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default SearchBar;
