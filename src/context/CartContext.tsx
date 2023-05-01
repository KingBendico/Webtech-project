import { createContext, useContext, useState } from "react";
import { Item } from "../types/types";

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
  const [items, setItems] = useState<Item[]>([]);

  const value = { items, setItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
