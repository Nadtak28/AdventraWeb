import { Pencil } from "lucide-react";

export default function UserName({ name, onEdit }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 group">
      <p className="text-[#101918] dark:text-white text-lg sm:text-xl md:text-2xl lg:text-[26px] font-bold leading-tight tracking-[-0.015em] bg-gradient-to-r from-[#101918] to-[#519489] bg-clip-text transition-all duration-300 break-words">
        {name || (
          <span className="animate-pulse bg-gray-200 rounded-lg px-2 sm:px-4 py-1 sm:py-2 inline-block">
            Loading...
          </span>
        )}
      </p>
      <button
        onClick={onEdit}
        className="p-1.5 sm:p-2 rounded-full hover:bg-[#519489]/10 transition-all duration-300 transform hover:scale-110 hover:rotate-12 group-hover:translate-x-1 flex-shrink-0"
      >
        <Pencil className="w-4 h-4 sm:w-5 sm:h-5 text-[#519489] cursor-pointer transition-colors duration-300 hover:text-[#6ba59b]" />
      </button>
    </div>
  );
}
