import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../api/apiRoutes";
import MoujaasAuth from "../../../api/moujaasAuth";
export const ResetPasswordService = createAsyncThunk(
  "user/resetPassword",
  async (formData, thunkAPI) => {
    try {
      const response = await MoujaasAuth.post(API.reset_password, formData);
      return response.data;
    } catch (error) {
      const response = error.response;
      if (response?.status === 422) {
        return thunkAPI.rejectWithValue(response.data.errors);
      }
      return thunkAPI.rejectWithValue(
        response?.data?.message || "reset Password failed"
      );
    }
  }
);
