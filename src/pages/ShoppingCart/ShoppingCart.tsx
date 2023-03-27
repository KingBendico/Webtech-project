import ShoppingCartTable from "../../components/ShoppingCartTable/ShoppingCartTable";
import { useState } from "react";
import { Item } from "../../types/types";
import cartItems from "../../../json_data/cart_items.json";
import { Link } from "react-router-dom";
import ShoppingCartSummary from "../../components/ShoppingCarSummary/ShoppingCartSummary";

interface Props {
  items: Item[];
  setItems: (items: Item[]) => void;
}

export default function ShoppingCart(props:Props) {

  return (
    <>
      <ShoppingCartTable items={props.items} setItems={props.setItems} />
      <ShoppingCartSummary items={props.items} />
      <button>
        <Link to="/checkout">Gå Til Kassen</Link>
      </button>
    </>
  );
}
