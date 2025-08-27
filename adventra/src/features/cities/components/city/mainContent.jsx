import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeroSection from "./MainContent/HeroSection/heroSection";
import CityInfoSection from "./MainContent/InfoSection/infoSection";
import EventsSection from "./MainContent/EventInTheCity/EventsSection";
import GuidesSection from "./MainContent/Guide/guidesSection";
import { OneCityService } from "../../api/oneCityService";

const MainContent = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const {
    detail: city,
    loadingDetail: loading,
    errorDetail: error,
  } = useSelector((state) => state.cities);

  useEffect(() => {
    dispatch(OneCityService(id));
  }, [dispatch, id]);

  console.log("ccccccccc", city.country?.name);

  return (
    <main className="bg-white dark:bg-[#1a1f2e]">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        .animation-delay-700 {
          animation-delay: 700ms;
        }
        .animation-delay-800 {
          animation-delay: 800ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>

      <div className="flex flex-col max-w-[1200px] mx-auto w-full">
        {/* Hero Section */}
        <HeroSection
          cityName={city?.name}
          cityCountry={city?.country?.name}
          cityImage={city?.images}
          cityVideos={city?.videos}
        />

        <CityInfoSection
          cityDescription={city?.description}
          cityCountry={city?.country?.name}
          cityLanguage={city?.language?.name}
        />
        {/* Events Section */}
        <div className="mt-8">
          <EventsSection cityId={id} />
        </div>

        {/* Guides Section */}
        <div className="mt-8 mb-8">
          <GuidesSection cityId={id} />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
