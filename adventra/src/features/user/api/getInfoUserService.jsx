import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth";
import { API } from "../../../api/apiRoutes";

export const GetInfoUserService = createAsyncThunk(
  "get_info",
  async (_, thunkAPI) => {
    try {
      const response = await MoujaasAuth.get(API.get_info);
      console.log(response.data);
      return response.data;
      // Your backend's entire home data object
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get_info User"
      );
    }
  }
);
