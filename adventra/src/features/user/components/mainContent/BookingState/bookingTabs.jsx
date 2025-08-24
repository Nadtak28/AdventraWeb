export default function BookingTabs({ activeTab, setActiveTab }) {
  const tabs = [
    {
      key: "group",
      label: "Group Tours",
      icon: (
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
    },
    {
      key: "solo",
      label: "Individual Trips",
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
    },
    {
      key: "event",
      label: "Events",
      icon: (
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="pb-3 px-6">
      <div className="relative flex border-b border-[#519489]/10 gap-2">
        {/* Animated Background Indicator */}
        <div
          className="absolute bottom-0 h-1 bg-gradient-to-r from-[#519489] to-[#6ba59b] rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${100 / tabs.length}%`,
            left: `${
              tabs.findIndex((tab) => tab.key === activeTab) *
              (100 / tabs.length)
            }%`,
          }}
        />

        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex-1 cursor-pointer flex flex-col items-center justify-center pb-4 pt-4 px-4 rounded-t-2xl transition-all duration-300 group hover:bg-[#519489]/5 ${
              activeTab === tab.key
                ? "text-[#519489] transform scale-105"
                : "text-[#578e85] hover:text-[#519489]"
            }`}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            {/* Tab Content */}
            <div
              className={`flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.key
                  ? "transform translate-y-0"
                  : "group-hover:transform group-hover:-translate-y-1"
              }`}
            >
              {/* Icon with Animation */}
              <div
                className={`p-2 rounded-full transition-all duration-300 ${
                  activeTab === tab.key
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : "bg-transparent group-hover:bg-[#519489]/10"
                }`}
              >
                {tab.icon}
              </div>

              {/* Label */}
              <p className="text-sm font-bold leading-normal tracking-[0.015em] hidden md:block">
                {tab.label}
              </p>
            </div>

            {/* Active Tab Glow Effect */}
            {activeTab === tab.key && (
              <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-b from-[#519489]/5 to-transparent pointer-events-none" />
            )}

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-b from-transparent to-[#519489]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        ))}
      </div>

      {/* Add Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
