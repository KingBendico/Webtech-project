import reactLogo from './assets/react.svg'
import './App.css'
import React, { useState, useEffect } from 'react';

function App() {
  return (
    <div>
      <ItemList />
    </div>
  );
}

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/json_data/cart_items.json')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div>
      <h1>List of Items</h1>
      <ol>
        {items.map((item, index) => (
          <li key={index}>{item.name} {item.price}  {item.currency} </li>
        ))}
      </ol>
    </div>
  );
}


export default App;