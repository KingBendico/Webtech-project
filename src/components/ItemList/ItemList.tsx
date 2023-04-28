import ItemTable from "../ItemTable/ItemTable";
import { Item } from "../../types/types";
import { useCart } from "../../context/CartContext";



export default function ItemList() {
  const { items, setItems} = useCart()

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

  return (
    <>
      {items.length === 0 ? (
        <p>Din indkøbskurv er tom</p>
      ) : (
          <ItemTable
            onDeleteItem={handleDeleteItem}
            onQuantityChange={handleQuantityChange}
            onToggleGiftWrap={handleToggleGiftWrap}
            onRecurringScheduleChange={handleRecurringScheduleChange}
          />
      )}
    </>
  );
}
