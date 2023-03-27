import { CustomerAgreePrefs } from "../../types/types";

interface Props {
    customerAgreePrefs: CustomerAgreePrefs
    setCustomerAgreePrefs:(customerInfo: CustomerAgreePrefs) => void;
}

export default function CustomerAgreePrefsInput({customerAgreePrefs, setCustomerAgreePrefs}:Props) {

    const handleTocChange = () => { setCustomerAgreePrefs(({ ...customerAgreePrefs, toc: !customerAgreePrefs.toc })) }
    const handleMarketingEmailsChange = () => { setCustomerAgreePrefs(({ ...customerAgreePrefs, marketingEmails: !customerAgreePrefs.marketingEmails })) }
    const handlePrefsChange = (e: React.ChangeEvent<HTMLInputElement>) => { setCustomerAgreePrefs(({ ...customerAgreePrefs, prefs: e.target.value })) }

    return (
        <div>
            <input name="toc" type="checkbox" checked={customerAgreePrefs.toc} onChange={handleTocChange} />
            <label>Jeg accepterer vilkår og salgsbetingelser</label>
            <input name="marketingEmails" type="checkbox" checked={customerAgreePrefs.marketingEmails} onChange={handleMarketingEmailsChange} />
            <label>Vil du modtage emails omkring gode tilbud?</label>
            <input name="prefs" type="text" value={customerAgreePrefs.prefs} onChange={handlePrefsChange} />
            <label>Har du nogle instrukser til vores leverandør?</label>
        </div>
    );
}