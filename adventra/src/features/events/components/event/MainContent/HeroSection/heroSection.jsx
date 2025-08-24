import HeroImage from "./heroImage";
import DotsIndicator from "./dotsIndicator"; // placeholder
import AnimatedSection from "../animatedSection";

function HeroSection({ images }) {
  return (
    <AnimatedSection
      delay={200}
      className="w-full h-full max-w-4xl mx-auto p-4"
    >
      <HeroImage images={images} />
      <DotsIndicator currentIndex={0} total={images?.length || 1} />
    </AnimatedSection>
  );
}

export default HeroSection;
