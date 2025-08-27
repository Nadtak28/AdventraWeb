import { useState, useEffect } from "react";
import Calendar from "./calender";
import BookButton from "./bookButton";
import AnimatedCard from "../animatedCard";

const BookingSection = ({
  guideName,
  guideImage,
  price,
  guideId,
  isOpen,
  setIsOpen,
  // Only availability prop needed now
  availability,
  loadingAvailability,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Debug logging
  useEffect(() => {
    console.log("BookingSection - Props received:", {
      guideId,
      availability,
      loadingAvailability,
      guideName: guideName,
      guideImage: guideImage,
    });
  }, [guideId, availability, loadingAvailability, guideName, guideImage]);

  const handleDateSelect = (formattedDate) => {
    console.log("BookingSection - Selected date:", formattedDate);
    setSelectedDate(formattedDate);
  };

  const handleBooking = (date) => {
    console.log("BookingSection - Booking for:", date);
    // Booking logic
  };

  return (
    <AnimatedCard className="space-y-8" delay={200}>
      <div className="text-center animate-slideDown">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
          Book With
        </h2>
        <h2 className="text-2xl font-bold text-[#519489] mb-2">{guideName}</h2>
        <p className="text-gray-900 dark:text-white font-medium">
          Choose your preferred date
        </p>
      </div>

      {/* Loading states */}
      {loadingAvailability && (
        <div className="text-center py-4">
          <div className="inline-flex items-center px-4 py-2 bg-[#519489]/10 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#519489] mr-2"></div>
            <span className="text-[#519489] font-medium">
              Loading availability...
            </span>
          </div>
        </div>
      )}

      {/* Error states */}
      {!loadingAvailability && !availability && (
        <div className="text-center py-4">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-lg">
            <span className="text-red-600 font-medium">
              Failed to load availability data. Please refresh the page.
            </span>
          </div>
        </div>
      )}

      {/* Pass only availability prop to Calendar */}
      <Calendar
        onDateSelect={handleDateSelect}
        guideId={guideId}
        availability={availability}
      />

      <BookButton
        selectedDate={selectedDate}
        onBook={handleBooking}
        guideId={guideId}
        price={price}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        guideName={guideName}
        guideImage={guideImage}
      />
    </AnimatedCard>
  );
};

export default BookingSection;
