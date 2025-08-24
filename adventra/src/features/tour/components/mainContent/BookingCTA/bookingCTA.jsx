import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PaymentService } from "../../../../../api/paymentService";
import { addToCart } from "../../../../../hooks/cartSlice";
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
      {/* Success notification */}
      {showAddToCartSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right duration-300">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Added to cart successfully!</span>
        </div>
      )}

      {/* Enhanced CTA bar */}
      <div className="sticky bottom-0 bg-gradient-to-r from-white via-white to-[#519489]/5 border-t border-gray-100 p-6 mt-12 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto relative">
          {/* Animated background elements */}
          <div className="absolute -top-2 -left-2 w-12 h-12 bg-[#519489]/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 right-20 w-8 h-8 bg-[#519489]/15 rounded-full animate-bounce delay-300"></div>

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
            <div className="flex items-center gap-1 mt-1">
              <Users className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-orange-600 font-medium">
                Only {ticketsLeft} spots left!
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="relative bg-gradient-to-r cursor-pointer from-emerald-500 to-emerald-600 text-white px-8 py-5 rounded-2xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-3xl group overflow-hidden transform hover:-translate-y-1"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              <div className="flex items-center gap-2 relative z-10">
                <ShoppingCart className="w-5 h-5 animate-bounce" />
                <span className="text-lg">Add to Cart</span>
              </div>

              {/* Floating elements around button */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-500"></div>
            </button>

            {/* Book Now Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative bg-gradient-to-r cursor-pointer from-[#519489] to-[#417c72] text-white px-10 py-5 rounded-2xl font-bold hover:from-[#417c72] hover:to-[#519489] transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-3xl group overflow-hidden transform hover:-translate-y-1"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              <div className="flex items-center gap-2 relative z-10">
                <MapPin className="w-5 h-5 animate-bounce" />
                <span className="text-lg">Book Your Adventure</span>
              </div>

              {/* Floating elements around button */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-500"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-in fade-in duration-300">
          {/* Enhanced background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#519489]/20 to-black/60 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg z-10 transform animate-in zoom-in-95 duration-300 border border-[#519489]/20">
            {/* Header with gradient */}
            <div className="text-center mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#519489]/10 to-transparent rounded-2xl -m-4"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-[#519489] animate-spin" />
                  <h2 className="text-3xl font-black bg-gradient-to-r from-[#519489] to-[#417c72] bg-clip-text text-transparent">
                    Complete Your Booking
                  </h2>
                  <Sparkles className="w-6 h-6 text-[#519489] animate-spin" />
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-[#519489] to-[#417c72] rounded-full mx-auto"></div>
              </div>
            </div>

            {/* Payment Method with enhanced styling */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-[#519489]" />
                <p className="font-bold text-lg text-gray-800">
                  Select Payment Method:
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#519489] hover:bg-[#519489]/5 transition-all duration-300 cursor-pointer group">
                  <input
                    type="radio"
                    value="paypal"
                    checked={method === "paypal"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-5 h-5 text-[#519489] focus:ring-[#519489] focus:ring-2"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">PP</span>
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-[#519489] transition-colors">
                      PayPal
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#519489] hover:bg-[#519489]/5 transition-all duration-300 cursor-pointer group">
                  <input
                    type="radio"
                    value="points"
                    checked={method === "points"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-5 h-5 text-[#519489] focus:ring-[#519489] focus:ring-2"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-[#519489] transition-colors">
                      Reward Points
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Tour Info with enhanced design */}
            <div className="mb-6 bg-gradient-to-r from-[#519489]/5 to-transparent p-5 rounded-2xl border border-[#519489]/20">
              <h3 className="font-bold text-lg text-[#519489] mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Trip Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#519489] rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-600">
                      Type:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#519489]" />
                    <span className="text-sm font-semibold text-gray-600">
                      Start:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#519489]" />
                    <span className="text-sm font-semibold text-gray-600">
                      End:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-semibold text-gray-600">
                      Available:
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-bold text-[#519489]">Group Trip</p>
                  <p className="text-sm font-bold text-gray-800">{startDate}</p>
                  <p className="text-sm font-bold text-gray-800">{endDate}</p>
                  <p className="text-sm font-bold text-orange-600">
                    {ticketsLeft} spots
                  </p>
                </div>
              </div>
            </div>

            {/* Ticket Count with enhanced styling */}
            <div className="mb-6">
              <label className="flex items-center gap-2 font-bold text-lg text-gray-800 mb-3">
                <Users className="w-5 h-5 text-[#519489]" />
                Number of Tickets:
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max={ticketsLeft}
                  value={tickets}
                  onChange={(e) => setTickets(Number(e.target.value))}
                  className="border-2 border-gray-200 focus:border-[#519489] focus:ring-2 focus:ring-[#519489]/20 rounded-xl w-full px-4 py-3 text-lg font-semibold transition-all duration-300 hover:border-[#519489]/50"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="text-sm text-gray-500">max {ticketsLeft}</div>
                </div>
              </div>
            </div>

            {/* Enhanced Error Display */}
            {(error || apiError) && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 font-semibold text-center animate-pulse">
                  {error || apiError}
                </p>
              </div>
            )}

            {/* Enhanced Actions */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 font-semibold text-gray-700 hover:text-gray-800 transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={loading}
                className="relative px-8 py-3 bg-gradient-to-r from-[#519489] to-[#417c72] text-white rounded-xl font-bold hover:from-[#417c72] hover:to-[#519489] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl group overflow-hidden"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="relative z-10 flex items-center gap-2">
                  {loading && <Loader2 className="animate-spin w-5 h-5" />}
                  {!loading && <Sparkles className="w-5 h-5 animate-pulse" />}
                  <span className="text-lg">Continue to Payment</span>
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
