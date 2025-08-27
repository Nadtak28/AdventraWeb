const LoadingSkeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-gray-200 rounded ${className}`}
  ></div>
);
export default LoadingSkeleton;
