import { createContext, useContext } from "react";
import { CustomerInfo } from "../types/types";

type UserContextType = {
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
};

export const CustomerContext = createContext<UserContextType>({
  customerInfo: {
    country: "denmark",
    zipCode: "",
    city: "",
    adress: "",
    phoneNr: "",
    name: "",
    email: "",
    companyName: "",
    vatNumber: "",
    toc: false,
    marketingEmails: false,
    prefs: "",
  },
  setCustomerInfo: () => {},
});

export const useCustomer = () => useContext(CustomerContext);
