import { useCustomer } from "../../context/UserContext";

export default function CustomerAgreePrefsInput() {
    const {customerInfo, setCustomerInfo} = useCustomer()
    
    const handleTocChange = () => { setCustomerInfo(({ ...customerInfo, toc: !customerInfo.toc })) }
    const handleMarketingEmailsChange = () => { setCustomerInfo(({ ...customerInfo, marketingEmails: !customerInfo.marketingEmails })) }
    const handlePrefsChange = (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerInfo(({ ...customerInfo, prefs: e.target.value })) }

    return (
        <div>
            <input name="toc" type="checkbox" checked={customerInfo.toc} onChange={handleTocChange} />
            <label htmlFor="toc">Jeg accepterer vilkår og salgsbetingelser</label>
            <input name="marketingEmails" id="marketingEmails" type="checkbox" checked={customerInfo.marketingEmails} onChange={handleMarketingEmailsChange} />
            <label htmlFor="marketingEmails">Vil du modtage emails omkring gode tilbud?</label>
            <input name="prefs" id="prefs" type="text" value={customerInfo.prefs} onChange={handlePrefsChange} />
            <label htmlFor="prefs">Har du nogle instrukser til vores leverandør?</label>
        </div>
    );
}