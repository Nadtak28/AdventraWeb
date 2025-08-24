import { createSlice } from "@reduxjs/toolkit";
import { EventsService } from "../api/eventsService";
import { OneEventService } from "../api/oneEventService";
import { RelatedEventsService } from "../api/relatedEventsService"; // import your thunk
import { RelatedGuidesService } from "../api/relatedGuidesService";
const EventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    loadingList: false,
    errorList: null,

    detail: null,
    loadingDetail: false,
    errorDetail: null,

    relatedEvents: [], // new state
    loadingRelated: false, // new state
    errorRelated: null, // new state

    relatedGuides: [],
    loadingRelatedGuides: false,
    errorRelatedGuides: null,
  },
  extraReducers: (builder) => {
    builder
      // Events list
      .addCase(EventsService.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(EventsService.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.data; // adjust if API returns differently
      })
      .addCase(EventsService.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // Single event
      .addCase(OneEventService.pending, (state) => {
        state.loadingDetail = true;
        state.errorDetail = null;
      })
      .addCase(OneEventService.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.detail = action.payload;
      })
      .addCase(OneEventService.rejected, (state, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.payload;
      })

      // Related events
      .addCase(RelatedEventsService.pending, (state) => {
        state.loadingRelated = true;
        state.errorRelated = null;
      })
      .addCase(RelatedEventsService.fulfilled, (state, action) => {
        state.loadingRelated = false;
        state.relatedEvents = action.payload.data; // or `action.payload` depending on API shape
      })
      .addCase(RelatedEventsService.rejected, (state, action) => {
        state.loadingRelated = false;
        state.errorRelated = action.payload;
      })
      .addCase(RelatedGuidesService.pending, (state) => {
        state.loadingRelatedGuides = true;
        state.errorRelatedGuides = null;
      })
      .addCase(RelatedGuidesService.fulfilled, (state, action) => {
        state.loadingRelatedGuides = false;
        state.relatedGuides = action.payload.data; // or `action.payload` depending on API shape
      })
      .addCase(RelatedGuidesService.rejected, (state, action) => {
        state.loadingRelatedGuides = false;
        state.errorRelatedGuides = action.payload;
      });
  },
});

export default EventsSlice.reducer;
