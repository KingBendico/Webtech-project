import {Item} from '../types/types'
import React from 'react';

interface Props {
    items: Item[];

  }

export default function ShoppingCartSummary(props:Props) {
    const {items} = props

   
    return (
       
          <h3>Pris i alt: {items.reduce((total, item) => total + item.price * item.quantity, 0)} kr.</h3>
       
      );
    }