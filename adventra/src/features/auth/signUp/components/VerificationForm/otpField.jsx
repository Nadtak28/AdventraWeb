import OtpInput from "react-otp-input";

export default function OtpField({ value, onChange }) {
  return (
    <div className="flex justify-center py-4">
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={6}
        isInputNum
        shouldAutoFocus
        inputType="tel"
        renderInput={(props) => (
          <input
            {...props}
            className="w-36 h-14 text-xl border m-3 border-gray-300 rounded-lg text-center focus:outline-none focus:border-[#53e3cb] transition-all"
          />
        )}
      />
    </div>
  );
}
