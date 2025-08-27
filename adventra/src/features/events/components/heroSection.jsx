/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import EventCardList from "./eventsCardList";
import { useNavigate } from "react-router-dom";
import { EventsService } from "../api/eventsService";
import { OneEventService } from "../api/oneEventService";

export default function HeroSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.events.list);
  const loading = useSelector((state) => state.events.loadingList);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [screenSize, setScreenSize] = useState("lg");

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("sm");
      else if (width < 768) setScreenSize("md");
      else if (width < 1024) setScreenSize("lg");
      else setScreenSize("xl");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    if (!loading && events.length === 0) {
      dispatch(EventsService());
    }
  }, [dispatch, loading, events.length]);

  useEffect(() => {
    if (!events.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [events]);

  if (!events.length) return null;

  const event = events[index];

  const handleDiscover = () => {
    if (!event?.id) return;
    dispatch(OneEventService(event.id));
    navigate(`/events/${event.id}`);
  };

  return (
    <div className="dark:bg-[#1a1f2e] relative min-h-screen bg-white overflow-hidden">
      {/* Animated Background Elements - Responsive count */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes - Fewer on mobile */}
        {[...Array(screenSize === "sm" ? 3 : 6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-br from-[#519489]/10 to-[#519489]/5 rounded-full"
            style={{
              width:
                screenSize === "sm"
                  ? Math.random() * 60 + 30
                  : Math.random() * 100 + 50,
              height:
                screenSize === "sm"
                  ? Math.random() * 60 + 30
                  : Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Subtle grid pattern - Lighter on mobile */}
        <div
          className={`absolute inset-0 ${
            screenSize === "sm" ? "opacity-2" : "opacity-5"
          }`}
        >
          <div className="h-full w-full bg-grid-pattern" />
        </div>
      </div>

      {/* Main content container - Responsive padding and layout */}
      <div
        className={`relative z-10 container mx-auto ${
          screenSize === "sm" ? "px-4" : "px-6 lg:px-8"
        } ${screenSize === "sm" ? "pt-8" : "h-screen"} ${
          screenSize === "sm" ? "" : "flex items-center"
        }`}
      >
        <div
          className={`grid ${
            screenSize === "sm" ? "grid-cols-1 gap-8" : "lg:grid-cols-2 gap-12"
          } items-center w-full ${screenSize === "sm" ? "min-h-screen" : ""}`}
        >
          {/* Left content - Responsive order and spacing */}
          <motion.div
            className={`space-y-4 sm:space-y-6 md:space-y-8 ${
              screenSize === "sm" ? "order-2 pb-8" : ""
            }`}
            initial={{ opacity: 0, x: screenSize === "sm" ? 0 : -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Category badge - Responsive size */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`inline-flex items-center gap-2 bg-[#519489]/10 text-[#519489] ${
                screenSize === "sm"
                  ? "px-3 py-1.5 text-xs"
                  : "px-4 py-2 text-sm"
              } rounded-full font-semibold border border-[#519489]/20`}
            >
              <div className="w-2 h-2 bg-[#519489] rounded-full animate-pulse" />
              Featured Experience
            </motion.div>

            {/* Main title with animated text - Responsive sizes */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={event?.name ?? "title"}
                className={`${
                  screenSize === "sm"
                    ? "text-2xl"
                    : screenSize === "md"
                    ? "text-3xl"
                    : "text-4xl lg:text-6xl xl:text-7xl"
                } dark:text-white font-black text-gray-900 leading-tight`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="relative">
                  {screenSize === "sm"
                    ? (event?.name ?? "Untitled Event").slice(0, 50) +
                      (event?.name?.length > 50 ? "..." : "")
                    : event?.name ?? "Untitled Event"}
                  <motion.div
                    className={`absolute bottom-0 left-0 w-0 ${
                      screenSize === "sm" ? "h-0.5" : "h-1"
                    } bg-gradient-to-r from-[#519489] to-[#6ba89d]`}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </motion.h1>
            </AnimatePresence>

            {/* Description - Responsive length and size */}
            <AnimatePresence mode="wait">
              <motion.p
                key={event?.description ?? "desc"}
                className={`${
                  screenSize === "sm" ? "text-sm" : "text-lg lg:text-xl"
                } dark:text-gray-300 text-gray-600 leading-relaxed ${
                  screenSize === "sm" ? "max-w-full" : "max-w-2xl"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {(event?.description ?? "No description available.").slice(
                  0,
                  screenSize === "sm" ? 120 : 200
                )}
                ...
              </motion.p>
            </AnimatePresence>

            {/* Action buttons - Responsive size */}
            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.button
                onClick={handleDiscover}
                className={`group relative bg-[#519489] cursor-pointer text-white ${
                  screenSize === "sm" ? "px-6 py-3 text-sm" : "px-8 py-4"
                } rounded-xl sm:rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                whileHover={{ scale: screenSize === "sm" ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative  z-10 flex items-center gap-2">
                  {screenSize === "sm" ? "Discover" : "Discover Event"}
                  <motion.svg
                    className={`${screenSize === "sm" ? "w-4 h-4" : "w-5 h-5"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6ba89d] to-[#519489] translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </motion.button>
            </motion.div>

            {/* Stats or indicators - Responsive layout */}
            <motion.div
              className={`flex items-center ${
                screenSize === "sm"
                  ? "justify-between gap-2 pt-4"
                  : "gap-8 pt-8"
              }`}
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            ></motion.div>
          </motion.div>

          {/* Right content - Event cards - Responsive order and size */}
          <motion.div
            className={`relative ${screenSize === "sm" ? "order-1 mb-8" : ""}`}
            initial={{ opacity: 0, x: screenSize === "sm" ? 0 : 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative elements behind cards - Smaller on mobile */}
              <div
                className={`absolute ${
                  screenSize === "sm"
                    ? "-top-5 -right-5 w-20 h-20"
                    : "-top-10 -right-10 w-40 h-40"
                } bg-gradient-to-br from-[#519489]/20 to-transparent rounded-full ${
                  screenSize === "sm" ? "blur-xl" : "blur-3xl"
                }`}
              />
              <div
                className={`absolute ${
                  screenSize === "sm"
                    ? "-bottom-5 -left-5 w-16 h-16"
                    : "-bottom-10 -left-10 w-32 h-32"
                } bg-gradient-to-br from-[#6ba89d]/20 to-transparent rounded-full ${
                  screenSize === "sm" ? "blur-lg" : "blur-2xl"
                }`}
              />

              <EventCardList screenSize={screenSize} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators - Responsive position and size */}
      <motion.div
        className={`absolute ${
          screenSize === "sm"
            ? "bottom-4 left-1/2 transform -translate-x-1/2"
            : "bottom-8 left-1/2 transform -translate-x-1/2"
        } flex gap-2 sm:gap-3 z-20`}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {events
          .slice(0, screenSize === "sm" ? 5 : events.length)
          .map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`${
                screenSize === "sm" ? "w-2 h-2" : "w-3 h-3"
              } rounded-full transition-all duration-300 ${
                i === index
                  ? `bg-[#519489] ${screenSize === "sm" ? "w-4" : "w-8"}`
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
      </motion.div>

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(
            circle,
            #519489 1px,
            transparent 1px
          );
          background-size: ${screenSize === "sm" ? "15px 15px" : "20px 20px"};
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
