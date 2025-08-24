import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth";
import { API } from "../../../api/apiRoutes";
export const UpdateUserImageService = createAsyncThunk(
  "updateUser/updateImage",
  async (formData, thunkAPI) => {
    try {
      const response = await MoujaasAuth.post(API.updateUser, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // assuming your backend returns response.data.data.image
      return { url: response.data?.data?.image };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update user image"
      );
    }
  }
);
