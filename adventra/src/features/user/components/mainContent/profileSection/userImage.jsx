import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserImageService } from "../../../api/updateUserImageService";
import { GetInfoUserService } from "../../../api/getInfoUserService";

export default function UserImage({ image }) {
  const [uploadResult, setUploadResult] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.updateUser);
  const fileInputRef = useRef(null);
  const prevImageRef = useRef(null);

  // Clear upload result after 3 seconds
  useEffect(() => {
    if (uploadResult) {
      const timer = setTimeout(() => {
        setUploadResult(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadResult]);

  useEffect(() => {
    if (!image) {
      setImageError(true);
      setIsImageLoading(false);
      return;
    }

    // Only trigger loading if the url is different from previous
    if (prevImageRef.current !== image) {
      setIsImageLoading(true);
      setImageError(false);
      prevImageRef.current = image;
    }
  }, [image]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageError(true);
  };

  const handleChooseAndUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      setUploadResult("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setUploadResult("Image size should be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("media", file);

    try {
      setUploadResult(null);
      setIsImageLoading(true);

      // Update image
      await dispatch(UpdateUserImageService(formData)).unwrap();

      // Small delay to ensure backend processes the image
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Refresh user info
      await dispatch(GetInfoUserService()).unwrap();

      setUploadResult("Upload successful!");
    } catch (err) {
      const errorMessage = err?.message || err || "Upload failed";
      setUploadResult(errorMessage);
      console.error("Upload failed:", err);
    } finally {
      setIsImageLoading(false);
      // Reset input so the same file can be picked again
      if (e.target) {
        e.target.value = null;
      }
    }
  };

  const handleChooseClick = () => {
    if (status === "loading" || isImageLoading) return;
    fileInputRef.current?.click();
  };

  // Determine image source with fallback
  const getImageSrc = () => {
    if (imageError || !image) {
      return "https://via.placeholder.com/150/519489/FFFFFF?text=Profile";
    }
    return image;
  };

  const isLoading = status === "loading" || isImageLoading;

  return (
    <div className="flex flex-col items-center gap-4 group">
      {/* Profile Image Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative Ring */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-[#519489] via-[#6ba59b] to-[#519489] rounded-full transition-all duration-500 ${
            isLoading ? "animate-pulse" : "group-hover:animate-spin"
          }`}
        ></div>

        {/* Image Container */}
        <div className="relative bg-white p-1 rounded-full">
          <div className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 transition-all duration-500 group-hover:scale-105 shadow-xl overflow-hidden">
            {/* Loading State */}
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="animate-spin w-8 h-8 text-[#519489]"
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

            {/* Actual Image */}
            <img
              src={getImageSrc()}
              alt="Profile"
              className={`w-full h-full object-cover rounded-full transition-all duration-500 ${
                isHovered && !isImageLoading
                  ? "brightness-75"
                  : "brightness-100"
              } ${isImageLoading ? "opacity-0" : "opacity-100"}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            {/* Overlay on Hover */}
            <div
              className={`absolute inset-0 rounded-full bg-[#519489]/20 flex items-center justify-center transition-all duration-300 ${
                isHovered && !isImageLoading ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChooseAndUpload}
      />

      {/* Edit Button */}
      <button
        type="button"
        onClick={handleChooseClick}
        disabled={isLoading}
        className="relative overflow-hidden bg-gradient-to-r from-[#519489] to-[#6ba59b] text-white font-semibold py-3 px-6 rounded-full disabled:opacity-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 group disabled:cursor-not-allowed"
      >
        {/* Button Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#6ba59b] to-[#519489] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

        {/* Button Content */}
        <span className="relative flex items-center gap-2">
          {isLoading ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
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
              {status === "loading" ? "Uploading..." : "Loading..."}
            </>
          ) : (
            <>
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
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Edit Picture
            </>
          )}
        </span>
      </button>

      {/* Upload Result Message */}
      {uploadResult && (
        <div
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
            uploadResult.includes("successful")
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          } animate-fadeIn`}
        >
          {uploadResult}
        </div>
      )}

      {/* Add fadeIn animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
