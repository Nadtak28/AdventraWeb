const AnimatedCard = ({ children, className = "", delay = 0 }) => {
  return (
    <div
      className={`
        transform transition-all duration-700 ease-out
        hover:scale-105 hover:shadow-xl
        animate-slideUp
        ${className}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
