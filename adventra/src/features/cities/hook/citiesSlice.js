import { createSlice } from "@reduxjs/toolkit";
import { CitiesService } from "../api/citiesService";
import { OneCityService } from "../api/oneCityService";
import { CityEventsService } from "../api/cityEventService";
import { CityGuidesService } from "../api/cityGuideService";

const citySlice = createSlice({
  name: "cities",
  initialState: {
    list: [],
    loadingList: false,
    errorList: null,

    detail: {},
    loadingDetail: false,
    errorDetail: null,

    events: [],
    loadingEvents: false,
    errorEvents: null,

    guides: [],
    loadingGuides: false,
    errorGuides: null,
  },
  extraReducers: (builder) => {
    builder
      // Cities list
      .addCase(CitiesService.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(CitiesService.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.data;
      })
      .addCase(CitiesService.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // City detail
      .addCase(OneCityService.pending, (state) => {
        state.loadingDetail = true;
      })
      .addCase(OneCityService.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.detail = action.payload;
      })
      .addCase(OneCityService.rejected, (state, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.payload;
      })

      // City events
      .addCase(CityEventsService.pending, (state) => {
        state.loadingEvents = true;
      })
      .addCase(CityEventsService.fulfilled, (state, action) => {
        state.loadingEvents = false;
        state.events = action.payload.data;
      })
      .addCase(CityEventsService.rejected, (state, action) => {
        state.loadingEvents = false;
        state.errorEvents = action.payload.data;
      })

      // City guides
      .addCase(CityGuidesService.pending, (state) => {
        state.loadingGuides = true;
      })
      .addCase(CityGuidesService.fulfilled, (state, action) => {
        state.loadingGuides = false;
        state.guides = action.payload;
      })
      .addCase(CityGuidesService.rejected, (state, action) => {
        state.loadingGuides = false;
        state.errorGuides = action.payload;
      });
  },
});

export default citySlice.reducer;
