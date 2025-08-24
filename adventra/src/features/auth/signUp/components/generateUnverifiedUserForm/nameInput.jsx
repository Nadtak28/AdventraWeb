// src/components/mainContent/SignUpForm/nameInput.jsx
import { useDispatch, useSelector } from "react-redux";
import { updateField, clearBackendError } from "../../hook/generateUnverifiedUserSlice";

export default function NameInput() {
  const dispatch = useDispatch();
  const { name, validationErrors, submitted, error } = useSelector((state) => state.generateUnverifiedUser);

  const handleChange = (e) => {
    dispatch(updateField({ field: "name", value: e.target.value }));
    dispatch(clearBackendError());
  };

  const backendNameTaken = error && error.toLowerCase().includes("name");

  return (
    <label className="flex flex-col min-w-40 flex-1">
      <div className="flex items-center bg-[#e8f2f1] rounded-xl h-14 px-4 focus-within:outline-none">
        <svg className="w-6 h-5 text-[#519489] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
        </svg>
        <input
          type="text"
          value={name}
          placeholder="Full name"
          onChange={handleChange}
          className="form-input w-full bg-transparent focus:outline-none"
        />
      </div>
      {submitted && validationErrors.name && (
        <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
      )}
      {!validationErrors.name && backendNameTaken && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </label>
  );
}
