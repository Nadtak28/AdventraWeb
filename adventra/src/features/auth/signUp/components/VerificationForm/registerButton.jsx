import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setSubmitted, setValidationErrors } from "../../hook/registerSlice";
import { RegisterService } from "../../api/registerService";
import { tokenStore } from "../../../../../utils/dataStore";
import { requestFCMToken } from "../../../../../utils/FcmService";
import { sendFcmToken } from "../../../../../api/notificationService";
export default function RegisterButton({ onSuccess, email }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { code, error, validationErrors } = useSelector(
    (state) => state.register
  );

  const handleSubmit = async () => {
    dispatch(setSubmitted(true));

    if (!email || !email.includes("@")) {
      dispatch(setValidationErrors({ email: "Invalid email." }));
      return;
    }

    if (!code || code.length !== 6) {
      dispatch(setValidationErrors({ code: "Enter a valid 6-digit code." }));
      return;
    }

    dispatch(setValidationErrors({}));
    setLoading(true);

    const result = await dispatch(RegisterService({ email, code }));

    if (RegisterService.fulfilled.match(result)) {
      const token = result.payload.token;
      tokenStore.saveToken(token);

      // ✅ request FCM token and send it to backend
      try {
        const fcmToken = await requestFCMToken();
        if (fcmToken) {
          await dispatch(sendFcmToken({ fcm_token: fcmToken }));
        }
      } catch (err) {
        console.error("FCM token registration failed:", err);
      }

      onSuccess?.("success");
    } else {
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
            <span className="truncate">Register</span>
          )}
        </button>
      </div>
    </div>
  );
}
