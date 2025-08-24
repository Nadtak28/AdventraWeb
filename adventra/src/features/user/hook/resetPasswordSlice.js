import { createSlice } from "@reduxjs/toolkit";
import { ResetPasswordService } from "../api/resetPasswordService";
const initialState = {
  old_password: "",
  new_password: "",
  new_password_confirmation: "",
  error: null,
  validationErrors: {},
  submitted: false,
  status: null,
};

const ResetPasswordSlice = createSlice({
  name: "resetPasswordd",
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
      .addCase(ResetPasswordService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ResetPasswordService.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(ResetPasswordService.rejected, (state, action) => {
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
} = ResetPasswordSlice.actions;

export default ResetPasswordSlice.reducer;
