import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { PaymentService } from "../../../../../../api/paymentService";
import { addToCart } from "../../../../../../hooks/cartSlice"; // Import cart action
import { Loader2, Sparkles, MapPin, Calendar } from "lucide-react";

const BookButton = ({
  selectedDate,
  onBook,
  guideId,
  price,
  isOpen,
  setIsOpen,
  guideName,
  guideImage, // Add guide prop to get guide details
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [method, setMethod] = useState("paypal");
  const [tickets, setTickets] = useState(1);
  const [apiError, setApiError] = useState(null);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.payment);

  const handleBooking = async () => {
    setIsLoading(true);

    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false);
      setIsBooked(true);
      if (onBook) onBook(selectedDate);

      // Reset after 3 seconds
      setTimeout(() => setIsBooked(false), 3000);
    }, 1500);
  };

  const handleContinue = async () => {
    if (!selectedDate) {
      setApiError("Please select a date first.");
      return;
    }

    setApiError(null);

    // Ensure the date is formatted correctly as YYYY-MM-DD string
    const formattedDate =
      typeof selectedDate === "string"
        ? selectedDate
        : selectedDate.toISOString().split("T")[0];

    const payload = {
      info: [
        {
          type: "guide",
          id: parseInt(guideId), // Ensure guideId is a number
          date: formattedDate, // This should be in "YYYY-MM-DD" format
        },
      ],
      payment_type: method,
    };

    console.log("Payment payload being sent:", payload);
    console.log("Selected date format:", formattedDate);
    console.log("Guide ID:", guideId, "Type:", typeof guideId);

    try {
      const res = await dispatch(PaymentService(payload));
      console.log("Payment response:", res);

      // Check if the action was fulfilled
      if (res.meta && res.meta.requestStatus === "fulfilled") {
        if (method === "paypal" && res.payload?.url) {
          console.log("Redirecting to PayPal URL:", res.payload.url);
          window.location.href = res.payload.url;
        } else if (method === "points") {
          // Handle points payment success
          setApiError("Points payment completed successfully!");
          setTimeout(() => {
            setIsOpen(false);
            setApiError(null);
          }, 2000);
        } else {
          setApiError("Payment completed but no redirect URL provided.");
        }
      } else if (res.meta && res.meta.requestStatus === "rejected") {
        // Handle rejected action
        const errorMessage =
          res.payload ||
          res.error?.message ||
          "Payment failed. Please try again.";
        setApiError(errorMessage);
        console.error("Payment rejected:", errorMessage);
      } else {
        setApiError("Unexpected response format. Please try again.");
        console.error("Unexpected response:", res);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setApiError("An unexpected error occurred. Please try again.");
    }
  };

  const handleAddToCart = async () => {
    if (!selectedDate) {
      setApiError("Please select a date from the calendar first.");
      return;
    }

    setAddToCartLoading(true);
    setApiError(null);

    try {
      // Prepare cart item data
      const cartItem = {
        guideId: parseInt(guideId),
        date: selectedDate,
        price: parseFloat(price || 0),
        guideName: guideName || `Guide ${guideId}`,
        guideImage: guideImage || null,
        type: "guide",
      };

      // Add to cart
      dispatch(addToCart(cartItem));

      // Show success feedback
      setApiError("Added to cart successfully!");

      // Navigate to cart page after a short delay
      setTimeout(() => {
        navigate("/cart");
      }, 1000);
    } catch (err) {
      console.error("Add to cart error:", err);
      setApiError("Failed to add to cart. Please try again.");
    } finally {
      setAddToCartLoading(false);
    }
  };

  const handleOpenModal = () => {
    if (!selectedDate) {
      setApiError("Please select a date from the calendar first.");
      return;
    }
    setApiError(null);
    setIsOpen(true);
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";

    try {
      let date;

      // If it's already a Date object
      if (dateStr instanceof Date) {
        date = dateStr;
      }
      // If it's a string in YYYY-MM-DD format
      else if (typeof dateStr === "string") {
        const [year, month, day] = dateStr
          .split("-")
          .map((num) => parseInt(num, 10));
        date = new Date(year, month - 1, day); // month is 0-indexed
      }
      // Fallback
      else {
        date = new Date(dateStr);
      }

      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error, dateStr);
      return dateStr?.toString() || "";
    }
  };

  const Modal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={() => setIsOpen(false)}
      />
      {/* modal content */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg z-10 m-4">
        <h2 className="text-2xl font-bold text-[#519489] text-center mb-6">
          Complete Your Booking
        </h2>

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mb-6 p-4 bg-[#519489]/10 rounded-lg border border-[#519489]/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-[#519489]" />
              <span className="font-semibold text-[#519489]">
                Selected Date:
              </span>
            </div>
            <p className="text-center text-gray-800 font-medium">
              {formatDisplayDate(selectedDate)}
            </p>
            <p className="text-center text-gray-500 text-sm mt-1">
              ({selectedDate})
            </p>
          </div>
        )}

        {/* Payment options */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Payment Method
          </h3>
          <label className="flex items-center gap-3 p-4 border rounded-lg mb-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              value="paypal"
              checked={method === "paypal"}
              onChange={(e) => setMethod(e.target.value)}
              className="w-4 h-4 text-[#519489] focus:ring-[#519489]"
            />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">PP</span>
              </div>
              <span className="font-medium">PayPal</span>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              value="points"
              checked={method === "points"}
              onChange={(e) => setMethod(e.target.value)}
              className="w-4 h-4 text-[#519489] focus:ring-[#519489]"
            />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#519489] rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">PT</span>
              </div>
              <span className="font-medium">Reward Points</span>
            </div>
          </label>
        </div>

        {/* Total price display */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Total Amount:</span>
            <span className="text-2xl font-bold text-[#519489]">
              ${(parseFloat(price || 0) * tickets).toFixed(2)}
            </span>
          </div>
          {tickets > 1 && (
            <div className="text-sm text-gray-500 mt-1">
              ${parseFloat(price || 0).toFixed(2)} × {tickets} tickets
            </div>
          )}
        </div>

        {/* Error/Success Messages */}
        {(error || apiError) && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              apiError?.includes("successfully")
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p
              className={`text-sm text-center ${
                apiError?.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {error || apiError}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            disabled={loading}
            className="px-6 py-3 bg-[#519489] text-white rounded-lg hover:bg-[#417c72] transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {loading
              ? "Processing..."
              : `Continue with ${method === "paypal" ? "PayPal" : "Points"}`}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="animate-slideUp" style={{ animationDelay: "400ms" }}>
        {/* Date Selection Status */}
        {selectedDate && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                Selected: {formatDisplayDate(selectedDate)}
              </span>
            </div>
          </div>
        )}

        {/* Error message for no date selected */}
        {apiError && !selectedDate && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{apiError}</p>
          </div>
        )}

        {/* Success message for cart */}
        {apiError && apiError.includes("cart successfully") && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm text-center">{apiError}</p>
          </div>
        )}

        <button
          onClick={handleOpenModal}
          disabled={!selectedDate}
          className={`
            relative overflow-hidden group w-full py-4 px-8 rounded-2xl font-bold text-lg
            transition-all duration-500 transform
            ${
              !selectedDate
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isBooked
                ? "bg-green-500 text-white"
                : "bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white hover:from-[#6ba89d] hover:to-[#519489]"
            }
            ${selectedDate && !isBooked ? "hover:scale-105" : ""}
            active:scale-95
            focus:outline-none focus:ring-4 focus:ring-[#519489] focus:ring-opacity-50
          `}
        >
          {/* Background animation */}
          {selectedDate && !isBooked && (
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          )}

          {/* Button content */}
          <div className="relative flex items-center justify-center">
            {isBooked ? (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Booked Successfully!
              </>
            ) : (
              <>
                <svg
                  className={`w-5 h-5 mr-2 ${
                    selectedDate ? "group-hover:animate-bounce" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                {selectedDate ? "Book Now" : "Select a Date First"}
              </>
            )}
          </div>
        </button>

        <button
          onClick={handleAddToCart}
          disabled={addToCartLoading || !selectedDate}
          className={`
            relative mt-4 overflow-hidden group w-full py-4 px-8 rounded-2xl font-bold text-lg
            transition-all duration-500 transform
            ${
              !selectedDate || addToCartLoading
                ? "border-4 border-gray-300 bg-white text-gray-400 cursor-not-allowed"
                : "border-4 border-[#519489] bg-white text-[#519489] hover:bg-[#519489] hover:text-white"
            }
            active:scale-95
            focus:outline-none focus:ring-4 focus:ring-[#519489] focus:ring-opacity-50
          `}
        >
          {/* Background animation */}
          {selectedDate && !addToCartLoading && (
            <div className="absolute inset-0 bg-[#519489] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          )}

          {/* Button content */}
          <div className="relative flex items-center justify-center">
            {addToCartLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                Adding to Cart...
              </>
            ) : (
              <>
                <svg
                  className={`w-5 h-5 mr-2 ${
                    selectedDate && !addToCartLoading
                      ? "group-hover:animate-bounce"
                      : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                {selectedDate ? "Add To Cart" : "Select Date First"}
              </>
            )}
          </div>
        </button>
      </div>
      {isOpen && createPortal(<Modal />, document.body)}
    </>
  );
};

export default BookButton;
