import AnimatedSection from "../animatedSection";
import { Calendar } from "lucide-react";

function AvailableDates({ startDate, endDate }) {
  const generateDates = (start, end) => {
    if (!start || !end) return [];
    const dates = [];
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Generate some sample dates between start and end
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    for (let i = 0; i < Math.min(4, Math.floor(diffDays / 7)); i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i * 7);
      dates.push(
        date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }

    return dates;
  };

  const dates = generateDates(startDate, endDate);

  return (
    <AnimatedSection delay={700}>
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Available Dates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dates.map((date, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#519489]/20 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#519489]" />
                <span className="font-medium text-gray-900">{date}</span>
              </div>
              <span className="text-[#519489] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Select
              </span>
            </div>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
export default AvailableDates;
