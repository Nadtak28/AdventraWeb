import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth"; // Your axios or API instance
import { API } from "../../../api/apiRoutes";
export const OneTourService = createAsyncThunk(
  "tour/getOne",
  async (id, thunkAPI) => {
    try {
      const res = await MoujaasAuth.get(`${API.group_trip}/${id}`);
      console.log(
        "one tour data........................................",
        res.data.data
      );

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch tour details."
      );
    }
  }
);
