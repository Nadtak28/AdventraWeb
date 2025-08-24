import GuideCard from "./guideCard";
import { useState, useEffect } from "react";

const GuideGrid = ({ guides }) => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    // Staggered animation for cards appearing
    guides.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
      }, index * 150);
    });
  }, [guides]);

  return (
    <div className="px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
        {guides.map((guide, index) => (
          <div
            key={guide.id || index}
            className={`transform transition-all duration-700 ease-out ${
              visibleCards.includes(index)
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-12 opacity-0 scale-95"
            }`}
          >
            <GuideCard {...guide} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideGrid;
