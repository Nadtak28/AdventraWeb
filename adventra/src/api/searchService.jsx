import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./apiRoutes";
import MoujaasAuth from "./moujaasAuth";

export const SearchService = createAsyncThunk(
  "search/fetchResults",
  async (searchParams, thunkAPI) => {
    try {
      const response = await MoujaasAuth.post(API.search, searchParams);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to search"
      );
    }
  }
);
