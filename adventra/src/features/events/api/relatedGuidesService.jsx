import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth";
import { API } from "../../../api/apiRoutes";

export const RelatedGuidesService = createAsyncThunk(
  "events/relatedGuides",
  async (eventId, thunkAPI) => {
    try {
      const response = await MoujaasAuth.get(
        `${API.events}/${eventId}/relatedGuides`
      );
      console.log(
        "Related Guides data........................................",
        response.data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Related Guides."
      );
    }
  }
);
