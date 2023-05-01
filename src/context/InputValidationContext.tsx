import { createContext, useContext, useState } from "react";
import { InputValidation } from "../types/types";

type InputValidationContextType = {
    inputValidation: InputValidation;
    setInputValidation: React.Dispatch<React.SetStateAction<InputValidation>>;
};



export const InputValidationContext = createContext<InputValidationContextType>({
    inputValidation: {
        toc: false,
        country: false,
        zipCode: false,
        city: false,
        adress: false,
        phoneNr: false,
        name: false,
        vatNumber: false,
        email: false
    },
    setInputValidation: () => {},
});

export const useInputValidation = () => useContext(InputValidationContext);

const InputValidationProvider = ({ children }: { children: React.ReactNode }) => {
    const [inputValidation, setInputValidation] = useState<InputValidation>({
        toc: false,
        country: false,
        zipCode: false,
        city: false,
        adress: false,
        phoneNr: false,
        name: false,
        vatNumber: false,
        email: false
    });
  
    const value = { inputValidation, setInputValidation };
  
    return (
      <InputValidationContext.Provider value={value}>{children}</InputValidationContext.Provider>
    );
  };
  
  export default InputValidationProvider;