import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth"; // Your axios or API instance
import { API } from "../../../api/apiRoutes";
export const RelatedGuidesService = createAsyncThunk(
  "guide/relatedGuides",
  async (id, thunkAPI) => {
    try {
      const res = await MoujaasAuth.get(`${API.guides}/${id}/relatedGuides`);
      console.log(
        "related guide data........................................",
        res.data.data
      );

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch related guides details."
      );
    }
  }
);
