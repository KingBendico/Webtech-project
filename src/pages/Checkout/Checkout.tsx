import CustomerInfoInput from "../../components/CustomerInfoInput/CustomerInfoInput";
import CustomerAgreePrefsInput from "../../components/CustomerAgreePrefsInput/CustomerAgreePrefsInput";
import Payment from "../../components/PaymentMethod/Payment";
import "./style.css"

export default function Checkout() {
  return (
    <>
      <CustomerInfoInput />
      <div className="section-wrapper">
        <Payment />
        <CustomerAgreePrefsInput />
      </div>
    </>
  );
}
