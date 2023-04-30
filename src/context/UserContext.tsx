import { createContext, useContext, useState } from "react";
import { CustomerInfo } from "../types/types";

type UserContextType = {
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
};

export const CustomerContext = createContext<UserContextType>({
  customerInfo: {
    country: "",
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

const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
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
  });

  const value = { customerInfo, setCustomerInfo };

  return (
    <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
  );
};

export default CustomerProvider;