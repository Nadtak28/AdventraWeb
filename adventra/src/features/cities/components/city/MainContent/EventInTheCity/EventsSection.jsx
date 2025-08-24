import EventCard from "./EventCard";
import { useSelector, useDispatch } from "react-redux";
import { CityEventsService } from "../../../../api/cityEventService";
import { useEffect } from "react";
import { Calendar } from "lucide-react";
import SkeletonCard from "../skeletonCard";

const EventsSection = ({ cityId }) => {
  const dispatch = useDispatch();
  const { events, loadingEvents: loading } = useSelector(
    (state) => state.cities
  );

  useEffect(() => {
    if (cityId) {
      dispatch(CityEventsService(cityId));
    }
  }, [dispatch, cityId]);

  return (
    <section className="opacity-0 animate-fade-in-up animation-delay-800">
      <div className="flex items-center gap-3 px-4 md:px-6 mb-4">
        <div className="p-2 rounded-lg bg-[#519489]/10">
          <Calendar className="w-6 h-6 text-[#519489]" />
        </div>
        <h2 className="text-[#101918] text-2xl font-bold">
          Events in the City
        </h2>
      </div>

      <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch gap-4 px-4 py-2 md:px-6">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <SkeletonCard key={i} className="min-w-[200px] h-48 rounded-xl" />
            ))
          ) : !events || events.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-12">
              <div className="text-center opacity-0 animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#519489]/10 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-[#519489]/60" />
                </div>
                <p className="text-[#519489]/60 text-lg font-medium">
                  No events scheduled
                </p>
                <p className="text-[#519489]/40 text-sm mt-1">
                  Check back later for upcoming events
                </p>
              </div>
            </div>
          ) : (
            (Array.isArray(events) ? events : []).map((event, index) => (
              <EventCard key={event.id || index} event={event} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
export default EventsSection;
