import { useCustomer } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import "./style.css";
import { useLoading } from "../../context/LoadingContext";

export default function CustomerAgreePrefsInput() {
  const { isLoading, setIsLoading } = useLoading();
  const { customerInfo, setCustomerInfo } = useCustomer();
  const { items } = useCart();
  const pay = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = {
      customerInfo: customerInfo,
      shoppingCart: items,
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };

    setIsLoading(true)
    const respone = await fetch("https://eozzd62ocjr82sr.m.pipedream.net", options);
    console.log(isLoading)
    if(respone.ok){
      window.history.pushState({}, "", "/success");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      window.history.pushState({}, "", "/failed");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    setIsLoading(false)
  };

  const handleTocChange = () => {
    setCustomerInfo({ ...customerInfo, toc: !customerInfo.toc });
  };
  const handleMarketingEmailsChange = () => {
    setCustomerInfo({
      ...customerInfo,
      marketingEmails: !customerInfo.marketingEmails,
    });
  };
  const handlePrefsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomerInfo({ ...customerInfo, prefs: e.target.value });
  };

  return (
    <>
      <div className="customeragree-wrapper">
        <div className="input-wrapper">
          <input
            id="toc"
            name="toc"
            type="checkbox"
            checked={customerInfo.toc}
            onChange={handleTocChange}
          />
          <label htmlFor="toc">Jeg accepterer vilkår og salgsbetingelser</label>
        </div>
        <div className="input-wrapper">
          <input
            name="marketingEmails"
            id="marketingEmails"
            type="checkbox"
            checked={customerInfo.marketingEmails}
            onChange={handleMarketingEmailsChange}
          />
          <label htmlFor="marketingEmails">
            Vil du modtage emails omkring gode tilbud?
          </label>
        </div>
        <div className="comment-wrapper">
          <label htmlFor="prefs">
            Har du nogle instrukser til vores leverandør?
          </label>
          <br />
          <textarea
            name="prefs"
            id="prefs"
            value={customerInfo.prefs}
            onChange={handlePrefsChange}
          />
        </div>
      </div>
      <div className="navigation-wrapper">
        <NavigateButton id="back" to={"/"}>
          Gå Tilbage
        </NavigateButton>
        {customerInfo.toc &&
        customerInfo.country &&
        customerInfo.zipCode &&
        customerInfo.city &&
        customerInfo.adress &&
        customerInfo.phoneNr.length == 8 &&
        customerInfo.name &&
        (customerInfo.vatNumber.length == 0 ||
          customerInfo.vatNumber.length == 8) &&
        customerInfo.email.includes("@") ? (
          <button id="pay" onClick={pay}>
            Betal
          </button>
        ) : (
          <button id="pay" disabled>
            Betal
          </button>
        )}
      </div>
    </>
  );
}
