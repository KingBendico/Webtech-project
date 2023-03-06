import {Item} from '../types/types'
import React from 'react';

interface Props {
    items: Item[];

  }

export default function ShoppingCartSummary(props:Props) {
    const {items} = props

          // calculates total price with rebate and discount
          const totalPrice = items.reduce((acc, item) => {
            const itemPrice = item.price * item.quantity;
            let rebatePrice = 0;
            if (item.rebateQuantity) {
              rebatePrice = Math.floor(item.quantity / item.rebateQuantity) * itemPrice * (item.rebatePercent / 100);
            }
            return acc + itemPrice - rebatePrice;
          }, 0);
          
  
      const totalWithDiscount = totalPrice >= 300 ? totalPrice * 0.9 : totalPrice;

    return (
       
      <>
          <h3>Pris i alt uden rabat: {items.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('da-DK', { style: 'currency', currency: 'DKK', minimumFractionDigits: 2, maximumFractionDigits: 2 })} </h3>
          <h3>Pris med rabat: {totalPrice.toLocaleString('da-DK', { style: 'currency', currency: 'DKK', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <h3>10% rabat på ordrer over 300 kr.: {totalWithDiscount.toLocaleString('da-DK', { style: 'currency', currency: 'DKK', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
</>
          
          
       
      );
    }