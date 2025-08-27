import { Clock, Ticket, Calendar, AlertCircle } from "lucide-react";

const LimitedEventBanner = ({
  isLimited,
  ticketsCount,
  remainingTickets,
  startingDate,
  endingDate,
}) => {
  // Don't render if not limited
  if (!isLimited) return null;

  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate percentage of tickets remaining
  const remainingPercentage = (remainingTickets / ticketsCount) * 100;

  // Determine urgency level
  const getUrgencyLevel = () => {
    if (remainingPercentage <= 10) return "critical";
    if (remainingPercentage <= 25) return "warning";
    return "normal";
  };

  const urgencyLevel = getUrgencyLevel();

  return (
    <div className="bg-white dark:bg-[#1a1f2e] border border-gray-200 rounded-2xl shadow-lg p-6 my-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#519489] opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#519489] opacity-5 rounded-full translate-y-12 -translate-x-12"></div>

      {/* Header with alert icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#519489] p-2 rounded-full">
          <AlertCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl dark:text-white font-bold text-gray-800">
            Limited Time Event
          </h3>
          <p className="text-sm dark:text-white text-gray-600">
            Don't miss out on this exclusive experience
          </p>
        </div>
      </div>

      {/* Tickets availability section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#519489]" />
            <span className="font-semibold dark:text-[#519489] text-gray-800">
              Ticket Availability
            </span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              urgencyLevel === "critical"
                ? "bg-red-100 text-red-700"
                : urgencyLevel === "warning"
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {remainingTickets} / {ticketsCount} left
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              urgencyLevel === "critical"
                ? "bg-gradient-to-r from-red-400 to-red-600"
                : urgencyLevel === "warning"
                ? "bg-gradient-to-r from-orange-400 to-orange-600"
                : "bg-gradient-to-r from-[#519489] to-[#3d7169]"
            }`}
            style={{ width: `${remainingPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500">
          {remainingPercentage.toFixed(1)}% of tickets remaining
        </p>
      </div>

      {/* Date information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 dark:bg-[#1a1f2e] bg-gray-50 rounded-xl">
          <div className="bg-[#519489] p-2 rounded-lg flex-shrink-0">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium dark:text-white text-gray-800 mb-1">
              Event Starts
            </p>
            <p className="text-sm text-gray-600">{formatDate(startingDate)}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 dark:bg-[#1a1f2e] bg-gray-50 rounded-xl">
          <div className="bg-[#519489] p-2 rounded-lg flex-shrink-0">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium dark:text-white text-gray-800 mb-1">
              Event Ends
            </p>
            <p className="text-sm text-gray-600">{formatDate(endingDate)}</p>
          </div>
        </div>
      </div>

      {/* Urgency message */}
      {urgencyLevel !== "normal" && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            urgencyLevel === "critical"
              ? "bg-red-50 border border-red-200"
              : "bg-orange-50 border border-orange-200"
          }`}
        >
          <p
            className={`text-sm font-medium ${
              urgencyLevel === "critical" ? "text-red-800" : "text-orange-800"
            }`}
          >
            {urgencyLevel === "critical"
              ? "⚡ Almost sold out! Only a few tickets left."
              : "🔥 Popular event! Limited tickets remaining."}
          </p>
        </div>
      )}
    </div>
  );
};

export default LimitedEventBanner;
