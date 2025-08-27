import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  Star,
  Users,
  Calendar,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { ToursService } from "../api/toursService"; // Adjust path as needed
import { useNavigate } from "react-router-dom";

export default function MainContent() {
  const dispatch = useDispatch();
  const { list, loadingList, errorList } = useSelector((state) => state.tours);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState("lg");
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("sm");
      else if (width < 768) setScreenSize("md");
      else if (width < 1024) setScreenSize("lg");
      else setScreenSize("xl");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Fetch tours data on component mount
  useEffect(() => {
    dispatch(ToursService());
  }, [dispatch]);

  // Transform backend data to match component structure
  const transformTourData = (tour) => ({
    id: tour.id,
    name: tour.name,
    description: tour.description,
    image:
      tour.images?.[0]?.url ||
      "https://placehold.co/500x300?text=No+Image+Available",
    price: parseInt(tour.price, 10) || 0,
    rating: parseFloat(tour.rate) || 4.5,
    duration: `${Math.ceil(
      (new Date(tour.ending_date) - new Date(tour.starting_date)) /
        (1000 * 60 * 60 * 24)
    )} days`,
    participants: `${tour.remaining_tickets}+`,
    status: tour.status,
    starting_date: tour.starting_date,
    ending_date: tour.ending_date,
    guide: tour.guide,
    cities: tour.cities,
    reviews_count: tour.reviews_count,
  });

  const toursList = list?.map(transformTourData) || [];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !hoveredCard && toursList.length > 0) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, hoveredCard, index, toursList.length]);

  // Mouse tracking for parallax effect (disabled on mobile)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current && screenSize !== "sm") {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 10, y: y * 10 });
      }
    };

    const container = containerRef.current;
    if (container && screenSize !== "sm") {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [screenSize]);

  const getVisibleCards = () => {
    if (!toursList.length) return [];
    const cards = [];
    const maxVisible = screenSize === "sm" ? 1 : screenSize === "md" ? 3 : 5;

    for (let i = 0; i < Math.min(maxVisible, toursList.length); i++) {
      const cardIndex = (index + i) % toursList.length;
      cards.push({ ...toursList[cardIndex], position: i });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  const handleNext = () => {
    if (isAnimating || !toursList.length) return;
    setIsAnimating(true);
    setIndex((prev) => (prev + 1) % toursList.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating || !toursList.length) return;
    setIsAnimating(true);
    setIndex((prev) => (prev - 1 + toursList.length) % toursList.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleDotClick = (i) => {
    if (!isAnimating && i !== index && toursList.length > 0) {
      setIsAnimating(true);
      setIndex(i);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleCardClick = (tour) => {
    console.log("Clicked on tour:", tour);
    navigate(`/tours/${tour.id}`);
  };

  const getCardStyle = (position, isHovered) => {
    // Mobile: single card layout
    if (screenSize === "sm") {
      return {
        transform: `translateX(0px) translateY(${
          isHovered ? -10 : 0
        }px) scale(${isHovered ? 1.05 : 1})`,
        opacity: 1,
        zIndex: 50,
        filter: `brightness(${isHovered ? 1.1 : 1})`,
      };
    }

    // Tablet: 3 cards layout
    if (screenSize === "md") {
      const tabletTransforms = {
        0: {
          transform: `translateX(0px) translateY(${
            isHovered ? -15 : 0
          }px) scale(${isHovered ? 1.1 : 1})`,
          opacity: 1,
          zIndex: 50,
          filter: `brightness(${isHovered ? 1.1 : 1})`,
        },
        1: {
          transform: `translateX(280px) translateY(${
            isHovered ? -10 : 0
          }px) scale(${isHovered ? 0.95 : 0.85})`,
          opacity: 0.8,
          zIndex: 40,
          filter: `brightness(${isHovered ? 1 : 0.9})`,
        },
        2: {
          transform: `translateX(-280px) translateY(${
            isHovered ? -10 : 0
          }px) scale(${isHovered ? 0.95 : 0.85})`,
          opacity: 0.8,
          zIndex: 40,
          filter: `brightness(${isHovered ? 1 : 0.9})`,
        },
      };
      return tabletTransforms[position] || tabletTransforms[0];
    }

    // Desktop: full 3D carousel
    const baseTransform = {
      0: {
        transform: `translateX(0px) translateY(${
          isHovered ? -20 : 0
        }px) translateZ(${isHovered ? 150 : 120}px) rotateY(0deg) scale(${
          isHovered ? 1.15 : 1.1
        })`,
        opacity: 1,
        zIndex: 50,
        filter: `brightness(${isHovered ? 1.1 : 1}) saturate(${
          isHovered ? 1.2 : 1
        })`,
      },
      1: {
        transform: `translateX(340px) translateY(${
          isHovered ? -10 : 0
        }px) translateZ(${isHovered ? 80 : 60}px) rotateY(-30deg) scale(${
          isHovered ? 0.95 : 0.9
        })`,
        opacity: 0.8,
        zIndex: 40,
        filter: `brightness(${isHovered ? 1 : 0.9})`,
      },
      2: {
        transform: `translateX(600px) translateY(0px) translateZ(20px) rotateY(-45deg) scale(0.7)`,
        opacity: 0.5,
        zIndex: 30,
        filter: "brightness(0.8)",
      },
      3: {
        transform: `translateX(-340px) translateY(${
          isHovered ? -10 : 0
        }px) translateZ(${isHovered ? 80 : 60}px) rotateY(30deg) scale(${
          isHovered ? 0.95 : 0.9
        })`,
        opacity: 0.8,
        zIndex: 40,
        filter: `brightness(${isHovered ? 1 : 0.9})`,
      },
      4: {
        transform: `translateX(-600px) translateY(0px) translateZ(20px) rotateY(45deg) scale(0.7)`,
        opacity: 0.5,
        zIndex: 30,
        filter: "brightness(0.8)",
      },
    };
    return baseTransform[position] || baseTransform[0];
  };

  // Get responsive card dimensions
  const getCardDimensions = () => {
    switch (screenSize) {
      case "sm":
        return { width: "280px", height: "420px" };
      case "md":
        return { width: "320px", height: "460px" };
      default:
        return { width: "350px", height: "500px" };
    }
  };

  const cardDimensions = getCardDimensions();

  // Loading State
  if (loadingList) {
    return (
      <div className="relative dark:bg-[#1a1f2e] bg-white min-h-screen overflow-hidden flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 animate-spin text-[#519489] mx-auto mb-4" />
          <h2 className="text-lg sm:text-2xl font-bold bg-white dark:bg-[#1a1f2e] dark:text-white text-gray-900 mb-2">
            Loading Amazing Tours...
          </h2>
          <p className="text-sm sm:text-base text-[#519489]">
            Please wait while we fetch the best experiences for you
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (errorList) {
    return (
      <div className="relative dark:bg-[#1a1f2e] bg-white min-h-screen overflow-hidden flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
            {errorList}
          </p>
          <button
            onClick={() => dispatch(ToursService())}
            className="bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No Data State
  if (!toursList.length) {
    return (
      <div className="relative dark:bg-[#1a1f2e] bg-white min-h-screen overflow-hidden flex items-center justify-center px-4">
        <div className="text-center">
          <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Tours Available
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Check back later for amazing travel experiences!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative dark:bg-[#1a1f2e] bg-white min-h-screen overflow-hidden">
      {/* Animated Background Elements - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        {[...Array(screenSize === "sm" ? 6 : 12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width:
                screenSize === "sm"
                  ? Math.random() * 40 + 20
                  : Math.random() * 80 + 40,
              height:
                screenSize === "sm"
                  ? Math.random() * 40 + 20
                  : Math.random() * 80 + 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, ${
                i % 2 === 0 ? "#519489" : "#6ba89d"
              }${Math.floor(Math.random() * 30 + 10).toString(
                16
              )}, transparent)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Gradient waves */}
        <div className="absolute inset-0">
          {[...Array(screenSize === "sm" ? 2 : 3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-32 animate-wave"
              style={{
                background: `linear-gradient(90deg, transparent, #519489${(
                  20 -
                  i * 5
                ).toString(16)}, transparent)`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 2}s`,
                transform: `rotate(${-5 + i * 2}deg)`,
              }}
            />
          ))}
        </div>

        {/* Sparkle effects - Reduced on mobile */}
        <div className="absolute inset-0">
          {[...Array(screenSize === "sm" ? 10 : 20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#519489] rounded-full animate-sparkle"
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

      <div className="relative z-10">
        {/* Header Section - Responsive */}
        <div className="text-center py-6 sm:py-8 md:py-12 px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 bg-[#519489]/10 text-[#519489] px-3 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 animate-bounce-subtle">
            <div className="w-2 h-2 bg-[#519489] rounded-full animate-pulse" />
            Premium Tours Collection ({toursList.length} Available)
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl dark:text-white font-black text-gray-900 mb-4 leading-tight">
            <span className="relative">
              Discover Amazing
              <div className="absolute bottom-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-[#519489] to-[#6ba89d] transform -rotate-1 animate-pulse-slow" />
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#519489] to-[#6ba89d] bg-clip-text text-transparent animate-gradient">
              Tours
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-white max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4">
            Experience the world like never before with our carefully curated
            collection of extraordinary adventures
          </p>
        </div>

        {/* 3D Carousel Container - Responsive height */}
        <div
          ref={containerRef}
          className={`relative ${
            screenSize === "sm"
              ? "h-[500px]"
              : screenSize === "md"
              ? "h-[600px]"
              : "h-[700px]"
          } flex items-center justify-center perspective-1000 px-4`}
          onMouseEnter={() => screenSize !== "sm" && setIsAutoPlaying(false)}
          onMouseLeave={() => screenSize !== "sm" && setIsAutoPlaying(true)}
          style={{
            transform:
              screenSize !== "sm"
                ? `rotateX(${mousePosition.y * 0.5}deg) rotateY(${
                    mousePosition.x * 0.5
                  }deg)`
                : "none",
            transition: "transform 0.3s ease-out",
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center preserve-3d"
            style={{
              perspective: screenSize === "sm" ? "none" : "1200px",
              transformStyle: screenSize === "sm" ? "flat" : "preserve-3d",
            }}
          >
            {visibleCards.map((tour) => {
              const isHovered = hoveredCard === tour.id;
              const cardStyle = getCardStyle(tour.position, isHovered);

              return (
                <div
                  key={`${tour.id}-${tour.position}`}
                  className="absolute bg-gradient-to-br from-white dark:from-gray-800 dark:to-gray-900 to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer group hover:shadow-3xl"
                  style={{
                    width: cardDimensions.width,
                    height: cardDimensions.height,
                    ...cardStyle,
                    transformStyle:
                      screenSize === "sm" ? "flat" : "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                  onMouseEnter={() => setHoveredCard(tour.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(tour)}
                >
                  {/* Card Image - Responsive height */}
                  <div
                    className={`relative ${
                      screenSize === "sm" ? "h-48" : "h-64"
                    } overflow-hidden`}
                  >
                    <img
                      src={tour.image}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/800x600?text=No+Image+Available";
                      }}
                    />

                    {/* Image Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out" />

                    {/* Status Badge - Responsive size */}
                    <div
                      className={`absolute top-2 sm:top-4 right-2 sm:right-4 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs font-bold transform rotate-12 group-hover:rotate-0 transition-all duration-300 shadow-lg ${
                        tour.status === "pending"
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                          : tour.status === "active"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-gradient-to-r from-[#519489] to-[#6ba89d]"
                      } animate-pulse-slow`}
                    >
                      {tour.status === "pending" ? "Pending" : "Available"}
                    </div>

                    {/* Rating Badge - Responsive size */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/20 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Star
                        size={10}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      {tour.rating}
                    </div>
                  </div>

                  {/* Card Content - Responsive padding */}
                  <div
                    className={`p-3 sm:p-4 md:p-6 ${
                      screenSize === "sm" ? "h-52" : "h-60"
                    } flex flex-col justify-between relative`}
                  >
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#519489]/5 via-transparent to-[#6ba89d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl sm:rounded-b-3xl" />

                    <div className="relative z-10">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-black dark:text-white text-gray-900 mb-2 sm:mb-3 group-hover:text-[#519489] transition-colors duration-300 leading-tight line-clamp-2">
                        {tour.name}
                      </h2>

                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                        {tour.description}
                      </p>

                      {/* Tour Stats - Responsive layout */}
                      <div
                        className={`flex items-center ${
                          screenSize === "sm"
                            ? "justify-between"
                            : "justify-between"
                        } mb-3 sm:mb-4 text-xs text-gray-500 dark:text-gray-400`}
                      >
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          <span className="hidden sm:inline">
                            {tour.duration}
                          </span>
                          <span className="sm:hidden">
                            {tour.duration.split(" ")[0]}d
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={10} />
                          {tour.participants}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={10} />
                          {tour.cities?.length || 0}
                        </div>
                      </div>

                      {/* Guide Info - Hidden on mobile */}
                      {tour.guide && screenSize !== "sm" && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Guide:{" "}
                          <span className="font-semibold text-[#519489]">
                            {tour.guide.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Section - Responsive layout */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="text-left">
                        <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#519489]">
                          $
                          {screenSize === "sm"
                            ? Math.floor(tour.price / 1000) + "k"
                            : tour.price.toLocaleString()}
                        </span>
                        {screenSize !== "sm" && (
                          <span className="text-sm text-gray-500 ml-1">
                            per person
                          </span>
                        )}
                      </div>

                      <button className="group/btn relative cursor-pointer bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-xl sm:rounded-2xl font-bold hover:shadow-2xl hover:shadow-[#519489]/25 transition-all duration-300 hover:scale-105 overflow-hidden text-xs sm:text-sm">
                        <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                          {screenSize === "sm" ? "View" : "Explore"}
                          <ChevronRight
                            size={screenSize === "sm" ? 12 : 16}
                            className="group-hover/btn:translate-x-1 transition-transform duration-200"
                          />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#6ba89d] to-[#519489] translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                      </button>
                    </div>

                    {/* 3D Glow Effect */}
                    <div className="absolute inset-0 rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-br from-[#519489]/10 via-transparent to-[#6ba89d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-2xl shadow-[#519489]/10" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Navigation Controls - Responsive */}
        <div className="relative z-20 flex items-center justify-center mt-8 sm:mt-12 mb-6 sm:mb-8 px-4">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-white/80 backdrop-blur-lg rounded-full px-4 py-3 sm:px-6 sm:py-4 md:px-8 shadow-2xl border border-white/20">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={isAnimating || toursList.length <= 1}
              className="group relative bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#519489]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
            >
              <ArrowLeft
                size={screenSize === "sm" ? 16 : 20}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6ba89d] to-[#519489] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Progress Indicators - Responsive size and count */}
            <div className="flex gap-2 sm:gap-3 max-w-xs overflow-x-auto scrollbar-hide">
              {toursList.slice(0, screenSize === "sm" ? 5 : 10).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`relative w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 hover:scale-125 flex-shrink-0 ${
                    i === index
                      ? "bg-[#519489] shadow-lg shadow-[#519489]/50"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  disabled={isAnimating}
                >
                  {i === index && (
                    <div className="absolute inset-0 rounded-full bg-[#519489] animate-ping" />
                  )}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={isAnimating || toursList.length <= 1}
              className="group relative bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#519489]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
            >
              <ArrowRight
                size={screenSize === "sm" ? 16 : 20}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6ba89d] to-[#519489] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Auto-play indicator - Hidden on mobile */}
        {screenSize !== "sm" && (
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 transition-opacity duration-300 ${
                isAutoPlaying ? "opacity-100" : "opacity-50"
              }`}
            >
              <div className="w-2 h-2 bg-[#519489] rounded-full animate-pulse" />
              Auto-playing • Hover to pause • Click cards to view details
            </div>
          </div>
        )}

        {/* Mobile touch instructions */}
        {screenSize === "sm" && (
          <div className="text-center mb-8 px-4">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-[#519489] rounded-full animate-pulse" />
              Swipe or use arrows • Tap cards to view details
            </div>
          </div>
        )}

        {/* Statistics Section - Responsive grid */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { number: `${toursList.length}+`, label: "Amazing Tours" },
              {
                number: `${toursList.reduce(
                  (acc, tour) => acc + parseInt(tour.participants),
                  0
                )}+`,
                label: "Happy Travelers",
              },

              {
                number: `${
                  new Set(
                    toursList.flatMap(
                      (tour) =>
                        tour.cities?.map((city) => city.country_id) || []
                    )
                  ).size
                }+`,
                label: "Countries",
              },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center group">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#519489] mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(-100%) rotate(-5deg);
          }
          100% {
            transform: translateX(100%) rotate(-5deg);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-wave {
          animation: wave linear infinite;
        }

        .animate-sparkle {
          animation: sparkle ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

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

        /* Mobile specific styles */
        @media (max-width: 640px) {
          .perspective-1000 {
            perspective: none;
          }

          .preserve-3d {
            transform-style: flat;
          }
        }

        /* Smooth scrolling for dot indicators on mobile */
        @media (max-width: 640px) {
          .max-w-xs {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .max-w-xs::-webkit-scrollbar {
            display: none;
          }
        }

        /* Enhanced hover effects for larger screens */
        @media (min-width: 1024px) {
          .group:hover .line-clamp-3 {
            -webkit-line-clamp: 4;
          }
        }
      `}</style>
    </div>
  );
}
