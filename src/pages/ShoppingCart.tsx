import ShoppingCartTable from "../components/ShoppingCartTable"
import { useState } from 'react';
import {Item} from '../types/types'
import cartItems from '../../json_data/cart_items.json';
import React from "react";
import ShoppingCartSummary from "../components/ShoppingCartSummary";



interface Props {
    items: Item[];
    setItems: (items: Item[]) => void;
  
}

export default function ShoppingCart(props: Props) {
    const [items, setItems] = useState<Item[]>(cartItems);

    return (
        <>
            <ShoppingCartTable items={items} setItems={setItems}/>
            <ShoppingCartSummary items={items} />

        </>
    )
  }