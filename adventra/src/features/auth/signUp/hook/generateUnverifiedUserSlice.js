// src/hook/generateUnverifiedUserSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { GenerateUnverifiedUserService } from "../api/generateUnverifiedUserService";

const initialState = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  error: null,
  validationErrors: {},
  submitted: false,
  status: null,
};

const GenerateUnverifiedUserSlice = createSlice({
  name: "generateUnverifiedUser",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    setSubmitted: (state, action) => {
      state.submitted = action.payload;
    },
    clearBackendError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GenerateUnverifiedUserService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(GenerateUnverifiedUserService.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(GenerateUnverifiedUserService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  updateField,
  setValidationErrors,
  setSubmitted,
  clearBackendError,
} = GenerateUnverifiedUserSlice.actions;

export default GenerateUnverifiedUserSlice.reducer;
