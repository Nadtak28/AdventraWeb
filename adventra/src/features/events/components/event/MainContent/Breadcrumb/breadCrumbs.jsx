import AnimatedSection from "../animatedSection";
function Breadcrumbs({ city, category }) {
  return (
    <AnimatedSection delay={100}>
      <div className="flex flex-wrap gap-2 p-4">
        <a
          href="#"
          className="text-[#519489] text-base font-medium hover:text-[#3d7169] transition-colors duration-200"
        >
          {city || <LoadingSkeleton className="w-20 h-4" />}
        </a>
        <span className="text-[#519489] text-base font-medium">/</span>
        <span className="text-[#519489] text-base font-medium">
          {category || <LoadingSkeleton className="w-16 h-4" />}
        </span>
        <span className="text-[#0e1a18] dark:text-white text-base font-medium">
          Experiences
        </span>
      </div>
    </AnimatedSection>
  );
}
export default Breadcrumbs;
