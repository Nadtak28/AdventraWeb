import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OneGuideService } from "../../../../api/oneGuideService";
import { RelatedGuidesService } from "../../../../api/relatedGuidesService";
import SimilarGuideCard from "./similarGuidesCard";
import LoadingSpinner from "../loadingSpinner";
import AnimatedCard from "../animatedCard";

const SimilarGuides = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Get data from Redux store instead of calling services as hooks
  const { detail: guide } = useSelector((state) => state.guides);
  const {
    relatedGuidesDetails: similarGuides,
    loadingRelatedGuidesDetail: loading,
    errorRelatedGuidesDetail: error,
  } = useSelector((state) => state.guides);

  // Dispatch the action when component mounts or id changes
  useEffect(() => {
    if (id) {
      dispatch(RelatedGuidesService(parseInt(id)));
    }
  }, [id, dispatch]);

  if (loading) return <LoadingSpinner text="Finding similar guides..." />;

  if (error)
    return (
      <div className="text-center p-8 bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 animate-fadeIn">
        <div className="from-white bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-red-200">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to load similar guides
          </h3>
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      </div>
    );

  if (!similarGuides || similarGuides.length === 0) {
    return (
      <AnimatedCard className="text-center p-12 bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-gray-50 to-white rounded-2xl border border-gray-100 shadow-lg">
        <div className="text-gray-500">
          <div className="relative">
            <svg
              className="w-20 h-20 mx-auto mb-4 opacity-30 animate-float"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-[#519489] rounded-full animate-ping"></div>
            </div>
          </div>
          <h3 className="text-xl dark:text-white font-semibold text-gray-700 mb-3">
            No similar guides found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
            We couldn't find guides with similar specialties at the moment. Try
            exploring our other amazing guides!
          </p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r cursor-pointer from-[#519489] to-[#6ba89d] text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
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
              Browse All Guides
            </span>
          </button>
        </div>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard delay={300} className="space-y-8">
      {/* Header Section */}
      <div className="text-center animate-slideDown">
        <div className="relative inline-block">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r dark:from-white dark:to-[#519489] from-gray-900 via-[#519489] to-gray-900 bg-clip-text text-transparent">
            Similar Guides
          </h2>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#519489] to-[#6ba89d] rounded-full"></div>
        </div>
        <p className="text-[#519489] font-medium mt-4 text-lg">
          Discover other amazing local guides who share similar expertise
        </p>
        <div className="flex items-center justify-center mt-2 space-x-2 text-sm text-gray-500">
          <span>{similarGuides.length} guides found</span>
          <span>•</span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-[#519489]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Verified profiles
          </span>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {similarGuides.map((guide, index) => (
          <SimilarGuideCard key={guide.id} guide={guide} index={index} />
        ))}
      </div>

      {/* Show More Button (if there are more guides available) */}
      {similarGuides.length >= 4 && (
        <div
          className="text-center animate-slideUp"
          style={{ animationDelay: "800ms" }}
        >
          <button className="group relative px-8 py-4 bg-white border-2 border-[#519489] text-[#519489] font-semibold rounded-full hover:bg-[#519489] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 group-hover:animate-bounce"
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
              View More Guides
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#519489] to-[#6ba89d] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
      )}

      {/* Categories Filter Hint */}
      {guide?.categories && guide.categories.length > 0 && (
        <div
          className="bg-gradient-to-r from-[#519489]/5 to-[#6ba89d]/5 rounded-2xl p-6 animate-slideUp"
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-[#519489] to-[#6ba89d] rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">
                Based on your interests
              </h4>
              <p className="text-gray-600 mb-3">
                These guides specialize in similar categories as
                <span className="text-[#519489] font-semibold">
                  {guide.name}
                </span>
                :
              </p>

              <div className="flex flex-wrap gap-2">
                {guide.categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white border border-[#519489]/20 text-[#519489] hover:bg-[#519489] hover:text-white transition-colors duration-200"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatedCard>
  );
};

export default SimilarGuides;
