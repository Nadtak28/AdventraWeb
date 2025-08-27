import GuideCard from "./guideCard";
import { useState, useEffect, useMemo } from "react";

const GuideGrid = ({ guides }) => {
  const [visibleCards, setVisibleCards] = useState([]);

  // Memoize guides to prevent unnecessary re-renders
  const memoizedGuides = useMemo(() => guides, [guides]);

  useEffect(() => {
    // Only animate new cards that haven't been shown yet
    const newCardIndexes = [];

    memoizedGuides.forEach((_, index) => {
      if (!visibleCards.includes(index)) {
        newCardIndexes.push(index);
      }
    });

    // Staggered animation for new cards only
    newCardIndexes.forEach((index, animationIndex) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
      }, animationIndex * 150);
    });
  }, [memoizedGuides, visibleCards]);

  // Reset visible cards when guides array is completely refreshed (like on page reload)
  useEffect(() => {
    if (memoizedGuides.length === 0) {
      setVisibleCards([]);
    }
  }, [memoizedGuides.length]);

  return (
    <div className="px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
        {memoizedGuides.map((guide, index) => (
          <div
            key={guide.id || `guide-${index}`}
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
