import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth";
import { API } from "../../../api/apiRoutes";

export const UpdateUserNameService = createAsyncThunk(
  "updateUser",
  async (newName, thunkAPI) => {
    try {
      const response = await MoujaasAuth.post(API.updateUser, {
        name: String(newName),
      });
      console.log(response.data);
      return response.data;
      // Your backend's entire home data object
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update User Info"
      );
    }
  }
);
