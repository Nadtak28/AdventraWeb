import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EventsService } from "../api/eventsService";
import { OneEventService } from "../api/oneEventService";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function EventCardList({ screenSize }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [touchStartX, setTouchStartX] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [internalScreenSize, setInternalScreenSize] = useState("lg");
  const { list: events, loadingList } = useSelector((state) => state.events);

  // Use prop screenSize if provided, otherwise detect internally
  const currentScreenSize = screenSize || internalScreenSize;

  // Screen size detection (only if screenSize prop is not provided)
  useEffect(() => {
    if (screenSize) return; // Skip if screenSize is provided as prop

    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setInternalScreenSize("sm");
      else if (width < 768) setInternalScreenSize("md");
      else if (width < 1024) setInternalScreenSize("lg");
      else setInternalScreenSize("xl");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [screenSize]);

  useEffect(() => {
    if (!loadingList && events.length === 0) {
      dispatch(EventsService());
    }
  }, [dispatch, loadingList, events.length]);

  // Enhanced auto-scroll with pause on hover - Responsive timing
  useEffect(() => {
    let interval;
    if (!hoveredCard) {
      const scrollAmount = currentScreenSize === "sm" ? 200 : 280;
      const intervalTime = currentScreenSize === "sm" ? 3000 : 4000;

      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            scrollRef.current.scrollBy({
              left: scrollAmount,
              behavior: "smooth",
            });
          }
        }
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [hoveredCard, currentScreenSize]);

  const handleScroll = (dir) => {
    if (!scrollRef.current) return;
    const scrollAmount = currentScreenSize === "sm" ? 200 : 280;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    const threshold = currentScreenSize === "sm" ? 30 : 50;
    if (delta > threshold) handleScroll("left");
    else if (delta < -threshold) handleScroll("right");
    setTouchStartX(null);
  };

  const handleClick = (id) => {
    dispatch(OneEventService(id));
    navigate(`/events/${id}`);
  };

  if (loadingList || !events.length) return null;

  // Responsive card dimensions
  const cardWidth =
    currentScreenSize === "sm" ? 200 : currentScreenSize === "md" ? 240 : 280;
  const imageHeight =
    currentScreenSize === "sm"
      ? "h-32"
      : currentScreenSize === "md"
      ? "h-40"
      : "h-48";

  return (
    <div className="relative w-full">
      {/* Navigation Buttons - Responsive size and positioning */}
      {currentScreenSize !== "sm" && (
        <>
          <button
            onClick={() => handleScroll("left")}
            className={`absolute ${
              currentScreenSize === "md" ? "left-1 top-1/2" : "left-2 top-1/2"
            } -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full ${
              currentScreenSize === "md" ? "p-2" : "p-3"
            } transition-all duration-300 hover:scale-110 hover:shadow-xl group`}
          >
            <svg
              className={`${
                currentScreenSize === "md" ? "w-4 h-4" : "w-5 h-5"
              } text-[#519489] group-hover:text-[#3d7068] transition-colors`}
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
            className={`absolute ${
              currentScreenSize === "md" ? "right-1 top-1/2" : "right-2 top-1/2"
            } -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full ${
              currentScreenSize === "md" ? "p-2" : "p-3"
            } transition-all duration-300 hover:scale-110 hover:shadow-xl group`}
          >
            <svg
              className={`${
                currentScreenSize === "md" ? "w-4 h-4" : "w-5 h-5"
              } text-[#519489] group-hover:text-[#3d7068] transition-colors`}
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
        </>
      )}

      <div
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`flex ${
          currentScreenSize === "sm"
            ? "gap-3"
            : currentScreenSize === "md"
            ? "gap-4"
            : "gap-6"
        } overflow-x-auto scroll-smooth scrollbar-hide max-w-full pointer-events-auto ${
          currentScreenSize === "sm"
            ? "px-2"
            : currentScreenSize === "md"
            ? "px-3"
            : "px-4"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {events
          .slice(0, currentScreenSize === "sm" ? 8 : events.length) // Limit cards on mobile
          .map((event, index) => (
            <motion.div
              key={event.id}
              onClick={() => handleClick(event.id)}
              onHoverStart={() =>
                currentScreenSize !== "sm" && setHoveredCard(event.id)
              }
              onHoverEnd={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: currentScreenSize === "sm" ? 20 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * (currentScreenSize === "sm" ? 0.05 : 0.1),
                duration: currentScreenSize === "sm" ? 0.4 : 0.6,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={
                currentScreenSize === "sm"
                  ? {}
                  : {
                      y: -10,
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }
              }
              whileTap={{ scale: 0.95 }}
              className={`min-w-[${cardWidth}px] max-w-[${cardWidth}px] bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-white backdrop-blur-sm ${
                currentScreenSize === "sm" ? "rounded-xl" : "rounded-2xl"
              } shadow-lg overflow-hidden flex-shrink-0 cursor-pointer group relative border border-gray-100 dark:border-gray-700 hover:border-[#519489]/30`}
              style={{ minWidth: cardWidth, maxWidth: cardWidth }}
            >
              {/* Gradient overlay on hover - Disabled on mobile */}
              {currentScreenSize !== "sm" && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#519489]/0 via-transparent to-[#519489]/0 group-hover:from-[#519489]/10 group-hover:to-[#519489]/5 transition-all duration-500 rounded-2xl z-10 pointer-events-none" />
              )}

              {/* Image container with overlay effects */}
              <div className={`relative overflow-hidden ${imageHeight}`}>
                <motion.img
                  src={
                    event.images?.[0]?.url ??
                    "https://placehold.co/500x300?text=No+Image+Available"
                  }
                  alt={event.name}
                  className={`w-full h-full object-cover transition-transform ${
                    currentScreenSize === "sm"
                      ? "duration-300"
                      : "duration-700 group-hover:scale-110"
                  }`}
                />

                {/* Shimmer effect - Disabled on mobile for performance */}
                {currentScreenSize !== "sm" && (
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out" />
                )}

                {/* Price badge - Responsive size */}
                <motion.div
                  initial={{
                    scale: 0,
                    rotate: currentScreenSize === "sm" ? 0 : -180,
                  }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay:
                      index * (currentScreenSize === "sm" ? 0.05 : 0.1) + 0.3,
                    type: currentScreenSize === "sm" ? "tween" : "spring",
                  }}
                  className={`absolute ${
                    currentScreenSize === "sm"
                      ? "top-2 right-2 px-2 py-0.5 text-xs"
                      : "top-3 right-3 px-3 py-1 text-sm"
                  } bg-[#519489] text-white rounded-full font-semibold shadow-lg`}
                >
                  ${event.price}
                </motion.div>

                {/* Floating elements - Hidden on mobile */}
                {currentScreenSize !== "sm" && (
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <svg
                        className="w-4 h-4 text-[#519489]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Content section - Responsive padding and text sizes */}
              <div
                className={`${
                  currentScreenSize === "sm"
                    ? "p-3"
                    : currentScreenSize === "md"
                    ? "p-4"
                    : "p-5"
                } relative z-20`}
              >
                <motion.h3
                  className={`${
                    currentScreenSize === "sm"
                      ? "text-sm"
                      : currentScreenSize === "md"
                      ? "text-base"
                      : "text-lg"
                  } font-bold text-gray-800 dark:text-white ${
                    currentScreenSize === "sm" ? "mb-1" : "mb-2"
                  } ${
                    currentScreenSize === "sm"
                      ? ""
                      : "group-hover:text-[#519489]"
                  } transition-colors duration-300`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay:
                      index * (currentScreenSize === "sm" ? 0.05 : 0.1) + 0.2,
                  }}
                >
                  {currentScreenSize === "sm"
                    ? event.name.slice(0, 25) +
                      (event.name.length > 25 ? "..." : "")
                    : event.name}
                </motion.h3>

                <motion.p
                  className={`${
                    currentScreenSize === "sm" ? "text-xs" : "text-sm"
                  } text-gray-600 dark:text-gray-300 ${
                    currentScreenSize === "sm" ? "line-clamp-2" : "line-clamp-3"
                  } leading-relaxed`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay:
                      index * (currentScreenSize === "sm" ? 0.05 : 0.1) + 0.4,
                  }}
                >
                  {currentScreenSize === "sm"
                    ? event.description.slice(0, 60) +
                      (event.description.length > 60 ? "..." : "")
                    : event.description}
                </motion.p>

                {/* Hover action - Hidden on mobile, simplified on tablet */}
                {currentScreenSize !== "sm" && (
                  <motion.div
                    className={`${
                      currentScreenSize === "md" ? "mt-2" : "mt-4"
                    } opacity-0 group-hover:opacity-100 transition-all duration-300`}
                    initial={{ y: currentScreenSize === "md" ? 10 : 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <div
                      className={`flex items-center text-[#519489] font-medium ${
                        currentScreenSize === "md" ? "text-xs" : "text-sm"
                      }`}
                    >
                      <span>Explore Event</span>
                      <svg
                        className={`${
                          currentScreenSize === "md"
                            ? "w-3 h-3 ml-1"
                            : "w-4 h-4 ml-2"
                        } transition-transform group-hover:translate-x-1`}
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
                )}
              </div>

              {/* Bottom accent line - Simplified on mobile */}
              <div
                className={`absolute bottom-0 left-0 w-0 ${
                  currentScreenSize === "sm" ? "h-0.5" : "h-1"
                } bg-gradient-to-r from-[#519489] to-[#6ba89d] ${
                  currentScreenSize === "sm"
                    ? "group-active:w-full"
                    : "group-hover:w-full"
                } transition-all ${
                  currentScreenSize === "sm" ? "duration-200" : "duration-500"
                }`}
              />
            </motion.div>
          ))}
      </div>

      {/* Mobile scroll indicator */}
      {currentScreenSize === "sm" && (
        <div className="flex justify-center mt-2">
          <div className="flex gap-1">
            {[...Array(Math.min(3, Math.ceil(events.length / 4)))].map(
              (_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"
                />
              )
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
