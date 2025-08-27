import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth"; // Your axios or API instance
import { API } from "../../../api/apiRoutes";

export const GuidesService = createAsyncThunk(
  "guides",
  async ({ page = 1, ...otherParams } = {}, thunkAPI) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...otherParams,
      });

      const response = await MoujaasAuth.get(`${API.guides}?${params}`);
      console.log("Guides data...................", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load guides data"
      );
    }
  }
);
