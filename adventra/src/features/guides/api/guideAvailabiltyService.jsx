import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth";
import { API } from "../../../api/apiRoutes";

export const GuideAvailabilityService = createAsyncThunk(
  "guide/getAvailability",
  async (id, thunkAPI) => {
    try {
      console.log(`Fetching availability for guide ID: ${id}`);
      const res = await MoujaasAuth.get(`${API.guides}/${id}/reservedDays`);

      console.log("Guide availability raw response:", res);
      console.log("Guide availability data:", res.data);

      let availabilityData = res.data;

      if (Array.isArray(res.data) && res.data.length >= 1) {
        availabilityData = res.data[0];
      }

      const formattedData = {
        reserved: [
          ...(availabilityData?.reservedTasks || []),
          ...(availabilityData?.reservedDaysOff || []),
        ],
        guide_id: id,
        fetched_at: new Date().toISOString(),
      };

      console.log("Formatted availability data:", formattedData);
      return formattedData;
    } catch (error) {
      console.error("Guide availability service error:", error);
      console.error("Error response:", error.response?.data);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch guide availability.";

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
