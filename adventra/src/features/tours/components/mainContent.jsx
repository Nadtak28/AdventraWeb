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
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

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
      `https://images.unsplash.com/photo-${Math.floor(
        Math.random() * 1000000000
      )}?w=800&h=600&fit=crop`,
    price: parseInt(tour.price, 10) || 0,
    rating: parseFloat(tour.rate) || 4.5,
    duration: `${Math.ceil(
      (new Date(tour.ending_date) - new Date(tour.starting_date)) /
        (1000 * 60 * 60 * 24)
    )} days`,
    participants: `${tour.tickets_count}+`,
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

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 10, y: y * 10 });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const getVisibleCards = () => {
    if (!toursList.length) return [];
    const cards = [];
    for (let i = 0; i < Math.min(5, toursList.length); i++) {
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
    setTimeout(() => setIsAnimating(false), 600); // Reduced for smoother transition
  };

  const handlePrev = () => {
    if (isAnimating || !toursList.length) return;
    setIsAnimating(true);
    setIndex((prev) => (prev - 1 + toursList.length) % toursList.length);
    setTimeout(() => setIsAnimating(false), 600); // Reduced for smoother transition
  };

  const handleDotClick = (i) => {
    if (!isAnimating && i !== index && toursList.length > 0) {
      setIsAnimating(true);
      setIndex(i);
      setTimeout(() => setIsAnimating(false), 600); // Reduced for smoother transition
    }
  };

  const handleCardClick = (tour) => {
    // You can implement navigation or modal opening here
    console.log("Clicked on tour:", tour);
    // Example: navigate to tour detail page
    navigate(`/tours/${tour.id}`);

    // Or open a modal
    // setSelectedTour(tour);
    // setIsModalOpen(true);

    // For now, just log the tour data
  };

  const getCardStyle = (position, isHovered) => {
    const baseTransform = {
      0: {
        // Center front
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
        // Right
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
        // Far right
        transform: `translateX(600px) translateY(0px) translateZ(20px) rotateY(-45deg) scale(0.7)`,
        opacity: 0.5,
        zIndex: 30,
        filter: "brightness(0.8)",
      },
      3: {
        // Left
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
        // Far left
        transform: `translateX(-600px) translateY(0px) translateZ(20px) rotateY(45deg) scale(0.7)`,
        opacity: 0.5,
        zIndex: 30,
        filter: "brightness(0.8)",
      },
    };
    return baseTransform[position] || baseTransform[0];
  };

  // Loading State
  if (loadingList) {
    return (
      <div className="relative dark:bg-[#1a1f2e] bg-white min-h-screen overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#519489] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Loading Amazing Tours...
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch the best experiences for you
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (errorList) {
    return (
      <div className="relative dark:bg-[#1a1f2e] bg-white min-h-screen overflow-hidden flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{errorList}</p>
          <button
            onClick={() => dispatch(ToursService())}
            className="bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
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
      <div className="relative dark:bg-[#1a1f2e] bg-white min-h-screen overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Tours Available
          </h2>
          <p className="text-gray-600">
            Check back later for amazing travel experiences!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative dark:bg-[#1a1f2e] bg-white min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() * 80 + 40,
              height: Math.random() * 80 + 40,
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
          {[...Array(3)].map((_, i) => (
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

        {/* Sparkle effects */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
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
        {/* Header Section */}
        <div className="text-center py-12 px-6">
          <div className="inline-flex items-center gap-2 bg-[#519489]/10 text-[#519489] px-6 py-3 rounded-full text-sm font-bold mb-6 animate-bounce-subtle">
            <div className="w-2 h-2 bg-[#519489] rounded-full animate-pulse" />
            Premium Tours Collection ({toursList.length} Available)
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-4 leading-tight">
            <span className="relative">
              Discover Amazing
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#519489] to-[#6ba89d] transform -rotate-1 animate-pulse-slow" />
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#519489] to-[#6ba89d] bg-clip-text text-transparent animate-gradient">
              Tours
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the world like never before with our carefully curated
            collection of extraordinary adventures
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div
          ref={containerRef}
          className="relative h-[700px] flex items-center justify-center perspective-1000"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          style={{
            transform: `rotateX(${mousePosition.y * 0.5}deg) rotateY(${
              mousePosition.x * 0.5
            }deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center preserve-3d"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
          >
            {visibleCards.map((tour) => {
              const isHovered = hoveredCard === tour.id;
              const cardStyle = getCardStyle(tour.position, isHovered);

              return (
                <div
                  key={`${tour.id}-${tour.position}`}
                  className="absolute bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer group hover:shadow-3xl"
                  style={{
                    width: "350px",
                    height: "500px",
                    ...cardStyle,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                  onMouseEnter={() => setHoveredCard(tour.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(tour)}
                >
                  {/* Card Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop`;
                      }}
                    />

                    {/* Image Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out" />

                    {/* Status Badge */}
                    <div
                      className={`absolute top-4 right-4 text-white px-4 py-2 rounded-full text-xs font-bold transform rotate-12 group-hover:rotate-0 transition-all duration-300 shadow-lg ${
                        tour.status === "pending"
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                          : tour.status === "active"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-gradient-to-r from-[#519489] to-[#6ba89d]"
                      } animate-pulse-slow`}
                    >
                      {tour.status === "pending" ? "Pending" : "Available"}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Star
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      {tour.rating}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 h-60 flex flex-col justify-between relative">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#519489]/5 via-transparent to-[#6ba89d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />

                    <div className="relative z-10">
                      <h2 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#519489] transition-colors duration-300 leading-tight">
                        {tour.name}
                      </h2>

                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {tour.description}
                      </p>

                      {/* Tour Stats */}
                      <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {tour.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={12} />
                          {tour.participants}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          {tour.cities?.length || 0} Cities
                        </div>
                      </div>

                      {/* Guide Info */}
                      {tour.guide && (
                        <div className="text-xs text-gray-500 mb-2">
                          Guide:{" "}
                          <span className="font-semibold text-[#519489]">
                            {tour.guide.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Section */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="text-left">
                        <span className="text-3xl font-black text-[#519489]">
                          ${tour.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          per person
                        </span>
                      </div>

                      <button className="group/btn relative bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white px-6 py-3 rounded-2xl font-bold hover:shadow-2xl hover:shadow-[#519489]/25 transition-all duration-300 hover:scale-105 overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                          Explore
                          <ChevronRight
                            size={16}
                            className="group-hover/btn:translate-x-1 transition-transform duration-200"
                          />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#6ba89d] to-[#519489] translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                      </button>
                    </div>

                    {/* 3D Glow Effect */}
                    <div className="absolute inset-0 rounded-b-3xl bg-gradient-to-br from-[#519489]/10 via-transparent to-[#6ba89d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-2xl shadow-[#519489]/10" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Navigation Controls */}
        <div className="relative z-20 flex items-center justify-center mt-12 mb-8">
          <div className="flex items-center gap-8 bg-white/80 backdrop-blur-lg rounded-full px-8 py-4 shadow-2xl border border-white/20">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={isAnimating || toursList.length <= 1}
              className="group relative bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#519489]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6ba89d] to-[#519489] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Progress Indicators */}
            <div className="flex gap-3">
              {toursList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`relative w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
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
              className="group relative bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#519489]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
            >
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6ba89d] to-[#519489] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center gap-2 text-sm text-gray-500 transition-opacity duration-300 ${
              isAutoPlaying ? "opacity-100" : "opacity-50"
            }`}
          >
            <div className="w-2 h-2 bg-[#519489] rounded-full animate-pulse" />
            Auto-playing • Hover to pause • Click cards to view details
          </div>
        </div>

        {/* Statistics Section */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: `${toursList.length}+`, label: "Amazing Tours" },
              {
                number: `${toursList.reduce(
                  (acc, tour) => acc + parseInt(tour.participants),
                  0
                )}+`,
                label: "Happy Travelers",
              },
              { number: "4.9★", label: "Average Rating" },
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
                <div className="text-4xl font-black text-[#519489] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
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

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
