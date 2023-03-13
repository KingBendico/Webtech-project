import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import ItemTable from "./ItemTable";
import { Item } from "../../types/types";

const itemList = [
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
      "isGiftWrapped": false
      
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
      "isGiftWrapped": false
      
      
    },
    {
      "id": "vitamin-c-depot-500-250",
      "name": "C-vitamin Depot, 500mg, 250 stk",
      "price": 175,
      "currency": "DKK",
      "rebateQuantity": 3,
      "rebatePercent": 10,
      "upsellProductId": null,
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false
      
    },
    {
      "id": "fish-oil-1000-120",
      "name": "Omega 3 fiskeolie, 1000mg, 120 stk",
      "price": 69,
      "currency": "DKK",
      "rebateQuantity": 5,
      "rebatePercent": 10,
      "upsellProductId": null,
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false
    },
    {
      "id": "coffee-grinder",
      "name": "Kaffekværn",
      "price": 145,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": "coffee-grinder-pro",
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false
    },
    {
      "id": "coffee-grinder-pro",
      "name": "Kaffekværn Præcision",
      "price": 320,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": null,
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false
    },
    {
      "id": "toothbrush",
      "name": "Tandbørste, 5stk",
      "price": 40,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": "toothbrush-bamboo",
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false
    },
    {
      "id": "toothbrush-bamboo",
      "name": "Tandbørste i bambus, 3stk",
      "price": 40,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 10,
      "upsellProductId": null,
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false
    },
    {
      "id": "trimmer",
      "name": "Barbermaskine",
      "price": 200,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": "trimmer-battery",
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false
    },
    {
      "id": "trimmer-battery",
      "name": "Barbermaskine m batteri",
      "price": 350,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": null,
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false
    },
    {
      "id": "hair-clip",
      "name": "Hårklemme",
      "price": 25,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 20,
      "upsellProductId": "hair-clip-large",
      "quantity": 1,
      "recurringSchedule": "",
      "isGiftWrapped": false
    }
  ]
const [items, setItems] = useState(itemList)
const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleQuantityChange = (item: Item, newQuantity: number) => {
    const updatedItems = [...items];
    const index = updatedItems.findIndex((i) => i.id === item.id);
    updatedItems[index].quantity = newQuantity > 0 ? newQuantity : 1;
    setItems(updatedItems);
  };

  const handleToggleGiftWrap = (item: Item) => {
    const updatedItems = [...items];
    const index = updatedItems.findIndex((i) => i.id === item.id);
    updatedItems[index].isGiftWrapped = !updatedItems[index].isGiftWrapped;
    setItems(updatedItems);
  };

  const handleRecurringScheduleChange = (item: Item, newSchedule: string) => {
    const updatedItems = [...items];
    const index = updatedItems.findIndex((i) => i.id === item.id);
    updatedItems[index].recurringSchedule = newSchedule;
    setItems(updatedItems);
  };
describe(ItemTable.name, () => {
  it("should render", () => {
    render(<ItemTable
                items={items}
                onDeleteItem={handleDeleteItem}
                onQuantityChange={handleQuantityChange}
                onToggleGiftWrap={handleToggleGiftWrap}
                onRecurringScheduleChange={handleRecurringScheduleChange}
            />);
    expect(screen.getByLabelText("Artist name:")).toBeInTheDocument();
  });
});