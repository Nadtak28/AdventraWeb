import { useState, useEffect } from "react";

// Enhanced SectionHeader with gradient and animations
const SectionHeader = ({ title, description }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden dark:bg-[#1a1f2e]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r dark:bg-[#1a1f2e] from-[#519489]/5 to-transparent"></div>

      <div
        className={`relative transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex flex-wrap justify-between gap-3 p-6 dark:bg-[#1a1f2e] bg-white/80 backdrop-blur-sm">
          <h1 className=" tracking-tight text-4xl md:text-5xl font-bold leading-tight min-w-72 bg-gradient-to-r dark:from-white dark:to-[#519489]  from-[#121416] to-[#519489] bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        <p
          className={`text-[#519489] text-lg font-medium leading-relaxed pb-6 pt-2 px-6 transform transition-all duration-1000 delay-300 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {description}
        </p>
      </div>

      {/* Decorative line */}
      <div
        className={`h-1 bg-gradient-to-r from-[#519489] via-[#519489]/50 to-transparent transform transition-all duration-1000 delay-500 ease-out ${
          isVisible ? "scale-x-100" : "scale-x-0"
        } origin-left`}
      ></div>
    </div>
  );
};
export default SectionHeader;
