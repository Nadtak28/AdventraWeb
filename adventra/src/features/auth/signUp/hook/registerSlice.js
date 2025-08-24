// store/signUpSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RegisterService } from "../api/registerService";
const initialState = {
  email: "",
code:"",
  error: null,
  validationErrors: {},
  submitted: false,
};

const RegisterSlice = createSlice({
  name: "register",
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RegisterService.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(RegisterService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateField, setValidationErrors, setSubmitted } = RegisterSlice.actions;
export default RegisterSlice.reducer;
