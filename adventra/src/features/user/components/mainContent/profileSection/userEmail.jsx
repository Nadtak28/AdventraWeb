export default function UserEmail({ email }) {
  return (
    <div className="flex items-center gap-2 group">
      <svg
        className="w-4 h-4 text-[#519489] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        />
      </svg>

      <p className="text-[#519489] text-base font-medium leading-normal hover:text-[#6ba59b] transition-colors duration-300 cursor-pointer">
        {email || (
          <span className="animate-pulse bg-gray-200 rounded px-4 py-1 inline-block">
            Loading email...
          </span>
        )}
      </p>

      {email && (
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-1"></div>
      )}
    </div>
  );
}
