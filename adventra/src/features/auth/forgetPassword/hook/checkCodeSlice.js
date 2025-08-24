// src/features/hook/logInSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { CheckCodeService } from "../api/checkCodeService";
const initialState = {
  email: "",
  code:"",
  error: null,
  validationErrors: {},
  submitted: false,
};

const CheckCodeSlice = createSlice({
  name: "checkCode",
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
      .addCase(CheckCodeService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CheckCodeService.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(CheckCodeService.rejected, (state, action) => {
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
} = CheckCodeSlice.actions;
export default CheckCodeSlice.reducer;
