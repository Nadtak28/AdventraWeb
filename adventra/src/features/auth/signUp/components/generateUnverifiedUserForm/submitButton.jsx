// src/components/mainContent/SignUpForm/submitButton.jsx
import { useDispatch, useSelector } from "react-redux";
import {
  setSubmitted,
  setValidationErrors,
  clearBackendError,
} from "../../hook/generateUnverifiedUserSlice";
import { GenerateUnverifiedUserService } from "../../api/generateUnverifiedUserService";
import { validateForm } from "../../../../../utils/validateForm";
import { tokenStore } from "../../../../../utils/dataStore";
export default function SubmitButton({ onSuccess }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.generateUnverifiedUser);
  const { error } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setSubmitted(true));
    dispatch(clearBackendError());

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      dispatch(setValidationErrors(errors));
      return;
    }

    dispatch(setValidationErrors({}));

    const result = await dispatch(GenerateUnverifiedUserService(formData));

    if (GenerateUnverifiedUserService.fulfilled.match(result)) {
      const token = result.payload.token;
      tokenStore.saveToken(token);
      console.log("............................................" + token);
      console.log("✅ Token received:", token);
      onSuccess?.("loading");
      setTimeout(() => onSuccess?.("verify"), 2000);
    }
  };

  return (
    <div className="w-full px-4 py-3">
      {error && !Object.keys(formData.validationErrors).length && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <div className="flex">
        <button
          onClick={handleSubmit}
          className="flex h-10 min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-3xl px-4 bg-[#53e3cb] text-[#0e1a18] text-sm font-bold leading-normal tracking-[0.015em]"
          type="button"
        >
          <span className="truncate">Sign up</span>
        </button>
      </div>
    </div>
  );
}
