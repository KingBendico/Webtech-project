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

  const totalQuantityRebatePrice = items.map((item) => {
    // Check if price and quantity are valid numbers
    if (typeof item.price !== 'number' || typeof item.quantity !== 'number') {
      return NaN;
    }
  
    // Calculate the total price before rebate
    const totalQuantityPrice = item.price * item.quantity;
  
    // Check if rebateQuantity and rebatePercent are valid numbers or 0. If this check isn't done, NaN is returned
    if (typeof item.rebateQuantity !== 'number' || item.rebateQuantity === 0 || typeof item.rebatePercent !== 'number') {
      return totalQuantityPrice;
    }
  
    // Calculate the number of rebate units applicable
    const rebateUnits = Math.floor(item.quantity / item.rebateQuantity);
  
    // Calculate the total rebate amount
    const rebateAmount = (rebateUnits * item.rebateQuantity) * item.price * (item.rebatePercent / 100);
  
    // Calculate the final price after rebate
    const finalPrice = totalQuantityPrice - rebateAmount;
  
    return finalPrice;
  });
  
  
  return (
    <tbody>
      {items.map((item, index) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.price.toLocaleString('da-DK', { style: 'currency', currency: 'DKK', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td>
            <button onClick={() => onQuantityChange(item, item.quantity - 1)}>-</button>
            {item.quantity}
            <button onClick={() => onQuantityChange(item, item.quantity + 1)}>+</button>
          </td>
          <td>{(totalQuantityRebatePrice[index]).toLocaleString('da-DK', { style: 'currency', currency: 'DKK', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
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