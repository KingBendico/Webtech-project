import ItemList from "../ItemList/ItemList";
import "./style.css";

export default function ShoppingCartTable() {
  return (
    <>
      <h1>Indkøbskurv</h1>
      <hr />
      <p>
        Tip: Hold musen over <span className="upsell"></span> for at se flere
        oplysninger om rabat og produkter.
      </p>
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
