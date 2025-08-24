import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "./moujaasAuth"; // axios instance that injects Bearer token
import { API } from "./apiRoutes"; // ensure API.feedback = "/feedback"

/**
 * Payload shape to CREATE:
 * { id: number, type: 'group_trip' | 'event' | 'guide', rating: number, comment: string }
 * Endpoint: POST /api/feedback
 */
export const CreateFeedbackService = createAsyncThunk(
  "feedback/create",
  async (payload, thunkAPI) => {
    try {
      // payload must contain: id, type, rating, comment
      const res = await MoujaasAuth.post(`${API.feedback}`, payload);
      // assuming API returns the created feedback object in res.data.data or res.data
      return res?.data?.data ?? res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to create feedback."
      );
    }
  }
);

/**
 * Payload shape to UPDATE:
 * { feedbackId: number, rating?: number, comment?: string }
 * Endpoint: POST /api/feedback/:id
 */
export const UpdateFeedbackService = createAsyncThunk(
  "feedback/update",
  async ({ feedbackId, rating, comment }, thunkAPI) => {
    try {
      const res = await MoujaasAuth.post(`${API.feedback}/${feedbackId}`, {
        rating,
        comment,
      });
      return res?.data?.data ?? res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to update feedback."
      );
    }
  }
);

/**
 * Payload shape to DELETE:
 * { feedbackId: number }
 * Endpoint: DELETE /api/feedback/:id
 */
export const DeleteFeedbackService = createAsyncThunk(
  "feedback/delete",
  async ({ feedbackId }, thunkAPI) => {
    try {
      console.log("Deleting feedback with ID:", feedbackId);
      const res = await MoujaasAuth.delete(`${API.feedback}/${feedbackId}`);
      console.log("Delete response:", res.data);
      return { feedbackId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to delete feedback."
      );
    }
  }
);
