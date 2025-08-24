import { useNavigate } from "react-router-dom";

const SimilarGuideCard = ({ guide, index }) => {
  const navigate = useNavigate();

  const imageUrl = guide.images?.[0]?.url || "/assets/hero-img.png";
  const languages =
    guide.languages?.map((lang) => lang.name).join(", ") || "N/A";

  const handleClick = () => {
    navigate(`/guides/${guide.id}`);
  };

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 
        transform hover:scale-105 hover:-translate-y-2 cursor-pointer
        border border-gray-100 animate-slideUp group
      `}
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <div
          className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4">
            <span className="bg-[#519489] text-white px-3 py-1 rounded-full text-sm font-medium">
              ${guide.price}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#519489] transition-colors duration-300">
          {guide.name}
        </h3>

        <p className="text-gray-600 mb-3 line-clamp-2">{guide.description}</p>

        <div className="flex items-center text-[#519489] text-sm font-medium mb-3">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.306-.084l1.063-1.063A3 3 0 009 8.172z"
              clipRule="evenodd"
            />
          </svg>
          {languages}
        </div>

        {/* Categories */}
        {guide.categories && guide.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {guide.categories.slice(0, 2).map((category) => (
              <span
                key={category.id}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({guide.reviews_count})
            </span>
          </div>

          <button className="text-[#519489] hover:text-[#6ba89d] transition-colors duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarGuideCard;
