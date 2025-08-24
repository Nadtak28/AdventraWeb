import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { CityGuidesService } from "../../../../api/cityGuideService";
import GuideCard from "./guideCard";
import SkeletonCard from "../skeletonCard";
import { Users } from "lucide-react";

const GuidesSection = ({ cityId }) => {
  const dispatch = useDispatch();
  const { guides, loadingGuides: loading } = useSelector(
    (state) => state.cities
  );

  useEffect(() => {
    if (cityId) {
      dispatch(CityGuidesService(cityId));
    }
  }, [dispatch, cityId]);

  return (
    <section className="opacity-0 animate-fade-in-up animation-delay-1000">
      <div className="flex items-center gap-3 px-4 md:px-6 mb-4">
        <div className="p-2 rounded-lg bg-[#519489]/10">
          <Users className="w-6 h-6 text-[#519489]" />
        </div>
        <h2 className="text-[#101918] text-2xl font-bold">Local Guides</h2>
      </div>

      <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch gap-4 px-4 py-2 md:px-6">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <SkeletonCard key={i} className="min-w-[180px] h-56 rounded-xl" />
            ))
          ) : !guides || guides.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-12">
              <div className="text-center opacity-0 animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#519489]/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#519489]/60" />
                </div>
                <p className="text-[#519489]/60 text-lg font-medium">
                  No guides available
                </p>
                <p className="text-[#519489]/40 text-sm mt-1">
                  Guides will be listed here when available
                </p>
              </div>
            </div>
          ) : (
            // Handle both array and object with data property
            (Array.isArray(guides) ? guides : guides.data || []).map(
              (guide, index) => (
                <GuideCard key={guide.id} guide={guide} index={index} />
              )
            )
          )}
        </div>
      </div>
    </section>
  );
};
export default GuidesSection;
