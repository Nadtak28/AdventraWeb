import { useEffect, useRef, useState } from "react";

function HeroImage({ images = [], videos = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);

  // Combine into one slides array
  const slides = [
    ...images.map((img) => ({ type: "image", url: img.url?.[0] })),
    ...videos.map((vid) => ({ type: "video", url: vid.url?.[0] })),
  ];

  const currentSlide = slides[currentIndex];

  // Handle auto-next for images
  useEffect(() => {
    if (!currentSlide) return;
    if (currentSlide.type === "image") {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, slides, currentSlide]);

  // Handle auto-next after video ends
  useEffect(() => {
    if (currentSlide?.type === "video" && videoRef.current) {
      const videoEl = videoRef.current;
      const handleEnded = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      };
      videoEl.addEventListener("ended", handleEnded);
      return () => videoEl.removeEventListener("ended", handleEnded);
    }
  }, [currentSlide, slides]);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {currentSlide?.type === "image" && (
        <div
          className={`w-full h-[500px] bg-center bg-no-repeat bg-cover rounded-xl transition-all duration-1000 ${
            loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url("${currentSlide.url}")`,
          }}
        >
          {/* hidden img just to detect load */}
          <img
            src={currentSlide.url}
            alt=""
            className="hidden"
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}

      {currentSlide?.type === "video" && (
        <video
          ref={videoRef}
          className="w-full h-[500px] object-cover rounded-xl"
          autoPlay
          controls={false}
          muted
        >
          <source src={currentSlide.url} type="video/mp4" />
        </video>
      )}

      {slides.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? slides.length - 1 : prev - 1
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
              setCurrentIndex((prev) => (prev + 1) % slides.length)
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
