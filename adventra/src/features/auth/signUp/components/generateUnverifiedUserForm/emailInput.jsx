// src/components/mainContent/SignUpForm/emailInput.jsx
import { useDispatch, useSelector } from "react-redux";
import { updateField, clearBackendError } from "../../hook/generateUnverifiedUserSlice";

export default function EmailInput() {
  const dispatch = useDispatch();
  const { email, validationErrors, submitted, error } = useSelector((state) => state.generateUnverifiedUser);

  const handleChange = (e) => {
    dispatch(updateField({ field: "email", value: e.target.value }));
    dispatch(clearBackendError());
  };

  const backendEmailTaken = error && error.toLowerCase().includes("email");

  return (
    <label className="flex flex-col min-w-40 flex-1">
      <div className="flex items-center bg-[#e8f2f1] rounded-xl h-14 px-4 focus-within:outline-none">
        <svg className="w-6 h-5 text-[#519489] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2.25 2.25 0 002.22 0L21 8M5.25 19.5h13.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5z" />
        </svg>
        <input
          type="email"
          value={email}
          placeholder="Email address"
          onChange={handleChange}
          className="form-input w-full bg-transparent focus:outline-none"
        />
      </div>
      {submitted && validationErrors.email && (
        <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
      )}
      {!validationErrors.email && backendEmailTaken && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </label>
  );
}
