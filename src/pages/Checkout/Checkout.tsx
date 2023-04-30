import CustomerInfoInput from "../../components/CustomerInfoInput/CustomerInfoInput";
import CustomerAgreePrefsInput from "../../components/CustomerAgreePrefsInput/CustomerAgreePrefsInput";
import Payment from "../../components/PaymentMethod/Payment";
import "./style.css"
import PaymentProvider from "../../context/PaymentContext";
import { useLoading } from "../../context/LoadingContext";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";


export default function Checkout() {
  const { isLoading } = useLoading()

  return (
    <>
    {isLoading === true ? <LoadingIndicator/>:(
    <PaymentProvider>
      <CustomerInfoInput />
      <div className="section-wrapper">
        <Payment />
        <CustomerAgreePrefsInput />
      </div>
    </PaymentProvider>
  )}
    </>
  );
}
