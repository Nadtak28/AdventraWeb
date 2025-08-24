import { createSlice } from "@reduxjs/toolkit";
import { HomeService } from "../api/homeService";

const initialState = {
  latestGroupTrips: [],
  topRatedGroupTrips: [],
  topRatedEvents: [],
  latestEvents: [],
  citiesWithMostEvents: [],
  topRatedGuides: [],
  eventsByCategory: [],
  guidesByCategory: [],
  groupTripsWithOffer: [],
  eventWithOffer: [],
  status: "idle", // <-- use status string to track async states
  error: null,
};

const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HomeService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(HomeService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.latestGroupTrips = action.payload.latestGroupTrips || [];
        state.topRatedGroupTrips = action.payload.topRatedGroupTrips || [];
        state.topRatedEvents = action.payload.topRatedEvents || [];
        state.latestEvents = action.payload.latestEvents || [];
        state.citiesWithMostEvents = action.payload.citiesWithMostEvents || [];
        state.topRatedGuides = action.payload.topRatedGuides || [];
        state.eventsByCategory = action.payload.eventsByCategory || [];
        state.guidesByCategory = action.payload.guidesByCategory || [];
        state.groupTripsWithOffer = action.payload.groupTripsWithOffer || [];
        state.eventWithOffer = action.payload.eventWithOffer || [];
      })
      .addCase(HomeService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default HomeSlice.reducer;
