// Updated LogInButton.jsx with validateForm integration
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setSubmitted,
  setValidationErrors,
  clearBackendError,
} from "../../hook/logInSlice";
import { LogInService } from "../../api/loginservice";
import { tokenStore } from "../../../../../utils/dataStore";
import { validateForm } from "../../../../../utils/validateForm";
import { sendFcmToken } from "../../../../../api/notificationService";
import { requestFCMToken } from "../../../../../utils/FcmService";
export default function LogInButton({ onSuccess }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formData = useSelector((state) => state.login);
  const { error, validationErrors } = formData;

  const handleSubmit = async () => {
    dispatch(setSubmitted(true));
    dispatch(clearBackendError());
    setLoading(true);

    const errors = validateForm({
      ...formData,
      password_confirmation: formData.password, // mimic confirmation for validation reuse
    });

    if (Object.keys(errors).length > 0) {
      dispatch(setValidationErrors(errors));
      setLoading(false);
      return;
    }

    try {
      const result = await dispatch(
        LogInService({ email: formData.email, password: formData.password })
      );

      if (result.type === "login/fulfilled") {
        const token = result.payload.token;
        tokenStore.saveToken(token);

        // 👇 Request FCM token and send to backend
        const fcmToken = await requestFCMToken();
        if (fcmToken) {
          dispatch(sendFcmToken({ fcm_token: fcmToken }));
        }

        if (onSuccess) onSuccess("success");
      } else {
        const { payload } = result;
        if (payload?.errors) {
          dispatch(setValidationErrors(payload.errors));
        } else if (payload?.message) {
          const message = payload.message.toLowerCase();
          dispatch(
            setValidationErrors({
              email: message.includes("email") ? payload.message : undefined,
              password: message.includes("password")
                ? payload.message
                : undefined,
            })
          );
        } else {
          dispatch(
            setValidationErrors({
              email: "Login failed. Please check your credentials.",
            })
          );
        }
      }
    } catch (_) {
      dispatch(
        setValidationErrors({
          email: "An unexpected error occurred. Try again.",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-3">
      {error && !Object.keys(validationErrors || {}).length && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <div className="flex">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex h-10 min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-3xl px-4 bg-[#53e3cb] text-[#0e1a18] text-sm font-bold"
          type="button"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-[#0e1a18] rounded-full animate-spin"></div>
          ) : (
            <span className="truncate">Log In</span>
          )}
        </button>
      </div>
    </div>
  );
}
