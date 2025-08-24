import Price from "./price";
import ActionButtons from "./actionButtons";
import AnimatedSection from "../animatedSection";

function PriceSection({ price, eventId, isOpen, setIsOpen, event }) {
  return (
    <AnimatedSection delay={600} className="section">
      <Price price={price} />
      <ActionButtons
        eventId={eventId}
        price={price}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        event={event} // Pass the event data to ActionButtons
      />
    </AnimatedSection>
  );
}

export default PriceSection;
