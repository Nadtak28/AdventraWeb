import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Auth_google_callbackService } from "../../api/auth_google_callbackService";
import { tokenStore } from "../../../../../utils/dataStore";
import { sendFcmToken } from "../../../../../api/notificationService";
import { requestFCMToken } from "../../../../../utils/FcmService";

export default function GoogleLoginButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleAccessToken = tokenResponse.access_token;

        // 1️⃣ Send Google access token to backend
        const resultAction = await dispatch(
          Auth_google_callbackService(googleAccessToken)
        );
        const data = resultAction.payload;

        if (!data?.token) {
          console.error("Backend token missing", data);
          return;
        }

        // 2️⃣ Save backend token locally
        tokenStore.saveToken(data.token);

        // 3️⃣ Request FCM token
        const fcmToken = await requestFCMToken();
        if (fcmToken) {
          // 4️⃣ Send FCM token to backend
          await dispatch(sendFcmToken({ fcm_token: fcmToken }));
          console.log("FCM token sent:", fcmToken);
        } else {
          console.warn("FCM token not retrieved");
        }

        // 5️⃣ Navigate to home only after sending FCM token
        navigate("/home");
      } catch (error) {
        console.error("Google login error", error);
      }
    },
    onError: (err) => {
      console.error("Google login failed", err);
    },
    flow: "implicit",
    redirect_uri: "http://localhost:5173",
    scope: "email profile openid",
  });

  return (
    <div className="w-full px-4">
      <div className="flex border-[#53e3cb]">
        <button
          className="flex h-10 min-w-[84px] max-w-[480px] flex-1 border-2 bg-transparent border-black cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-3xl px-4 text-[#0e1a18] text-sm font-bold"
          type="button"
          onClick={() => login()}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272.1v95.4h147.1c-6.3 33.4-25 61.7-53.5 80.7v66.7h86.4c50.6-46.6 81.4-115.4 81.4-192.4z"
              fill="#4285f4"
            />
            <path
              d="M272.1 544.3c72.6 0 133.6-24.1 178.1-65.6l-86.4-66.7c-24.2 16.2-55.2 25.8-91.7 25.8-70.5 0-130.2-47.6-151.6-111.6H33.6v70.1c44.5 88.5 135.6 148 238.5 148z"
              fill="#34a853"
            />
            <path
              d="M120.5 326.2c-10.6-31.5-10.6-65.7 0-97.2v-70.1H33.6c-35.1 69.9-35.1 152.1 0 222z"
              fill="#fbbc04"
            />
            <path
              d="M272.1 107.7c39.5-.6 77.6 13.7 107.1 39.6l80.1-80.1C405.3 25.1 340.8-.1 272.1 0 169.2 0 78.1 59.5 33.6 148.9l86.9 70.1c21.4-64.1 81.1-111.3 151.6-111.3z"
              fill="#ea4335"
            />
          </svg>
          <span className="truncate">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
