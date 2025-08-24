import { createSlice } from "@reduxjs/toolkit";
import {
  sendFcmToken,
  fetchNotifications,
  markNotificationRead,
} from "../api/notificationService"; // adjust path if needed

const initialState = {
  items: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // allow pushing a notification when Firebase onMessage fires
    addNotification: (state, action) => {
      state.items.unshift(action.payload);
      state.unreadCount++;
    },
    clearNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // sendFcmToken
      .addCase(sendFcmToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFcmToken.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendFcmToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchNotifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        state.unreadCount = state.items.filter((n) => !n.read_at).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // markNotificationRead
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const id = action.meta.arg; // id passed when dispatching
        const notif = state.items.find((n) => n.id === id);
        if (notif) notif.read_at = new Date().toISOString();
        state.unreadCount = state.items.filter((n) => !n.read_at).length;
      })
      .addCase(markNotificationRead.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { addNotification, clearNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
