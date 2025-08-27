import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { PaymentService } from "../../../../../../api/paymentService";
import { addToCart } from "../../../../../../hooks/cartSlice";
import { Loader2, Sparkles, MapPin } from "lucide-react";

function ActionButtons({ eventId, price, isOpen, setIsOpen, event }) {
  const [method, setMethod] = useState("paypal");
  const [tickets, setTickets] = useState(1);
  const [apiError, setApiError] = useState(null);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.payment);

  const handleContinue = async () => {
    const payload = {
      info: [{ type: "event", id: eventId, tickets_count: tickets }],
      payment_type: method,
    };
    const res = await dispatch(PaymentService(payload));
    if (res.meta.requestStatus === "fulfilled") {
      if (method === "paypal" && res.payload.url) {
        window.location.href = res.payload.url;
      }
    } else {
      setApiError("Payment failed. Please try again.");
    }
  };

  const handleAddToCart = async () => {
    setAddToCartLoading(true);
    setApiError(null);

    try {
      // Prepare cart item data for event
      const cartItem = {
        eventId: parseInt(eventId),
        price: parseFloat(price || 0),
        eventName: event?.title || event?.name || `Event ${eventId}`,
        eventImage: event?.images?.[0]?.image || event?.image || null,
        type: "event",
        ticketsCount: tickets,
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

  // Modal component - Made responsive
  const Modal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/20 dark:bg-black/40"
        onClick={() => setIsOpen(false)}
      />
      {/* modal content - Responsive sizing */}
      <div className="relative bg-white dark:bg-[#1a1f2e] rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-[#519489] dark:text-white text-center mb-4 sm:mb-6">
          Complete Your Booking
        </h2>

        {/* Payment options */}
        <div className="mb-4 sm:mb-6">
          <label className="flex items-center gap-2 p-2 sm:p-3 border dark:border-gray-600 rounded-lg mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="radio"
              value="paypal"
              checked={method === "paypal"}
              onChange={(e) => setMethod(e.target.value)}
              className="text-[#519489] focus:ring-[#519489] dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
              PayPal
            </span>
          </label>
          <label className="flex items-center gap-2 p-2 sm:p-3 border dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="radio"
              value="points"
              checked={method === "points"}
              onChange={(e) => setMethod(e.target.value)}
              className="text-[#519489] focus:ring-[#519489] dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
              Reward Points
            </span>
          </label>
        </div>

        {/* Ticket count */}
        <div className="mb-4 sm:mb-6">
          <label className="block mb-2 font-semibold text-gray-700 dark:text-white text-sm sm:text-base">
            Number of Tickets:
          </label>
          <input
            type="number"
            min="1"
            value={tickets}
            onChange={(e) => setTickets(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg w-full p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-[#519489] focus:border-transparent transition-all text-sm sm:text-base"
          />
        </div>

        {/* Total price display */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-white text-sm sm:text-base">
              Total:
            </span>
            <span className="text-lg sm:text-xl font-bold text-[#519489] dark:text-[#519489]">
              ${(parseFloat(price || 0) * tickets).toLocaleString()}
            </span>
          </div>
        </div>

        {(error || apiError) && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              apiError?.includes("successfully")
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            }`}
          >
            <p
              className={`text-sm text-center ${
                apiError?.includes("successfully")
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {error || apiError}
            </p>
          </div>
        )}

        {/* Actions - Responsive button layout */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 sm:px-6 py-2 sm:py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm sm:text-base order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            disabled={loading}
            className="px-4 sm:px-6 py-2 sm:py-2 bg-[#519489] text-white rounded-lg hover:bg-[#417c72] transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {loading ? "Processing..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Success message for cart (outside sticky bar) */}
      {apiError && apiError.includes("cart successfully") && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 shadow-lg max-w-xs">
          <p className="text-green-600 dark:text-green-400 text-sm font-medium">
            {apiError}
          </p>
        </div>
      )}

      {/* Responsive sticky bar */}
      <div className="sticky bottom-0 bg-white dark:bg-[#1a1f2e] border-t border-gray-100 dark:border-gray-700 p-3 sm:p-4 lg:p-6 mt-8 sm:mt-12 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto relative gap-4 sm:gap-0">
          {/* Price section - Responsive */}
          <div className="flex flex-col items-center sm:items-start relative z-10 w-full sm:w-auto">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#519489] dark:text-white animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-[#519489] dark:text-white animate-pulse">
                Best Price Guaranteed
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#519489] to-[#417c72] bg-clip-text text-transparent animate-pulse">
                ${parseFloat(price || 0).toLocaleString()}
              </span>
              <span className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                per person
              </span>
            </div>
          </div>

          {/* Buttons - Responsive layout */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Book now button - Responsive sizing */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative bg-[#e8f2f1] dark:bg-[#1a1f2e] cursor-pointer text-[#0e1a18] dark:text-white px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold hover:bg-[#519489] hover:text-white dark:hover:bg-[#519489] transition-all duration-500 shadow-2xl hover:scale-105 sm:hover:scale-110 w-full sm:w-auto"
            >
              <div className="flex items-center justify-center gap-2 relative z-10">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                <span className="text-sm sm:text-base lg:text-lg">
                  Book now
                </span>
              </div>
            </button>

            {/* Add to cart button - Responsive sizing */}
            <button
              onClick={handleAddToCart}
              disabled={addToCartLoading}
              className="relative bg-[#519489] cursor-pointer text-white px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold hover:bg-[#417c72] transition-all duration-500 hover:scale-105 sm:hover:scale-110 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-full sm:w-auto"
            >
              <div className="flex items-center justify-center gap-2 relative z-10">
                {addToCartLoading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                )}
                <span className="text-sm sm:text-base lg:text-lg">
                  {addToCartLoading ? "Adding..." : "Add to cart"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Modal - Render using portal to document.body */}
      {isOpen && createPortal(<Modal />, document.body)}
    </>
  );
}

export default ActionButtons;
