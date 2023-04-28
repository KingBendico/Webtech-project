import { Item } from "../../types/types";
import { Link } from "react-router-dom";
import NavigateButton from "../NavigateButton/NavigateButton";
import "./style.css";
import { useCart } from "../../context/CartContext";

const currencyFormat = {
  style: "currency",
  currency: "DKK",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export default function ShoppingCartSummary() {
  const { items } = useCart()

  const totalQuantityRebatePriceAccumulated = items.reduce(
    (accumulator, item) => {
      // Check if price and quantity are valid numbers
      if (typeof item.price !== "number" || typeof item.quantity !== "number") {
        return accumulator;
      }

      // Calculate the total price before rebate
      const totalPrice = item.price * item.quantity;

      // Check if rebateQuantity and rebatePercent are valid numbers or 0
      if (
        typeof item.rebateQuantity !== "number" ||
        item.rebateQuantity === 0 ||
        typeof item.rebatePercent !== "number"
      ) {
        return accumulator + totalPrice;
      }

      // Calculate the number of rebate units applicable
      const rebateUnits = Math.floor(item.quantity / item.rebateQuantity);

      // Calculate the total rebate amount
      const rebateAmount =
        rebateUnits *
        item.rebateQuantity *
        item.price *
        (item.rebatePercent / 100);

      // Calculate the final price after rebate
      const finalPrice = totalPrice - rebateAmount;

      return accumulator + finalPrice;
    },
    0
  );

  const totalWith10PercentDiscount =
    totalQuantityRebatePriceAccumulated >= 300
      ? totalQuantityRebatePriceAccumulated * 0.9
      : totalQuantityRebatePriceAccumulated;

  return (
    <>
      <div className="summary">
        <p>
          Pris i alt uden rabat:{" "}
          {items
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toLocaleString("da-DK", currencyFormat)}{" "}
        </p>
        <p>
          Pris med rabat:{" "}
          {totalQuantityRebatePriceAccumulated.toLocaleString(
            "da-DK",
            currencyFormat
          )}
        </p>
        <p>
          10% rabat på ordrer over 300 kr.:{" "}
          {totalWith10PercentDiscount.toLocaleString("da-DK", currencyFormat)}
        </p>
        <NavigateButton to="/checkout">Gå Til Kassen</NavigateButton>
      </div>
    </>
  );
}
