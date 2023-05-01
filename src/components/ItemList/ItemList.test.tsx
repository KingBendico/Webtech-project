import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, vi, it } from "vitest";
import ItemList from "./ItemList";
import { CartContext } from "../../context/CartContext";
import { Item } from "../../types/types";

describe("ItemList component", () => {
  var items: Item[] = [
    {
      "id": "vitamin-d-90-100",
      "name": "D-vitamin, 90ug, 100 stk",
      "price": 116,
      "currency": "DKK",
      "rebateQuantity": 3,
      "rebatePercent": 10,
      "upsellProductId": null,
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false,
      "imageUrl": ""
    },
    {
      "id": "vitamin-c-500-250",
      "name": "C-vitamin, 500mg, 250 stk",
      "price": 150,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 25,
      "upsellProductId": "vitamin-c-depot-500-250",
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false,
      "imageUrl": ""
    },
  ]
  
  const setItems = vi.fn();
  beforeEach(() => {
    render(
      <CartContext.Provider value={{ items, setItems }}>
        <ItemList />
      </CartContext.Provider>
    );
  });

  it("displays a message when the cart is empty", () => {
    render(<ItemList />);
    const emptyCartMessage = screen.getByText(/din indkøbskurv er tom/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });

  it("displays a table with items when the cart is not empty", () => {
    const table = screen.getByTestId("table");
    expect(table).toBeInTheDocument();
  });

  it("calls setItems with updated items when an item is deleted", () => {
    const deleteButton = screen.getAllByTestId("delete")[1];
    fireEvent.click(deleteButton);
    expect(setItems).toHaveBeenCalledWith([items[0]]);
  });

  it("calls setItems with updated items when the quantity of an item is changed", () => {
    const quantityPlusButton = screen.getAllByTestId("quantity-plus")[1];
    fireEvent.click(quantityPlusButton);
    expect(setItems).toHaveBeenCalledWith([
      items[0],
      {
        ...items[1],
        quantity: 2,
      },
    ]);
  });

  it("calls setItems with updated items when the gift wrap option of an item is toggled", () => {
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);
    expect(setItems).toHaveBeenCalledWith([
      {
        ...items[0],
        isGiftWrapped: true,
      },
      items[1],
    ]);
  });

  it("calls setItems with updated items when the recurring schedule of an item is changed", () => {
    const selectElement = screen.getAllByTestId("recurring-schedule")[1];
    fireEvent.change(selectElement, { target: { value: "Månedligt" } });
    expect(setItems).toHaveBeenCalledWith([
      items[0],
      {
        ...items[1],
        recurringSchedule: "Månedligt",
      },
    ]
    );
  });
});
