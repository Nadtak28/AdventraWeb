import { createSlice } from "@reduxjs/toolkit";
import { OneGuideService } from "../api/oneGuideService";
import { GuideAvailabilityService } from "../api/guideAvailabiltyService.jsx";

const initialState = {
  // Existing guide detail state
  detail: null,
  loadingDetail: false,
  errorDetail: null,
  // Availability state (now includes both tasks and days off)
  availability: null,
  loadingAvailability: false,
  errorAvailability: null,
};

const GuideAvailabiltySlice = createSlice({
  name: "guideAvailabilty",
  initialState,
  reducers: {
    clearGuideDetail: (state) => {
      state.detail = null;
      state.errorDetail = null;
    },
    clearAvailability: (state) => {
      state.availability = null;
      state.errorAvailability = null;
    },
  },
  extraReducers: (builder) => {
    // Existing OneGuideService cases
    builder
      .addCase(OneGuideService.pending, (state) => {
        state.loadingDetail = true;
        state.errorDetail = null;
      })
      .addCase(OneGuideService.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.detail = action.payload;
      })
      .addCase(OneGuideService.rejected, (state, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.payload;
      });

    // GuideAvailabilityService cases
    builder
      .addCase(GuideAvailabilityService.pending, (state) => {
        state.loadingAvailability = true;
        state.errorAvailability = null;
      })
      .addCase(GuideAvailabilityService.fulfilled, (state, action) => {
        state.loadingAvailability = false;
        state.availability = action.payload;
      })
      .addCase(GuideAvailabilityService.rejected, (state, action) => {
        state.loadingAvailability = false;
        state.errorAvailability = action.payload;
      });
  },
});

export const { clearGuideDetail, clearAvailability } =
  GuideAvailabiltySlice.actions;
export default GuideAvailabiltySlice.reducer;
