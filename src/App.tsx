import './App.css'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Checkout from './pages/Checkout/Checkout';
import Success from './pages/PaymentStatus/Success';
import Failed from './pages/PaymentStatus/Failed';
import { Item, CustomerInfo } from "./types/types";
import { useEffect, useState } from "react";
import cartItems from "../json_data/cart_items.json";
import { CartContext } from './context/CartContext';
import { CustomerContext } from './context/UserContext';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [items, setItems] = useState<Item[]>(cartItems);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    country: "denmark",
    zipCode: "",
    city: "",
    adress: "",
    phoneNr: "",
    name: "",
    email: "",
    companyName: "",
    vatNumber: "",
    toc: false,
    marketingEmails: false,
    prefs: ""
},)


  const handleUrlChange = () => {
    const path = window.location.pathname;
      switch (path) {
        case "/":
          setCurrentPage('/');
          break;
        case "/checkout":
          setCurrentPage('/checkout');
          break;
        case "/success":
          setCurrentPage('/success');
          break;
        case "/failed":
          setCurrentPage('/failed');
          break;
        default:
          setCurrentPage('/PageNotFound')
          break;
      }
  };

  useEffect(() => {
    window.addEventListener('popstate', handleUrlChange);
  }, []);

  return (
    <>
      <CartContext.Provider value= {{ items, setItems}}>
        <CustomerContext.Provider value= {{ customerInfo, setCustomerInfo }}>
        {currentPage === '/checkout' ? (
          <Checkout/>
        ) : currentPage === '/' ? (
          <ShoppingCart/>
        ) : currentPage === '/success' ? (
          <Success/>
        ) :currentPage === '/failed' ? (
          <Failed/>
        ) :(
          <h1>Page Not Found</h1>
        )}
        </CustomerContext.Provider>
      </CartContext.Provider>
    </>
  );
}


export default App;
