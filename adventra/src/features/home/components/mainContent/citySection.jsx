import { useEffect, useState } from "react";
import CityCard from "./CityCard";

const CitiesSection = ({ title, cities, onCityClick, className = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cities.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cities.length]);

  return (
    <section
      className={`
      py-12 px-4 sm:px-6 md:px-8 relative overflow-hidden
      bg-white dark:bg-[#1a1f2e] transition-colors duration-300
      ${className}
    `}
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Floating orbs */}
        <div
          className="absolute w-[300px] h-[300px] top-[10%] -left-[10%]
          bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-full dark:from-[#1a1f2e] 
          filter blur-[60px] opacity-10 
          animate-[orbFloat_15s_ease-in-out_infinite]"
        />

        <div
          className="absolute w-[200px] h-[200px] bottom-[20%] -right-[5%]
          bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full dark:from-[#1a1f2e] 
          filter blur-[60px] opacity-10 
          animate-[orbFloat_15s_ease-in-out_infinite] delay-[5s]"
        />

        <div
          className="absolute w-[150px] h-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:from-[#1a1f2e] 
          bg-gradient-radial from-emerald-600 to-transparent rounded-full 
          filter blur-[60px] opacity-10 
          animate-[orbFloat_15s_ease-in-out_infinite] delay-[10s]"
        />

        {/* Background lines */}
        <div className="absolute inset-0 opacity-5 dark:opacity-[0.02]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-emerald-600 to-transparen dark:from-[#1a1f2e]
                animate-[lineGlow_4s_ease-in-out_infinite]"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${i * 0.2}s`,
                height: `${60 + (i % 4) * 20}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-12 relative z-[2]">
        <div
          className="inline-flex items-center gap-2 
          bg-gradient-to-br from-emerald-600/10 to-emerald-500/5 
dark:from-white dark:via-[#6ba59b] dark:to-[#519489]
          border border-emerald-600/20 dark:border-emerald-400/20
          px-4 py-2 rounded-3xl text-emerald-600 dark:text-white 
          text-sm font-semibold mb-5 backdrop-blur-[10px]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span>Destinations</span>
        </div>

        <h2
          className="text-[36px] md:text-[48px] font-black mb-4 leading-tight
          bg-gradient-to-br from-gray-900 via-emerald-600 to-emerald-500 
dark:from-white dark:via-[#6ba59b] dark:to-[#519489]          bg-clip-text text-transparent"
        >
          {title}
        </h2>

        <p
          className="text-gray-500 dark:text-gray-400 text-base leading-[1.7] 
          max-w-[600px] mx-auto mb-6"
        >
          Immerse yourself in diverse cultures and breathtaking landscapes
          across the world's most captivating destinations
        </p>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-2">
          {cities.map((_, index) => (
            <div
              key={index}
              className={`
                w-2 h-2 rounded-full cursor-pointer transition-all duration-300
                ${
                  index === activeIndex
                    ? "bg-emerald-600 dark:bg-white scale-[1.2]"
                    : "bg-emerald-600/30 dark:bg-[#519489] hover:bg-emerald-500  hover:scale-110"
                }
              `}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Cities Container */}
      <div className="relative z-[2]">
        {/* Scroll fade indicators */}
        <div
          className="absolute top-0 bottom-0 left-0 w-10 z-[3] pointer-events-none
          bg-gradient-to-r from-white to-transparent dark:from-[#1a1f2e]"
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-10 z-[3] pointer-events-none
          bg-gradient-to-l from-white to-transparent dark:from-[#1a1f2e]"
        />

        <div
          className="flex gap-8 overflow-x-auto scroll-smooth 
          py-4 px-5 pb-6 scrollbar-hide"
        >
          {cities.map((city, index) => (
            <CityCard
              key={city.id}
              city={city}
              index={index}
              onCityClick={onCityClick}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes orbFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) rotate(120deg);
          }
          66% {
            transform: translateY(15px) rotate(240deg);
          }
        }

        @keyframes lineGlow {
          0%,
          100% {
            opacity: 0.1;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.3;
            transform: scaleY(1.5);
          }
        }
      `}</style>
    </section>
  );
};

export default CitiesSection;
