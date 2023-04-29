import CustomerInfoInput from "../../components/CustomerInfoInput/CustomerInfoInput";
import CustomerAgreePrefsInput from "../../components/CustomerAgreePrefsInput/CustomerAgreePrefsInput";
import Payment from "../../components/PaymentMethod/Payment";

export default function Checkout() {
  return (
    <>
      <CustomerInfoInput />
      <Payment />
      <CustomerAgreePrefsInput />
    </>
  );
}
