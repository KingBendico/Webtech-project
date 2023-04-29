import "./App.css";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Checkout from "./pages/Checkout/Checkout";
import { Item, CustomerInfo } from "./types/types";
import { useEffect, useState } from "react";
import cartItems from "../json_data/cart_items.json";
import { CartContext } from "./context/CartContext";
import { CustomerContext } from "./context/UserContext";

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
    prefs: "",
  });

  const handleUrlChange = () => {
    const path = window.location.pathname;

    if (path === "/checkout") {
      setCurrentPage("/checkout");
    } else if (path === "/") {
      setCurrentPage("/");
    } else {
      setCurrentPage("/PageNotFound");
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", handleUrlChange);
  }, []);

  return (
    <>
      <CartContext.Provider value={{ items, setItems }}>
        <CustomerContext.Provider value={{ customerInfo, setCustomerInfo }}>
          {currentPage === "/checkout" ? (
            <Checkout />
          ) : currentPage === "/" ? (
            <ShoppingCart />
          ) : (
            <h1>Page Not Found</h1>
          )}
        </CustomerContext.Provider>
      </CartContext.Provider>
    </>
  );
}

export default App;

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/">
//           <Route index element={<ShoppingCart items={items} setItems={setItems}/>} />
//           <Route path="checkout" element={<Checkout items={items} />} />
//         </Route>
//       </Routes>
//
//     </BrowserRouter>
//   );
