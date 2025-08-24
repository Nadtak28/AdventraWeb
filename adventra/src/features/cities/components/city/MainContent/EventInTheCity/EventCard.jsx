import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, index }) => {
  const navigate = useNavigate();
  function onClick(event) {
    navigate(`/events/${event.id}`);
  }
  return (
    <div
      onClick={() => onClick(event)}
      className={`border-2 border-[#519489]/20 bg-white rounded-xl shadow-sm hover:shadow-lg flex flex-col overflow-hidden min-w-[200px] max-w-[220px] snap-start cursor-pointer transform transition-all duration-500 hover:scale-105 hover:border-[#519489]/60 opacity-0 animate-slide-in-right group`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className="w-full aspect-video bg-center bg-cover relative overflow-hidden"
        style={{
          backgroundImage: `url("${
            event.image ||
            event.images?.[0]?.url ||
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop"
          }")`,
        }}
      >
        <div className="absolute inset-0 bg-[#519489]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
            <Calendar className="w-4 h-4 text-[#519489]" />
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2 flex-1">
        <h3 className="text-[#101918] text-sm font-semibold truncate group-hover:text-[#519489] transition-colors duration-300">
          {event.title || event.name || "Upcoming Event"}
        </h3>
        <p className="text-[#519489]/80 text-xs line-clamp-2 leading-relaxed">
          {event.description ||
            "Discover amazing events in this beautiful city"}
        </p>
      </div>
    </div>
  );
};
export default EventCard;
