import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth";  // Your axios or API instance
import { API } from "../../../api/apiRoutes";

export const GuidesService = createAsyncThunk(
  "guides",
  async (_, thunkAPI) => {
    try {
      const response = await MoujaasAuth.get(API.guides);
      console.log("Guides data...................",response.data);
      return response.data;
      // Your backend's entire home data object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load guides data");
    }
  }
);
