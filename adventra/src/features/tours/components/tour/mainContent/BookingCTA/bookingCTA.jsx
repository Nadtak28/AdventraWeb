import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PaymentService } from "../../../../../../api/paymentService";
import { addToCart } from "../../../../../../hooks/cartSlice";
import {
  Loader2,
  Calendar,
  Users,
  CreditCard,
  Trophy,
  Sparkles,
  MapPin,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

function BookingCTA({
  price,
  tourId,
  ticketsLeft,
  startDate,
  endDate,
  tourImage,
  tourName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState("paypal");
  const [tickets, setTickets] = useState(1);
  const [apiError, setApiError] = useState(null);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.payment);

  const handleContinue = async () => {
    // simple validation
    if (tickets <= 0 || tickets > ticketsLeft) {
      setApiError("Invalid number of tickets.");
      return;
    }
    setApiError(null);

    const payload = {
      info: [
        {
          type: "group_trip",
          id: tourId,
          tickets_count: tickets,
        },
      ],
      payment_type: method,
    };

    const res = await dispatch(PaymentService(payload));

    if (res.meta.requestStatus === "fulfilled") {
      if (method === "paypal" && res.payload.url) {
        window.location.href = res.payload.url; // redirect to paypal
      }
      // if points, handle success inside app
    }
  };

  const handleAddToCart = () => {
    // Add the event/tour to cart
    dispatch(
      addToCart({
        tourId: tourId,
        date: startDate,
        price: price,
        eventName: tourName,
        eventImage: tourImage,
        type: "group_trip",
        ticketsCount: tickets, // Default to 1 ticket when adding to cart
      })
    );

    // Show success message
    setShowAddToCartSuccess(true);
    setTimeout(() => {
      setShowAddToCartSuccess(false);
    }, 2000);

    // Optional: Navigate to cart after a short delay
    setTimeout(() => {
      navigate("/cart");
    }, 1500);
  };

  return (
    <>
      {/* Success notification - Responsive */}
      {showAddToCartSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right duration-300 max-w-xs sm:max-w-none">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-semibold text-sm sm:text-base">
            Added to cart successfully!
          </span>
        </div>
      )}

      {/* Enhanced CTA bar - Responsive */}
      <div className="sticky bottom-0 bg-white dark:bg-[#1a1f2e] border-t border-gray-100 dark:border-gray-700 p-3 sm:p-4 lg:p-6 mt-8 sm:mt-12 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto relative gap-4 sm:gap-0">
          {/* Animated background elements - Responsive */}
          <div className="absolute -top-2 -left-2 w-8 h-8 sm:w-12 sm:h-12 bg-[#519489]/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 right-10 sm:right-20 w-6 h-6 sm:w-8 sm:h-8 bg-[#519489]/15 rounded-full animate-bounce delay-300"></div>

          {/* Price section - Responsive */}
          <div className="flex flex-col items-center sm:items-start relative z-10 w-full sm:w-auto">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#519489] dark:text-white animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-[#519489] dark:text-white animate-pulse">
                Best Price Guaranteed
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#519489] bg-gradient-to-r from-[#519489] to-[#417c72] bg-clip-text text-transparent animate-pulse">
                ${parseFloat(price || 0).toLocaleString()}
              </span>
              <span className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                per person
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              <span className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 font-medium">
                Only {ticketsLeft} spots left!
              </span>
            </div>
          </div>

          {/* Buttons - Responsive layout */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Add to Cart Button - Responsive */}
            <button
              onClick={handleAddToCart}
              className="relative bg-gradient-to-r cursor-pointer from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-500 hover:scale-105 sm:hover:scale-110 shadow-2xl hover:shadow-3xl group overflow-hidden transform hover:-translate-y-1 w-full sm:w-auto"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              <div className="flex items-center justify-center gap-2 relative z-10">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                <span className="text-sm sm:text-base lg:text-lg">
                  Add to Cart
                </span>
              </div>

              {/* Floating elements around button */}
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse delay-500"></div>
            </button>

            {/* Book Now Button - Responsive */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative bg-gradient-to-r cursor-pointer dark:from-gray-800 dark:to-gray-900 from-[#519489] to-[#417c72] text-white px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold hover:from-[#417c72] hover:to-[#519489] transition-all duration-500 hover:scale-105 sm:hover:scale-110 shadow-2xl hover:shadow-3xl group overflow-hidden transform hover:-translate-y-1 w-full sm:w-auto"
            >
              {/* Button shine effect */}
              <div className="absolute dark:from-gray-800 dark:to-gray-900  inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              <div className="flex items-center justify-center gap-2 relative z-10">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                <span className="text-sm sm:text-base lg:text-lg">
                  Book Your Adventure
                </span>
              </div>

              {/* Floating elements around button */}
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute  -bottom-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse delay-500"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Modal - Responsive and Dark Mode */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
          {/* Enhanced background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#519489]/20 to-black/60 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white dark:bg-[#1a1f2e] rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg z-10 transform animate-in zoom-in-95 duration-300 border border-[#519489]/20 dark:border-gray-600 max-h-[90vh] overflow-y-auto">
            {/* Header with gradient - Responsive */}
            <div className="text-center mb-4 sm:mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#519489]/10 to-transparent rounded-2xl -m-4"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#519489] dark:text-white animate-spin" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-[#519489] to-[#417c72] bg-clip-text text-transparent">
                    Complete Your Booking
                  </h2>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#519489] dark:text-white animate-spin" />
                </div>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#519489] to-[#417c72] rounded-full mx-auto"></div>
              </div>
            </div>

            {/* Payment Method with enhanced styling - Responsive */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#519489] dark:text-white" />
                <p className="font-bold text-base sm:text-lg text-gray-800 dark:text-white">
                  Select Payment Method:
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#519489] hover:bg-[#519489]/5 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer group">
                  <input
                    type="radio"
                    value="paypal"
                    checked={method === "paypal"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#519489] focus:ring-[#519489] focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs sm:text-sm">
                        PP
                      </span>
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-white group-hover:text-[#519489] dark:group-hover:text-[#519489] transition-colors text-sm sm:text-base">
                      PayPal
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#519489] hover:bg-[#519489]/5 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer group">
                  <input
                    type="radio"
                    value="points"
                    checked={method === "points"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#519489] focus:ring-[#519489] focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-white group-hover:text-[#519489] dark:group-hover:text-[#519489] transition-colors text-sm sm:text-base">
                      Reward Points
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Tour Info with enhanced design - Responsive */}
            <div className="mb-4 sm:mb-6 bg-gradient-to-r from-[#519489]/5 to-transparent dark:from-gray-700 dark:to-transparent p-3 sm:p-5 rounded-2xl border border-[#519489]/20 dark:border-gray-600">
              <h3 className="font-bold text-base sm:text-lg text-[#519489] dark:text-white mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                Trip Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#519489] rounded-full"></div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Type:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#519489] dark:text-white" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Start:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#519489] dark:text-white" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                      End:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Available:
                    </span>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-[#519489] dark:text-white">
                    Group Trip
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
                    {startDate}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
                    {endDate}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400">
                    {ticketsLeft} spots
                  </p>
                </div>
              </div>
            </div>

            {/* Ticket Count with enhanced styling - Responsive */}
            <div className="mb-4 sm:mb-6">
              <label className="flex items-center gap-2 font-bold text-base sm:text-lg text-gray-800 dark:text-white mb-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#519489] dark:text-white" />
                Number of Tickets:
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max={ticketsLeft}
                  value={tickets}
                  onChange={(e) => setTickets(Number(e.target.value))}
                  className="border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-[#519489] focus:ring-2 focus:ring-[#519489]/20 rounded-xl w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:border-[#519489]/50"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    max {ticketsLeft}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Error Display - Responsive */}
            {(error || apiError) && (
              <div className="mb-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-600 dark:text-red-400 font-semibold text-center animate-pulse text-sm sm:text-base">
                  {error || apiError}
                </p>
              </div>
            )}

            {/* Enhanced Actions - Responsive */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 font-semibold text-gray-700 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300 hover:scale-105 text-sm sm:text-base order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={loading}
                className="relative px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#519489] to-[#417c72] text-white rounded-xl font-bold hover:from-[#417c72] hover:to-[#519489] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl group overflow-hidden text-sm sm:text-base lg:text-lg order-1 sm:order-2"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="relative z-10 flex items-center gap-2">
                  {loading && (
                    <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  {!loading && (
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  )}
                  <span>Continue to Payment</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingCTA;
