import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../hook/checkCodeSlice";
import OtpField from "./otpField";
import CheckCodeButton from "./CheckCodeButton";
export default function CheckCodeForm({ onSuccess }) {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.forgetPassword.email); // ✅ from signup slice
  const { code, error } = useSelector((state) => state.checkCode);

  const handleOtpChange = (otpValue) => {
    dispatch(updateField({ field: "code", value: otpValue }));
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <h2 className="text-[24px] font-bold text-[#0e1a18]">Check Code</h2>
      <p className="text-sm text-gray-500 text-center max-w-md">
        A verification code was sent to your email:
      </p>

      {/* ✅ Non-editable display of email */}
      <div className="text-[#0e1a18] font-medium bg-gray-100 px-4 py-2 rounded-xl max-w-md w-full text-center">
        {email}
      </div>

      <OtpField value={code} onChange={handleOtpChange} />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex px-4 py-3">
        <CheckCodeButton onSuccess={onSuccess} email={email} /> {/* ✅ Pass email */}
      </div>

    
    </div>
  );
}
