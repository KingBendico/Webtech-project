import { createContext, useContext, useState } from "react";

type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    setIsLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const value = { isLoading, setIsLoading };
  
    return (
      <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
    );
  };
  
  export default LoadingProvider;