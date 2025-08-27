import { useEffect, useState } from "react";
function Price({ price }) {
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    if (price) {
      const finalPrice = parseFloat(price);
      let current = 0;
      const increment = finalPrice / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= finalPrice) {
          setDisplayPrice(finalPrice);
          clearInterval(timer);
        } else {
          setDisplayPrice(current);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [price]);

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <h3 className="text-[#0e1a18] dark:text-white text-lg font-bold leading-tight px-4 pb-2 pt-4">
        Price
      </h3>
      <p className="text-[#0e1a18] dark:text-[#519489] text-base font-normal pb-3 pt-1 px-4">
        ${displayPrice.toFixed(2)} per person
      </p>
    </div>
  );
}
export default Price;
