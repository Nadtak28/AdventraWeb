import { Link } from "react-router-dom";
export default function ChatIcon() {
  return (
    <Link to="/chat" >
<button
  class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#e8f2f1] text-[#0e1a18] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
>
  <div class="text-[#0e1a18]" data-icon="Cart" data-size="20px" data-weight="regular">            <svg width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z" />
            </svg>
 </div>
</button>
     </Link>

  );

}