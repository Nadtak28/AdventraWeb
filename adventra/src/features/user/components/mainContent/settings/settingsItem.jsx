export default function SettingsItem({
  label,
  value,
  isToggle,
  icon,
  onClick,
  isChecked,
  title,
}) {
  return (
    <div
      className="group flex items-center gap-4 px-6 py-4 min-h-16 justify-between hover:bg-gradient-to-r hover:from-[#519489]/5 hover:to-transparent transition-all duration-300 cursor-pointer transform hover:translate-x-1"
      onClick={onClick}
    >
      <p className="text-[#101918] dark:text-white text-base font-medium leading-normal flex-1 truncate group-hover:text-[#519489] transition-colors duration-300">
        {title || label}
      </p>

      <div className="shrink-0">
        {isToggle ? (
          <label className="relative flex h-8 w-14 cursor-pointer items-center rounded-full border-none bg-gray-200 p-1 transition-all duration-300 hover:scale-105 has-[:checked]:justify-end has-[:checked]:bg-gradient-to-r has-[:checked]:from-[#519489] has-[:checked]:to-[#6ba59b]">
            <div
              className="h-6 w-6 rounded-full bg-white transition-all duration-300 shadow-lg"
              style={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            ></div>
            <input
              type="checkbox"
              className="invisible absolute"
              checked={isChecked}
              onChange={(e) => {
                console.log("Input clicked");
                onClick(e);
              }}
            />
          </label>
        ) : icon === "ArrowRight" ? (
          <div className="text-[#519489] flex size-8 items-center justify-center hover:cursor-pointer rounded-full hover:bg-[#519489]/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
            </svg>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#519489] to-[#6ba59b] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg group-hover:scale-105 transition-all duration-300">
            {value}
          </div>
        )}
      </div>
    </div>
  );
}
