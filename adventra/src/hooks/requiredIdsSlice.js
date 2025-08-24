import { createSlice } from "@reduxjs/toolkit";
import { RequiredIdsService } from "../api/requiredIdsService";

const initialState = {
  status: "idle", // idle, loading, succeeded, failed
  error: null,
  data: {
    cities: [],
    countries: [],
    languages: [],
    categories: [],
  },
};

const RequiredIdsSlice = createSlice({
  name: "requiredIds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RequiredIdsService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(RequiredIdsService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // This should contain cities, countries, languages, categories
      })
      .addCase(RequiredIdsService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default RequiredIdsSlice.reducer;
