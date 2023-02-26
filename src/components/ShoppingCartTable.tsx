import ItemList from './ItemList'
import {Item} from '../types/types'
import i18n from 'i18next';


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
            <th>{i18n.t('itemName')}</th>
            <th>{i18n.t('price')}</th>
            <th>{i18n.t('quantity')}</th>
            <th>{i18n.t('totalPrice')}</th>
            <th>{i18n.t('delete')}</th>
            {/* <th>Item name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Delete</th> */}
          </tr>
        </thead>
        <ItemList items={props.items} setItems={props.setItems}/>
        </table>
        </div>
    )
  
  }