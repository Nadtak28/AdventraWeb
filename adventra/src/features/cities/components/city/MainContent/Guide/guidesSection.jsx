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

  // Handle the API response structure
  const guidesData = guides?.data || guides || [];

  return (
    <section className="opacity-0 animate-fade-in-up animation-delay-1000">
      <div className="flex items-center gap-3 px-4 md:px-6 mb-6">
        <div className="p-3 rounded-xl bg-[#519489]/10 group-hover:bg-[#519489]/20 transition-colors duration-300">
          <Users className="w-6 h-6 text-[#519489]" />
        </div>
        <div>
          <h2 className="text-[#101918] dark:text-white text-2xl font-bold">
            Local Guides
          </h2>
          <p className="text-[#519489]/60 dark:text-white/60 text-sm">
            Connect with experienced local guides
          </p>
        </div>
      </div>

      <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch gap-6 px-4 py-2 md:px-6 pb-4">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <SkeletonCard
                key={i}
                className="min-w-[280px] h-80 rounded-2xl"
              />
            ))
          ) : !guidesData || guidesData.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-16">
              <div className="text-center opacity-0 animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#519489]/10 flex items-center justify-center">
                  <Users className="w-10 h-10 text-[#519489]/60" />
                </div>
                <h3 className="text-[#519489] dark:text-white text-xl font-bold mb-2">
                  No guides available
                </h3>
                <p className="text-[#519489]/60 dark:text-white/60 text-sm max-w-xs">
                  Local guides will appear here when they become available for
                  this city
                </p>
              </div>
            </div>
          ) : (
            Array.isArray(guidesData) &&
            guidesData.map((guide, index) => (
              <GuideCard key={guide.id} guide={guide} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
