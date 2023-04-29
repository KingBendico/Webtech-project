import ItemList from "../ItemList/ItemList";
import "./style.css";

export default function ShoppingCartTable() {
  return (
    <>
      <h1>Indkøbskurv</h1>
      <hr />
      <table>
        <thead>
          <tr>
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
