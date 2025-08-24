import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth";
import { API } from "../../../api/apiRoutes";

export const RelatedEventsService = createAsyncThunk(
  "events/relatedEvents",
  async (eventId, thunkAPI) => {
    try {
      const response = await MoujaasAuth.get(
        `${API.events}/${eventId}/relatedEvents`
      );
      console.log(
        "Related Event data........................................",
        response.data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Related events."
      );
    }
  }
);
