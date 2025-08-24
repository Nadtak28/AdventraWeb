import React, { useState, useEffect } from "react";

const Calendar = ({ onDateSelect, guideId, availability }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tooltipData, setTooltipData] = useState({
    show: false,
    content: "",
    position: {},
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Format YYYY-MM-DD
  const formatDateString = (year, month, day) => {
    const yearStr = year.toString();
    const monthStr = String(month).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${yearStr}-${monthStr}-${dayStr}`;
  };

  // Parse date string
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    if (dateStr.includes("T")) return new Date(dateStr);

    if (dateStr.includes("-")) {
      const [year, month, day] = dateStr
        .split("-")
        .map((num) => parseInt(num, 10));
      return new Date(year, month - 1, day);
    }
    return new Date(dateStr);
  };

  // Check if date is reserved - simplified logic
  const getDateReservationStatus = (day) => {
    const checkDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    checkDate.setHours(0, 0, 0, 0);

    // Check if date falls within any reserved period
    if (availability?.reserved && Array.isArray(availability.reserved)) {
      for (const reservation of availability.reserved) {
        if (!reservation.start_date || !reservation.end_date) continue;

        const startDate = parseDate(reservation.start_date);
        const endDate = parseDate(reservation.end_date);

        if (!startDate || !endDate) continue;

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        if (checkDate >= startDate && checkDate <= endDate) {
          return {
            isReserved: true,
            message: "Reserved period",
          };
        }
      }
    }

    return { isReserved: false, message: null };
  };

  const handleDateClick = (day, reservationStatus) => {
    if (reservationStatus.isReserved) return;

    setSelectedDate(day);
    if (onDateSelect) {
      const formattedDate = formatDateString(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        day
      );
      console.log("Date selected:", formattedDate);
      onDateSelect(formattedDate);
    }
  };

  const handleDateHover = (event, reservationStatus) => {
    if (reservationStatus.isReserved) {
      const rect = event.target.getBoundingClientRect();
      setTooltipData({
        show: true,
        content: reservationStatus.message,
        position: {
          top: rect.top - 40,
          left: rect.left + rect.width / 2,
        },
      });
    }
  };

  const handleDateLeave = () => {
    setTooltipData({ show: false, content: "", position: {} });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all duration-500 hover:shadow-xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 transform transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <svg
              className="w-5 h-5 text-[#519489]"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
            </svg>
          </button>

          <h3 className="text-xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>

          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-xl hover:bg-gray-100 transform transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <svg
              className="w-5 h-5 text-[#519489]"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </button>
        </div>

        {/* Simplified Legend */}
        <div className="mb-4 flex justify-center">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Reserved</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#519489] rounded-full"></div>
              <span className="text-gray-600">Available</span>
            </div>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={index} className="h-12 flex items-center justify-center">
              <span className="text-sm font-bold text-[#519489]">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty slots */}
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="h-12"></div>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const reservationStatus = getDateReservationStatus(day);
            const isSelected = day === selectedDate;

            const dayDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            );
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            dayDate.setHours(0, 0, 0, 0);

            const isToday = dayDate.getTime() === today.getTime();
            const isPastDate = dayDate < today;
            const isDisabled =
              reservationStatus.isReserved || isPastDate || isToday;

            let buttonStyles =
              "relative h-12 w-full rounded-xl text-sm font-medium transition-all duration-300 transform ";

            if (reservationStatus.isReserved) {
              // Simplified reserved styling
              buttonStyles +=
                "cursor-not-allowed bg-red-200 text-red-900 border-2 border-red-400 ";
            } else if (isPastDate || isToday) {
              buttonStyles += "cursor-not-allowed bg-gray-100 text-gray-400 ";
              if (isToday) {
                buttonStyles += "ring-2 ring-[#519489] "; // Highlight today
              }
            } else if (isSelected) {
              buttonStyles +=
                "bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white shadow-lg scale-110 ";
            } else {
              buttonStyles +=
                "text-gray-700 hover:bg-[#519489] hover:text-white hover:scale-105 active:scale-95 cursor-pointer ";
            }

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day, reservationStatus)}
                onMouseEnter={(e) => handleDateHover(e, reservationStatus)}
                onMouseLeave={handleDateLeave}
                disabled={isDisabled}
                className={buttonStyles}
                style={{ animationDelay: `${day * 20}ms` }}
              >
                {day}

                {/* Simplified reservation indicator */}
                {reservationStatus.isReserved && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg bg-red-500" />
                  </div>
                )}

                {/* Past date strike */}
                {isPastDate && !reservationStatus.isReserved && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-8 bg-gray-400 rotate-45"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {tooltipData.show && (
        <div
          className="fixed z-50 bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg pointer-events-none transform -translate-x-1/2"
          style={{
            top: tooltipData.position.top,
            left: tooltipData.position.left,
          }}
        >
          {tooltipData.content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </>
  );
};

export default Calendar;
