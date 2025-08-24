import { API } from "../../../../api/apiRoutes";
import Moujaas from "../../../../api/moujaas";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const CheckCodeService = createAsyncThunk(
  "forgetpassword/checkcode",
  async (formData, thunkAPI) => {
    try {
      const response = await Moujaas.post(API.checkCode, formData);
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