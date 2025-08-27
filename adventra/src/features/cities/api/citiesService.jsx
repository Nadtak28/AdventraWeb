import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "../../../api/moujaasAuth";
import { API } from "../../../api/apiRoutes";

export const CitiesService = createAsyncThunk(
  "cities/fetchCities",
  async (page = 1, thunkAPI) => {
    try {
      const response = await MoujaasAuth.get(`${API.cities}?page=${page}`);
      console.log(response.data);
      return {
        data: response.data.data,
        meta: response.data.meta,
        links: response.data.links,
        currentPage: page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load cities data"
      );
    }
  }
);

// New action for loading more cities
export const LoadMoreCitiesService = createAsyncThunk(
  "cities/loadMoreCities",
  async (page, thunkAPI) => {
    try {
      const response = await MoujaasAuth.get(`${API.cities}?page=${page}`);
      console.log(response.data);
      return {
        data: response.data.data,
        meta: response.data.meta,
        links: response.data.links,
        currentPage: page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load more cities"
      );
    }
  }
);
