import { createAsyncThunk } from "@reduxjs/toolkit";
import MoujaasAuth from "./moujaasAuth"; // axios instance that injects Bearer token
import { API } from "./apiRoutes"; // ensure API.payment = "/payment"

export const PaymentService = createAsyncThunk(
  "payment/create",
  async (payload, thunkAPI) => {
    try {
      console.log("Payment Service - Input payload:", payload);

      // Validate payload structure
      if (
        !payload.info ||
        !Array.isArray(payload.info) ||
        payload.info.length === 0
      ) {
        throw new Error("Invalid payload: 'info' must be a non-empty array");
      }

      if (!payload.payment_type) {
        throw new Error("Invalid payload: 'payment_type' is required");
      }

      // Validate each info item
      for (const item of payload.info) {
        if (!item.type || !item.id) {
          throw new Error(
            "Invalid payload: each info item must have 'type' and 'id'"
          );
        }

        // Ensure id is a number
        if (typeof item.id !== "number") {
          item.id = parseInt(item.id, 10);
          if (isNaN(item.id)) {
            throw new Error("Invalid payload: 'id' must be a valid number");
          }
        }

        // If type is 'guide', date is required and must be in correct format
        if (item.type === "guide") {
          if (!item.date) {
            throw new Error(
              "Invalid payload: 'date' is required for guide bookings"
            );
          }

          // Validate date format (YYYY-MM-DD)
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(item.date)) {
            throw new Error(
              "Invalid payload: 'date' must be in YYYY-MM-DD format"
            );
          }

          // Validate that the date is actually valid
          const dateObj = new Date(item.date);
          if (isNaN(dateObj.getTime())) {
            throw new Error("Invalid payload: 'date' is not a valid date");
          }
        }
      }

      // Validate payment_type
      const validPaymentTypes = ["paypal", "points"];
      if (!validPaymentTypes.includes(payload.payment_type)) {
        throw new Error(
          "Invalid payload: 'payment_type' must be 'paypal' or 'points'"
        );
      }

      console.log("Payment Service - Validated payload:", payload);
      console.log("Sending payment request to:", `${API.payment}`);

      const res = await MoujaasAuth.post(`${API.payment}`, payload);

      console.log("Payment Service - Raw response:", res);
      console.log("Payment Service - Response data:", res.data);
      console.log("Payment Service - Response status:", res.status);

      // Handle different response formats
      let responseData = res.data;

      // If response has a nested data property, extract it
      if (res.data && typeof res.data === "object" && res.data.data) {
        responseData = res.data.data;
      }

      // Ensure we have the necessary data for PayPal redirects
      if (payload.payment_type === "paypal") {
        if (!responseData?.url && !res.data?.url) {
          console.warn("PayPal payment successful but no redirect URL found");
          return {
            success: true,
            message: "Payment processed but no redirect URL provided",
            data: responseData || res.data,
          };
        }

        // Return the URL for redirect
        return {
          success: true,
          url: responseData?.url || res.data?.url,
          data: responseData || res.data,
        };
      }

      // For points payment
      if (payload.payment_type === "points") {
        return {
          success: true,
          message: "Points payment completed successfully",
          data: responseData || res.data,
        };
      }

      // Default return
      return responseData || res.data;
    } catch (error) {
      console.error("Payment Service - Error:", error);
      console.error("Payment Service - Error response:", error.response?.data);
      console.error("Payment Service - Error status:", error.response?.status);

      // Handle different error types
      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data;
        let errorMessage = "Payment failed. Please try again.";

        // Extract error message from different possible formats
        if (typeof errorData === "string") {
          errorMessage = errorData;
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        } else if (Array.isArray(errorData) && errorData[0]?.message) {
          errorMessage = errorData[0].message;
        }

        // Add status code info for debugging
        errorMessage = `${errorMessage} (Status: ${error.response.status})`;

        return thunkAPI.rejectWithValue(errorMessage);
      } else if (error.request) {
        // Network error
        return thunkAPI.rejectWithValue(
          "Network error. Please check your connection and try again."
        );
      } else {
        // Other errors (validation, etc.)
        return thunkAPI.rejectWithValue(
          error.message || "Failed to process payment."
        );
      }
    }
  }
);
