import ShoppingCartTable from "../../components/ShoppingCartTable/ShoppingCartTable";
import ShoppingCartSummary from "../../components/ShoppingCartSummary/ShoppingCartSummary";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";

export default function ShoppingCart() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setItems } = useCart();

  const requestBinUrl = "https://eo84pa316suh5u7.m.pipedream.net/";
  useEffect(() => {
    fetch(requestBinUrl).then((response) => {
      if (!response.ok) {
        console.error(
          `Could not load shopping cart information: ${response.status}`
        );
      } else {
        response.json().then((json) => {
          setItems(json);
          setIsLoading(false);
        });
      }
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <ShoppingCartTable />
          <ShoppingCartSummary />
        </>
      )}
    </>
  );
}
