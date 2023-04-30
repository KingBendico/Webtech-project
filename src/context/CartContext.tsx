import { createContext, useContext, useState } from "react";
import { Item } from "../types/types";
import cartItems from "../../json_data/cart_items.json";

type CartContextType = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  setItems: () => {},
});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>(cartItems);

  const value = { items, setItems };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export default CartProvider;