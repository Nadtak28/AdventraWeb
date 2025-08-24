import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth";
import { API } from "../../../api/apiRoutes";

export const CityGuidesService = createAsyncThunk(
  "cities/guides",
  async (cityId, thunkAPI) => {
    try {
      const response = await MoujaasAuth.get(`${API.cities}/${cityId}/guides`);
            console.log("city Guides data........................................",response.data);
      return response.data;
    } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch city details.");
    }
  }
);
