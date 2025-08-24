import { useState } from "react";
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "../animatedSection";
function TourHero({ tourImages, tourStats, price, reviewCounts, rate, name }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const images = tourImages || [];
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatedSection>
      <section className="relative">
        {/* Image Carousel */}
        <div className="relative aspect-video rounded-2xl overflow-hidden group shadow-2xl">
          <div
            className="flex transition-transform duration-500 ease-out h-full"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 bg-center bg-cover"
                style={{ backgroundImage: `url('${image}')` }}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Status Badge */}
          <div className="absolute top-6 left-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold text-white backdrop-blur-sm ${
                tourStats === "active" ? "bg-[#519489]/80" : "bg-yellow-500/80"
              }`}
            >
              {tourStats === "active" ? "Available" : "Pending"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-[#519489]">
            <a href="#" className="hover:underline transition-colors">
              Tours
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{name}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {name || "Amazing Tour Experience"}
          </h1>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(parseFloat(rate || 0))
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {rate || "0.0"}
              </span>
            </div>
            <span className="text-gray-600">({reviewCounts || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#519489]">
              ${parseFloat(price || 0).toLocaleString()}
            </span>
            <span className="text-gray-600">per person</span>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

export default TourHero;
