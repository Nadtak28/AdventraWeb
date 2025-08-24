import { createSlice } from "@reduxjs/toolkit";
import { PaymentService } from "../api/paymentService";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    success: false,
    paymentUrl: null,
    orderId: null,
  },
  reducers: {
    resetPayment: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.paymentUrl = null;
      state.orderId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PaymentService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PaymentService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.paymentUrl = action.payload.url || null;
        state.orderId = action.payload.order_id || null;
      })
      .addCase(PaymentService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
