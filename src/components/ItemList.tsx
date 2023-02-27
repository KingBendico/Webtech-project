import { useState } from 'react';
import cartItems from '../../json_data/cart_items.json';
import ItemTable from './ItemTable'
import {Item} from '../types/types'
import React from 'react';
import ShoppingCartSummary from './ShoppingCartSummary';

interface Props {
    items: Item[];
    setItems: (items: Item[]) => void;
}

export default function ItemList(props: Props) {

    const { items, setItems } = props;
  
    const handleDeleteItem = (index: number) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };
  
    const handleQuantityChange = (item: Item, newQuantity: number) => {
        const updatedItems = [...items];
        const index = updatedItems.findIndex(i => i.id === item.id);
        updatedItems[index].quantity = newQuantity > 0 ? newQuantity : 1;
        setItems(updatedItems);
    };
  
    return (
        <>
            <ItemTable items={items} onDeleteItem={handleDeleteItem} onQuantityChange={handleQuantityChange} />
            
        </>
    );
}