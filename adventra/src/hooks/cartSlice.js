// store/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper functions for localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    const serializedCart = JSON.stringify(items);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = {
  items: loadCartFromStorage(),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        guideId,
        eventId,
        tourId, // Add tourId for group trips
        date,
        price,
        guideName,
        eventName,
        guideImage,
        eventImage,
        type = "guide",
        ticketsCount = 1,
      } = action.payload;

      // For guides: check guideId and date
      // For events: check eventId
      // For group trips: check tourId
      const existingItemIndex = state.items.findIndex((item) => {
        if (type === "guide") {
          return (
            item.guideId === guideId &&
            item.date === date &&
            item.type === "guide"
          );
        } else if (type === "event") {
          return item.eventId === eventId && item.type === "event";
        } else if (type === "group_trip") {
          return item.tourId === tourId && item.type === "group_trip";
        }
        return false;
      });

      if (existingItemIndex >= 0) {
        // Update existing item (increment quantity)
        if (type === "event" || type === "group_trip") {
          state.items[existingItemIndex].ticketsCount += ticketsCount;
        } else {
          state.items[existingItemIndex].quantity += 1;
        }
      } else {
        // Add new item
        const newItem = {
          id: Date.now(), // Simple ID generation
          type,
          price: parseFloat(price),
          addedAt: new Date().toISOString(),
        };

        if (type === "guide") {
          newItem.guideId = guideId;
          newItem.date = date;
          newItem.guideName = guideName;
          newItem.guideImage = guideImage;
          newItem.quantity = 1;
        } else if (type === "event") {
          newItem.eventId = eventId;
          newItem.eventName = eventName;
          newItem.eventImage = eventImage;
          newItem.ticketsCount = ticketsCount;
        } else if (type === "group_trip") {
          newItem.tourId = tourId;
          newItem.date = date; // Group trips might have dates
          newItem.eventName = eventName; // Reuse eventName for tour name
          newItem.eventImage = eventImage; // Reuse eventImage for tour image
          newItem.ticketsCount = ticketsCount;
        }

        state.items.push(newItem);
      }

      // Save to localStorage
      saveCartToStorage(state.items);
      state.error = null;
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      // Save to localStorage
      saveCartToStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { itemId, quantity, ticketsCount } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        if (item.type === "guide") {
          item.quantity = Math.max(1, quantity || item.quantity);
        } else if (item.type === "event" || item.type === "group_trip") {
          item.ticketsCount = Math.max(1, ticketsCount || item.ticketsCount);
        }
        // Save to localStorage
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.error = null;
      // Clear localStorage
      localStorage.removeItem("cart");
    },

    setCartError: (state, action) => {
      state.error = action.payload;
    },

    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartError,
  setCartLoading,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsByType = (state, type) =>
  state.cart.items.filter((item) => item.type === type);

// MODIFIED: Updated total calculation with new guide pricing logic
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => {
    if (item.type === "guide") {
      return total + item.price * 1; // Always multiply by 1 for guides, regardless of quantity
    } else if (item.type === "event" || item.type === "group_trip") {
      return total + item.price * item.ticketsCount;
    }
    return total;
  }, 0);

// MODIFIED: Updated total by type calculation with new guide pricing logic
export const selectCartTotalByType = (state, type) =>
  state.cart.items
    .filter((item) => item.type === type)
    .reduce((total, item) => {
      if (item.type === "guide") {
        return total + item.price * 1; // Always multiply by 1 for guides, regardless of quantity
      } else if (item.type === "event" || item.type === "group_trip") {
        return total + item.price * item.ticketsCount;
      }
      return total;
    }, 0);

export const selectCartItemCount = (state) =>
  state.cart.items.reduce((count, item) => {
    if (item.type === "guide") {
      return count + item.quantity;
    } else if (item.type === "event" || item.type === "group_trip") {
      return count + item.ticketsCount;
    }
    return count;
  }, 0);

export default cartSlice.reducer;
