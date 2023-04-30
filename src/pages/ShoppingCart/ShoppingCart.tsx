import ShoppingCartTable from "../../components/ShoppingCartTable/ShoppingCartTable";
import ShoppingCartSummary from "../../components/ShoppingCartSummary/ShoppingCartSummary";



export default function ShoppingCart() {
  return (
    <>
      <h1>Indkøbskurv</h1>
      <hr />
      <ShoppingCartTable />
      <ShoppingCartSummary />
    </>
  );
}
