import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
} from "../../../../../api/notificationService"; // adjust path if needed

export default function PageTitle() {
  const dispatch = useDispatch();
  const { items: notifications, unreadCount } = useSelector(
    (state) => state.notifications
  );

  const [isVisible, setIsVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Load notifications on mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleNotificationClick = (notif) => {
    setSelectedNotification(notif);
    if (!notif.read_at) {
      dispatch(markNotificationRead(notif.id));
    }
  };

  const closeModal = () => setSelectedNotification(null);

  return (
    <div
      className={`flex flex-wrap justify-between gap-6 p-6 mb-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      {/* Main Content */}
      <div className="flex min-w-72 flex-col gap-4 relative">
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#519489]/10 to-[#6ba59b]/5 rounded-full blur-3xl -z-10"></div>

        <h1
          className={`text-transparent bg-clip-text dark:from-white dark:via-[#6ba59b] dark:to-[#519489] bg-gradient-to-r from-[#101918] via-[#519489] to-[#6ba59b] text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] transition-all duration-700 delay-200 ${
            isVisible ? "translate-x-0" : "-translate-x-4"
          }`}
        >
          Profile
        </h1>

        <p
          className={`text-[#578e85] dark:text-[#8fc4bd] text-lg font-normal leading-relaxed flex items-center gap-2 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          Manage your account and settings
        </p>

        <div
          className={`h-1 bg-gradient-to-r from-[#519489] to-[#6ba59b] rounded-full transition-all duration-1000 delay-600 ${
            isVisible ? "w-24 opacity-100" : "w-0 opacity-0"
          }`}
        ></div>
      </div>

      {/* Quick Actions */}
      <div
        className={`flex items-center gap-3 transition-all duration-700 delay-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Online Status */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border border-green-200 dark:border-green-700/50 backdrop-blur-sm">
          <div className="relative">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>
          <span className="text-green-700 dark:text-green-300 text-sm font-medium">
            Online
          </span>
        </div>

        {/* Enhanced Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((p) => !p)}
            className="group relative p-3 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 dark:border-[#334155]/50 hover:scale-110 hover:rotate-6 hover:bg-gradient-to-br hover:from-[#519489]/10 hover:to-[#6ba59b]/10 dark:hover:from-[#519489]/20 dark:hover:to-[#6ba59b]/20 transition-all duration-300 ease-out transform-gpu"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#519489]/20 to-[#6ba59b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

            <svg
              className="relative w-5 h-5 text-[#519489] dark:text-[#6ba59b] group-hover:text-[#6ba59b] dark:group-hover:text-[#519489] transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            {/* Enhanced notification badge */}
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1">
                {/* Pulsing background rings */}
                <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-full animate-pulse"></div>

                {/* Badge content */}
                <div className="relative flex items-center justify-center w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-lg">
                  <span className="text-white text-xs font-bold leading-none">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
              </div>
            )}
          </button>

          {/* Full Page Notifications Modal */}
          {showDropdown && (
            <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-300">
              {/* Blurred backdrop */}
              <div
                className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"
                onClick={() => setShowDropdown(false)}
              ></div>

              {/* Modal Container */}
              <div className="relative w-full max-w-4xl h-full max-h-[90vh] mx-4 bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-xl border border-white/20 dark:border-[#334155]/50 rounded-3xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-[#519489]/10 via-[#6ba59b]/10 to-[#519489]/10 dark:from-[#519489]/20 dark:via-[#6ba59b]/20 dark:to-[#519489]/20 backdrop-blur-sm p-6 border-b border-[#519489]/20 dark:border-[#6ba59b]/20 z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#519489] to-[#6ba59b] rounded-2xl flex items-center justify-center shadow-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#101918] dark:text-white">
                          Notifications
                        </h2>
                        <p className="text-[#578e85] dark:text-[#8fc4bd] text-sm">
                          Stay updated with your latest activities
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {unreadCount > 0 && (
                        <div className="bg-gradient-to-r from-[#519489] to-[#6ba59b] text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                          <span className="text-sm">{unreadCount}</span>
                          <span className="text-xs ml-1 opacity-90">
                            unread
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => setShowDropdown(false)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-[#334155] rounded-xl transition-colors duration-200"
                      >
                        <svg
                          className="w-6 h-6 text-gray-500 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notifications Content */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#519489]/30 scrollbar-track-transparent p-6">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-96 text-center">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#519489]/10 to-[#6ba59b]/10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-[#519489]/50 dark:text-[#6ba59b]/50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-[#101918] dark:text-white mb-2">
                        No notifications yet
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">
                        You're all caught up! We'll notify you when something
                        new arrives.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                      {notifications.map((notif, index) => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className="group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl transform-gpu border border-gray-100 dark:border-[#334155]/50 bg-white/50 dark:bg-[#334155]/20 hover:bg-gradient-to-br hover:from-[#519489]/5 hover:to-[#6ba59b]/5 dark:hover:from-[#519489]/10 dark:hover:to-[#6ba59b]/10"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: "fadeInUp 0.6s ease-out forwards",
                          }}
                        >
                          {/* Notification Header */}
                          <div className="flex items-start gap-4 mb-4">
                            {/* Enhanced Icon */}
                            <div
                              className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
                                !notif.read_at
                                  ? "bg-gradient-to-br from-[#519489] to-[#6ba59b] shadow-lg"
                                  : "bg-gray-100 dark:bg-gray-700"
                              }`}
                            >
                              <svg
                                className={`w-7 h-7 ${
                                  !notif.read_at
                                    ? "text-white"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h3
                                  className={`font-bold text-lg leading-tight ${
                                    !notif.read_at
                                      ? "text-[#101918] dark:text-white"
                                      : "text-gray-600 dark:text-gray-300"
                                  }`}
                                >
                                  {notif.data.title}
                                </h3>

                                {/* Enhanced Unread indicator */}
                                {!notif.read_at && (
                                  <div className="flex-shrink-0">
                                    <div className="relative">
                                      <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full shadow-sm">
                                        <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-ping opacity-75"></div>
                                        <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"></div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Notification Body */}
                          <p
                            className={`leading-relaxed ${
                              !notif.read_at
                                ? "text-gray-700 dark:text-gray-200"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {notif.data.body}
                          </p>

                          {/* Read More Indicator */}
                          <div className="mt-4 flex items-center gap-2 text-[#519489] dark:text-[#6ba59b] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-sm font-medium">
                              Read more
                            </span>
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
                          </div>

                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#519489]/5 to-[#6ba59b]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Actions (Optional) */}
                {notifications.length > 0 && (
                  <div className="sticky bottom-0 bg-gradient-to-r from-[#519489]/5 to-[#6ba59b]/5 dark:from-[#519489]/10 dark:to-[#6ba59b]/10 backdrop-blur-sm p-6 border-t border-[#519489]/20 dark:border-[#6ba59b]/20">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {notifications.length} notification
                        {notifications.length !== 1 ? "s" : ""} total
                      </p>
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="px-6 py-2 bg-gradient-to-r from-[#519489] to-[#6ba59b] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform-gpu"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedNotification && (
        <div
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-white/20 dark:border-[#334155]/50 transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header with gradient */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#519489] to-[#6ba59b] rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#101918] dark:text-white leading-tight">
                  {selectedNotification.data.title}
                </h2>
              </div>
            </div>

            {/* Modal content */}
            <div className="mb-8">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                {selectedNotification.data.body}
              </p>
            </div>

            {/* Modal actions */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-gradient-to-r from-[#519489] to-[#6ba59b] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform-gpu"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(81, 148, 137, 0.3);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(81, 148, 137, 0.5);
        }
      `}</style>
    </div>
  );
}
