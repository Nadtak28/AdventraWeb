import { useEffect, useState } from "react";

function HeroImage({ images = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasValidImages = images && images.length > 0 && images[0]?.url;
  const imageUrl = hasValidImages
    ? images[currentImageIndex]?.url
    : "/assets/hero-img.png";

  useEffect(() => {
    if (hasValidImages && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images, hasValidImages]);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className={`w-full h-[500px] bg-center bg-no-repeat bg-cover rounded-xl transition-all duration-1000 ${
          imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
        }`}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url("${imageUrl}")`,
        }}
        onLoad={() => setImageLoaded(true)}
      />
      {hasValidImages && images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all duration-200"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) => (prev + 1) % images.length)
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all duration-200"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
export default HeroImage;
