import CustomerInfoInput from "../../components/CustomerInfoInput/CustomerInfoInput";
import CustomerAgreePrefsInput from "../../components/CustomerAgreePrefsInput/CustomerAgreePrefsInput";
import Payment from "../../components/PaymentMethod/Payment";
import "./style.css"
import { useState } from "react";
import { PaymentState } from "../../types/types";
import { PaymentContext } from "../../context/PaymentContext";


export default function Checkout() {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    amount: 0,
    giftCardNumber: null,
    phoneNumber: null,
    billingAddress: null,
    paymentMethod: null,
  });
  return (
    <>
    <PaymentContext.Provider value= {{ paymentState, setPaymentState}}>
      <CustomerInfoInput />
      <div className="section-wrapper">
        <Payment />
        <CustomerAgreePrefsInput />
      </div>
    </PaymentContext.Provider>
    </>
  );
}
