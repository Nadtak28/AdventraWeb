import { useState } from "react";
import LoadingSkeleton from "../loadingSkeleton";
function GuideAvatar({ imageUrl }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const defaultImage =
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";

  return (
    <div className="relative">
      <div
        className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 transition-all duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url("${imageUrl || defaultImage}")`,
        }}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <LoadingSkeleton className="absolute inset-0 rounded-full" />
      )}
    </div>
  );
}
export default GuideAvatar;
