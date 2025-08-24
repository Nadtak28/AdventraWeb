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

  // Modal component
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

        {/* Payment options */}
        <div className="mb-6">
          <label className="flex items-center gap-2 p-3 border rounded-lg mb-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              value="paypal"
              checked={method === "paypal"}
              onChange={(e) => setMethod(e.target.value)}
              className="text-[#519489] focus:ring-[#519489]"
            />
            <span className="font-medium">PayPal</span>
          </label>
          <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              value="points"
              checked={method === "points"}
              onChange={(e) => setMethod(e.target.value)}
              className="text-[#519489] focus:ring-[#519489]"
            />
            <span className="font-medium">Reward Points</span>
          </label>
        </div>

        {/* Ticket count */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Number of Tickets:
          </label>
          <input
            type="number"
            min="1"
            value={tickets}
            onChange={(e) => setTickets(Number(e.target.value))}
            className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#519489] focus:border-transparent transition-all"
          />
        </div>

        {/* Total price display */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Total:</span>
            <span className="text-xl font-bold text-[#519489]">
              ${(parseFloat(price || 0) * tickets).toLocaleString()}
            </span>
          </div>
        </div>

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
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            disabled={loading}
            className="px-6 py-2 bg-[#519489] text-white rounded-lg hover:bg-[#417c72] transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-3 shadow-lg">
          <p className="text-green-600 text-sm font-medium">{apiError}</p>
        </div>
      )}

      {/* sticky bar */}
      <div className="sticky bottom-0 bg-gradient-to-r from-white via-white to-[#519489]/5 border-t border-gray-100 p-6 mt-12 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto relative">
          <div className="flex flex-col relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-[#519489] animate-pulse" />
              <span className="text-sm font-medium text-[#519489] animate-pulse">
                Best Price Guaranteed
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#519489] bg-gradient-to-r from-[#519489] to-[#417c72] bg-clip-text text-transparent animate-pulse">
                ${parseFloat(price || 0).toLocaleString()}
              </span>
              <span className="text-gray-600 font-medium">per person</span>
            </div>
          </div>

          <div className="flex gap-4">
            {/* Book now */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative bg-[#e8f2f1] text-[#0e1a18] px-10 py-5 rounded-2xl font-bold hover:bg-[#519489] hover:text-white transition-all duration-500 shadow-2xl hover:scale-110"
            >
              <div className="flex items-center gap-2 relative z-10">
                <MapPin className="w-5 h-5 animate-bounce" />
                <span className="text-lg">Book now</span>
              </div>
            </button>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={addToCartLoading}
              className="relative bg-[#519489] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#417c72] transition-all duration-500 hover:scale-110 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="flex items-center gap-2 relative z-10">
                {addToCartLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                )}
                <span className="text-lg">
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
