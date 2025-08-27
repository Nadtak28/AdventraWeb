import { Star, MapPin, Phone, Languages } from "lucide-react";
import AnimatedSection from "../../../tour/mainContent/animatedSection";
import { useNavigate } from "react-router-dom";
function GuideSection({ guide }) {
  const navigate = useNavigate();
  function onClick(guide) {
    navigate(`/guides/${guide.id}`);
  }
  if (!guide) return null;
  return (
    <AnimatedSection delay={600}>
      <section className="mt-12">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">
          Your Expert Guide
        </h2>
        <div
          className="bg-gradient-to-br from-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer duration-300"
          onClick={() => onClick(guide)}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden">
                {guide.images?.[0]?.url ? (
                  <img
                    src={guide.images[0].url}
                    alt={guide.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#519489] to-[#6ba89d] flex items-center justify-center text-white text-4xl font-bold">
                    {guide.name?.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold dark:text-white text-gray-900">
                  {guide.name}
                </h3>
                <p className="text-[#519489] font-medium">Expert Tour Guide</p>
              </div>

              <p className="text-gray-600 dark:text-white leading-relaxed">
                {guide.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#519489]" />
                  <span className="text-gray-900 dark:text-white">
                    {guide.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-900 dark:text-white">
                    {guide.rate} ({guide.reviews_count} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-[#519489]" />
                  <span className="text-gray-900 dark:text-white">
                    {guide.languages?.map((lang) => lang.name).join(", ")}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#519489]" />
                  <span className="text-gray-900 dark:text-white">
                    {guide.city?.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {guide.categories?.map((category) => (
                  <span
                    key={category.id}
                    className="px-3 py-1 bg-[#519489]/10 text-[#519489] rounded-full text-sm font-medium"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
export default GuideSection;
