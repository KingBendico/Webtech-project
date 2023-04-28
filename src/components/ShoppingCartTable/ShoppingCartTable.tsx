import ItemList from "../ItemList/ItemList";
import { Item } from "../../types/types";
import { useCart } from '../../context/CartContext';
import "./style.css";


export default function ShoppingCartTable() {
  return (
    <div>
      <h1>Indkøbskurv</h1>
      <table>
        <thead>
          <tr>
            <th>Vare</th>
            <th>Stykpris</th>
            <th>Antal</th>
            <th>Total pris</th>
            <th>Slet</th>
            <th>Gaveindpakning</th>
            <th>Tilbagevendende ordre</th>
          </tr>
        </thead>
        <ItemList />
      </table>
    </div>
  );
}
