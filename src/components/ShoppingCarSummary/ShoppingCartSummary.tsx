import { Item } from "../../types/types";

interface Props {
  items: Item[];
}

export default function ShoppingCartSummary(props: Props) {
  const { items } = props;

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
      <h3>
        Pris i alt uden rabat:{" "}
        {items
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toLocaleString("da-DK", {
            style: "currency",
            currency: "DKK",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
      </h3>
      <h3>
        Pris med rabat:{" "}
        {totalQuantityRebatePriceAccumulated.toLocaleString("da-DK", {
          style: "currency",
          currency: "DKK",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h3>
      <h3>
        10% rabat p?? ordrer over 300 kr.:{" "}
        {totalWith10PercentDiscount.toLocaleString("da-DK", {
          style: "currency",
          currency: "DKK",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h3>
    </>
  );
}
