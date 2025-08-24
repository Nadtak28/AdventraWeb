import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EventsService } from "../api/eventsService";
import { OneEventService } from "../api/oneEventService";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function EventCardList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [touchStartX, setTouchStartX] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { list: events, loadingList } = useSelector((state) => state.events);

  useEffect(() => {
    if (!loadingList && events.length === 0) {
      dispatch(EventsService());
    }
  }, [dispatch, loadingList, events.length]);

  // Enhanced auto-scroll with pause on hover
  useEffect(() => {
    let interval;
    if (!hoveredCard) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
          }
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [hoveredCard]);

  const handleScroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 50) handleScroll("left");
    else if (delta < -50) handleScroll("right");
    setTouchStartX(null);
  };

  const handleClick = (id) => {
    dispatch(OneEventService(id));
    navigate(`/events/${id}`);
  };

  if (loadingList || !events.length) return null;

  return (
    <div className="relative w-full">
      {/* Navigation Buttons */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-xl group"
      >
        <svg
          className="w-5 h-5 text-[#519489] group-hover:text-[#3d7068] transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() => handleScroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-xl group"
      >
        <svg
          className="w-5 h-5 text-[#519489] group-hover:text-[#3d7068] transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide max-w-full pointer-events-auto px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            onClick={() => handleClick(event.id)}
            onHoverStart={() => setHoveredCard(event.id)}
            onHoverEnd={() => setHoveredCard(null)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              y: -10,
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
            className="min-w-[280px] max-w-[280px] bg-white backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden flex-shrink-0 cursor-pointer group relative border border-gray-100 hover:border-[#519489]/30"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#519489]/0 via-transparent to-[#519489]/0 group-hover:from-[#519489]/10 group-hover:to-[#519489]/5 transition-all duration-500 rounded-2xl z-10 pointer-events-none" />

            {/* Image container with overlay effects */}
            <div className="relative overflow-hidden h-48">
              <motion.img
                src={
                  event.images?.[0]?.url ??
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
                }
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out" />

              {/* Price badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                className="absolute top-3 right-3 bg-[#519489] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
              >
                ${event.price}
              </motion.div>

              {/* Floating elements */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <svg
                    className="w-4 h-4 text-[#519489]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="p-5 relative z-20">
              <motion.h3
                className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#519489] transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {event.name}
              </motion.h3>

              <motion.p
                className="text-sm text-gray-600 line-clamp-3 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {event.description}
              </motion.p>

              {/* Hover action */}
              <motion.div
                className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
              >
                <div className="flex items-center text-[#519489] font-medium text-sm">
                  <span>Explore Event</span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#519489] to-[#6ba89d] group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
