// src/features/auth/signupService.js
import { API } from "../../../../api/apiRoutes";
import Moujaas from "../../../../api/moujaas"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const ResendVerificationCodeService = createAsyncThunk(
  "signup/resendVerificationCode",
  async (formData, thunkAPI) => {
    try {
      const response = await Moujaas.post(API.resendVerificationCode, formData);
      return response.data;
    } catch (error) {
      // Custom error handling
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "register failed"
      );
    }
  }
);

