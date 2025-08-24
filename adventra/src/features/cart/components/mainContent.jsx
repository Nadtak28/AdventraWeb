import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  removeFromCart,
  updateQuantity,
  selectCartItems,
  clearCart,
} from "../../../hooks/cartSlice";
import { PaymentService } from "../../../api/paymentService";
import {
  ShoppingCart,
  User,
  Calendar,
  MapPin,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Trophy,
  Loader2,
  ArrowRight,
  Users,
} from "lucide-react";

export default function MainContent() {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  // Get items by type using helper function since we can't use parameterized selectors
  const guideItems = cartItems.filter((item) => item.type === "guide");
  const eventItems = cartItems.filter((item) => item.type === "event");
  const tourItems = cartItems.filter((item) => item.type === "group_trip");

  // Calculate totals by type - MODIFIED PRICING LOGIC FOR GUIDES
  const guideTotal = guideItems.reduce(
    (total, item) => total + item.price * 1, // Always multiply by 1 for guides, regardless of quantity
    0
  );
  const eventTotal = eventItems.reduce(
    (total, item) => total + item.price * item.ticketsCount,
    0
  );
  const tourTotal = tourItems.reduce(
    (total, item) => total + item.price * item.ticketsCount,
    0
  );

  // Calculate cart total with modified guide pricing
  const cartTotal = guideTotal + eventTotal + tourTotal;

  const handleEventClick = (event) => {
    navigate(`/events/${event.eventId}`);
  };

  const handleGroupClick = (group) => {
    navigate(`/tours/${group.tourId}`);
  };

  const handleGuideClick = (guide) => {
    navigate(`/guides/${guide.guideId}`);
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";

    try {
      let date;
      if (dateStr instanceof Date) {
        date = dateStr;
      } else if (typeof dateStr === "string") {
        const [year, month, day] = dateStr
          .split("-")
          .map((num) => parseInt(num, 10));
        date = new Date(year, month - 1, day);
      } else {
        date = new Date(dateStr);
      }

      return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error, dateStr);
      return dateStr?.toString() || "";
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleQuantityChange = (itemId, newQuantity, itemType) => {
    if (itemType === "guide") {
      dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    } else if (itemType === "event" || itemType === "group_trip") {
      dispatch(updateQuantity({ itemId, ticketsCount: newQuantity }));
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Prepare payment payload
      const info = cartItems.map((item) => {
        const baseInfo = {
          type: item.type,
          id:
            item.type === "guide"
              ? item.guideId
              : item.type === "event"
              ? item.eventId
              : item.tourId,
        };

        // Add date for guides
        if (item.type === "guide" && item.date) {
          baseInfo.date = item.date;
        }

        // Add tickets_count for events and group trips
        if (item.type === "event" || item.type === "group_trip") {
          baseInfo.tickets_count = item.ticketsCount;
        }

        return baseInfo;
      });

      const payload = {
        info,
        payment_type: paymentMethod,
      };

      console.log("Checkout payload:", payload);

      const result = await dispatch(PaymentService(payload));

      if (result.meta.requestStatus === "fulfilled") {
        // Clear cart on successful payment
        dispatch(clearCart());

        if (paymentMethod === "paypal" && result.payload?.url) {
          // Redirect to PayPal
          window.location.href = result.payload.url;
        } else {
          // Handle points payment success
          setShowCheckoutModal(false);
          // Could show success message or navigate somewhere
        }
      } else {
        setPaymentError(result.payload || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setPaymentError("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCartSection = (items, sectionTitle, browseLink, total, icon) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-8 bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Header */}
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 dark:bg-[#1a1f2e] px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon}
              <h3 className="text-xl font-bold text-gray-800">
                {sectionTitle}
              </h3>
              <span className="bg-teal-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                {items.length}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-teal-600">
                ${total.toFixed(2)}
              </span>
              <button
                onClick={() => navigate(browseLink)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
              >
                Browse More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Section Items */}
        <div className="divide-y divide-gray-100">
          {items.map((item) => {
            const itemName =
              item.type === "guide" ? item.guideName : item.eventName;
            const itemImage =
              item.type === "guide" ? item.guideImage : item.eventImage;
            const itemQuantity =
              item.type === "guide" ? item.quantity : item.ticketsCount;

            // MODIFIED PRICING CALCULATION FOR GUIDES
            const totalPrice =
              item.type === "guide"
                ? item.price * 1 // Always multiply by 1 for guides
                : item.price * itemQuantity; // Normal calculation for events and tours

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.type === "event") handleEventClick(item);
                  if (item.type === "group_trip") handleGroupClick(item);
                  if (item.type === "guide") handleGuideClick(item);
                }}
                className="p-6 hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  {/* Item Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={
                          itemImage ||
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                        }
                        alt={itemName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {itemName}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {item.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDisplayDate(item.date)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {itemQuantity}{" "}
                            {itemQuantity === 1 ? "ticket" : "tickets"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-lg font-bold text-teal-600">
                          ${totalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          {item.type === "guide"
                            ? `(${item.price.toFixed(2)} flat rate)`
                            : `(${item.price.toFixed(2)} each)`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(
                            item.id,
                            itemQuantity - 1,
                            item.type
                          );
                        }}
                        disabled={itemQuantity <= 1}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                        {itemQuantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(
                            item.id,
                            itemQuantity + 1,
                            item.type
                          );
                        }}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item.id);
                      }}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const CheckoutModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !isProcessing && setShowCheckoutModal(false)}
      />

      {/* Modal content */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg z-10 m-4 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Complete Your Purchase
          </h2>
          <p className="text-gray-600">Choose your payment method</p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2">
            {guideItems.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Guides ({guideItems.length} items)
                </span>
                <span className="font-medium">${guideTotal.toFixed(2)}</span>
              </div>
            )}
            {eventItems.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Events ({eventItems.length} items)
                </span>
                <span className="font-medium">${eventTotal.toFixed(2)}</span>
              </div>
            )}
            {tourItems.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Group Trips ({tourItems.length} items)
                </span>
                <span className="font-medium">${tourTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-teal-600">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer">
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                disabled={isProcessing}
              />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">PayPal</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer">
              <input
                type="radio"
                value="points"
                checked={paymentMethod === "points"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                disabled={isProcessing}
              />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Reward Points</span>
              </div>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {paymentError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-medium text-center">
              {paymentError}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowCheckoutModal(false)}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>Continue Payment</>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <main className="px-4 md:px-40 flex flex-1 dark:bg-[#1a1f2e] justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Empty Cart */}
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-8">
              Start exploring and add some amazing experiences to your cart!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/guides")}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                Browse Guides
              </button>
              <button
                onClick={() => navigate("/events")}
                className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Browse Events
              </button>
              <button
                onClick={() => navigate("/tours")}
                className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-colors font-medium flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Browse Tours
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="px-4 dark:bg-[#1a1f2e] md:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              Review your items and proceed to checkout
            </p>
          </div>

          {/* Cart Sections */}
          {renderCartSection(
            guideItems,
            "Personal Guides",
            "/guides",
            guideTotal,
            <User className="w-6 h-6 text-teal-600" />
          )}

          {renderCartSection(
            eventItems,
            "Events",
            "/events",
            eventTotal,
            <Calendar className="w-6 h-6 text-teal-600" />
          )}

          {renderCartSection(
            tourItems,
            "Group Trips",
            "/tours",
            tourTotal,
            <MapPin className="w-6 h-6 text-teal-600" />
          )}

          {/* Cart Total and Checkout */}
          <div className="sticky bottom-4 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Total</h3>
                <p className="text-sm text-gray-600">
                  {cartItems.length} items in cart
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-teal-600">
                  ${cartTotal.toFixed(2)}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowCheckoutModal(true)}
              className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold text-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      {showCheckoutModal && createPortal(<CheckoutModal />, document.body)}
    </>
  );
}
