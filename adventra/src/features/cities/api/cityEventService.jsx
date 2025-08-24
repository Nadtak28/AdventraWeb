import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth";
import { API } from "../../../api/apiRoutes";

export const CityEventsService = createAsyncThunk(
  "cities/events",
  async (cityId, thunkAPI) => {
    try {
      const response = await MoujaasAuth.get(`${API.cities}/${cityId}/events`);
      console.log("city Event data........................................",response.data);
      return response.data;
    } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch city details.");
    }
  }
);
