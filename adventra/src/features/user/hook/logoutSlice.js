import { createSlice } from "@reduxjs/toolkit";
import { LogoutService } from "../api/logoutService";
const initialState = {
  status: "idle", // <-- use status string to track async states
  error: null,
};

const LogoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LogoutService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(LogoutService.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(LogoutService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default LogoutSlice.reducer;
