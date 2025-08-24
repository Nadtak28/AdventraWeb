import { Link } from "react-router-dom";
export default function HotelIcon() {
  return (
    <Link to="/hotels">
      <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#e8f2f1] text-[#0e1a18] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
        <div
          className="text-[#0e1a18]"
          data-icon="Hotel"
          data-size="20px"
          data-weight="regular"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 3h12a1 1 0 0 1 1 1v16h3v2H2v-2h2V4a1 1 0 0 1 1-1zm1 2v15h10V5H5zm2 2h2v2H7V7zm4 0h2v2h-2V7zM7 11h2v2H7v-2zm4 0h2v2h-2v-2zm-4 4h2v2H7v-2zm4 0h2v2h-2v-2z" />
          </svg>
        </div>
      </button>
    </Link>
  );
}
