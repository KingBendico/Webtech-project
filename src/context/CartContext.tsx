import { createContext, useContext } from "react";
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