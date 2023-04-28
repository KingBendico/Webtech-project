import './App.css'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Item } from "./types/types";
import { useState } from "react";
import cartItems from "../json_data/cart_items.json";
function App() {
  const [items, setItems] = useState<Item[]>(cartItems);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ShoppingCart items={items} setItems={setItems}/>} />
          <Route path="checkout" element={<Checkout items={items} />} />
          <Route path="payment" element={<Payment items={items} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;