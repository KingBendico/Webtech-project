import './App.css'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Checkout from './pages/Checkout/Checkout';
import Success from './pages/PaymentStatus/Success';
import Failed from './pages/PaymentStatus/Failed';
import { useEffect, useState } from "react";
import CartProvider from './context/CartContext';
import CustomerProvider from './context/UserContext';
import LoadingProvider from "./context/LoadingContext";

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [isLoading, setIsLoading] = useState<boolean>(false);



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
      <CartProvider>
        <CustomerProvider>
          <LoadingProvider>
            { currentPage === '/checkout' ? (
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
          </LoadingProvider>
        </CustomerProvider>
      </CartProvider>
    </>
  );
}


export default App;
