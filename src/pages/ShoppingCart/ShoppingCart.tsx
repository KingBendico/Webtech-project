import ShoppingCartTable from "../../components/ShoppingCartTable/ShoppingCartTable";
import { useState } from "react";
import { Item } from "../../types/types";
import cartItems from "../../../json_data/cart_items.json";
import { Link } from "react-router-dom";
import ShoppingCartSummary from "../../components/ShoppingCarSummary/ShoppingCartSummary";

export default function ShoppingCart() {
  const [items, setItems] = useState<Item[]>(cartItems);

  return (
    <>
      <ShoppingCartTable items={items} setItems={setItems} />
      <ShoppingCartSummary items={items} />
      <button>
        <Link to="/checkout">Gå Til Kassen</Link>
      </button>
    </>
  );
}
