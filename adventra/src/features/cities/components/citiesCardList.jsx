import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CitiesService } from "../api/citiesService";

export default function CitiesCardList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    list: cities,
    loadingList: loading,
    errorList: error,
  } = useSelector((state) => state.cities);

  useEffect(() => {
    dispatch(CitiesService());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex items-center justify-center py-20 bg-white min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#519489] mx-auto mb-4"></div>
          <p className="text-lg font-medium text-[#519489]">
            Discovering amazing cities...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center py-20 bg-[#F6F1EC] min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F28C6A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-[#519489]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-[#519489]">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen dark:bg-[#1a1f2e] bg-gradient-to-br bg-white  ">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover-effect:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .image-overlay {
          background: linear-gradient(
            135deg,
            rgba(81, 148, 137, 0.1) 0%,
            rgba(242, 140, 106, 0.1) 100%
          );
        }

        .glow-effect {
          position: relative;
        }

        .glow-effect::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(
            45deg,
            #519489,
            #f28c6a,
            #f6f1ec,
            #519489
          );
          border-radius: inherit;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
          animation: shimmer 3s linear infinite;
          background-size: 400% 400%;
        }

        .glow-effect:hover::before {
          opacity: 0.3;
        }
      `}</style>

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#519489]  bg-clip-text text-transparent mb-6">
            Explore Amazing Cities
          </h2>
          <div className="relative">
            <div className="w-32 h-1 bg-gradient-to-r from-[#519489] via-white to-[#abf1e5] mx-auto rounded-full"></div>
            <div className="absolute inset-0 w-32 h-1 bg-gradient-to-r from-[#519489] via-white to-[#abf1e5] mx-auto rounded-full blur-sm opacity-50"></div>
          </div>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover breathtaking destinations and immerse yourself in cultures
            around the world
          </p>
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {(cities || []).map((city, index) => (
            <div
              key={city.id}
              onClick={() => navigate(`/cities/${city.id}`)}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg card-hover-effect cursor-pointer glow-effect animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container with Advanced Overlay */}
              <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden">
                {city.images && city.images.length > 0 ? (
                  <>
                    <img
                      src={city.images[0].url}
                      alt={city.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Multi-layered Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 image-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-6 group-hover:translate-x-0 transition-all duration-500 shadow-lg">
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    {/* City Name Overlay */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <h4 className="text-white font-bold text-lg drop-shadow-lg">
                        {city.name}
                      </h4>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#F6F1EC] to-[#519489] flex items-center justify-center relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0">
                      <div className="absolute top-4 left-4 w-8 h-8 bg-[#519489] rounded-full opacity-20 animate-float"></div>
                      <div
                        className="absolute bottom-6 right-6 w-6 h-6 bg-[#519489] rounded-full opacity-30 animate-float"
                        style={{ animationDelay: "1s" }}
                      ></div>
                      <div
                        className="absolute top-1/2 left-1/2 w-4 h-4 bg-pink-200 rounded-full opacity-25 animate-float"
                        style={{ animationDelay: "2s" }}
                      ></div>
                    </div>

                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#519489] to-[#F6F1EC] rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">
                        Image Coming Soon
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Content */}
              <div className="p-6 relative">
                {/* City Name with Dynamic Effects */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#519489] group-hover:to-[#abf1e5] group-hover:bg-clip-text transition-all duration-300">
                    {city.name}
                  </h3>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#519489] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
                    <div
                      className="w-2 h-2 bg-[#41f1d3] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"
                      style={{ transitionDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#b5ede3] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"
                      style={{ transitionDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>

                {/* Description with Enhanced Typography */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {city.description}
                </p>

                {/* Advanced Action Bar */}
                <div className="relative">
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-purple-100 transition-colors duration-300">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-[#519489] bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1.5 rounded-full border border-blue-100 group-hover:border-purple-200 transition-all duration-300 group-hover:shadow-sm">
                        Explore City
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Activity Indicator */}
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 bg-gradient-to-r from-[#519489] via-white to-[#abf1e5] rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          ></div>
                        ))}
                      </div>

                      {/* Arrow Icon */}
                      <div className="transform transition-transform duration-300 group-hover:translate-x-1">
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-[#519489] transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {cities && cities.length === 0 && (
          <div className="text-center py-24 animate-fade-in">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              No Cities Found
            </h3>
            <p className="text-gray-500 text-lg">
              Check back soon for amazing destinations to explore!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
