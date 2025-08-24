import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth"; // Your axios or API instance
import { API } from "../../../api/apiRoutes";
export const OneEventService = createAsyncThunk(
  "events/getOne",
  async (id, thunkAPI) => {
    try {
      const res = await MoujaasAuth.get(`${API.events}/${id}`);
      console.log(
        "one Event data........................................",
        res.data.data
      );

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Event details."
      );
    }
  }
);
