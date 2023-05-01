import CustomerInfoInput from "../../components/CustomerInfoInput/CustomerInfoInput";
import CustomerAgreePrefsInput from "../../components/CustomerAgreePrefsInput/CustomerAgreePrefsInput";
import Payment from "../../components/PaymentMethod/Payment";
import "./style.css"
import PaymentProvider from "../../context/PaymentContext";
import { useLoading } from "../../context/LoadingContext";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import PaymentSubmit from "../../components/PaymentSubmit/PaymentSubmit";
import InputValidationProvider from "../../context/InputValidationContext";


export default function Checkout() {
  const { isLoading } = useLoading()

  return (
    <>
    {isLoading === true ? <LoadingIndicator/>:(
    <InputValidationProvider>
      <PaymentProvider>
        <CustomerInfoInput />
        <div className="section-wrapper">
          <Payment />
          <CustomerAgreePrefsInput />
          <PaymentSubmit/>
        </div>
      </PaymentProvider>
    </InputValidationProvider>
  )}
    </>
  );
}
