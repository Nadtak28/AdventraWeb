import { API } from "../../../../api/apiRoutes";
import Moujaas from "../../../../api/moujaas";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const Auth_google_redirectService = createAsyncThunk(
  "login/google",
  async ( thunkAPI) => {
    try {
      const response = await Moujaas.get(API.auth_google_redirect);
      return response.data;
    } catch (error) {
      const response = error.response;
      if (response?.status === 422) {
        return thunkAPI.rejectWithValue(response.data.errors);
      }
      return thunkAPI.rejectWithValue(
        response?.data?.message || "auth/google/redirect Failed"
      );
    }
  }
);