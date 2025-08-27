import AnimatedSection from "../animatedSection";
import { useState } from "react";
function ExperienceCard({ event, index = 0, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl =
    event.images?.[0]?.url ||
    "https://placehold.co/500x300?text=No+Image+Available";

  return (
    <AnimatedSection
      delay={700 + index * 100}
      className={`flex flex-col items-center justify-start gap-2 rounded-lg 
                  w-52 h-72 transform transition-all duration-300 cursor-pointer
                  ${isHovered ? "scale-105 shadow-lg" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div
        onClick={onClick}
        className="w-full h-3/4 rounded-xl overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={event.name}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Text */}
      <div className="w-full px-1 text-center">
        <p className="text-[#0e1a18] dark:text-white text-sm font-medium truncate">
          {event.name}
        </p>
        <p className="text-[#519489] text-xs font-normal">
          {event.category?.name || "Experience"}
        </p>
        <p className="text-[#0e1a18] dark:text-white text-sm font-bold">
          ${event.price}
        </p>
      </div>
    </AnimatedSection>
  );
}
export default ExperienceCard;
