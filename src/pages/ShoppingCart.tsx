import ShoppingCartTable from "../components/ShoppingCartTable"
import { useState } from 'react';
import {Item} from '../types/types'
import cartItems from '../../json_data/cart_items.json';
import React from "react";
import ShoppingCartSummary from "../components/ShoppingCartSummary";




export default function ShoppingCart() {
    const [items, setItems] = useState<Item[]>(cartItems);

    return (
        <>
            <ShoppingCartTable items={items} setItems={setItems}/>
            <ShoppingCartSummary items={items} />

        </>
    )
  }