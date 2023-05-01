import { createContext, useContext, useState } from "react";
import { PaymentState } from "../types/types";

type PaymentContextType = {
    paymentState: PaymentState;
    setPaymentState: React.Dispatch<React.SetStateAction<PaymentState>>;
};

export const PaymentContext = createContext<PaymentContextType>({
    paymentState: {
        giftCardAmount: 0,
        giftCardNumber: null,
        phoneNumber: null,
        billingAddress: null,
        paymentMethod: null,
    },
    setPaymentState: () => {},
});

export const usePayment = () => useContext(PaymentContext);

const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
    const [paymentState, setPaymentState] = useState<PaymentState>({
        giftCardAmount: 0,
        giftCardNumber: null,
        phoneNumber: null,
        billingAddress: null,
        paymentMethod: null,
    });
  
    const value = { paymentState, setPaymentState };
  
    return (
      <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
    );
  };
  
  export default PaymentProvider;