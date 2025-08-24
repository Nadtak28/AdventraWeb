import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateField } from "../../hook/resetPasswordSlice";

export default function NewPassword() {
  const dispatch = useDispatch();
  const { password, validationErrors, submitted } = useSelector((state) => state.resetPassword);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className="flex flex-col min-w-40 flex-1">
      <div className="flex items-center bg-[#e8f2f1] rounded-xl h-14 px-4 focus-within:outline-none">
        <svg className="w-5 h-5 text-[#519489] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
        </svg>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="new Password"
          value={password}
          onChange={(e) => dispatch(updateField({ field: "password", value: e.target.value }))}
          className="form-input w-full bg-transparent focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="ml-2 text-[#519489] focus:outline-none"
        >
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 01-3 3m0-6a3 3 0 013 3m0 0a3 3 0 01-3-3m0 0a3 3 0 013 3m0 0l3 3m-3-3l3-3" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3l18 18M10.586 10.586A2 2 0 0113.414 13.414M15 15a3 3 0 01-4.24 0M9.88 9.88a3 3 0 014.24 0M6.1 6.1A8.932 8.932 0 003 12c1.274 4.057 5.065 7 9.542 7a9.02 9.02 0 004.784-1.388M17.9 17.9A8.932 8.932 0 0021 12c-1.274-4.057-5.065-7-9.542-7a9.02 9.02 0 00-4.784 1.388" />
            </svg>
          )}
        </button>
      </div>
      {submitted && validationErrors.password && (
        <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
      )}
    </label>
  );
}
