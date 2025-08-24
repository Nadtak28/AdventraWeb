// src/api/services/generateUnverifiedUserService.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import Moujaas from "../../../../api/moujaas";
import { API } from "../../../../api/apiRoutes";

export const GenerateUnverifiedUserService = createAsyncThunk(
  "signup/submit",
  async (formData, thunkAPI) => {
    try {
      const response = await Moujaas.post(API.generateUnverifiedUser, formData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;
      return thunkAPI.rejectWithValue(message || "Signup failed");
    }
  }
);
