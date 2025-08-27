import { useState } from "react";
const GuideCard = ({ guide, onClick, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer transition-all     dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 
 duration-500 transform hover:scale-105 hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onClick(guide)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="bg-white     dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 
 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#519489]/30 p-6"
      >
        <div className="relative">
          <div
            className={`absolute -inset-2 bg-gradient-to-r from-[#519489] to-[#6ba89d] rounded-full opacity-0 transition-opacity duration-300 ${
              isHovered ? "opacity-20" : ""
            }`}
          />
          <img
            src={
              guide.image ||
              guide.images?.[0]?.url ||
              guide.videos ||
              guide.videos?.[0].url ||
              "https://via.placeholder.com/800x600?text=No+Image+Available"
            }
            alt={guide.name || guide.title}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 transition-transform duration-500 group-hover:scale-110 relative z-10"
          />
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold dark:text-white text-[#101918] mb-1 group-hover:text-[#519489] transition-colors duration-300">
            {guide.name || guide.title}
          </h3>
          <p className="text-[#519489] text-sm font-medium mb-2">
            {guide.expertise || "Tourism Guide"}
          </p>
          <div className="flex justify-center items-center gap-1">
            {guide.rate && parseFloat(guide.rate) > 0 && (
              <>
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-600 text-sm">{guide.rate}</span>
              </>
            )}
          </div>
        </div>

        <div
          className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-center">
            <span className="text-[#519489] text-sm font-medium">
              View Profile →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GuideCard;
