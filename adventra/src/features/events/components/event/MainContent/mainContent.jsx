import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumb/breadCrumbs";
import EventCard from "./EventDetails/eventCard";
import PriceSection from "./PriceSection/priceSection";
import RelatedExperiences from "./RelatedExperience/relatedExperience";
import LoadingSkeleton from "./loadingSkeleton";
import HeroSection from "../MainContent/HeroSection/heroSection";
import { OneEventService } from "../../../api/oneEventService";
import { GetInfoUserService } from "../../../../user/api/getInfoUserService";
import ReviewsSection from "../../../../../components/ReviewSection/reviewSection";

function MainContent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    detail: eventData,
    loadingDetail,
    errorDetail,
  } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.getUserInfo);

  useEffect(() => {
    dispatch(GetInfoUserService());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(OneEventService(id));
    }
  }, [dispatch, id]);

  if (loadingDetail) {
    return (
      <main className="bg-white layout-container flex h-full grow flex-col">
        <div className="layout-content-container flex flex-col max-w-[960px] mx-auto w-full">
          <div className="animate-pulse space-y-8 p-4">
            <LoadingSkeleton className="w-full h-8" />
            <LoadingSkeleton className="w-full h-64 rounded-xl" />
            <LoadingSkeleton className="w-full h-32" />
            <LoadingSkeleton className="w-full h-48" />
          </div>
        </div>
      </main>
    );
  }

  if (errorDetail) {
    return (
      <main className="bg-white layout-container flex h-full grow flex-col">
        <div className="layout-content-container flex flex-col max-w-[960px] mx-auto w-full">
          <div className="text-center py-20">
            <p className="text-red-500 text-lg mb-4">
              Failed to load event details
            </p>
            <button
              onClick={() => dispatch(OneEventService(id))}
              className="bg-[#519489] text-white px-6 py-2 rounded-full hover:bg-[#3d7169] transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!eventData) {
    return (
      <div className="text-center py-10 text-gray-600">
        <LoadingSkeleton className="w-32 h-6 mx-auto" />
      </div>
    );
  }

  return (
    <main className="bg-white layout-container flex h-full grow flex-col relative">
      {/* floating background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, #519489, transparent)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content - Apply blur when modal is open */}
      <div
        className={`layout-content-container flex flex-col max-w-[960px] mx-auto w-full transition-all duration-300 ${
          isModalOpen ? "blur-md" : ""
        }`}
      >
        <Breadcrumbs
          city={eventData.city?.name}
          category={eventData.category?.name}
        />
        <HeroSection images={eventData.images} />
        <EventCard event={eventData} />
        <PriceSection
          price={eventData.price}
          eventId={Number(id)}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          event={eventData} // Pass the event data to PriceSection
        />
        <ReviewsSection
          type="event"
          entityId={Number(id)}
          feedbacks={eventData?.feedbacks}
          currentUserId={user?.id}
        />
        <RelatedExperiences />
      </div>

      {/* Modal backdrop overlay when modal is open */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}
    </main>
  );
}

export default MainContent;
