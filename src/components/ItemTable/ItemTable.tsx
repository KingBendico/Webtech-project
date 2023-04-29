import { Item } from "../../types/types";
import { useCart } from "../../context/CartContext";
import catalogue from "../../../json_data/item_catalogue.json";
import "./style.css";

interface Props {
  onDeleteItem: (index: number) => void;
  onQuantityChange: (item: Item, newQuantity: number) => void;
  onToggleGiftWrap: (item: Item) => void;
  onRecurringScheduleChange: (item: Item, newSchedule: string) => void;
}

export default function ItemTable(props: Props) {
  const {
    onDeleteItem,
    onQuantityChange,
    onToggleGiftWrap,
    onRecurringScheduleChange,
  } = props;
  const { items } = useCart();

  const totalQuantityRebatePrice = items.map((item) => {
    // Check if price and quantity are valid numbers
    if (typeof item.price !== "number" || typeof item.quantity !== "number") {
      return NaN;
    }

    // Calculate the total price before rebate
    const totalQuantityPrice = item.price * item.quantity;

    // Check if rebateQuantity and rebatePercent are valid numbers or 0. If this check isn't done, NaN is returned
    if (
      typeof item.rebateQuantity !== "number" ||
      item.rebateQuantity === 0 ||
      typeof item.rebatePercent !== "number"
    ) {
      return totalQuantityPrice;
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
    const finalPrice = totalQuantityPrice - rebateAmount;

    return finalPrice;
  });

  return (
    <tbody data-testid="table">
      {items.map((item, index) => (
        <tr key={item.id}>
          <td className="product-image">
            <img src={"/images/" + item.id + ".svg"} alt="Produkt billede" />
          </td>
          <td>
            {item.upsellProductId &&
            items.filter((w) => w.id === item.upsellProductId).length === 0 ? (
              <span>
                Måske er du også interesseret i '
                {catalogue.find((w) => w.id === item.upsellProductId)?.name}'?
                <br></br>
              </span>
            ) : (
              ""
            )}
            {item.name}
          </td>
          <td>
            {item.price.toLocaleString("da-DK", {
              style: "currency",
              currency: "DKK",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </td>

          <td>
            {item.rebateQuantity > item.quantity ? (
              <span>
                Køb {item.rebateQuantity - item.quantity} mere og få{" "}
                {item.rebatePercent}% rabat!<br></br>
              </span>
            ) : (
              ""
            )}
            <button
              data-testid="quantity-minus"
              onClick={() => onQuantityChange(item, item.quantity - 1)}
            >
              -
            </button>
            {item.quantity}
            <button
              data-testid="quantity-plus"
              onClick={() => onQuantityChange(item, item.quantity + 1)}
            >
              +
            </button>
          </td>
          <td className="gift-wrap">
            <input
              data-testid="gift-wrap"
              type="checkbox"
              checked={item.isGiftWrapped}
              onChange={() => onToggleGiftWrap(item)}
            />
          </td>
          <td>
            <select
              data-testid="recurring-schedule"
              value={item.recurringSchedule}
              onChange={(e) => onRecurringScheduleChange(item, e.target.value)}
            >
              <option data-testid="recurring-schedule-option" value="">
                Vælg en plan
              </option>
              <option data-testid="recurring-schedule-option" value="Ugentligt">
                Ugentligt
              </option>
              <option data-testid="recurring-schedule-option" value="Månedligt">
                Månedligt
              </option>
              <option
                data-testid="recurring-schedule-option"
                value="Hver 3. måned"
              >
                Hver 3. måned
              </option>
              <option
                data-testid="recurring-schedule-option"
                value="Hver 6. måned"
              >
                Hver 6. måned
              </option>
              <option data-testid="recurring-schedule-option" value="Årligt">
                Årligt
              </option>
            </select>
          </td>
          <td>
            <button
              className="delete"
              data-testid="delete"
              onClick={() => onDeleteItem(index)}
            >
              X
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
