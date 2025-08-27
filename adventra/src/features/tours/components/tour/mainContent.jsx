import TourHero from "../tour/mainContent/TourHero/tourHero";
import TourStats from "../tour/mainContent/TourStats/tourStats";
import Itinerary from "../tour/mainContent/Itinerary/itinerary";
import DestinationsCarousel from "../tour/mainContent/DestinationCarousel/destinationsCarousel";
import ReviewsSection from "../../../../components/ReviewSection/reviewSection";
import GuideSection from "../tour/mainContent/GuideSection/guideSection";
import AvailableDates from "./mainContent/AvailableDates/availableDates";
import BookingCTA from "../tour/mainContent/BookingCTA/bookingCTA";
import { Loader2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { OneTourService } from "../../api/oneTourService";
import { GetInfoUserService } from "../../../user/api/getInfoUserService";
import { useParams } from "react-router-dom";

export default function MainContent() {
  const { id } = useParams();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const dispatch = useDispatch();
  const {
    detail: tour,
    loadingDetail,
    errorDetail,
  } = useSelector((state) => state.tours);

  useEffect(() => {
    dispatch(OneTourService(id));
  }, [dispatch, id]);

  const { user, status, error } = useSelector((state) => state.getUserInfo);
  console.log("User state:", { user, status, error });

  useEffect(() => {
    dispatch(GetInfoUserService());
  }, [dispatch]);

  // wait for user
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1a1f2e] dark:text-white flex items-center justify-center">
        Loading tour info...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load tour info.
      </div>
    );
  }

  console.log("MainContent user:", user);

  if (loadingDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#519489] mx-auto mb-4" />
          <h2 className="text-xl bg-white dark:bg-[#1a1f2e] dark:text-white font-semibold text-gray-900">
            Loading tour details...
          </h2>
        </div>
      </div>
    );
  }

  if (errorDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl bg-white dark:bg-[#1a1f2e] dark:text-white font-semibold text-gray-900 mb-2">
            Error loading tour
          </h2>
          <p className="text-gray-600">{errorDetail}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-[#1a1f2e]  bg-white">
      {/* Background Elements */}
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

      <main className="relative max-w-6xl mx-auto px-4 py-8 transition-all duration-300">
        <TourHero
          tourStats={tour?.status}
          price={tour?.price}
          name={tour?.name}
          tourImages={tour?.images?.map((img) => img.url) || ["fallback-url"]}
          tourVideos={tour?.videos?.map((vid) => vid.url) || ["fallback-url"]}
          rate={tour?.rate}
          reviewCounts={tour?.reviews_count}
        />

        <TourStats
          startingDate={tour?.starting_date}
          endingDate={tour?.ending_date}
          ticketsCount={tour?.remaining_tickets}
          tourStats={tour?.status}
        />
        <Itinerary events={tour?.events} />
        <DestinationsCarousel cities={tour?.cities} />
        <ReviewsSection
          type="group_trip"
          entityId={Number(id)}
          feedbacks={tour?.feedbacks}
          currentUserId={user?.id}
          onUserModalToggle={setIsUserModalOpen}
        />
        <GuideSection guide={tour?.guide} />
        <AvailableDates
          startDate={tour?.starting_date}
          endDate={tour?.ending_date}
        />
      </main>

      <BookingCTA
        price={tour?.price}
        tourId={Number(id)}
        ticketsLeft={tour?.tickets_count}
        startDate={tour?.starting_date}
        endDate={tour?.ending_date}
        tourImage={
          tour?.image ||
          tour?.images?.[0] ||
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        }
        tourName={tour?.name}
        // Pass the entire tour object
      />

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
        .animate-float {
          animation: float ease-in-out infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
