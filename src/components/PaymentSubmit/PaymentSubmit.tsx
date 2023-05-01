import { useCart } from "../../context/CartContext";
import { useInputValidation } from "../../context/InputValidationContext";
import { useLoading } from "../../context/LoadingContext";
import { usePayment } from "../../context/PaymentContext";
import { useCustomer } from "../../context/UserContext";
import NavigateButton from "../NavigateButton/NavigateButton";
import "./style.css";
import {InputValidation} from "../../types/types"

export default function PaymentSubmit() {
  const { setIsLoading } = useLoading();
  const { customerInfo } = useCustomer();
  const { items } = useCart();
  const { paymentState } = usePayment()
  const { inputValidation, setInputValidation } = useInputValidation()

    const handlePayment = () => {
        const isValidatet = validateInputFields()

        if(isValidatet){
            pay()
        }
        console.log(inputValidation)
    }

    const validateInputFields = () => {
        var validatet = true
        var TMPinputValidation = inputValidation
        if(!customerInfo.toc){
            TMPinputValidation.toc = true
            validatet = false
        }
        if(!customerInfo.country){
            TMPinputValidation.country = true
            validatet = false
        }
        if(!customerInfo.zipCode){
            TMPinputValidation.zipCode = true
            validatet = false
        }
        if(!customerInfo.city){
            TMPinputValidation.city = true
            validatet = false
        }
        if(!customerInfo.adress){
            TMPinputValidation.adress = true
            validatet = false
        }
        if(customerInfo.phoneNr.length != 8){
            TMPinputValidation.phoneNr = !inputValidation.phoneNr
            validatet = false
        }
        if(!customerInfo.name){
            TMPinputValidation.name = true
            validatet = false
        }
        if(customerInfo.vatNumber.length != 0 && customerInfo.vatNumber.length != 8){  
            TMPinputValidation.vatNumber = true
            validatet = false
        }
        if(!customerInfo.email.includes("@")){
            TMPinputValidation.email = true
            validatet = false
        }
        updateInputValidation(TMPinputValidation)
        return validatet
    }

    const updateInputValidation = (inputValidation:InputValidation) =>
    setInputValidation((prevState) => {
      return { ...prevState, inputValidation };
    });

    const createOptions = () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const body = {
            customerInfo: customerInfo,
            shoppingCart: items,
            paymentInfo: paymentState
        };
    
        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        };

        return options
    }
    const pay = async () => {


        const options = createOptions()

        setIsLoading(true)
        const respone = await fetch("https://eozzd62ocjr82sr.m.pipedream.net", options);
        if(respone.ok){
        window.history.pushState({}, "", "/success");
        window.dispatchEvent(new PopStateEvent("popstate"));
        } else {
        window.history.pushState({}, "", "/failed");
        window.dispatchEvent(new PopStateEvent("popstate"));
        }
        setIsLoading(false)
    };

    return(
        <div className="navigation-wrapper">
            <NavigateButton id="back" to={"/"}>
                Gå Tilbage
            </NavigateButton>
            <button id="pay" onClick={handlePayment}>
                Betal
            </button>
        </div>
    )
}