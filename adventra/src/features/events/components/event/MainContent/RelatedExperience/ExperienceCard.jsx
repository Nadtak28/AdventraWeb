import AnimatedSection from "../animatedSection";
import { useState } from "react";
function ExperienceCard({ event, index = 0, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl =
    event.images?.[0]?.url ||
    `https://picsum.photos/300/400?random=${event.id || index}`;

  return (
    <AnimatedSection
      delay={700 + index * 100}
      className={`flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40 transform transition-all duration-300 cursor-pointer ${
        isHovered ? "scale-105 shadow-lg" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={onClick}
        className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl transition-all duration-300"
        style={{
          backgroundImage: `url("${imageUrl}")`,
        }}
      />
      <div>
        <p className="text-[#0e1a18] text-base font-medium leading-normal">
          {event.name}
        </p>
        <p className="text-[#519489] text-sm font-normal leading-normal">
          {event.category?.name || "Experience"}
        </p>
        <p className="text-[#0e1a18] text-sm font-bold">${event.price}</p>
      </div>
    </AnimatedSection>
  );
}

export default ExperienceCard;
