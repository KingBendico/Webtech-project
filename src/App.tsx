import reactLogo from './assets/react.svg'
import './App.css'
import React, { useState, useEffect } from 'react';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

function App() {
  return (
    <div>
      <ItemList />
    </div>
  );
}



function ItemList() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch('.../json_data/cart_items.json')
      .then(response => response.json())
      .then((data: Item[]) => setItems(data));
  }, []);

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Item name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price} kr.</td>
              <td><button onClick={() => handleDeleteItem(index)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default App;