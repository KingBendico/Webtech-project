import React from 'react';
import { Item } from '../types/types';

interface Props {
  items: Item[];
  onDeleteItem: (index: number) => void;
  onQuantityChange: (item: Item, newQuantity: number) => void;
  onToggleGiftWrap: (item: Item) => void;
  onRecurringScheduleChange: (item: Item, newSchedule: string) => void;
}

export default function ItemTable(props: Props) {
  const { items, onDeleteItem, onQuantityChange, onToggleGiftWrap, onRecurringScheduleChange } = props;

  return (
    <tbody>
      {items.map((item, index) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.price} kr.</td>
          <td>
            <button onClick={() => onQuantityChange(item, item.quantity - 1)}>-</button>
            {item.quantity}
            <button onClick={() => onQuantityChange(item, item.quantity + 1)}>+</button>
          </td>
          <td>{item.price * item.quantity}</td>
          <td>
            <button onClick={() => onDeleteItem(index)}>X</button>
          </td>
          <td>
            <input
              type="checkbox"
              checked={item.isGiftWrapped}
              onChange={() => onToggleGiftWrap(item)}
            />
          </td>
          <select value={item.recurringSchedule} onChange={(e) => onRecurringScheduleChange(item, e.target.value)}>
    <option value="">Vælg en plan</option>
    <option value="Ugentligt">Ugentligt</option>
    <option value="Månedligt">Månedligt</option>
    <option value="Hver 3. måned">Hver 3. måned</option>
    <option value="Hver 6. måned">Hver 6. måned</option>
    <option value="Årligt">Årligt</option>
  </select>
        </tr>
      ))}
    </tbody>
  );
}