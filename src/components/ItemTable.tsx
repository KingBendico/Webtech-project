import {Item} from '../types/types'

interface Props {
    items: Item[];
    onDeleteItem: (index: number) => void;
    onQuantityChange: (item: Item, newQuantity: number) => void;
  }

export default function ItemTable(props: Props) {

    const { items, onDeleteItem, onQuantityChange } = props;
  
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
            <td>
                {item.price*item.quantity}
            </td>
            <td>
              <button onClick={() => onDeleteItem(index)}>X</button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }