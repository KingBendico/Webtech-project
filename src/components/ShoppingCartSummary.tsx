import {Item} from '../types/types'
import ItemList from './ItemList';

interface Props {
    items: Item[];
  }

export default function ShoppingCartSummary(props:Props) {
    const {items} = props
    return (
        <>
            <h3>Total price: {items.reduce((total, item) => total + item.price*item.quantity, 0)} dkk</h3>
        </>
    )
}