import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setSubmitted,
  setValidationErrors,
  clearBackendError,
} from "../../hook/resetPasswordSlice";
import { ResetPasswordUsingCodeService } from "../../api/resetPasswordUsingCodeService";
import NewPassword from './newPassword';
import NewPasswordConfirmation from './newPAsswordConfirmation';
import ResetButton from './resetButton';

export default function ResetPasswordForm({ onResetSuccess }) {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.forgetPassword);
  const code = useSelector((state) => state.checkCode.code);
  const { password, password_confirmation, error, validationErrors } = useSelector((state) => state.resetPassword);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setSubmitted(true));
    dispatch(clearBackendError());

    const errors = {};
    if (!code || code.length !== 6) {
      errors.code = "Enter a valid 6-digit code.";
    }
    if (!password) errors.password = "Password is required.";
    if (password !== password_confirmation) errors.password_confirmation = "Passwords do not match.";

    if (Object.keys(errors).length > 0) {
      dispatch(setValidationErrors(errors));
      return;
    }

    dispatch(setValidationErrors({}));
    setLoading(true);

    const result = await dispatch(
      ResetPasswordUsingCodeService({
        email,
        code,
        password,
        password_confirmation,
      })
    );

    setLoading(false);

    if (ResetPasswordUsingCodeService.fulfilled.match(result)) {
      onResetSuccess();
    } else if (ResetPasswordUsingCodeService.rejected.match(result)) {
      if (typeof result.payload === "object") {
        dispatch(setValidationErrors(result.payload));
      } else if (typeof result.payload === "string") {
        dispatch(setValidationErrors({ general: result.payload }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 px-4">
      <h2 className="text-[24px] font-bold text-[#0e1a18]">Reset Password</h2>
      <p className="text-sm text-gray-500 text-center max-w-md">
        A verification code was sent to your email:
      </p>

      {email && (
        <div className="text-[#0e1a18] font-medium bg-gray-100 px-4 py-2 rounded-xl max-w-md w-full text-center">
          {email}
        </div>
      )}
      {code && (
        <div className="text-[#0e1a18] font-medium bg-gray-100 px-4 py-2 rounded-xl max-w-md w-full text-center">
          {code}
        </div>
      )}

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <NewPassword />
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <NewPasswordConfirmation />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {validationErrors?.general && (
        <p className="text-red-500 text-sm">{validationErrors.general}</p>
      )}

      <ResetButton loading={loading} />
    </form>
  );
}
