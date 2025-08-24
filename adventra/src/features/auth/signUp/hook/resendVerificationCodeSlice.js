// src/hook/generateUnverifiedUserSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ResendVerificationCodeService } from "../api/resendVerificationCodeService";
const initialState = {
  email: "",
  error: null,
  validationErrors: {},
  submitted: false,
  status: null,
};

const ResendVerificationCodeSlice = createSlice({
  name: "resendVerificationCode",
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
      .addCase(ResendVerificationCodeService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ResendVerificationCodeService.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(ResendVerificationCodeService.rejected, (state, action) => {
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
} = ResendVerificationCodeSlice.actions;

export default ResendVerificationCodeSlice.reducer;
