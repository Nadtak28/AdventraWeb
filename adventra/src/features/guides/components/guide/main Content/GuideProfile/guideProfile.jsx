import AnimatedCard from "../animatedCard";
const GuideProfile = ({ guide }) => {
  const imageUrl =
    guide.images?.[0]?.url ||
    "https://placehold.co/500x300?text=No+Image+Available";
  const languages = guide.languages?.length
    ? guide.languages.map((lang) => lang.name).join(", ")
    : "N/A";
  return (
    <AnimatedCard className="bg-white dark:bg-[#1a1f2e] rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-gray-100">
      <div className="flex flex-col dark:bg-[#1a1f2e] bg-white md:flex-row items-start gap-6">
        {/* Profile Image */}
        <div className="relative group">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-2xl min-h-32 w-32 md:min-h-40 md:w-40 shadow-lg transform transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          >
            <div className="absolute inset-0 bg-[#519489] opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#519489] text-white rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3">
          <div
            className="animate-slideRight"
            style={{ animationDelay: "200ms" }}
          >
            <h1 className="text-2xl md:text-3xl font-bold dark:from-white  mb-2 bg-gradient-to-r from-gray-900 to-[#519489] bg-clip-text text-transparent">
              {guide.name}
            </h1>
            <div className="flex items-center text-[#519489] font-medium mb-1">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.306-.084l1.063-1.063A3 3 0 009 8.172z"
                  clipRule="evenodd"
                />
              </svg>
              Speaks: {languages}
            </div>
          </div>

          <div
            className="animate-slideRight"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center text-[#519489] font-medium mb-1">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {guide.phone}
            </div>
          </div>

          <div
            className="animate-slideRight"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#519489] mr-2">
                ${guide.price}
              </span>
              <span className="text-gray-600 font-medium">per tour</span>
            </div>
          </div>

          {/* Categories */}
          {guide.categories && guide.categories.length > 0 && (
            <div
              className="animate-slideRight"
              style={{ animationDelay: "500ms" }}
            >
              <div className="flex flex-wrap gap-2 mt-4">
                {guide.categories.map((category, index) => (
                  <span
                    key={category.id}
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white
                      transform transition-all duration-300 hover:scale-105
                      animate-fadeIn
                    `}
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 animate-slideUp" style={{ animationDelay: "600ms" }}>
        <div className="h-px bg-gradient-to-r from-transparent via-[#519489] to-transparent mb-6"></div>
        <p className="text-gray-700 dark:text-white leading-relaxed text-lg font-light">
          {guide.description}
        </p>
      </div>
    </AnimatedCard>
  );
};

export default GuideProfile;
