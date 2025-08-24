import { useState } from "react";
import { ChevronRight, Star, MapPin, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GuideCard = ({
  id,
  name,
  rate,
  images,
  tours = Math.floor(Math.random() * 20) + 5,
  experience = Math.floor(Math.random() * 8) + 2,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/guides/${id}`); // Navigate to guide detail page
  };
  const imageUrl =
    images?.[0] ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
  const rating = rate && rate !== "0" ? parseFloat(rate).toFixed(1) : "4.8";
  const stars = Math.floor(parseFloat(rating));

  return (
    <div
      className="group cursor-pointer transform transition-all duration-500 ease-out hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      {/* Card container with shadow and backdrop */}
      <div
        className={`relative bg-white rounded-3xl p-6 shadow-lg transition-all duration-500 ease-out transform ${
          isHovered ? "shadow-2xl shadow-[#519489]/20 scale-105" : "shadow-md"
        }`}
      >
        {/* Gradient overlay that appears on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-[#519489]/10 to-transparent rounded-3xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Image container with multiple effects */}
          <div className="relative">
            {/* Rotating ring background */}
            <div
              className={`absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-r from-[#519489] via-[#519489]/70 to-[#519489]/40 transform transition-all duration-1000 ${
                isHovered ? "rotate-180 scale-110" : "rotate-0 scale-100"
              }`}
            ></div>

            {/* Inner rotating ring */}
            <div
              className={`absolute inset-2 w-44 h-44 rounded-full bg-gradient-to-l from-white/80 to-white/60 transform transition-all duration-700 delay-100 ${
                isHovered ? "-rotate-90 scale-105" : "rotate-0 scale-100"
              }`}
            ></div>

            {/* Profile image */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src={imageUrl}
                alt={name}
                className={`w-full h-full object-cover transform transition-all duration-700 ease-out ${
                  isHovered
                    ? "scale-110 brightness-110"
                    : "scale-100 brightness-100"
                } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
                style={{ filter: isHovered ? "saturate(1.2)" : "saturate(1)" }}
              />

              {/* Loading shimmer */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
              )}

              {/* Hover overlay with info */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-[#121416]/80 via-transparent to-transparent flex items-end justify-center pb-4 transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-white text-sm font-medium flex items-center space-x-2">
                  <Users size={14} />
                  <span>{tours} tours</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className={`absolute -top-2 -right-2 bg-gradient-to-r from-[#519489] to-[#519489]/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform transition-all duration-500 ${
                isHovered ? "scale-110 rotate-3" : "scale-100 rotate-0"
              }`}
            >
              {experience}+ years
            </div>
          </div>

          {/* Text content with staggered animations */}
          <div className="space-y-3 w-full">
            <h3
              className={`text-[#121416] text-xl font-bold transform transition-all duration-500 delay-100 ${
                isHovered ? "scale-105 text-[#519489]" : "scale-100"
              }`}
            >
              {name}
            </h3>

            {/* Rating with animated stars */}
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`transform transition-all duration-300 delay-${
                    i * 50
                  } ${
                    i < stars
                      ? "text-yellow-400 fill-yellow-400 scale-100"
                      : "text-gray-300 scale-90"
                  } ${isHovered ? "scale-110 rotate-12" : ""}`}
                />
              ))}
              <span className="text-[#519489] text-sm font-semibold ml-2">
                {rating}
              </span>
            </div>

            {/* Additional info that slides in on hover */}
            <div
              className={`transform transition-all duration-500 overflow-hidden ${
                isHovered
                  ? "max-h-20 opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 pt-2">
                <div className="flex items-center space-x-1">
                  <MapPin size={12} />
                  <span>Local Expert</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>Quick Response</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action button */}
          <div
            className={`transform transition-all duration-500 delay-200 ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <button className="bg-gradient-to-r from-[#519489] to-[#519489]/80 text-white px-6 py-2 rounded-full font-medium text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <span>View Profile</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div
          className={`absolute top-4 left-4 w-2 h-2 bg-[#519489] rounded-full transform transition-all duration-500 ${
            isHovered ? "scale-150 opacity-100" : "scale-100 opacity-50"
          }`}
        ></div>
        <div
          className={`absolute bottom-4 right-4 w-2 h-2 bg-[#519489] rounded-full transform transition-all duration-500 delay-100 ${
            isHovered ? "scale-150 opacity-100" : "scale-100 opacity-50"
          }`}
        ></div>
      </div>
    </div>
  );
};
export default GuideCard;
