import AnimatedCard from "./animatedCard";

const EventsGrid = ({ items, onItemClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8">
      {items.map((item, index) => (
        <div key={item.id} style={{ animationDelay: `${index * 100}ms` }}>
          <AnimatedCard
            image={item.image}
            title={item.title}
            description={item.description}
            onClick={() => onItemClick(item)}
            delay={index * 100}
          />
        </div>
      ))}
    </div>
  );
};

export default EventsGrid;
