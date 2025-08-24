import { useState } from "react";

const EnhancedTabNavigation = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onViewMore,
}) => {
  const [isScrollable, setIsScrollable] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      {/* Tabs Container */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`
                whitespace-nowrap px-6 py-3 rounded-full font-medium transition-all duration-300 
                transform hover:scale-105 active:scale-95 min-w-fit
                ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white shadow-lg hover:shadow-xl"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#519489]/30 dark:hover:border-[#519489]/30"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* View More Button */}
      <div className="ml-6 flex-shrink-0">
        <button
          onClick={onViewMore}
          className="group flex items-center gap-2 px-4 py-2 text-[#519489] hover:text-[#6ba89d] dark:text-[#6ba89d] dark:hover:text-[#519489] font-medium transition-all duration-300 hover:bg-[#519489]/5 dark:hover:bg-[#519489]/10 rounded-lg"
        >
          <span className="text-sm font-semibold">View More</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EnhancedTabNavigation;
