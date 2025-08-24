import EventInfoItem from "./eventInfoItem";
import AnimatedSection from "../animatedSection";
import LoadingSkeleton from "../loadingSkeleton";
import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const navigate = useNavigate();
  function onClick(event) {
    navigate(`/cities/${event.city.id}`);
  }
  if (!event) return <LoadingSkeleton className="w-full h-64" />;

  return (
    <AnimatedSection
      delay={300}
      className="layout-content-container flex flex-col max-w-[960px] flex-1"
    >
      <h2 className="text-[#0e1a18] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
        {event.name}
      </h2>
      <p className="text-[#0e1a18] text-base font-normal leading-normal pb-3 pt-1 px-4">
        {event.description}
      </p>
      <div className="space-y-1">
        <EventInfoItem
          label="City"
          onClick={() => onClick(event)}
          value={event.city?.name || "N/A"}
        />

        <EventInfoItem label="Category" value={event.category?.name || "N/A"} />
        <EventInfoItem
          label="Rating"
          value={`${event.rate || "0"} (${event.reviewer_count || 0} reviews)`}
          arrow={false}
        />
      </div>
    </AnimatedSection>
  );
}

export default EventCard;
