// src/features/hook/logInSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { LogInService } from "../api/loginservice";

const initialState = {
  email: "",
  password: "",
  error: null,
  validationErrors: {},
  submitted: false,
};

const LogInSlice = createSlice({
  name: "login",
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
      .addCase(LogInService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LogInService.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(LogInService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      });
  },
});

export const {
  updateField,
  setValidationErrors,
  setSubmitted,
  clearBackendError,
} = LogInSlice.actions;
export default LogInSlice.reducer;
