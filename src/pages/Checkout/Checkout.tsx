import { useEffect, useState } from 'react';
import CustomerInfoInput from '../../components/CustomerInfoInput/CustomerInfoInput';
import CustomerAgreePrefsInput from '../../components/CustomerAgreePrefsInput/CustomerAgreePrefsInput';
import { Link } from "react-router-dom";
import { Item , CustomerInfo} from "../../types/types";

interface Props {
    items: Item[];
}



export default function Checkout(props: Props) {
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        country: "denmark",
        zipCode: "",
        city: "",
        adress: "",
        phoneNr: "",
        name: "",
        email: "",
        companyName: "",
        vatNumber: ""
    })
    const [customerAgreePrefs, setCustomerAgreePrefs] = useState({
        toc: false,
        marketingEmails: false,
        prefs: ""
    })
    const test = async () => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        const body = {
        "customerInfo": JSON.stringify(customerInfo),
        "customerAgreePrefs": JSON.stringify(customerAgreePrefs),
        "shoppingCart": JSON.stringify(props.items)
        }

        const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
        }

        const respone = fetch("https://eozzd62ocjr82sr.m.pipedream.net", options)
        console.log(await respone)
    }

    return (
        <>
            <CustomerInfoInput customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} />
            <CustomerAgreePrefsInput customerAgreePrefs={customerAgreePrefs} setCustomerAgreePrefs={setCustomerAgreePrefs}/>
            <button>
                <Link to="/">Gå Tilbage</Link>
            </button>
            { customerAgreePrefs.toc && customerInfo.country && customerInfo.zipCode && customerInfo.city && customerInfo.adress && customerInfo.phoneNr && customerInfo.name && customerInfo.email? <button onClick={test}>
                <Link to="/payment">Betal</Link>
            </button> : <button disabled>Betal</button>
            }

        </>
    )
}