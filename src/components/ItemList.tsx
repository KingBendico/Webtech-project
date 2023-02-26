import { useState } from 'react';
import cartItems from '/json_data/cart_items.json';
import ItemTable from './ItemTable'

interface Item {
    name: string;
    quantity: number;
    price: number;
    id: number;
  }

export default function ItemList() {
    const [items, setItems] = useState<Item[]>(cartItems);
  
    const handleDeleteItem = (index: number) => {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    };
  
    const handleQuantityChange = (item: Item, newQuantity: number) => {
      const updatedItems = [...items];
      const index = updatedItems.findIndex(i => i.id === item.id);
      updatedItems[index].quantity = newQuantity > 0 ? newQuantity : 1;
      setItems(updatedItems);
    };
  
    return (
      <ItemTable items={items} onDeleteItem={handleDeleteItem} onQuantityChange={handleQuantityChange} />
    );
  }