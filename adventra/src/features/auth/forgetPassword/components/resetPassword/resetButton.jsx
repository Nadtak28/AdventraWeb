// ResetButton.jsx
export default function ResetButton({ loading }) {
  return (
        <div className="w-full px-4 py-3">

    <button
      type="submit" // important for form submit
      disabled={loading}
      className="flex h-10 min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-3xl px-4 bg-[#53e3cb] text-[#0e1a18] text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="w-6 h-6 border-2 border-white border-t-[#0e1a18] rounded-full animate-spin"></div>
      ) : (
        <span className="truncate">Reset Password</span>
      )}
    </button>
    </div>
  );
}
