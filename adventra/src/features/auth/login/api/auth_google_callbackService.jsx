import { createAsyncThunk } from "@reduxjs/toolkit";
import Moujaas from "../../../../api/moujaas";
import { API } from "../../../../api/apiRoutes";

export const Auth_google_callbackService = createAsyncThunk(
  "auth/google/callback",
  async (googleToken, thunkAPI) => {
    try {
      const response = await Moujaas.post(API.auth_google_callback, {
        token: googleToken,
      });
      return response.data;
    } catch (error) {
      const response = error.response;
      if (response?.status === 422) {
        return thunkAPI.rejectWithValue(response.data.errors);
      }
      return thunkAPI.rejectWithValue(
        response?.data?.message || "Google callback failed"
      );
    }
  }
);
