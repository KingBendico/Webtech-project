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
  const { items } = useCart();

  const totalPrice = items.reduce((accumulator, item) => {
    if (typeof item.price !== "number" || typeof item.quantity !== "number") {
      return accumulator;
    }

    // Calculate the total price
    const totalPrice = item.price * item.quantity;
    return accumulator + totalPrice;
  }, 0);

  const rebateAmount = items.reduce((accumulator, item) => {
    // Check if price and quantity are valid numbers
    if (typeof item.price !== "number" || typeof item.quantity !== "number") {
      return accumulator;
    }

    // Check if rebateQuantity and rebatePercent are valid numbers or 0
    if (
      typeof item.rebateQuantity !== "number" ||
      item.rebateQuantity === 0 ||
      typeof item.rebatePercent !== "number"
    ) {
      return accumulator + 0;
    }

    // Calculate the number of rebate units applicable
    const rebateUnits = Math.floor(item.quantity / item.rebateQuantity);

    // Calculate the total rebate amount
    const rebateAmount =
      rebateUnits *
      item.rebateQuantity *
      item.price *
      (item.rebatePercent / 100);

    return accumulator + rebateAmount;
  }, 0);

  const totalQuantityRebatePriceAccumulated = totalPrice - rebateAmount;

  const TenPercentDiscountAmount =
    totalQuantityRebatePriceAccumulated >= 300
      ? totalQuantityRebatePriceAccumulated -
        totalQuantityRebatePriceAccumulated * 0.9
      : totalQuantityRebatePriceAccumulated;

  return (
    <>
      <div className="summary">
        <p>
          Pris i alt uden rabat:{" "}
          {totalPrice.toLocaleString("da-DK", currencyFormat)}{" "}
        </p>
        <p>
          Rabat på enkelte varer:{" "}
          {(-1 * rebateAmount).toLocaleString("da-DK", currencyFormat)}
        </p>
        <p>
          10% rabat på ordrer over 300 kr.:{" "}
          {(-1 * TenPercentDiscountAmount).toLocaleString(
            "da-DK",
            currencyFormat
          )}
        </p>
        <hr />
        <p id="total">
          Total beløb:{" "}
          {(
            totalQuantityRebatePriceAccumulated - TenPercentDiscountAmount
          ).toLocaleString("da-DK", currencyFormat)}
        </p>
        <NavigateButton to="/checkout">Gå Til Kassen</NavigateButton>
      </div>
    </>
  );
}
