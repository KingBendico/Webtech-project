import { createContext, useContext } from "react";
import { PaymentState } from "../types/types";

type PaymentContextType = {
    paymentState: PaymentState;
    setPaymentState: React.Dispatch<React.SetStateAction<PaymentState>>;
};

export const PaymentContext = createContext<PaymentContextType>({
    paymentState: {
        amount: 0,
        giftCardNumber: null,
        phoneNumber: null,
        billingAddress: null,
        paymentMethod: null,
    },
    setPaymentState: () => {},
});

export const usePayment = () => useContext(PaymentContext);