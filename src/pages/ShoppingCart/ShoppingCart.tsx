import ShoppingCartTable from "../../components/ShoppingCartTable/ShoppingCartTable";
import { Item } from "../../types/types";
import ShoppingCartSummary from "../../components/ShoppingCarSummary/ShoppingCartSummary";

interface Props {
  items: Item[];
  setItems: (items: Item[]) => void;
}

export default function ShoppingCart(props: Props) {
  return (
    <>
      <ShoppingCartTable items={props.items} setItems={props.setItems} />
      <ShoppingCartSummary items={props.items} />
    </>
  );
}
