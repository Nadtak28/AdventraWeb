import { createSlice } from "@reduxjs/toolkit";
import { CitiesService, LoadMoreCitiesService } from "../api/citiesService";
import { OneCityService } from "../api/oneCityService";
import { CityEventsService } from "../api/cityEventService";
import { CityGuidesService } from "../api/cityGuideService";

const citySlice = createSlice({
  name: "cities",
  initialState: {
    list: [],
    loadingList: false,
    loadingMore: false, // New loading state for pagination
    errorList: null,
    currentPage: 1,
    hasNextPage: false,
    totalPages: 0,
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
  reducers: {
    resetCities: (state) => {
      state.list = [];
      state.currentPage = 1;
      state.hasNextPage = false;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initial cities list
      .addCase(CitiesService.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(CitiesService.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.hasNextPage =
          action.payload.currentPage < action.payload.meta.last_page;
        state.totalPages = action.payload.meta.last_page;
      })
      .addCase(CitiesService.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // Load more cities (pagination)
      .addCase(LoadMoreCitiesService.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(LoadMoreCitiesService.fulfilled, (state, action) => {
        state.loadingMore = false;
        // Append new cities to existing list
        state.list = [...state.list, ...action.payload.data];
        state.currentPage = action.payload.currentPage;
        state.hasNextPage =
          action.payload.currentPage < action.payload.meta.last_page;
        state.totalPages = action.payload.meta.last_page;
      })
      .addCase(LoadMoreCitiesService.rejected, (state, action) => {
        state.loadingMore = false;
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

export const { resetCities } = citySlice.actions;
export default citySlice.reducer;
