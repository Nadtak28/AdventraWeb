import { Calendar, Users, Activity } from "lucide-react";
import AnimatedSection from "../../../tour/mainContent/animatedSection";
function TourStats({ tourStats, ticketsCount, endingDate, startingDate }) {
  const calculateDuration = (start, end) => {
    if (!start || !end) return "0 Days";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} Days`;
  };

  const formatStatus = (status) => {
    if (!status || typeof status !== "string") return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const stats = [
    {
      icon: Calendar,
      label: "Duration",
      value: calculateDuration(startingDate, endingDate),
    },
    {
      icon: Users,
      label: "Group Size",
      value: `remaining ${ticketsCount || 0} People`,
    },
    {
      icon: Activity,
      label: "Status",
      value: formatStatus(tourStats),
    },
  ];

  return (
    <AnimatedSection delay={200}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 from-gray-50 bg-gradient-to-br dark:from-gray-800 dark:to-gray-900  rounded-2xl border border-[#519489]/10">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4 group">
            <div className="p-3 bg-[#519489]/10 rounded-2xl group-hover:bg-[#519489]/20 transition-colors duration-300">
              <stat.icon className="w-6 h-6 text-[#519489]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#519489]">{stat.label}</p>
              <p className="text-lg font-bold dark:text-white text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}

export default TourStats;
