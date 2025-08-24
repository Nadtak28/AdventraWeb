import { useDispatch, useSelector } from "react-redux";
import {
  setSubmitted,
  setValidationErrors,
  clearBackendError,
} from "../../hook/forgetPasswordSlice";
import { ForgetPasswordService } from "../../api/forgetPasswordService";
import { useState } from "react";

// Simple email validator
const validateForgetPasswordForm = ({ email }) => {
  const errors = {};
  if (!email) {
    errors.email = "Email is required";
  } else if (!email.includes("@")) {
    errors.email = "Invalid email format";
  }
  return errors;
};

export default function SendCodeButton({ onSuccess }) {
  const dispatch = useDispatch();
  const { email, validationErrors, } = useSelector(
    (state) => state.forgetPassword
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setSubmitted(true));
    dispatch(clearBackendError());

    // Local validation
    const errors = validateForgetPasswordForm({ email });
    if (Object.keys(errors).length > 0) {
      dispatch(setValidationErrors(errors));
      return;
    }

    dispatch(setValidationErrors({}));
    setLoading(true);

    const result = await dispatch(ForgetPasswordService({ email }));
    setLoading(false);

    // ✅ Success
    if (ForgetPasswordService.fulfilled.match(result)) {
  onSuccess?.(); // ✅ no arguments
}


    // ❌ Error (rejected)
    if (ForgetPasswordService.rejected.match(result)) {
      // Laravel usually returns validation errors like { email: ["..."] }
      if (typeof result.payload === "object") {
        dispatch(setValidationErrors(result.payload));
      }

      // If it's a string message like "Email not found"
      if (typeof result.payload === "string") {
        dispatch(setValidationErrors({ general: result.payload }));
      }

      return; // prevent navigation
    }
  };

  return (
    <div className="w-full px-4 py-3">
      {/* Global or general error */}
      {validationErrors?.general && (
        <p className="text-red-500 text-sm mb-2">{validationErrors.general}</p>
      )}

      <div className="flex">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex h-10 min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-3xl px-4 bg-[#53e3cb] text-[#0e1a18] text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-[#0e1a18] rounded-full animate-spin"></div>
          ) : (
            <span className="truncate">Send Code</span>
          )}
        </button>
      </div>
    </div>
  );
}
