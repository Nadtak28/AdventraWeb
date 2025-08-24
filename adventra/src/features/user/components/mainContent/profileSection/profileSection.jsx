import { useState, useEffect } from "react";
import UserEmail from "./userEmail";
import UserImage from "./userImage";
import UserName from "./userName";
import EditNameModal from "./../editSection/editNameModel";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserNameService } from "../../../api/updateUserNameService";
import { GetInfoUserService } from "../../../api/getInfoUserService";
import { resetUpdateState } from "../../../hook/updateUserSlice";

export default function ProfileSection({ user }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.updateUser);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async (newName) => {
    try {
      await dispatch(UpdateUserNameService(newName)).unwrap();
      await dispatch(GetInfoUserService()); // refresh user info
      dispatch(resetUpdateState());
      setModalOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      setModalOpen(false);
    }
  }, [status]);

  useEffect(() => {
    dispatch(GetInfoUserService());
  }, [dispatch]);

  return (
    <div
      className={`relative p-8 transition-all duration-1000 ${
        isVisible
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-4"
      }`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#519489]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#6ba59b]/10 to-transparent rounded-full blur-2xl"></div>

      {/* Content Container */}
      <div className="relative flex w-full flex-col gap-6 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
        {/* Profile Information */}
        <div className="flex gap-6 items-center">
          {/* User Image with Stagger Animation */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform -translate-x-4"
            }`}
          >
            <UserImage image={`${user?.images[0]?.url}?t=${Date.now()}`} />
          </div>

          {/* User Details */}
          <div
            className={`flex flex-col justify-center gap-2 transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform translate-x-4"
            }`}
          >
            <UserName name={user?.name} onEdit={() => setModalOpen(true)} />
            <UserEmail email={user?.email} />

            {/* User Stats */}
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-[#519489]/10 rounded-full">
                <div className="w-2 h-2 bg-[#519489] rounded-full animate-pulse"></div>
                <span className="text-[#519489] text-sm font-medium">
                  Active Member
                </span>
              </div>

              {user?.points && (
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
                  <span className="text-yellow-600">★</span>
                  <span className="text-orange-700 text-sm font-medium">
                    {user.points} Points
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex gap-3 transition-all duration-700 delay-700 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4"
          }`}
        >
          <button className="px-4 py-2 bg-white border-2 border-[#519489] text-[#519489] rounded-full font-medium hover:bg-[#519489] hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95">
            View Profile
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-[#519489] to-[#6ba59b] text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <EditNameModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          status={status}
          error={error}
        />
      )}
    </div>
  );
}
