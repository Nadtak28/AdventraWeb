import { API } from "../../../../api/apiRoutes";
import Moujaas from "../../../../api/moujaas";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const ForgetPasswordService = createAsyncThunk(
  "forgetpassword",
  async (formData, thunkAPI) => {
    try {
      const response = await Moujaas.post(API.forgetPassword, formData);
      return response.data;
    } catch (error) {
      const response = error.response;
      if (response?.status === 422) {
        return thunkAPI.rejectWithValue(response.data.errors);
      }
      return thunkAPI.rejectWithValue(
        response?.data?.message || "Login failed"
      );
    }
  }
);