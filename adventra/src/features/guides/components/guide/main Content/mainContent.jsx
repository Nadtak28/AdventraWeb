import { useParams } from "react-router-dom";
import { OneGuideService } from "../../../api/oneGuideService";
import { GuideAvailabilityService } from "../../../api/guideAvailabiltyService";
import GuideProfile from "../main Content/GuideProfile/guideProfile";
import BookingSection from "../main Content/BookingSection/bookingSection";
import SimilarGuides from "../main Content/SimilarGuides/similarGuides";
import LoadingSpinner from "../main Content/loadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetInfoUserService } from "../../../../user/api/getInfoUserService";
import ReviewsSection from "../../../../../components/ReviewSection/reviewSection";

const MainContent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Guide details from the main guides slice
  const {
    detail: guide,
    loadingDetail: loadingGuide,
    errorDetail: guideError,
  } = useSelector((state) => state.guides);

  // Availability data from the separate availability slice (simplified)
  const { availability, loadingAvailability, errorAvailability } = useSelector(
    (state) => state.guideAvailabilty
  );

  // User data
  const { user, status, errors } = useSelector((state) => state.getUserInfo);
  console.log("User state:", { user, status, errors });

  // Fetch user info on component mount
  useEffect(() => {
    dispatch(GetInfoUserService());
  }, [dispatch]);

  // Fetch guide details and availability when id changes
  useEffect(() => {
    if (id) {
      // Fetch guide details from main guides slice
      dispatch(OneGuideService(id));

      // Fetch availability data from availability slice
      dispatch(GuideAvailabilityService(id));
    }
  }, [id, dispatch]);

  // Loading state - show loading if any of the main data is loading
  const isLoading = loadingGuide || loadingAvailability;

  // Error state - prioritize guide error since it's most critical
  const hasError = guideError || errorAvailability;
  const primaryError = guideError || errorAvailability;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading guide details..." />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium mb-2">{primaryError}</p>
          {/* Show specific error details */}
          {guideError && (
            <p className="text-red-400 text-sm mb-2">Guide: {guideError}</p>
          )}
          {errorAvailability && (
            <p className="text-red-400 text-sm mb-4">
              Availability: {errorAvailability}
            </p>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#519489] text-white rounded-lg hover:bg-[#417c72] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!guide) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with animated background */}
      <div className="relative overflow-hidden bg-white">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-white"></div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#519489]/5 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-64 h-64 bg-[#519489]/5 rounded-full translate-y-32 -translate-x-32 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-12">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Breadcrumb navigation */}
            <nav className="animate-slideRight">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <a href="/" className="hover:text-[#519489] transition-colors">
                  Home
                </a>
                <span>/</span>
                <a
                  href="/guides"
                  className="hover:text-[#519489] transition-colors"
                >
                  Guides
                </a>
                <span>/</span>
                <span className="text-[#519489] font-medium">{guide.name}</span>
              </div>
            </nav>

            {/* Guide Profile Section */}
            <section className="bg-white">
              <GuideProfile guide={guide} />
            </section>

            {/* Booking Section - Pass only availability data */}
            <section className="flex justify-center">
              <div className="w-full max-w-md">
                <BookingSection
                  price={guide.price}
                  guideId={Number(id)}
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  guideName={guide?.name}
                  guideImage={guide?.image}
                  availability={availability}
                  loadingAvailability={loadingAvailability}
                />
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <ReviewsSection
                type="guide"
                entityId={Number(id)}
                feedbacks={guide?.feedbacks}
                currentUserId={user?.id}
              />
            </section>

            {/* Similar Guides Section */}
            <section>
              <SimilarGuides />
            </section>
          </div>
        </div>
      </div>

      {/* Modal backdrop overlay when modal is open */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}
    </div>
  );
};

export default MainContent;
