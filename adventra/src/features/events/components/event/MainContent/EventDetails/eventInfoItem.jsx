import { useState } from "react";

function EventInfoItem({
  icon: IconComponent,
  label,
  value,
  arrow = true,
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center gap-4 bg-[#f8fbfb] px-4 min-h-14 justify-between transition-all duration-300 ${
        onClick ? "cursor-pointer hover:bg-[#e8f2f1]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {IconComponent && <IconComponent />}
        <p className="text-[#519489] text-base font-normal">{label}</p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <span className="text-[#0e1a18] text-base font-normal">{value}</span>
        {arrow && (
          <div
            className={`shrink-0 transform transition-transform duration-200 ${
              isHovered ? "translate-x-1" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventInfoItem;
