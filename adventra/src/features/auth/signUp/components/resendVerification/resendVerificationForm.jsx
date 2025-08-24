import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ResendVerificationCodeService } from "../../api/resendVerificationCodeService";

export default function ResendVerificationForm({ onBackToVerification }) {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.generateUnverifiedUser.email); // ✅ Get from registration slice
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // to display backend errors

  const handleResend = async () => {
    setError(null);
    setLoading(true);
    
    const result = await dispatch(ResendVerificationCodeService({ email }));
    setLoading(false);

    if (ResendVerificationCodeService.fulfilled.match(result)) {
      onBackToVerification(); // go back to VerificationForm
    } else {
      // handle error
      if (typeof result.payload === "string") {
        setError(result.payload);
      } else if (typeof result.payload === "object") {
        const firstError = Object.values(result.payload)[0]?.[0];
        setError(firstError || "Something went wrong.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <h2 className="text-[24px] font-bold text-[#0e1a18]">Resend Code</h2>
      <p className="text-sm text-gray-500 text-center max-w-md">
        A verification code will be resent to:
      </p>

      <div className="text-[#0e1a18] font-medium bg-gray-100 px-4 py-2 rounded-xl max-w-md w-full text-center">
        {email}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <button
        onClick={handleResend}
        disabled={loading}
        className="bg-[#53e3cb] text-[#0e1a18] font-bold px-6 py-2 rounded-xl disabled:opacity-50"
      >
        {loading ? "Resending..." : "Resend Code"}
      </button>
    </div>
  );
}
