import { createContext, useContext } from "react";
import { customerInfo } from "../types/types";

type UserContextType = {
    customerInfo: customerInfo;
    setCustomerInfo: React.Dispatch<React.SetStateAction<customerInfo>>;
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
    prefs: ""
},
  setCustomerInfo: () => {}
});

export const useCustomer = () => useContext(CustomerContext);

