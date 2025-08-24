import { createSlice } from "@reduxjs/toolkit";
import { UpdateUserNameService } from "../api/updateUserNameService";
import { UpdateUserImageService } from "../api/updateUserImageService";

const initialState = {
  status: "idle",
  error: null,
  url: null, // track uploaded image URL
};

const UpdateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ---- Name update ----
    builder
      .addCase(UpdateUserNameService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(UpdateUserNameService.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(UpdateUserNameService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetUpdateState } = UpdateUserSlice.actions;
export default UpdateUserSlice.reducer;
