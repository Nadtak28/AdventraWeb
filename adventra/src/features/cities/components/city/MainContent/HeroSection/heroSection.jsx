import { useEffect, useState } from "react";
import {
  MapPin,
  Globe,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Camera,
  Video,
  Star,
} from "lucide-react";

const MediaSlider = ({ items, type, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const currentItem = items[currentIndex];
  const defaultImage =
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop";

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (autoPlayEnabled && items.length > 1 && !isVideoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [autoPlayEnabled, items.length, isVideoPlaying, currentIndex]);

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    setAutoPlayEnabled(false);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    setAutoPlayEnabled(true);
  };

  const handlePlayButtonClick = (e) => {
    e.stopPropagation();
    const video = document.querySelector(
      `video[data-slider="${type}"][data-index="${currentIndex}"]`
    );
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      className={`relative rounded-2xl min-h-[280px] overflow-hidden group shadow-2xl transform transition-all duration-700 hover:scale-[1.03] hover:shadow-3xl ${
        loaded ? "animate-fade-in-up" : "opacity-0"
      }`}
    >
      {/* Media Background */}
      {type === "video" ? (
        <video
          key={currentItem.url}
          data-slider={type}
          data-index={currentIndex}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          src={currentItem.url}
          autoPlay={false}
          loop
          muted
          controls={false}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105"
          style={{
            backgroundImage: `url("${currentItem?.url || defaultImage}")`,
          }}
        />
      )}

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#519489]/20 via-transparent to-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Animated Background Pattern */}
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="2" fill="%23519489" fill-opacity="0.03"/></svg>')`,
        }}
      ></div>

      {/* Navigation Arrows with enhanced design */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#519489]/30 hover:scale-110 z-30 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-white drop-shadow-lg" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#519489]/30 hover:scale-110 z-30 shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-white drop-shadow-lg" />
          </button>
        </>
      )}

      {/* Enhanced Video Play Button */}
      {type === "video" && (
        <button
          onClick={handlePlayButtonClick}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-md border border-white/30 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#519489]/40 hover:scale-125 z-30 shadow-xl"
        >
          {isVideoPlaying ? (
            <Pause className="w-8 h-8 text-white drop-shadow-lg" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1 drop-shadow-lg" />
          )}
        </button>
      )}

      {/* Enhanced Title and Counter */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {type === "video" ? (
              <Video className="w-5 h-5 text-[#519489] animate-pulse" />
            ) : (
              <Camera className="w-5 h-5 text-[#519489] animate-pulse" />
            )}
            <h3 className="text-white text-xl font-bold tracking-wide drop-shadow-lg">
              {title || (type === "video" ? "City Videos" : "City Gallery")}
            </h3>
          </div>
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-lg">
            <span className="text-white text-sm font-semibold tracking-wide">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Media Indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-3 bg-[#519489] shadow-lg"
                  : "w-3 h-3 bg-white/40 hover:bg-white/70 hover:scale-125"
              }`}
            />
          ))}
        </div>
      )}

      {/* Floating decorative elements */}
      <div
        className="absolute top-4 right-4 opacity-20 animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "3s" }}
      >
        <Star className="w-4 h-4 text-white" />
      </div>
      <div
        className="absolute top-8 left-8 opacity-30 animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "4s" }}
      >
        <Star className="w-3 h-3 text-[#519489]" />
      </div>
    </div>
  );
};

const HeroSection = ({ cityName, cityCountry, cityImage, cityVideos }) => {
  const [loaded, setLoaded] = useState(false);
  const [headerLoaded, setHeaderLoaded] = useState(false);

  const images = cityImage || [];
  const videos = cityVideos || [];
  const hasMedia = images.length > 0 || videos.length > 0;

  useEffect(() => {
    const timer1 = setTimeout(() => setHeaderLoaded(true), 200);
    const timer2 = setTimeout(() => setLoaded(true), 400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Enhanced Header Section */}
      <div
        className={`relative rounded-3xl min-h-[180px] bg-gradient-to-br from-[#519489] via-[#5fa095] to-[#6ba89c] overflow-hidden shadow-2xl transform transition-all duration-1000 ${
          headerLoaded ? "animate-fade-in-up scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Animated background patterns */}
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="2" fill="%23519489" fill-opacity="0.03"/></svg>')`,
          }}
        ></div>

        {/* Floating geometric shapes */}
        <div
          className="absolute top-6 right-6 w-16 h-16 bg-white/10 rounded-full animate-bounce"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-8 left-8 w-8 h-8 bg-white/15 rounded-full animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 right-20 w-12 h-12 bg-white/5 rounded-full animate-bounce"
          style={{ animationDuration: "8s", animationDelay: "2s" }}
        ></div>

        {/* Main content overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>

        <div className="relative z-20 p-8 flex items-center justify-between h-full">
          <div className="space-y-4">
            <div
              className={`flex items-center gap-3 transform transition-all duration-700 ${
                headerLoaded
                  ? "animate-slide-in-left"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <div className="bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30 shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/90 text-base font-semibold tracking-wide drop-shadow-lg">
                {cityCountry}
              </span>
            </div>

            <h1
              className={`text-white text-4xl sm:text-5xl lg:text-6xl font-black drop-shadow-2xl tracking-tight transform transition-all duration-1000 ${
                headerLoaded
                  ? "animate-slide-in-left"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{ animationDelay: "300ms" }}
            >
              {cityName}
            </h1>

            {/* Animated underline */}
            <div
              className={`w-24 h-1 bg-white/80 rounded-full shadow-lg transform transition-all duration-1000 ${
                headerLoaded
                  ? "animate-slide-in-left scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
              style={{ animationDelay: "600ms" }}
            ></div>
          </div>

          <div
            className={`transform transition-all duration-1000 ${
              headerLoaded
                ? "animate-slide-in-right"
                : "opacity-0 translate-x-8"
            }`}
            style={{ animationDelay: "400ms" }}
          >
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-2xl hover:scale-110 transition-transform duration-500 hover:bg-white/25">
              <Globe
                className="w-8 h-8 text-white animate-spin"
                style={{ animationDuration: "8s" }}
              />
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#519489]/50 to-[#6ba89c]/50 transform skew-y-1"></div>
      </div>

      {/* Enhanced Media Sliders */}
      {hasMedia && (
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transform transition-all duration-1000 ${
            loaded ? "animate-slide-in-up" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "800ms" }}
        >
          {/* Images Slider */}
          {images.length > 0 && (
            <div className="transform transition-all duration-700 hover:scale-[1.01]">
              <MediaSlider items={images} type="image" title="Photo Gallery" />
            </div>
          )}

          {/* Videos Slider */}
          {videos.length > 0 && (
            <div
              className="transform transition-all duration-700 hover:scale-[1.01]"
              style={{ animationDelay: "200ms" }}
            >
              <MediaSlider items={videos} type="video" title="Video Tour" />
            </div>
          )}
        </div>
      )}

      {/* Enhanced Fallback when no media */}
      {!hasMedia && (
        <div
          className={`relative rounded-3xl min-h-[280px] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-150 overflow-hidden shadow-xl border-2 border-gray-200/50 transform transition-all duration-1000 ${
            loaded ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "800ms" }}
        >
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="2" fill="%23519489" fill-opacity="0.03"/></svg>')`,
            }}
          ></div>

          <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent"></div>

          <div className="relative z-10 p-8 flex items-center justify-center h-full">
            <div className="text-center space-y-6">
              <div className="relative">
                <Globe className="w-20 h-20 text-[#519489]/60 mx-auto animate-pulse" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#519489]/20 rounded-full animate-ping"></div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500 text-xl font-semibold">
                  Discover {cityName}
                </p>
                <p className="text-gray-400 text-sm">
                  Media content coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.7s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.7s ease-out forwards;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
