import ProfileSection from "./mainContent/profileSection/profileSection";
// import EditProfileForm from './EditProfileForm';
import BookingTabs from "./mainContent/BookingState/bookingTabs";
import EmptyState from "./mainContent/BookingState/emptyState";
import SettingsSection from "./mainContent/settings/settingsSection";
import SettingsItem from "./mainContent/settings/settingsItem";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutService } from "../api/logoutService";
import { tokenStore } from "../../../utils/dataStore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetInfoUserService } from "../api/getInfoUserService";
import ChangePasswordModal from "./mainContent/editSection/changePasswordModel";
import { toggleTheme, initTheme } from "../../../themes/toogleTheme";
import { SoloTripsListComponent } from "./mainContent/BookingState/soloTripListComponent";
import { GroupListComponent } from "./mainContent/BookingState/groupTripListComponent";
import EventsListComponent from "./mainContent/BookingState/eventsListComponent";
import {
  fetchNotifications,
  markNotificationRead,
} from "../../../api/notificationService";

export default function MainContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("group");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);

  // Notification states
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const { items: notifications, unreadCount } = useSelector(
    (state) => state.notifications
  );

  const handleLogout = async () => {
    try {
      await dispatch(LogoutService()).unwrap();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      tokenStore.clearToken();
      navigate("/");
    }
  };

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    initTheme();
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
    setDarkMode(document.documentElement.classList.contains("dark"));
  };

  const { user, status } = useSelector((state) => state.getUserInfo);

  useEffect(() => {
    if (status === "idle") {
      dispatch(GetInfoUserService());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Load notifications
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleNotificationClick = (notif) => {
    setSelectedNotification(notif);
    if (!notif.read_at) {
      dispatch(markNotificationRead(notif.id));
    }
  };

  const closeNotificationModal = () => {
    setSelectedNotification(null);
    setShowNotificationModal(false);
  };

  const renderBookingContent = () => {
    if (activeTab === "group") {
      return user?.reserved_groups?.length > 0 ? (
        <GroupListComponent groups={user.reserved_groups} />
      ) : (
        <EmptyState type="group" />
      );
    }
    if (activeTab === "solo") {
      return user?.reserved_solo_trips?.length > 0 ? (
        <SoloTripsListComponent trips={user.reserved_solo_trips} />
      ) : (
        <EmptyState type="solo" />
      );
    }
    if (activeTab === "event") {
      return user?.reserved_events?.length > 0 ? (
        <EventsListComponent events={user.reserved_events} />
      ) : (
        <EmptyState type="event" />
      );
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Main Content - with blur when modal is open */}
      <main
        className={`min-h-screen bg-white dark:bg-[#1a1f2e] px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-8 transition-all duration-500 ${
          showNotificationModal || selectedNotification
            ? "blur-md scale-95"
            : ""
        }`}
      >
        <div
          className={`layout-content-container flex flex-col max-w-[960px] flex-1 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Enhanced Page Title with Notification Integration */}
          <div className="transform transition-all duration-700 delay-100">
            <div
              className={`flex flex-wrap justify-between gap-6 p-6 mb-8 transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              {/* Main Content */}
              <div className="flex min-w-72 flex-col gap-4 relative">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#519489]/10 to-[#6ba59b]/5 rounded-full blur-3xl -z-10"></div>

                <h1
                  className={`text-transparent bg-clip-text dark:from-white dark:via-[#6ba59b] dark:to-[#519489] bg-gradient-to-r from-[#101918] via-[#519489] to-[#6ba59b] text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] transition-all duration-700 delay-200 ${
                    isLoaded ? "translate-x-0" : "-translate-x-4"
                  }`}
                >
                  Profile
                </h1>

                <p
                  className={`text-[#578e85] dark:text-[#8fc4bd] text-lg font-normal leading-relaxed flex items-center gap-2 transition-all duration-700 delay-400 ${
                    isLoaded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                >
                  Manage your account and settings
                </p>

                <div
                  className={`h-1 bg-gradient-to-r from-[#519489] to-[#6ba59b] rounded-full transition-all duration-1000 delay-600 ${
                    isLoaded ? "w-24 opacity-100" : "w-0 opacity-0"
                  }`}
                ></div>
              </div>

              {/* Quick Actions */}
              <div
                className={`flex items-center gap-3 transition-all duration-700 delay-800 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
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
                    onClick={() => setShowNotificationModal(true)}
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
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Profile Section with Glass Effect */}
          <div className="transform transition-all duration-700 delay-200 mb-8">
            <div className="bg-white/80 dark:bg-[#1e293b] dark:border-[#334155] backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="bg-gradient-to-r from-[#519489] to-[#6ba59b] h-2"></div>
              <ProfileSection user={user} />
            </div>
          </div>

          {/* Booking History Section */}
          <div className="transform transition-all duration-700 delay-300 mb-8">
            <div className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/30 dark:border-[#334155]/50 overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="p-6 bg-gradient-to-r from-[#519489]/5 to-transparent border-b border-[#519489]/10 dark:border-[#6ba59b]/10">
                <h3 className="text-[#101918] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[#519489] to-[#6ba59b] rounded-full"></div>
                  Booking History
                </h3>
              </div>

              <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="min-h-[300px]">{renderBookingContent()}</div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="transform transition-all duration-700 delay-400 mb-8">
            <div className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/30 dark:border-[#334155]/50 overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="p-6 bg-gradient-to-r from-[#519489]/5 to-transparent border-b border-[#519489]/10 dark:border-[#6ba59b]/10">
                <h3 className="text-[#101918] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[#519489] to-[#6ba59b] rounded-full"></div>
                  Settings
                </h3>
              </div>
              <SettingsSection>
                <SettingsItem
                  title="Dark Mode"
                  isToggle={true}
                  isChecked={darkMode}
                  onClick={handleToggleTheme}
                />
                <SettingsItem label="Language" value="English" />
                <SettingsItem
                  label="Change Password"
                  icon="ArrowRight"
                  onClick={() => setChangePasswordOpen(true)}
                />
                <SettingsItem
                  label="Logout"
                  icon="ArrowRight"
                  className="hover:cursor-pointer"
                  onClick={handleLogout}
                />
              </SettingsSection>
            </div>
          </div>

          {/* Points Section */}
          <div className="transform transition-all duration-700 delay-500">
            <div className="bg-gradient-to-r from-[#519489] to-[#6ba59b] rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="p-6 text-white">
                <h3 className="text-white dark:text-black text-2xl font-bold leading-tight tracking-[-0.015em] mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">★</span>
                  </div>
                  Reward Points
                </h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-lg">Your Points</span>
                    <span className="text-white text-3xl font-bold">
                      {user?.points || "0"}
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/60 rounded-full transition-all duration-1000 delay-1000"
                      style={{
                        width: `${Math.min(
                          ((user?.points || 0) / 1000) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Modal */}
        {isChangePasswordOpen && (
          <ChangePasswordModal onClose={() => setChangePasswordOpen(false)} />
        )}
      </main>

      {/* Full Page Notifications Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-500">
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
            onClick={closeNotificationModal}
          ></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-5xl h-full max-h-[95vh] mx-4 bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-xl border border-white/20 dark:border-[#334155]/50 rounded-3xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#519489]/10 via-[#6ba59b]/10 to-[#519489]/10 dark:from-[#519489]/20 dark:via-[#6ba59b]/20 dark:to-[#519489]/20 backdrop-blur-sm p-6 border-b border-[#519489]/20 dark:border-[#6ba59b]/20 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#519489] to-[#6ba59b] rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-7 h-7 text-white"
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
                    <h2 className="text-3xl font-bold text-[#101918] dark:text-white">
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
                      <span className="text-xs ml-1 opacity-90">unread</span>
                    </div>
                  )}

                  <button
                    onClick={closeNotificationModal}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-[#334155] rounded-xl transition-colors duration-200 group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-[#519489] dark:group-hover:text-[#6ba59b] transition-colors duration-200"
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
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#519489]/30 scrollbar-track-transparent p-8">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-[#519489]/10 to-[#6ba59b]/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-20 h-20 text-[#519489]/50 dark:text-[#6ba59b]/50"
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
                  <h3 className="text-2xl font-bold text-[#101918] dark:text-white mb-3">
                    No notifications yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md leading-relaxed">
                    You're all caught up! We'll notify you when something new
                    arrives.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                  {notifications.map((notif, index) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className="group relative p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl transform-gpu border border-gray-100 dark:border-[#334155]/50 bg-white/60 dark:bg-[#334155]/30 hover:bg-gradient-to-br hover:from-[#519489]/10 hover:to-[#6ba59b]/10 dark:hover:from-[#519489]/20 dark:hover:to-[#6ba59b]/20 backdrop-blur-sm"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "fadeInUp 0.8s ease-out forwards",
                      }}
                    >
                      {/* Notification Header */}
                      <div className="flex items-start gap-4 mb-4">
                        {/* Enhanced Icon */}
                        <div
                          className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                            !notif.read_at
                              ? "bg-gradient-to-br from-[#519489] to-[#6ba59b] shadow-lg"
                              : "bg-gray-100 dark:bg-gray-700"
                          }`}
                        >
                          <svg
                            className={`w-8 h-8 ${
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
                              className={`font-bold text-xl leading-tight ${
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
                        className={`leading-relaxed text-base mb-4 ${
                          !notif.read_at
                            ? "text-gray-700 dark:text-gray-200"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {notif.data.body}
                      </p>

                      {/* Read More Indicator */}
                      <div className="flex items-center gap-2 text-[#519489] dark:text-[#6ba59b] opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-sm font-semibold">Read more</span>
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

            {/* Footer Actions */}
            {notifications.length > 0 && (
              <div className="sticky bottom-0 bg-gradient-to-r from-[#519489]/5 to-[#6ba59b]/5 dark:from-[#519489]/10 dark:to-[#6ba59b]/10 backdrop-blur-sm p-6 border-t border-[#519489]/20 dark:border-[#6ba59b]/20">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    {notifications.length} notification
                    {notifications.length !== 1 ? "s" : ""} total
                  </p>
                  <button
                    onClick={closeNotificationModal}
                    className="px-8 py-3 bg-gradient-to-r from-[#519489] to-[#6ba59b] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform-gpu"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Individual Notification Detail Modal */}
      {selectedNotification && (
        <div
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-in fade-in duration-300"
          onClick={() => setSelectedNotification(null)}
        >
          <div
            className="bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-lg w-full mx-4 border border-white/20 dark:border-[#334155]/50 transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header with gradient */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#519489] to-[#6ba59b] rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
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
                <h2 className="text-2xl font-bold text-[#101918] dark:text-white leading-tight mb-1">
                  {selectedNotification.data.title}
                </h2>
                <div className="flex items-center gap-2">
                  {!selectedNotification.read_at && (
                    <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse"></div>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {!selectedNotification.read_at ? "Unread" : "Read"}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal content */}
            <div className="mb-8">
              <div className="bg-gray-50 dark:bg-[#334155]/30 rounded-2xl p-6 border border-gray-100 dark:border-[#334155]/50">
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
                  {selectedNotification.data.body}
                </p>
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedNotification(null)}
                className="px-6 py-3 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-[#334155] transition-all duration-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedNotification(null);
                  setShowNotificationModal(false);
                }}
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(81, 148, 137, 0.3);
          border-radius: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(81, 148, 137, 0.5);
        }

        @supports (backdrop-filter: blur(0)) or
          (-webkit-backdrop-filter: blur(0)) {
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }

          .backdrop-blur-md {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }

          .backdrop-blur-xl {
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
          }
        }
      `}</style>
    </div>
  );
}
