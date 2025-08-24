import { createSlice } from "@reduxjs/toolkit";
import { SearchService } from "../api/searchService";
const initialState = {
  status: "idle", // idle, loading, succeeded, failed
  error: null,
  results: [],
  filters: {
    types: [], // Required - at least one must be selected
    cities: [],
    countries: [],
    languages: [],
    categories: [],
    only_offer: false,
    contains: "", // search by name
    minPrice: "",
    maxPrice: "",
    status: "", // for group_trip: pending or finished
    order_type: "DESC", // ASC or DESC
    orderBy: "created_at", // rating, created_at, or id
  },
  totalResults: 0,
  currentPage: 1,
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { filterType, value } = action.payload;
      if (Array.isArray(state.filters[filterType])) {
        // Handle array filters (types, cities, countries, etc.)
        const currentArray = state.filters[filterType];
        const exists = currentArray.find((item) => item.id === value.id);
        if (exists) {
          // Remove if exists
          state.filters[filterType] = currentArray.filter(
            (item) => item.id !== value.id
          );
        } else {
          // Add if doesn't exist
          state.filters[filterType].push(value);
        }
      } else {
        // Handle single value filters
        state.filters[filterType] = value;
      }
    },
    clearFilter: (state, action) => {
      const filterType = action.payload;
      if (Array.isArray(state.filters[filterType])) {
        state.filters[filterType] = [];
      } else if (typeof state.filters[filterType] === "boolean") {
        state.filters[filterType] = false;
      } else {
        state.filters[filterType] = "";
      }
    },
    clearAllFilters: (state) => {
      state.filters = { ...initialState.filters };
    },
    resetSearch: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SearchService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload.data || action.payload;
        state.totalResults = action.payload.total || action.payload.length || 0;
        state.error = null;
      })
      .addCase(SearchService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Search failed";
        state.results = [];
      });
  },
});

export const { updateFilter, clearFilter, clearAllFilters, resetSearch } =
  SearchSlice.actions;
export default SearchSlice.reducer;
