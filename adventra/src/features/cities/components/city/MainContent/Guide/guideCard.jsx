import {
  Users,
  Star,
  Phone,
  DollarSign,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const GuideCard = ({ guide, index }) => {
  const navigate = useNavigate();

  function onClick(guide) {
    navigate(`/guides/${guide.id}`);
  }

  // Handle the different possible data structures
  const guideData = guide.data || guide;
  const imageUrl =
    guideData.images?.[0]?.url ||
    (Array.isArray(guideData.images?.[0]?.url)
      ? guideData.images[0].url[0]
      : null) ||
    "https://placehold.co/500x300?text=No+Image+Available";

  const rating = parseFloat(guideData.rate || 0);
  const reviewCount = guideData.reviewer_count || guideData.reviews_count || 0;
  const price = parseFloat(guideData.price || 0);
  const cityName = guideData.city?.name;
  const languages =
    guideData.languages?.filter((lang) => lang.name).map((lang) => lang.name) ||
    [];

  return (
    <div
      onClick={() => onClick(guideData)}
      className={`relative flex flex-col bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-white to-gray-50 rounded-2xl border border-[#519489]/20 p-6 min-w-[280px] max-w-[320px] snap-start cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#519489]/20 hover:border-[#519489]/60 opacity-0 animate-slide-in-right group overflow-hidden`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#519489]/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

      {/* Header with avatar and basic info */}
      <div className="relative flex items-center gap-4 mb-4">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-full bg-cover bg-center border-3 border-[#519489]/30 group-hover:border-[#519489] transition-all duration-300 shadow-lg"
            style={{ backgroundImage: `url("${imageUrl}")` }}
          />
          <div className="absolute -bottom-1 -right-1 bg-[#519489] rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 shadow-lg">
            <Users className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-[#101918] dark:text-white text-lg font-bold group-hover:text-[#519489] transition-colors duration-300 line-clamp-1">
            {guideData.name}
          </h3>
          {cityName && (
            <div className="flex items-center gap-1 text-[#519489]/70 dark:text-white/70 text-sm mt-1">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">{cityName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Rating and reviews */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 transition-colors duration-200 ${
                i < Math.floor(rating)
                  ? "text-yellow-500 fill-current"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
          <span className="text-[#519489] dark:text-white text-sm font-medium ml-1">
            {rating > 0 ? rating.toFixed(1) : "New"}
          </span>
        </div>

        {reviewCount > 0 && (
          <div className="flex items-center gap-1 text-[#519489]/60 dark:text-white/60 text-xs">
            <MessageCircle className="w-3 h-3" />
            <span>{reviewCount} reviews</span>
          </div>
        )}
      </div>

      {/* Contact and pricing info */}
      <div className="space-y-3 mb-4">
        {guideData.phone && (
          <div className="flex items-center gap-2 text-[#519489]/80 dark:text-white/80 text-sm bg-[#519489]/5 dark:bg-white/5 rounded-lg px-3 py-2">
            <Phone className="w-4 h-4 text-[#519489]" />
            <span className="font-medium">{guideData.phone}</span>
          </div>
        )}

        {price > 0 && (
          <div className="flex items-center gap-2 text-[#519489] dark:text-white text-sm bg-[#519489]/10 dark:bg-white/10 rounded-lg px-3 py-2">
            <DollarSign className="w-4 h-4" />
            <span className="font-bold">{price.toLocaleString()} / day</span>
          </div>
        )}
      </div>

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {languages.slice(0, 3).map((language, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-[#519489]/20 text-[#519489] dark:text-white font-medium"
              >
                {language}
              </span>
            ))}
            {languages.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-[#519489]/10 text-[#519489]/60 dark:text-white/60">
                +{languages.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bottom action area */}
      <div className="mt-auto pt-4 border-t border-[#519489]/10 dark:border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-[#519489]/60 dark:text-white/60 text-xs">
            Tap to view profile
          </span>
          <div className="w-8 h-8 rounded-full bg-[#519489]/10 group-hover:bg-[#519489] flex items-center justify-center transition-all duration-300">
            <Users className="w-4 h-4 text-[#519489] group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#519489]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
    </div>
  );
};

export default GuideCard;
