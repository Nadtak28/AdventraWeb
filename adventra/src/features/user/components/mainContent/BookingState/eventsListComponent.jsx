import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EventsListComponent({ events }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleEventClick = (event) => {
    navigate(`/events/${event.id}`);
  };

  const renderStars = (count) => {
    const fullStars = Math.floor(count / 200); // Assuming 200 stars = 1 full star rating
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < fullStars ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div
      className={`px-6 py-4 transition-all duration-700 ${
        isVisible
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-8"
      }`}
    >
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {events.map((event, index) => (
          <div
            key={event.id}
            onClick={() => handleEventClick(event)}
            className="flex-none w-80 bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100 dark:border-gray-700 overflow-hidden"
            style={{
              animation: `slideInRight 0.6s ease-out ${index * 100}ms forwards`,
              opacity: 0,
            }}
          >
            {/* Event Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-semibold">
                    Event
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                  {renderStars(event.stars_count)}
                  <span className="text-white text-xs ml-1">
                    ({event.reviewer_count})
                  </span>
                </div>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-6">
              <h3 className="text-[#101918] dark:text-white text-xl font-bold leading-tight mb-3 line-clamp-2">
                {event.name}
              </h3>

              <p className="text-[#578e85] dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {event.description}
              </p>

              {/* Pricing */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {event.basic_cost !== event.price && (
                    <span className="text-gray-400 text-sm line-through">
                      ${event.basic_cost}
                    </span>
                  )}
                  <span className="text-green-600 text-xl font-bold">
                    ${event.price}
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  }`}
                >
                  {event.status}
                </div>
              </div>

              {/* Event Details */}
              <div className="flex items-center justify-between text-sm text-[#578e85] dark:text-gray-400">
                <span>
                  Created: {new Date(event.created_at).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
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
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
