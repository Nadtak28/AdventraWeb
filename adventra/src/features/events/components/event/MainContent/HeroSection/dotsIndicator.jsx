function DotsIndicator({ currentIndex = 0, total = 5 }) {
  return (
    <div className="flex justify-center gap-2 p-5">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`size-1.5 rounded-full transition-all duration-300 ${
            index === currentIndex
              ? "bg-[#519489] scale-125"
              : "bg-[#f8fbfb] opacity-50 hover:opacity-75"
          }`}
        />
      ))}
    </div>
  );
}

export default DotsIndicator;
