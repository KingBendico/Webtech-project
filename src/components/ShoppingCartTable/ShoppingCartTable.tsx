import ItemList from "../ItemList/ItemList";
import "./style.css";

export default function ShoppingCartTable() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Vare</th>
            <th>Stykpris</th>
            <th>Antal</th>
            <th>Gaveindpakning</th>
            <th>Tilbagevendende ordre</th>
            <th>Slet</th>
          </tr>
        </thead>
        <ItemList />
      </table>
      <hr />
    </>
  );
}
