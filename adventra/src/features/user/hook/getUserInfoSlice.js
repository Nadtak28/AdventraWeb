import { createSlice } from "@reduxjs/toolkit";
import { GetInfoUserService } from "../api/getInfoUserService";
import { UpdateUserNameService } from "../api/updateUserNameService";
import { UpdateUserImageService } from "../api/updateUserImageService";

const GetUserInfoSlice = createSlice({
  name: "getUserInfo",
  initialState: {
    status: "idle",
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch user
      .addCase(GetInfoUserService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(GetInfoUserService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(GetInfoUserService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // update user name
      .addCase(UpdateUserNameService.fulfilled, (state, action) => {
        if (state.user) state.user.name = action.payload.name;
      })
      // update user image
      .addCase(UpdateUserImageService.fulfilled, (state, action) => {
        if (state.user) {
          if (!state.user.images || state.user.images.length === 0) {
            state.user.images = [{ url: action.payload.url }]; // <-- use .url
          } else {
            state.user.images[0].url = action.payload.url; // <-- use .url
          }
        }
      });
  },
});

export default GetUserInfoSlice.reducer;
