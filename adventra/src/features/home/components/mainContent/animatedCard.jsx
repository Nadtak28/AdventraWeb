import { useState } from "react";

const AnimatedCard = ({
  image,
  title,
  description,
  onClick,
  delay = 0,
  type = "default",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-[#519489]/30 dark:hover:border-[#519489]/30">
        <div className="relative overflow-hidden">
          <div
            className="aspect-video bg-cover bg-center w-full transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${image || "/assets/hero-img.png"})`,
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <div
            className={`absolute top-4 right-4 w-8 h-8 bg-[#519489] rounded-full flex items-center justify-center transition-all duration-300 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            <svg
              className="w-4 h-4 text-white"
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
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-[#101918] dark:text-gray-100 text-lg font-bold mb-2 line-clamp-1 group-hover:text-[#519489] dark:group-hover:text-[#6ba89d] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#519489] to-[#6ba89d] transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

export default AnimatedCard;
