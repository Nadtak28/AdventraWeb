import { useRef } from "react";
import AnimatedSection from "../animatedSection";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
function DestinationsCarousel({ cities }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  function onClick(city) {
    navigate(`/cities/${city.id}`);
  }
  return (
    <AnimatedSection delay={400}>
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-[#519489]/10 text-[#519489] rounded-xl hover:bg-[#519489]/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-[#519489]/10 text-[#519489] rounded-xl hover:bg-[#519489]/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cities?.map((city) => (
            <div
              onClick={() => onClick(city)}
              key={city.id}
              className="flex-shrink-0 w-80 group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-lg transition-all duration-300 group-hover:border-[#519489]/20">
                <div
                  className="h-48 bg-gradient-to-br from-[#519489] to-[#6ba89d] bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-${Math.floor(
                      Math.random() * 1000000000
                    )}?w=400&h=200&fit=crop')`,
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {city.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {city.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[#519489] font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4 text-[#519489] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}

export default DestinationsCarousel;
