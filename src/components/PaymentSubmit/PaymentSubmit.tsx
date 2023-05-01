import { useCart } from "../../context/CartContext";
import { useInputValidation } from "../../context/InputValidationContext";
import { useLoading } from "../../context/LoadingContext";
import { usePayment } from "../../context/PaymentContext";
import { useCustomer } from "../../context/UserContext";
import NavigateButton from "../NavigateButton/NavigateButton";
import "./style.css";

export default function PaymentSubmit() {
  const { setIsLoading } = useLoading();
  const { customerInfo } = useCustomer();
  const { items } = useCart();
  const { paymentState } = usePayment()
  const { inputValidation, setInputValidation } = useInputValidation()

    const handlePayment = () => {
        const isValidatet = validateInputFields()

        if(isValidatet){
            console.log("here")
            pay()
        }
        console.log(inputValidation)
    }

    const validateInputFields = () => {
        var validatet = true
        if(!customerInfo.toc){
            setInputValidation({ ...inputValidation, toc: true })
            validatet = false
        }
        if(!customerInfo.country){
            setInputValidation({ ...inputValidation, country: true })
            validatet = false
        }
        if(!customerInfo.zipCode){
            setInputValidation({ ...inputValidation, zipCode: true })
            validatet = false
        }
        if(!customerInfo.city){
            setInputValidation({ ...inputValidation, city: true })
            validatet = false
        }
        if(!customerInfo.adress){
            setInputValidation({ ...inputValidation, adress: true })
            validatet = false
        }
        if(customerInfo.phoneNr.length != 8){
            setInputValidation({ ...inputValidation, phoneNr: true })
            validatet = false
        }
        if(!customerInfo.name){
            setInputValidation({ ...inputValidation, name: true })
            validatet = false
        }
        if(customerInfo.vatNumber.length != 0 && customerInfo.vatNumber.length != 8){  
            setInputValidation({ ...inputValidation, vatNumber: true })
            validatet = false
        }
        if(!customerInfo.email.includes("@")){
            console.log("lololol")
            setInputValidation({ ...inputValidation, email: true })
            validatet = false
        }
        console.log(validatet)
        return validatet
    }

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