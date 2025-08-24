// src/features/hook/logInSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ForgetPasswordService } from "../api/forgetPasswordService.jsx";
const initialState = {
  email: "",
  error: null,
  validationErrors: {},
  submitted: false,
};

const ForgetPasswordSlice = createSlice({
  name: "forgetPassword",
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
      .addCase(ForgetPasswordService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ForgetPasswordService.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
    .addCase(ForgetPasswordService.rejected, (state, action) => {
  state.status = "failed";

  if (typeof action.payload === "string") {
    // General backend error (e.g. "Email not found")
    state.error = action.payload;
  } else {
    // Validation error object — don't assign to `state.error`
    state.error = null;
  }
});

  },
});

export const {
  updateField,
  setValidationErrors,
  setSubmitted,
  clearBackendError,
} = ForgetPasswordSlice.actions;
export default ForgetPasswordSlice.reducer;
