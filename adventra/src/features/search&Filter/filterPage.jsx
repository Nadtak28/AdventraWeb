import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateFilter,
  clearFilter,
  clearAllFilters,
} from "../../hooks/searchSlice";
import { RequiredIdsService } from "../../api/requiredIdsService";
import { SearchService } from "../../api/searchService";

const FilterPage = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const { filters } = useSelector((state) => state.search);
  const { data: requiredIds, status: idsStatus } = useSelector(
    (state) => state.requiredIds
  );

  const [expandedSections, setExpandedSections] = useState({
    types: true,
    location: false,
    categories: false,
    price: false,
    other: false,
  });

  // Store scroll position with useRef to persist across renders
  const scrollPositionRef = useRef(0);
  const isRestoringScroll = useRef(false);

  useEffect(() => {
    if (idsStatus === "idle") {
      dispatch(RequiredIdsService());
    }
  }, [dispatch, idsStatus]);

  // Save scroll position whenever user scrolls
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current && !isRestoringScroll.current) {
      scrollPositionRef.current = scrollContainerRef.current.scrollTop;
    }
  }, []);

  // Attach scroll listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  // Restore scroll position after render with delay
  useEffect(() => {
    if (scrollContainerRef.current && scrollPositionRef.current > 0) {
      isRestoringScroll.current = true;

      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollPositionRef.current;

          // Reset flag after a short delay
          setTimeout(() => {
            isRestoringScroll.current = false;
          }, 100);
        }
      });
    }
  });

  const toggleSection = (section) => {
    // Save scroll position before toggling
    if (scrollContainerRef.current) {
      scrollPositionRef.current = scrollContainerRef.current.scrollTop;
    }

    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterUpdate = useCallback(
    (filterType, value) => {
      // Save current scroll position before updating filters
      if (scrollContainerRef.current) {
        scrollPositionRef.current = scrollContainerRef.current.scrollTop;
      }

      dispatch(updateFilter({ filterType, value }));
    },
    [dispatch]
  );

  // Helper function to create search params with only non-empty values
  const createSearchParams = () => {
    const searchParams = {};

    // Types is always required
    if (filters.types.length > 0) {
      searchParams.types = filters.types.map((type) => type.value || type.name);
    }

    // Only include other filters if they have values
    if (filters.cities.length > 0) {
      searchParams.cities = filters.cities.map((city) => city.id);
    }

    if (filters.countries.length > 0) {
      searchParams.countries = filters.countries.map((country) => country.id);
    }

    if (filters.languages.length > 0) {
      searchParams.languages = filters.languages.map((lang) => lang.id);
    }

    if (filters.categories.length > 0) {
      searchParams.categories = filters.categories.map((cat) => cat.id);
    }

    if (filters.only_offer) {
      searchParams.only_offer = 1;
    }

    if (filters.contains && filters.contains.trim()) {
      searchParams.contains = filters.contains.trim();
    }

    if (filters.minPrice && filters.minPrice.toString().trim()) {
      searchParams.minPrice = filters.minPrice;
    }

    if (filters.maxPrice && filters.maxPrice.toString().trim()) {
      searchParams.maxPrice = filters.maxPrice;
    }

    if (filters.status && filters.status.trim()) {
      searchParams.status = filters.status;
    }

    // Always include ordering params with defaults
    searchParams.order_type = filters.order_type || "DESC";
    searchParams.orderBy = filters.orderBy || "created_at";

    return searchParams;
  };

  const handleApplyFilters = async () => {
    // Validate that at least one type is selected
    if (filters.types.length === 0) {
      alert("Please select at least one type (Event, Group Trip, or Guide)");
      return;
    }

    // Create search params with only non-empty values
    const searchParams = createSearchParams();

    // Dispatch search service
    await dispatch(SearchService(searchParams));

    // Close the filter modal
    onClose();

    // Navigate to filter results page
    navigate("/filter-results");
  };

  const handleClearAll = () => {
    // Reset scroll position when clearing filters
    scrollPositionRef.current = 0;
    dispatch(clearAllFilters());
  };

  const typeOptions = [
    { id: 1, name: "event", label: "Events", icon: "🎉" },
    { id: 2, name: "group_trip", label: "Group Trips", icon: "✈️" },
    { id: 3, name: "guide", label: "Guides", icon: "👨‍🏫" },
  ];

  const FilterSection = ({ title, isExpanded, onToggle, children, icon }) => (
    <div className="mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <svg
          className={`w-5 h-5 text-[#519489] transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-auto scrollbar-custom`}
      >
        <div className="px-6 pb-4">{children}</div>
      </div>
    </div>
  );

  const CheckboxItem = ({ item, isSelected, onChange, showIcon = false }) => (
    <div
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 group"
      onClick={(e) => {
        // Prevent any default behavior and handle the change
        e.preventDefault();
        e.stopPropagation();
        onChange(item);
      }}
    >
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}} // Controlled by parent onClick
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
            isSelected
              ? "bg-[#519489] border-[#519489] scale-110"
              : "border-gray-300 dark:border-gray-600 group-hover:border-[#519489]"
          }`}
        >
          {isSelected && (
            <svg
              className="w-3 h-3 text-white absolute top-0.5 left-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="flex-1 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200 select-none">
        {showIcon && item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label || item.name}
      </span>
      {isSelected && (
        <span className="w-2 h-2 bg-[#519489] rounded-full animate-pulse flex-shrink-0"></span>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#519489] to-[#6ba89e] p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Advanced Search Filters</h2>
              <p className="text-[#e8f5f3] mt-1">
                Find exactly what you're looking for
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0 scrollbar-custom filter-content"
          style={{ scrollBehavior: "auto" }} // Disable smooth scrolling during restore
        >
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={filters.contains || ""}
              onChange={(e) => handleFilterUpdate("contains", e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#519489] focus:border-transparent transition-all duration-200"
            />
            <svg
              className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Types Section - Required */}
          <FilterSection
            title="Types"
            icon="🎯"
            isExpanded={expandedSections.types}
            onToggle={() => toggleSection("types")}
          >
            <div className="space-y-2">
              <p className="text-sm text-[#519489] font-medium mb-3">
                Select at least one type *
              </p>
              {typeOptions.map((type) => (
                <CheckboxItem
                  key={type.id}
                  item={type}
                  showIcon={true}
                  isSelected={
                    filters.types?.some((t) => t.name === type.name) || false
                  }
                  onChange={(item) => handleFilterUpdate("types", item)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Location Section */}
          <FilterSection
            title="Location"
            icon="🌍"
            isExpanded={expandedSections.location}
            onToggle={() => toggleSection("location")}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cities */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Cities
                </h4>
                <div className="space-y-1 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-2 scrollbar-custom">
                  {requiredIds?.cities?.map((city) => (
                    <CheckboxItem
                      key={city.id}
                      item={city}
                      isSelected={
                        filters.cities?.some((c) => c.id === city.id) || false
                      }
                      onChange={(item) => handleFilterUpdate("cities", item)}
                    />
                  ))}
                </div>
              </div>

              {/* Countries */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Countries
                </h4>
                <div className="space-y-1 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-2 scrollbar-custom">
                  {requiredIds?.countries?.slice(0, 10).map((country) => (
                    <CheckboxItem
                      key={country.id}
                      item={country}
                      isSelected={
                        filters.countries?.some((c) => c.id === country.id) ||
                        false
                      }
                      onChange={(item) => handleFilterUpdate("countries", item)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FilterSection>

          {/* Categories & Languages */}
          <FilterSection
            title="Categories & Languages"
            icon="🏷️"
            isExpanded={expandedSections.categories}
            onToggle={() => toggleSection("categories")}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Categories
                </h4>
                <div className="space-y-1 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-2 scrollbar-custom">
                  {requiredIds?.categories?.map((category) => (
                    <CheckboxItem
                      key={category.id}
                      item={category}
                      isSelected={
                        filters.categories?.some((c) => c.id === category.id) ||
                        false
                      }
                      onChange={(item) =>
                        handleFilterUpdate("categories", item)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Languages
                </h4>
                <div className="space-y-1 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-2 scrollbar-custom">
                  {requiredIds?.languages?.map((language) => (
                    <CheckboxItem
                      key={language.id}
                      item={language}
                      isSelected={
                        filters.languages?.some((l) => l.id === language.id) ||
                        false
                      }
                      onChange={(item) => handleFilterUpdate("languages", item)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection
            title="Price Range"
            icon="💰"
            isExpanded={expandedSections.price}
            onToggle={() => toggleSection("price")}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice || ""}
                  onChange={(e) =>
                    handleFilterUpdate("minPrice", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#519489] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="∞"
                  value={filters.maxPrice || ""}
                  onChange={(e) =>
                    handleFilterUpdate("maxPrice", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#519489] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </FilterSection>

          {/* Other Options */}
          <FilterSection
            title="Other Options"
            icon="⚙️"
            isExpanded={expandedSections.other}
            onToggle={() => toggleSection("other")}
          >
            <div className="space-y-4">
              {/* Only Offers */}
              <div
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleFilterUpdate("only_offer", !filters.only_offer);
                }}
              >
                <input
                  type="checkbox"
                  checked={filters.only_offer || false}
                  onChange={() => {}} // Controlled by parent onClick
                  className="w-5 h-5 text-[#519489] bg-gray-100 border-gray-300 rounded focus:ring-[#519489] focus:ring-2 pointer-events-none"
                />
                <span className="text-gray-700 dark:text-gray-300 select-none">
                  Show only offers
                </span>
              </div>

              {/* Status for Group Trips */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Group Trip Status
                </label>
                <select
                  value={filters.status || ""}
                  onChange={(e) => handleFilterUpdate("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#519489] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="finished">Finished</option>
                </select>
              </div>

              {/* Sort Options */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.orderBy || "created_at"}
                    onChange={(e) =>
                      handleFilterUpdate("orderBy", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#519489] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="created_at">Date Created</option>
                    <option value="rating">Rating</option>
                    <option value="id">ID</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Order
                  </label>
                  <select
                    value={filters.order_type || "DESC"}
                    onChange={(e) =>
                      handleFilterUpdate("order_type", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#519489] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="DESC">Descending</option>
                    <option value="ASC">Ascending</option>
                  </select>
                </div>
              </div>
            </div>
          </FilterSection>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              Clear All
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilters}
                disabled={filters.types?.length === 0}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  filters.types?.length === 0
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white hover:shadow-lg hover:scale-105 active:scale-95"
                }`}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        /* Custom scrollbar for webkit browsers */
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #519489;
          border-radius: 3px;
          opacity: 0.7;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #6ba89e;
          opacity: 1;
        }

        /* For Firefox */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #519489 transparent;
        }

        /* Ensure proper scroll behavior */
        .filter-content {
          scrollbar-gutter: stable;
        }

        /* Animation for smooth expand/collapse */
        .expandable-section {
          transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Prevent scroll jumping and improve performance */
        .filter-content {
          overflow-anchor: none;
          contain: layout style paint;
        }

        /* Smooth transitions */
        * {
          transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke, opacity, box-shadow, transform,
            filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Improve text selection */
        .select-none {
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default FilterPage;
