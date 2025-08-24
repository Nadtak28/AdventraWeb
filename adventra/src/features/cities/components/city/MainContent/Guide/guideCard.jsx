import { Users, Star, Phone, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GuideCard = ({ guide, index }) => {
  const navigate = useNavigate();
  function onClick(guide) {
    navigate(`/guides/${guide.id}`);
  }
  return (
    <div
      onClick={() => onClick(guide)}
      className={`flex flex-col items-center gap-4 rounded-xl bg-white border border-[#519489]/20 p-4 min-w-[180px] snap-start cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:border-[#519489]/60 opacity-0 animate-slide-in-right group`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative">
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cover bg-center border-3 border-[#519489]/20 group-hover:border-[#519489] transition-all duration-300"
          style={{
            backgroundImage: `url("${
              guide.images?.[0]?.url ||
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
            }")`,
          }}
        />
        <div className="absolute -bottom-1 -right-1 bg-[#519489] rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
          <Users className="w-3 h-3 text-white" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-[#101918] text-base font-semibold group-hover:text-[#519489] transition-colors duration-300">
          {guide.name}
        </h3>
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-[#519489] text-sm font-medium">
              {guide.rate || "4.5"}
            </span>
            <span className="text-[#519489]/60 text-xs">
              ({guide.reviews_count})
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 text-[#519489]/80 text-xs">
            <Phone className="w-3 h-3" />
            <span>{guide.phone}</span>
          </div>
          {guide.price && (
            <div className="flex items-center justify-center gap-1 text-[#519489] text-sm font-medium">
              <DollarSign className="w-3 h-3" />
              <span>{parseFloat(guide.price).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GuideCard;
