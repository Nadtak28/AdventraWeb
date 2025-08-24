import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./apiRoutes";
import MoujaasAuth from "./moujaasAuth";

export const RequiredIdsService = createAsyncThunk(
  "requiredIds",
  async (_, thunkAPI) => {
    try {
      const response = await MoujaasAuth.get(API.required_ids);
      console.log(response.data);
      return response.data;
      // Your backend's entire home data object
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to requiredIds"
      );
    }
  }
);
