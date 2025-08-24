import { createSlice } from "@reduxjs/toolkit";
import { ToursService } from "../api/toursService";
import { OneTourService } from "../api/oneTourService";
const ToursSlice = createSlice({
  name: "tours",
  initialState: {
    list: [],
    loadingList: false,
    errorList: null,

    detail: null,
    loadingDetail: false,
    errorDetail: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(ToursService.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(ToursService.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.data;
      })
      .addCase(ToursService.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      .addCase(OneTourService.pending, (state) => {
        state.loadingDetail = true;
        state.errorDetail = null;
      })
      .addCase(OneTourService.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.detail = action.payload;
      })
      .addCase(OneTourService.rejected, (state, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.payload;
      });
  },
});

export default ToursSlice.reducer;
