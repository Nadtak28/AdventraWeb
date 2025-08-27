import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SearchService } from "../../../../api/searchService";
import { updateFilter, clearAllFilters } from "../../../../hooks//searchSlice";

const EnhancedOfferSlider = ({
  items = [],
  title,
  onItemClick,
  type = "event",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Sample items for demonstration
  const displayItems = items;

  useEffect(() => {
    if (isAutoPlaying && displayItems.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayItems.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, displayItems.length]);

  // Handle View More click
  const handleViewMoreClick = async () => {
    // Clear all existing filters first
    dispatch(clearAllFilters());

    // Set up the filter based on type
    const searchParams = {
      only_offer: true,
      order_type: "DESC",
      orderBy: "id",
    };

    // Determine the type based on the component's type prop
    if (type === "event") {
      searchParams.types = ["event"];
      // Update Redux state for UI consistency
      dispatch(
        updateFilter({
          filterType: "types",
          value: { id: 1, name: "event", label: "Events" },
        })
      );
    } else if (type === "tour") {
      searchParams.types = ["group_trip"];
      // Update Redux state for UI consistency
      dispatch(
        updateFilter({
          filterType: "types",
          value: { id: 2, name: "group_trip", label: "Group Trips" },
        })
      );
    }

    // Update only_offer in Redux state
    dispatch(updateFilter({ filterType: "only_offer", value: true }));

    try {
      // Dispatch the search with the parameters
      await dispatch(SearchService(searchParams));

      // Navigate to filter results page
      navigate("/filter-results");
    } catch (error) {
      console.error("Error searching for offers:", error);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + displayItems.length) % displayItems.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      console.log("Item clicked:", item.name);
    }
  };

  if (!displayItems.length) return null;

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 md:px-8">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-24 bg-gradient-to-r from-transparent via-teal-600 dark:via-teal-400 to-transparent transform -rotate-3"
              style={{
                top: `${10 + i * 20}%`,
                width: "200%",
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + i * 2}s`,
                animation: "waveMove linear infinite",
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-10 relative z-10">
        <div className="relative inline-flex items-center gap-2 bg-gradient-to-r dark:from-[#519489] dark:to-[#519489] from-red-500 to-red-600 text-white px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wide mb-5 overflow-hidden">
          <div className="w-4 h-4 animate-spin">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span>Special Deals</span>
          <div className="absolute inset-0 bg-red-500 dark:bg-[#519489] rounded-full opacity-50 animate-ping" />
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-black  dark:text-gray-100 bg-gradient-to-r from-gray-900 dark:from-gray-100 to-teal-600 bg-clip-text text-transparent">
              {title || "Exclusive Offers"}
            </h2>

            {/* View More Button */}
            <button
              onClick={handleViewMoreClick}
              className="group relative bg-gradient-to-r from-[#519489] to-[#6ba89e] text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:from-[#6ba89e] hover:to-[#519489] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#519489]/30 overflow-hidden"
            >
              <span className="relative z-10">View More</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>

              {/* Button shine effect */}
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 group-hover:left-full" />
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            Limited time offers you don't want to miss
          </p>
        </div>

        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prevSlide}
            className="relative w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-full flex items-center justify-center hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 overflow-hidden"
            disabled={isDragging}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 z-10"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent rounded-full scale-0 group-active:scale-100 transition-transform duration-300" />
          </button>

          <div className="flex gap-2">
            {displayItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 overflow-hidden ${
                  index === currentIndex
                    ? "bg-teal-600 scale-125"
                    : "bg-teal-600/30"
                }`}
              >
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="relative w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-full flex items-center justify-center hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 overflow-hidden"
            disabled={isDragging}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 z-10"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent rounded-full scale-0 group-active:scale-100 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing z-10"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(calc(-${
              currentIndex * 100
            }% + ${dragOffset}px))`,
            transition: isDragging
              ? "none"
              : "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {displayItems.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0 px-2">
              <div
                className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer border ${
                  index === currentIndex
                    ? "scale-100 opacity-100 shadow-2xl shadow-teal-600/15 dark:shadow-teal-600/25 dark:bg-[#2a3441] dark:border-[#519489]"
                    : "scale-95 opacity-80 shadow-xl dark:bg-[#2a3441] dark:border-[#519489]"
                } hover:scale-105 hover:-translate-y-1 border-transparent dark:border-[#519489]`}
                onClick={() => handleItemClick(item)}
              >
                {/* Animated background gradients */}
                <div className="absolute inset-0 z-0">
                  <div
                    className="absolute inset-0 bg-white dark:bg-[#2a3441] opacity-10 dark:opacity-5 animate-pulse"
                    style={{ animationDuration: "8s", animationDelay: "0s" }}
                  />
                  <div
                    className="absolute inset-0 bg-white dark:bg-[#2e3034] opacity-10 dark:opacity-5 animate-pulse"
                    style={{ animationDuration: "8s", animationDelay: "2.5s" }}
                  />
                  <div
                    className="absolute inset-0 bg-white dark:bg-[#131a24] opacity-10 dark:opacity-5 animate-pulse"
                    style={{ animationDuration: "8s", animationDelay: "5s" }}
                  />
                </div>

                {/* Offer badge */}
                <div className="absolute top-5 left-5 z-30">
                  <div className="relative bg-gradient-to-r from-red-500 to-red-600 dark:from-[#519489] dark:to-[#519489] text-white px-4 py-2 rounded-2xl flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide z-10">
                    <div className="w-3 h-3 animate-spin">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <span>SPECIAL</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 dark:from-[#519489] dark:to-[#519489] rounded-2xl blur-md opacity-60 animate-pulse" />
                </div>

                {/* Content container */}
                <div className="relative flex flex-col md:flex-row items-center gap-6 p-8 min-h-48 z-10">
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-110 hover:rotate-1"
                        style={{
                          backgroundImage: `url(${
                            item.images?.[0]?.url?.[0] ||
                            "https://via.placeholder.com/800x600?text=No+Image+Available"
                          })`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-teal-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />

                      {/* Floating stats */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        <div className="bg-black/80 text-white px-1.5 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-2.5 h-2.5"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span>{item.rate}</span>
                        </div>

                        <div className="bg-black/80 text-white px-1.5 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400 delay-100">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-2.5 h-2.5"
                          >
                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{item.participants || "150+"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <div className="mb-4">
                      <div className="flex items-center justify-center md:justify-start gap-1.5 text-teal-600 text-xs font-semibold uppercase tracking-wide mb-2">
                        <div className="w-3.5 h-3.5">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 4V2a1 1 0 0 1 2 0v2h6V2a1 1 0 0 1 2 0v2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2zM5 8v10h14V8H5z" />
                          </svg>
                        </div>
                        <span>{type === "tour" ? "Tour" : "Event"}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-0 hover:text-teal-600 transition-colors duration-300">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                        <div className="flex items-baseline gap-0.5 text-gray-500 dark:text-gray-400 line-through font-semibold"></div>

                        <div className="text-green-500 dark:text-green-400 animate-bounce">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </div>

                        <div className="flex items-baseline gap-0.5 text-teal-600 font-bold">
                          <span className="text-lg">$</span>
                          <span className="text-3xl">
                            {typeof item.price === "number"
                              ? item.price.toFixed(0)
                              : item.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <button
                        className={`relative bg-gradient-to-r from-teal-600 to-teal-700 text-white border-none px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg hover:shadow-teal-600/40 ${
                          index === currentIndex
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2.5 opacity-0"
                        }`}
                      >
                        <span>Claim Offer</span>
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
                        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 hover:left-full" />
                      </button>

                      <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400 text-xs font-semibold">
                        <div className="w-4 h-4 animate-pulse">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        {item.is_limited ? (
                          <span>
                            Limited time only — {item.remaining_tickets} /{" "}
                            {item.tickets_count} tickets left
                          </span>
                        ) : (
                          "there is no limit time"
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated border */}
                {index === currentIndex && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none z-20">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-teal-700 opacity-50 animate-pulse" />
                    <div
                      className="absolute top-0 right-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-600 to-teal-700 opacity-50 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-l from-teal-600 to-teal-700 opacity-50 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                    <div
                      className="absolute top-0 left-0 bottom-0 w-0.5 bg-gradient-to-t from-teal-600 to-teal-700 opacity-50 animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600/20 dark:bg-teal-600/30 z-20">
          <div
            className="h-full bg-gradient-to-r from-teal-600 to-teal-700 origin-left"
            style={{
              width: isAutoPlaying ? "100%" : "0%",
              transition: isAutoPlaying ? "width 5s linear" : "none",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes waveMove {
          0% {
            transform: translateX(-100%) rotate(-5deg);
          }
          100% {
            transform: translateX(50%) rotate(-5deg);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .group:hover .group-hover\\:translate-x-0 {
          transform: translateX(0);
        }

        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default EnhancedOfferSlider;
