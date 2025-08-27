import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EmptyState({ type }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  let title = "";
  let description = "";
  let buttonText = "";
  let navigateTo = "";
  let illustration = "";
  let primaryColor = "";
  let secondaryColor = "";

  switch (type) {
    case "group":
      title = "No group tours yet";
      description =
        "Join amazing group adventures and make new friends along the way. Discover breathtaking destinations together!";
      buttonText = "Explore Tours";
      navigateTo = "/tours";
      primaryColor = "from-blue-500 to-blue-600";
      secondaryColor = "bg-blue-50";
      illustration = (
        <svg
          className="w-24 h-24 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      );
      break;
    case "solo":
      title = "No solo trips yet";
      description =
        "Embark on your personal journey of discovery. Create your own adventure and explore at your own pace.";
      buttonText = "Plan Solo Trip";
      navigateTo = "/events";
      primaryColor = "from-purple-500 to-purple-600";
      secondaryColor = "bg-purple-50";
      illustration = (
        <svg
          className="w-24 h-24 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      );
      break;
    case "event":
      title = "No events reserved yet";
      description =
        "Don't miss out on exciting events and experiences. Reserve your spot for upcoming adventures!";
      buttonText = "Explore Events";
      navigateTo = "/events";
      primaryColor = "from-green-500 to-green-600";
      secondaryColor = "bg-green-50";
      illustration = (
        <svg
          className="w-24 h-24 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
      break;
    default:
      title = "Nothing here yet";
      description = "Start exploring and booking amazing experiences!";
      buttonText = "Get Started";
      navigateTo = "/";
      primaryColor = "from-[#519489] to-[#6ba59b]";
      secondaryColor = "bg-[#519489]/5";
  }

  const handleClick = () => {
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <div
      className={`flex flex-col px-6 py-12 transition-all duration-1000 ${
        isVisible
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-8"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Animated Illustration Container */}
        <div className="relative group">
          {/* Background Circles */}
          <div className="absolute -inset-4 opacity-20">
            <div
              className={`w-32 h-32 ${secondaryColor} rounded-full animate-pulse`}
            ></div>
          </div>
          <div className="absolute -inset-2 opacity-30">
            <div
              className={`w-28 h-28 bg-gradient-to-r ${primaryColor} rounded-full animate-ping`}
              style={{ animationDuration: "3s" }}
            ></div>
          </div>

          {/* Main Illustration */}
          <div
            className={`relative flex items-center justify-center w-24 h-24 ${secondaryColor} rounded-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
          >
            {illustration}
          </div>

          {/* Floating Elements */}
          <div
            className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Content */}
        <div
          className={`flex max-w-[480px] flex-col items-center gap-4 transition-all duration-700 delay-300 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4"
          }`}
        >
          <h3 className="text-[#101918] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] text-center">
            {title}
          </h3>
          <p className="text-[#578e85] dark:text-gray-300 text-base font-normal leading-relaxed text-center max-w-[400px]">
            {description}
          </p>
        </div>

        {/* Action Button */}
        {buttonText && (
          <div
            className={`transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
          >
            <button
              onClick={handleClick}
              className={`group cursor-pointer relative overflow-hidden bg-gradient-to-r ${primaryColor} text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95`}
            >
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              {/* Button Content */}
              <span className="relative flex items-center gap-2">
                {buttonText}
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        )}

        {/* Decorative Elements */}
        <div
          className="absolute top-10 left-10 w-2 h-2 bg-[#519489]/30 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-1 h-1 bg-[#6ba59b]/40 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>
    </div>
  );
}
