import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItemCount } from "../../hooks/cartSlice";

const CartIcon = () => {
  const navigate = useNavigate();
  const itemCount = useSelector(selectCartItemCount);

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <button
      onClick={handleCartClick}
      className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#e8f2f1] text-[#0e1a18] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
    >
      <svg width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#519489] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
