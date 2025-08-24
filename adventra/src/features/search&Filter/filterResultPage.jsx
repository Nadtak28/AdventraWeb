import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAllFilters } from "../../hooks/searchSlice";

const FilterResultsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Fix: Change searchResults to results and loading to status === "loading"
  const { results, filters, status, error } = useSelector(
    (state) => state.search
  );
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [animateCards, setAnimateCards] = useState(false);

  // Fix: Use results instead of searchResults
  useEffect(() => {
    setAnimateCards(true);
  }, [results]);

  const handleEventClick = (event) => {
    navigate(`/events/${event.id}`);
  };

  const handleGroupClick = (group) => {
    navigate(`/tours/${group.id}`);
  };

  const handleGuideClick = (guide) => {
    navigate(`/guides/${guide.id}`);
  };

  // Fix: Calculate total results using the correct property names
  const totalResults =
    (results?.event?.length || 0) +
    (results?.groupTrip?.length || 0) +
    (results?.guide?.length || 0);

  // Filter active filters for display
  const activeFilters = [];
  if (filters.types?.length > 0) {
    activeFilters.push({
      type: "Types",
      values: filters.types.map((t) => t.label || t.name),
    });
  }
  if (filters.cities?.length > 0) {
    activeFilters.push({
      type: "Cities",
      values: filters.cities.map((c) => c.name),
    });
  }
  if (filters.countries?.length > 0) {
    activeFilters.push({
      type: "Countries",
      values: filters.countries.map((c) => c.name),
    });
  }
  if (filters.categories?.length > 0) {
    activeFilters.push({
      type: "Categories",
      values: filters.categories.map((c) => c.name),
    });
  }
  if (filters.languages?.length > 0) {
    activeFilters.push({
      type: "Languages",
      values: filters.languages.map((l) => l.name),
    });
  }
  if (filters.minPrice || filters.maxPrice) {
    const priceRange = `${filters.minPrice || "0"} - ${
      filters.maxPrice || "∞"
    }`;
    activeFilters.push({ type: "Price Range", values: [priceRange] });
  }

  // Event Card Component
  const EventCard = ({ event, index }) => (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:scale-[1.02] ${
        animateCards ? "animate-in slide-in-from-bottom-8" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => handleEventClick(event)}
    >
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-[#519489] to-[#6ba89e] overflow-hidden">
        {event.images?.length > 0 ? (
          <img
            src={event.images[0].url[0]}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl text-white/30">🎉</div>
          </div>
        )}

        {/* Offer Badge */}
        {event.has_offer && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            Special Offer
          </div>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-2 rounded-lg font-bold">
          ${event.price}
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#519489] transition-colors duration-300">
            {event.name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
            <svg
              className="w-4 h-4 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              {event.rate || "N/A"}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              event.status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
            }`}
          >
            {event.status || "active"}
          </span>

          <div className="flex items-center text-[#519489] group-hover:translate-x-1 transition-transform duration-300">
            <span className="text-sm font-medium mr-1">View Details</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  // Group Trip Card Component
  const GroupTripCard = ({ group, index }) => (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:scale-[1.02] ${
        animateCards ? "animate-in slide-in-from-bottom-8" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => handleGroupClick(group)}
    >
      {/* Group Trip Header */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
        {group.images?.length > 0 ? (
          <img
            src={group.images[0].url[0]}
            alt={group.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl text-white/30">✈️</div>
          </div>
        )}

        {/* Status Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
            group.status === "pending"
              ? "bg-yellow-500 text-white animate-pulse"
              : "bg-green-500 text-white"
          }`}
        >
          {group.status || "active"}
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-2 rounded-lg font-bold">
          ${group.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#519489] transition-colors duration-300">
            {group.name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
            <svg
              className="w-4 h-4 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              {group.rate || "N/A"}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
          {group.description}
        </p>

        {/* Trip Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-2 text-[#519489]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {group.starting_date
              ? new Date(group.starting_date).toLocaleDateString()
              : "TBD"}{" "}
            -{" "}
            {group.ending_date
              ? new Date(group.ending_date).toLocaleDateString()
              : "TBD"}
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-2 text-[#519489]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {group.cities?.length || 0} Cities • {group.remaining_tickets || 0}{" "}
            tickets left
          </div>
        </div>

        {/* Guide Info */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-4">
          <div className="w-8 h-8 bg-[#519489] rounded-full flex items-center justify-center text-white font-medium text-sm">
            {group.guide?.name?.charAt(0) || "G"}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {group.guide?.name || "Guide"}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Guide</p>
          </div>
        </div>

        <div className="flex items-center text-[#519489] group-hover:translate-x-1 transition-transform duration-300">
          <span className="text-sm font-medium mr-1">View Trip</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  // Guide Card Component
  const GuideCard = ({ guide, index }) => (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:scale-[1.02] ${
        animateCards ? "animate-in slide-in-from-bottom-8" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => handleGuideClick(guide)}
    >
      {/* Guide Header */}
      <div className="relative h-48 bg-gradient-to-br from-green-500 to-teal-600 overflow-hidden">
        {guide.images?.length > 0 ? (
          <img
            src={guide.images[0].url[0]}
            alt={guide.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl text-white/30">👨‍🏫</div>
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-2 rounded-lg font-bold">
          ${guide.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#519489] transition-colors duration-300">
            {guide.name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
            <svg
              className="w-4 h-4 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              {guide.rate || "N/A"}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
          {guide.description}
        </p>

        {/* Guide Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-2 text-[#519489]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {guide.city?.name || "Location not specified"}
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-2 text-[#519489]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {guide.phone || "Contact info not provided"}
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-1 mb-4">
          {guide.languages?.slice(0, 3).map((lang) => (
            <span
              key={lang.id}
              className="px-2 py-1 bg-[#519489]/10 text-[#519489] text-xs rounded-full font-medium"
            >
              {lang.name}
            </span>
          ))}
          {guide.languages?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              +{guide.languages.length - 3} more
            </span>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-4">
          {guide.categories?.slice(0, 2).map((category) => (
            <span
              key={category.id}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium"
            >
              {category.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {guide.reviewer_count || 0} reviews
          </span>

          <div className="flex items-center text-[#519489] group-hover:translate-x-1 transition-transform duration-300">
            <span className="text-sm font-medium mr-1">View Profile</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  // Fix: Use status === "loading" instead of loading
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1a1f2e] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#519489] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Searching for results...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1a1f2e] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Search Failed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#519489] text-white rounded-lg hover:bg-[#6ba89e] transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1f2e] transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Search Results</h1>
              <p className="text-[#e8f5f3]">
                Found {totalResults} result{totalResults !== 1 ? "s" : ""}{" "}
                matching your criteria
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="p-3 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#e8f5f3]">
                Active Filters:
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 animate-in slide-in-from-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-sm font-medium">{filter.type}:</span>
                    <span className="text-sm ml-1 text-[#e8f5f3]">
                      {filter.values.join(", ")}
                    </span>
                  </div>
                ))}

                <button
                  onClick={() => dispatch(clearAllFilters())}
                  className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-lg px-3 py-2 text-sm transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {totalResults === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Results Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search criteria or clearing some filters
            </p>
            <button
              onClick={() => dispatch(clearAllFilters())}
              className="px-6 py-3 bg-[#519489] text-white rounded-lg hover:bg-[#6ba89e] transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results Tabs */}
            <div className="flex items-center gap-6 mb-8 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("all")}
                className={`pb-4 px-2 font-medium transition-all duration-300 border-b-2 ${
                  activeTab === "all"
                    ? "border-[#519489] text-[#519489]"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All Results ({totalResults})
              </button>

              {results?.event?.length > 0 && (
                <button
                  onClick={() => setActiveTab("events")}
                  className={`pb-4 px-2 font-medium transition-all duration-300 border-b-2 ${
                    activeTab === "events"
                      ? "border-[#519489] text-[#519489]"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Events ({results.event.length})
                </button>
              )}

              {results?.groupTrip?.length > 0 && (
                <button
                  onClick={() => setActiveTab("trips")}
                  className={`pb-4 px-2 font-medium transition-all duration-300 border-b-2 ${
                    activeTab === "trips"
                      ? "border-[#519489] text-[#519489]"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Group Trips ({results.groupTrip.length})
                </button>
              )}

              {results?.guide?.length > 0 && (
                <button
                  onClick={() => setActiveTab("guides")}
                  className={`pb-4 px-2 font-medium transition-all duration-300 border-b-2 ${
                    activeTab === "guides"
                      ? "border-[#519489] text-[#519489]"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Guides ({results.guide.length})
                </button>
              )}
            </div>

            {/* Results Grid */}
            <div className="space-y-12">
              {/* Events Section */}
              {(activeTab === "all" || activeTab === "events") &&
                results?.event?.length > 0 && (
                  <section>
                    {activeTab === "all" && (
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <span className="text-3xl">🎉</span>
                        Events
                      </h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.event.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                      ))}
                    </div>
                  </section>
                )}

              {/* Group Trips Section */}
              {(activeTab === "all" || activeTab === "trips") &&
                results?.groupTrip?.length > 0 && (
                  <section>
                    {activeTab === "all" && (
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <span className="text-3xl">✈️</span>
                        Group Trips
                      </h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.groupTrip.map((group, index) => (
                        <GroupTripCard
                          key={group.id}
                          group={group}
                          index={index}
                        />
                      ))}
                    </div>
                  </section>
                )}

              {/* Guides Section */}
              {(activeTab === "all" || activeTab === "guides") &&
                results?.guide?.length > 0 && (
                  <section>
                    {activeTab === "all" && (
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <span className="text-3xl">👨‍🏫</span>
                        Guides
                      </h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.guide.map((guide, index) => (
                        <GuideCard key={guide.id} guide={guide} index={index} />
                      ))}
                    </div>
                  </section>
                )}
            </div>

            {/* Back to Top Button */}
            <div className="fixed bottom-8 right-8">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-[#519489] hover:bg-[#6ba89e] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
              >
                <svg
                  className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: animate-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .slide-in-from-bottom-8 {
          animation-name: slideInFromBottom;
        }

        .slide-in-from-left {
          animation-name: slideInFromLeft;
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: #519489;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #6ba89e;
        }

        /* Dark mode scrollbar */
        .dark ::-webkit-scrollbar-thumb {
          background: #519489;
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: #6ba89e;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke, opacity, box-shadow, transform,
            filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced hover effects */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }

        .group:hover .group-hover\\:-translate-y-1 {
          transform: translateY(-0.25rem);
        }

        /* Card hover shadow effect */
        .group:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .dark .group:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        /* Pulse animation for offer badges */
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Backdrop blur support */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }

        /* Focus states for accessibility */
        button:focus-visible {
          outline: 2px solid #519489;
          outline-offset: 2px;
        }

        /* Loading skeleton animation */
        @keyframes skeleton {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .skeleton {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200px 100%;
          animation: skeleton 1.5s infinite;
        }

        .dark .skeleton {
          background: linear-gradient(
            90deg,
            #374151 25%,
            #4b5563 50%,
            #374151 75%
          );
          background-size: 200px 100%;
        }
      `}</style>
    </div>
  );
};

export default FilterResultsPage;
