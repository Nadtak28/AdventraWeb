import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearBackendError } from "../../../hook/resetPasswordSlice";
import { ResetPasswordService } from "../../../api/resetPasswordService";
import { Eye, EyeOff } from "lucide-react"; // password visibility icons

export default function ChangePasswordModal({ onClose }) {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.resetPassword);

  // Local state for inputs
  const [values, setValues] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [localErrors, setLocalErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setLocalErrors((prev) => ({ ...prev, [field]: null }));
    dispatch(clearBackendError());
  };

  const toggleVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    const { old_password, new_password, new_password_confirmation } = values;
    let errors = {};

    if (!old_password) errors.old_password = "Old password is required";
    if (!new_password) errors.new_password = "New password is required";
    if (new_password !== new_password_confirmation)
      errors.new_password_confirmation = "Passwords do not match";

    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      return;
    }

    try {
      await dispatch(ResetPasswordService(values)).unwrap();
      onClose(); // close modal on success
    } catch (err) {
      console.error(err);
      // errors handled via slice in `error`
    }
  };

  const renderPasswordInput = (label, field, showKey) => (
    <div className="relative mb-2">
      <input
        type={showPasswords[showKey] ? "text" : "password"}
        placeholder={label}
        value={values[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 pr-10 focus:outline-none focus:ring-2 focus:ring-[#519489]"
      />
      <button
        type="button"
        onClick={() => toggleVisibility(showKey)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#519489]"
      >
        {showPasswords[showKey] ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
      {localErrors[field] && (
        <p className="text-red-500 text-sm mt-1">{localErrors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold text-[#101918] mb-4">
          Change Password
        </h2>

        {renderPasswordInput("Old Password", "old_password", "old")}
        {renderPasswordInput("New Password", "new_password", "new")}
        {renderPasswordInput(
          "Confirm New Password",
          "new_password_confirmation",
          "confirm"
        )}

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full bg-[#519489] cursor-pointer text-white font-bold py-3 rounded-lg mt-2 disabled:opacity-50"
        >
          {status === "loading" ? "Changing..." : "Change Password"}
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full cursor-pointer text-[#519489] py-2 rounded-lg border border-[#519489] hover:bg-[#519489]/10 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
