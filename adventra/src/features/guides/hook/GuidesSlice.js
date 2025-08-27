import { createSlice } from "@reduxjs/toolkit";
import { GuidesService } from "../api/guidesService";
import { OneGuideService } from "../api/oneGuideService";
import { RelatedGuidesService } from "../api/relatedGuidesService";

const GuidesSlice = createSlice({
  name: "guides",
  initialState: {
    list: [],
    loadingList: false,
    loadingMore: false, // New state for infinite scroll loading
    errorList: null,
    currentPage: 1,
    lastPage: 1,
    hasNextPage: false,
    total: 0,

    detail: null,
    loadingDetail: false,
    errorDetail: null,

    relatedGuidesDetails: null,
    loadingRelatedGuidesDetail: false,
    errorRelatedGuidesDetail: null,
  },
  reducers: {
    resetGuides: (state) => {
      state.list = [];
      state.currentPage = 1;
      state.lastPage = 1;
      state.hasNextPage = false;
      state.total = 0;
      state.errorList = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GuidesService.pending, (state, action) => {
        // Check if this is the first page or additional pages
        if (action.meta.arg?.page === 1 || !action.meta.arg?.page) {
          state.loadingList = true;
        } else {
          state.loadingMore = true;
        }
        state.errorList = null;
      })
      .addCase(GuidesService.fulfilled, (state, action) => {
        state.loadingList = false;
        state.loadingMore = false;

        const { data, meta } = action.payload;

        // If it's the first page, replace the list
        if (meta.current_page === 1) {
          state.list = data;
        } else {
          // If it's additional pages, append to the existing list
          state.list = [...state.list, ...data];
        }

        // Update pagination info
        state.currentPage = meta.current_page;
        state.lastPage = meta.last_page;
        state.hasNextPage = meta.current_page < meta.last_page;
        state.total = meta.total;
      })
      .addCase(GuidesService.rejected, (state, action) => {
        state.loadingList = false;
        state.loadingMore = false;
        state.errorList = action.payload;
      })

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
      })

      .addCase(RelatedGuidesService.pending, (state) => {
        state.loadingRelatedGuidesDetail = true;
        state.errorRelatedGuidesDetail = null;
      })
      .addCase(RelatedGuidesService.fulfilled, (state, action) => {
        state.loadingRelatedGuidesDetail = false;
        state.relatedGuidesDetails = action.payload;
      })
      .addCase(RelatedGuidesService.rejected, (state, action) => {
        state.loadingRelatedGuidesDetail = false;
        state.errorRelatedGuidesDetail = action.payload;
      });
  },
});

export const { resetGuides } = GuidesSlice.actions;
export default GuidesSlice.reducer;
