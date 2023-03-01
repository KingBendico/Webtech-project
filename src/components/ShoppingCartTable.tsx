import ItemList from './ItemList'
import {Item} from '../types/types'
import React from 'react';

interface Props {
    items: Item[];
    setItems: (items: Item[]) => void;
  }
export default function ShoppingCartTable(props:Props) {



    return (
      <div>
      <h1>Indkøbskurv</h1>
      <table>
        <thead>
          <tr>
            <th>Vare</th>
            <th>Stykpris</th>
            <th>Antal</th>
            <th>Total pris</th>
            <th>Slet</th>
            <th>Gaveindpakning</th>
            <th>Tilbagevendende ordre</th>
            <td>
</td>
          </tr>
        </thead>
        <ItemList items={props.items} setItems={props.setItems}/>
        </table>
        </div>
    )
  
  }