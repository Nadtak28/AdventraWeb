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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-br from-[#519489]/10 to-[#519489]/5 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
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

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-grid-pattern" />
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#519489]/10 text-[#519489] px-4 py-2 rounded-full text-sm font-semibold border border-[#519489]/20"
            >
              <div className="w-2 h-2 bg-[#519489] rounded-full animate-pulse" />
              Featured Experience
            </motion.div>

            {/* Main title with animated text */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={event?.name ?? "title"}
                className="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="relative">
                  {event?.name ?? "Untitled Event"}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#519489] to-[#6ba89d]"
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={event?.description ?? "desc"}
                className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {(event?.description ?? "No description available.").slice(
                  0,
                  200
                )}
                ...
              </motion.p>
            </AnimatePresence>

            {/* Action buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.button
                onClick={handleDiscover}
                className="group relative bg-[#519489] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Discover Event
                  <motion.svg
                    className="w-5 h-5"
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

            {/* Stats or indicators */}
            <motion.div
              className="flex items-center gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {["150+ Events", "5★ Rating", "10k+ Participants"].map(
                (stat, i) => (
                  <div key={stat} className="text-center">
                    <motion.div
                      className="font-bold text-2xl text-[#519489]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                    >
                      {stat.split(" ")[0]}
                    </motion.div>
                    <div className="text-sm text-gray-500">
                      {stat.split(" ").slice(1).join(" ")}
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Right content - Event cards */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative elements behind cards */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#519489]/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-[#6ba89d]/20 to-transparent rounded-full blur-2xl" />

              <EventCardList />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {events.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-[#519489] w-8" : "bg-gray-300 hover:bg-gray-400"
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
          background-size: 20px 20px;
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
