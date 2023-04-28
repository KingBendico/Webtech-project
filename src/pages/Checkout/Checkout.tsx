import CustomerInfoInput from '../../components/CustomerInfoInput/CustomerInfoInput';
import CustomerAgreePrefsInput from '../../components/CustomerAgreePrefsInput/CustomerAgreePrefsInput';
import NavigateButton from '../../components/NavigateButton/NavigateButton';
import { useCart } from '../../context/CartContext';
import { useCustomer } from '../../context/UserContext';




export default function Checkout() {
    const {customerInfo} = useCustomer()
    const { items } = useCart()
    const pay = async () => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        const body = {
        "customerInfo": customerInfo,
        "shoppingCart": items
        }

        const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
        }

        const respone = await fetch("https://eozzd62ocjr82sr.m.pipedream.net", options)
        
    }

    return (
        <>
            <CustomerInfoInput />
            <CustomerAgreePrefsInput/>
            <NavigateButton to={"/"}>Gå Tilbage</NavigateButton>
            { customerInfo.toc && customerInfo.country && customerInfo.zipCode && customerInfo.city && customerInfo.adress && customerInfo.phoneNr.length == 8 && customerInfo.name && (customerInfo.vatNumber.length == 0 || customerInfo.vatNumber.length == 8) && customerInfo.email.includes("@")? <button onClick={pay}>
                Gå Til Betaling
            </button> : <button disabled>Gå Til Betaling</button>
            }

        </>
    )
}