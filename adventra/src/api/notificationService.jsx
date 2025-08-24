import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "./moujaasAuth"; // axios instance that injects Bearer token
import { API } from "./apiRoutes"; // ensure API.feedback = "/feedback"

export const sendFcmToken = createAsyncThunk(
  "notification/sendToken",
  async (fcmToken, thunkAPI) => {
    try {
      const payload = {
        type: "user",
        token: fcmToken,
      };

      const res = await MoujaasAuth.post(`${API}/user/fcm_token`, payload);
      console.log(res?.data?.data ?? res?.data);
      return res?.data?.data ?? res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to send Fcm token."
      );
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (thunkAPI) => {
    try {
      const payload = {
        type: "user",
      };

      const res = await MoujaasAuth.post(`${API.notification}`, payload);
      console.log(res?.data?.data ?? res?.data);
      return res?.data?.data ?? res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to Fetch Notifications."
      );
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notification/markRead",
  async (notifId, thunkAPI) => {
    try {
      // Correct endpoint
      const res = await MoujaasAuth.get(`/notification/${notifId}/read`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to mark notification as read."
      );
    }
  }
);
