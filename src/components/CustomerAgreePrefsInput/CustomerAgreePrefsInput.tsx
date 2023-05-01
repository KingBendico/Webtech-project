import { useCustomer } from "../../context/UserContext";
import { useInputValidation } from "../../context/InputValidationContext";
import "./style.css";

export default function CustomerAgreePrefsInput() {
  const { customerInfo, setCustomerInfo } = useCustomer();
  const { inputValidation } = useInputValidation();

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
            className={ inputValidation.toc ? "error-bordercolor-checkbox":""}
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
    </>
  );
}
