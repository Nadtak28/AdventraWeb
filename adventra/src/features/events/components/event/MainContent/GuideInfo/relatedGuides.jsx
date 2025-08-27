import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RelatedGuidesService } from "../../../../api/relatedGuidesService"; // Update path
import {
  Star,
  MapPin,
  Phone,
  Users,
  Clock,
  ArrowRight,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RelatedGuides = ({ eventId }) => {
  const dispatch = useDispatch();
  const { relatedGuides, loadingRelatedGuides, errorRelatedGuides } =
    useSelector((state) => state.events);

  useEffect(() => {
    if (eventId) {
      dispatch(RelatedGuidesService(eventId));
    }
  }, [dispatch, eventId]);

  const navigate = useNavigate();

  function handleGuideClick(guide) {
    navigate(`/guides/${guide.id}`);
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  if (loadingRelatedGuides) {
    return (
      <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Related Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-200  rounded w-3/4"></div>
                <div className="h-4 bg-gray-200  rounded w-full"></div>
                <div className="h-4 bg-gray-200  rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (errorRelatedGuides) {
    return (
      <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl p-8 shadow-lg">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">
            Failed to load guides
          </h3>
          <p className="text-gray-500">{errorRelatedGuides}</p>
        </div>
      </div>
    );
  }

  if (!relatedGuides || relatedGuides.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl dark:text-white font-bold text-gray-800 mb-6">
          Related Guides
        </h2>
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">
            No related guides found
          </h3>
          <p className="text-gray-500 dark:text-[#519489]">
            Check back later for new guide recommendations
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold dark:text-white text-gray-800">
          Related Guides
        </h2>
        <div className="w-12 h-1 bg-[#519489] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedGuides.map((guide, index) => (
          <div
            onClick={() => handleGuideClick(guide)}
            key={guide.id}
            className="group bg-white dark:bg-[#1a1f2e] cursor-pointer rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            style={{
              animationDelay: `${index * 150}ms`,
              animation: "slideInUp 0.6s ease-out forwards",
            }}
          >
            {/* Price Badge - Now at the top */}
            <div className="flex justify-between items-start p-6 pb-4">
              <div className="bg-[#519489] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ${guide.price}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  {renderStars(parseFloat(guide.rate))}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {guide.rate} ({guide.reviewer_count})
                </span>
              </div>
            </div>

            {/* Guide Info */}
            <div className="px-6 pb-6">
              <h3 className="text-xl font-bold dark:text-white text-gray-800 mb-2 group-hover:text-[#519489] transition-colors duration-300">
                {guide.name}
              </h3>

              <p className="text-gray-600 dark:text-white text-sm mb-4 line-clamp-3 leading-relaxed">
                {guide.description}
              </p>

              {/* Location */}
              {guide.city && (
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-[#519489]" />
                  <span>{guide.city.name}</span>
                </div>
              )}

              {/* Phone */}
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <Phone className="w-4 h-4 mr-2 text-[#519489]" />
                <span>{guide.phone}</span>
              </div>

              {/* Languages */}
              {guide.languages && guide.languages.length > 0 && (
                <div className="flex items-center mb-4">
                  <Globe className="w-4 h-4 mr-2 text-[#519489]" />
                  <div className="flex flex-wrap gap-1">
                    {guide.languages.slice(0, 3).map((lang, idx) => (
                      <span
                        key={lang.id}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {lang.name}
                      </span>
                    ))}
                    {guide.languages.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                        +{guide.languages.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Categories */}
              {guide.categories && guide.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.categories.slice(0, 2).map((category) => (
                    <span
                      key={category.id}
                      className="bg-[#519489] bg-opacity-10 text-[#519489] px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {category.name}
                    </span>
                  ))}
                  {guide.categories.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      +{guide.categories.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* Action Button */}
              <button className="w-full bg-[#519489] cursor-pointer text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#3d7068] transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105 transform">
                <span>View Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Recent Feedback */}
            {guide.feedbacks && guide.feedbacks.length > 0 && (
              <div className="px-6 pb-6">
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-[#519489]" />
                    Recent Review
                  </h4>
                  <div className="bg-gray-50 dark:bg-[#1a1f2e] rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      {guide.feedbacks[0].user.image &&
                      guide.feedbacks[0].user.image.length > 0 ? (
                        <img
                          src={guide.feedbacks[0].user.image[0].url[0]}
                          alt={guide.feedbacks[0].user.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#519489] flex items-center justify-center">
                          <span className="text-white  text-xs font-semibold">
                            {guide.feedbacks[0].user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-medium dark:text-white text-gray-700">
                        {guide.feedbacks[0].user.name}
                      </span>
                      <div className="flex items-center ml-auto">
                        {renderStars(guide.feedbacks[0].rating)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-[#519489] line-clamp-2">
                      {guide.feedbacks[0].comment}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
      `}</style>
    </div>
  );
};

export default RelatedGuides;
