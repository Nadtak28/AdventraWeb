import { createSlice } from "@reduxjs/toolkit";
import { ResetPasswordUsingCodeService } from "../api/resetPasswordUsingCodeService";
const initialState = {
code:"",
  email: "",
  password: "",
  password_confirmation: "",
  error: null,
  validationErrors: {},
  submitted: false,
  status: null,
};

const ResetPasswordSlice = createSlice({
  name: "resetPassword",
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
      .addCase(ResetPasswordUsingCodeService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ResetPasswordUsingCodeService.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(ResetPasswordUsingCodeService.rejected, (state, action) => {
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
