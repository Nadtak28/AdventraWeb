import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth"; // Your axios or API instance
import { API } from "../../../api/apiRoutes";
export const OneCityService = createAsyncThunk(
  "cities/getOne",
  async (id, thunkAPI) => {
    try {
      const res = await MoujaasAuth.get(`${API.cities}/${id}`);
      console.log(
        "one City data........................................",
        res.data.data
      );

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch city details."
      );
    }
  }
);
