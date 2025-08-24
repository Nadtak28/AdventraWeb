import { useState, useEffect } from "react";

export default function EditNameModal({ onClose, onSave, status, error }) {
  const [newName, setNewName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      onSave(newName.trim());
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Delay actual close to allow exit animation
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Enhanced Blurred Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-black/40 via-[#519489]/20 to-black/40 backdrop-blur-md transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      ></div>

      {/* Modal Container */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-10 transition-all duration-500 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
        style={{ width: "90%", maxWidth: "450px" }}
      >
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-[#519489] to-[#6ba59b] px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              Edit Your Name
            </h2>

            <button
              onClick={handleClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Input Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#101918] mb-2">
              New Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your new name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#519489] focus:ring-4 focus:ring-[#519489]/20 transition-all duration-300 outline-none text-base bg-gradient-to-r from-transparent to-[#519489]/5 hover:from-[#519489]/5 hover:to-[#519489]/10"
                autoFocus
              />

              {/* Input Icon */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-[#519489]/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl animate-pulse">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={status === "loading" || !newName.trim()}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-[#519489] to-[#6ba59b] hover:from-[#6ba59b] hover:to-[#519489] text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-xl relative overflow-hidden group"
            >
              {/* Loading Spinner Overlay */}
              {status === "loading" && (
                <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                  <svg
                    className="animate-spin w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}

              {/* Button Content */}
              <span
                className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${
                  status === "loading" ? "opacity-50" : "opacity-100"
                }`}
              >
                {status === "loading" ? "Updating..." : "Save Changes"}
                {status !== "loading" && (
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>

              {/* Button Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
