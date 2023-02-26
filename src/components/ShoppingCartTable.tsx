import ItemList from './ItemList'
import {Item} from '../types/types'

interface Props {
    items: Item[];
    setItems: (items: Item[]) => void;
  }
export default function ShoppingCartTable(props:Props) {



    return (
      <div>
      <h1>Shopping Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Item name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <ItemList items={props.items} setItems={props.setItems}/>
        </table>
        </div>
    )
  
  }