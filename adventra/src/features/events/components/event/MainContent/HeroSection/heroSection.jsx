import HeroImage from "./heroImage";
import DotsIndicator from "./dotsIndicator"; // placeholder
import AnimatedSection from "../animatedSection";

function HeroSection({ images, videos }) {
  const total = (images?.length || 0) + (videos?.length || 0);

  return (
    <AnimatedSection
      delay={200}
      className="w-full h-full max-w-4xl mx-auto p-4"
    >
      <HeroImage images={images} videos={videos} />
      <DotsIndicator currentIndex={0} total={total} />
    </AnimatedSection>
  );
}

export default HeroSection;
