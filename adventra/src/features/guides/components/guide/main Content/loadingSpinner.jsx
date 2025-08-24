const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 animate-fadeIn">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-4 border-gray-200 border-t-[#519489] mb-4`}
      ></div>
      <p className="text-[#519489] font-medium animate-pulse">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
