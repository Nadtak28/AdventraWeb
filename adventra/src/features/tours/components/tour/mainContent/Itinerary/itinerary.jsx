import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "../../../tour/mainContent/animatedSection";
import { useNavigate } from "react-router-dom";

function EventCard({ event, index, isLast }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const media = [
    ...(event.images
      ?.flatMap((img) => (Array.isArray(img.url) ? img.url : [img.url]))
      .map((url) => ({ type: "image", url })) || []),
    ...(event.videos?.map((url) => ({ type: "video", url })) || []),
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % media.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);

  // autoplay logic
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const current = media[currentIndex];
    if (!current) return;

    if (current.type === "image") {
      timerRef.current = setTimeout(() => next(), 3000);
    } else if (current.type === "video") {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex]);

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="flex gap-6 group hover:cursor-pointer"
    >
      {/* Day Marker */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-[#519489] text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
          {index + 1}
        </div>
        {!isLast && <div className="w-0.5 h-16 bg-[#519489]/30 mt-4"></div>}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="bg-gradient-to-br from-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300 group-hover:border-[#519489]/20">
          {/* Media Carousel */}
          {media.length > 0 && (
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
              <div
                className="flex transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {media.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full h-full flex-shrink-0 bg-black flex items-center justify-center"
                  >
                    {item.type === "image" ? (
                      <div
                        className="w-full h-full bg-center bg-cover"
                        style={{ backgroundImage: `url('${item.url}')` }}
                      />
                    ) : (
                      <video
                        ref={idx === currentIndex ? videoRef : null}
                        src={item.url}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        onEnded={next}
                      />
                    )}
                  </div>
                ))}
              </div>

              {media.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          )}

          {/* Title + Description */}
          <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
            {event.name}
          </h3>
          <p className="text-gray-600 dark:text-white mb-4">
            {event.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center dark:text-white gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {event.rate}
              </span>
              <span className="text-gray-500 dark:text-white">
                {event.reviewer_count || 0} reviews
              </span>
            </div>
            <span className="text-lg font-bold text-[#519489]">
              ${event.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Itinerary({ events }) {
  return (
    <AnimatedSection delay={300}>
      <section className="mt-12">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">
          Itinerary
        </h2>
        <div className="space-y-6">
          {events?.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              isLast={index === events.length - 1}
            />
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}

export default Itinerary;
