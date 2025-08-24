import AnimatedCard from "./animatedCard";
const AnimatedSection = ({
  title,
  items,
  cardType,
  onCardClick,
  className = "",
}) => {
  return (
    <section className={`px-4 sm:px-6 md:px-8 pt-8 pb-8 ${className}`}>
      <div className="flex items-center mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-[#519489] to-[#6ba89d] rounded-full mr-4" />
        <h2 className="text-[#101918] text-2xl md:text-3xl font-bold">
          {title}
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4 px-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="min-w-[180px] max-w-[200px] flex-shrink-0"
          >
            <AnimatedCard
              image={item.image}
              title={item.title || item.name}
              description={item.description}
              onClick={() => onCardClick(item)}
              delay={index * 100}
              type={cardType}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default AnimatedSection;
