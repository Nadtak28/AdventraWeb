import { Star } from "lucide-react";
import AnimatedSection from "../animatedSection";
import { useNavigate } from "react-router-dom";
function Itinerary({ events }) {
  const navigate = useNavigate();

  function onClick(event) {
    navigate(`/events/${event.id}`);
  }
  return (
    <AnimatedSection delay={300}>
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
        <div className="space-y-6">
          {events?.map((event, index) => (
            <div
              key={event.id}
              onClick={() => onClick(event)}
              className="flex gap-6 group hover:cursor-pointer"
            >
              {/* Day Marker */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#519489] text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                {index < events.length - 1 && (
                  <div className="w-0.5 h-16 bg-[#519489]/30 mt-4"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300 group-hover:border-[#519489]/20">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {event.rate}
                      </span>
                      <span className="text-gray-500">
                        {event.reviewer_count} reviews
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[#519489]">
                      ${event.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
export default Itinerary;
