import ExperienceCard from "./ExperienceCard";
import AnimatedSection from "../animatedSection";
import LoadingSkeleton from "../loadingSkeleton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RelatedEventsService } from "../../../../api/relatedEventsService";
import { useNavigate } from "react-router-dom";

function RelatedExperiences() {
  const dispatch = useDispatch();
  const { relatedEvents, loadingRelated, errorRelated } = useSelector(
    (state) => state.events
  );
  const { detail } = useSelector((state) => state.events);

  useEffect(() => {
    if (detail?.id) {
      dispatch(RelatedEventsService(detail.id));
    }
  }, [dispatch, detail?.id]);

  const navigate = useNavigate();
  function onClick(event) {
    navigate(`/events/${event.id}`);
  }
  if (loadingRelated) {
    return (
      <section className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4">
        <h3 className="text-[#0e1a18] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
          Related experiences
        </h3>
        <div className="flex overflow-x-auto scrollbar-hide p-4 gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingSkeleton key={index} className="min-w-40 h-64 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (errorRelated) {
    return (
      <section className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4">
        <h3 className="text-[#0e1a18] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
          Related experiences
        </h3>
        <p className="text-red-500 text-sm px-4">
          Failed to load related experiences
        </p>
      </section>
    );
  }

  return (
    <AnimatedSection
      delay={650}
      className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4"
    >
      <h3 className="text-[#0e1a18] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
        Related experiences
      </h3>
      <div className="flex overflow-x-auto scrollbar-hide p-4 gap-3">
        {relatedEvents?.map((event, index) => (
          <ExperienceCard
            onClick={() => onClick(event)}
            key={event.id}
            event={event}
            index={index}
          />
        ))}
      </div>
    </AnimatedSection>
  );
}
export default RelatedExperiences;
