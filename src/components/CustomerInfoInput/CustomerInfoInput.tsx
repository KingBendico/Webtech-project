import { useCustomer } from "../../context/UserContext";
import "./style.css";

export default function customerInfoInput() {
  const { customerInfo, setCustomerInfo } = useCustomer();
  const handleAdressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, adress: e.target.value });
  };
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomerInfo({ ...customerInfo, country: e.target.value });
  };
  const handlePhoneNrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length <= 8){
      setCustomerInfo({ ...customerInfo, phoneNr: e.target.value });
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, name: e.target.value });
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, email: e.target.value });
  };
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setCustomerInfo({ ...customerInfo, companyName: e.target.value });
    
  };
  const handleVatNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length <= 8){
      setCustomerInfo({ ...customerInfo, vatNumber: e.target.value });
    }
  };

  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.length < 5) {
      if (value.length === 4 && customerInfo.country == "denmark") {
        setCustomerInfo({
          ...customerInfo,
          zipCode: value,
          city: await fetchZipCodeAsync(value),
        });
      } else {
        setCustomerInfo({ ...customerInfo, zipCode: value });
      }
    }
  };
  const fetchZipCodeAsync = async (value: string) => {
    const cachName = "zipCodes";
    try {
      if (typeof caches != "undefined") {
        const cacheStorage = await caches.open(cachName);
        const cachedResponse = await cacheStorage.match(value);

        if (cachedResponse && cachedResponse.ok) {
            return await cachedResponse.json();
        }
      }
    } catch (e) {
      console.log("cache is not avalible");
    }

      return fetch(
        "https://api.dataforsyningen.dk/postnumre?nr=" + value
      )
        .then((response) => {
          if(response.ok){
            return response.json()
          }else{
            throw new Error()
          }
        })
        .then((body) => {
          const city = body[0].navn;
          if ("caches" in window) {
            const data = new Response(JSON.stringify(city));
            caches.open(cachName).then((cache) => {
              cache.put(value, data);
            });
          }
          return city;
        })
        .catch(() => {console.log("Zip code does not exist"); return ""});
  
  };

  return (
    <>
      <div className="container">
        <h1>Leveringsoplysninger</h1>
        <hr />
        <p>
          Felter markeret med <span className="required"></span> skal udfyldes!
        </p>
        <div className="customerinput-wrapper">
          <form>
            <div className="label-wrapper">
              <label htmlFor="country" className="required">
                Land
              </label>
              <select
                name="country"
                id="country"
                onChange={handleCountryChange}
                value={customerInfo.country}
                required
              >
                <option value="denmark">Danmark</option>
                <option value="sweeden">Sverige</option>
                <option value="norway">Norge</option>
              </select>
            </div>
            <div className="label-wrapper">
              <label htmlFor="phone-number" className="required">
                Telefonnummer
              </label>
              <br />
              <input
                name="phone-number"
                id="phone-number"
                type="number"
                placeholder="Indtast tlf.nr."
                value={customerInfo.phoneNr}
                onChange={handlePhoneNrChange}
                required
              />
            </div>
            <div className="label-wrapper">
              <label htmlFor="zip-code" className="required">
                Postnummer
              </label>
              <input
                name="zip-code"
                value={customerInfo.zipCode}
                placeholder="Indtast postnr."
                type="number"
                onChange={handleZipCodeChange}
                required
              />
            </div>
            <div className="label-wrapper">
              <label htmlFor="city" className="required">
                By
              </label>
              <br />
              {customerInfo.country == "denmark" ? (
                <input
                  name="city"
                  id="city"
                  value={customerInfo.city}
                  disabled
                />
              ) : (
                <input
                  className="required"
                  name="city"
                  placeholder="Indtast bynavn"
                  id="city"
                  value={customerInfo.city}
                  required
                />
              )}
            </div>
            <div className="label-wrapper">
              <label htmlFor="address" className="required">
                Adresse
              </label>
              <br />
              <input
                name="address"
                id="address"
                placeholder="Indtast adresse"
                value={customerInfo.adress}
                onChange={handleAdressChange}
                required
              />
            </div>
            <div className="label-wrapper">
              <br />
              <label htmlFor="name" className="required">
                Navn
              </label>
              <br />
              <input
                name="name"
                id="name"
                placeholder="Indtast navn"
                value={customerInfo.name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="label-wrapper">
              <label htmlFor="email" className="required">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Indtast email"
                value={customerInfo.email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="label-wrapper">
              <label htmlFor="company-name">Firmanavn</label>
              <input
                name="company-name"
                id="company-name"
                placeholder="Indtast firmanavn"
                value={customerInfo.companyName}
                onChange={handleCompanyNameChange}
              />
            </div>
            <div className="label-wrapper">
              <label htmlFor="vat-number">CVR-nummer</label>
              <input
                name="vat-number"
                id="vat-number"
                placeholder="Indtast CVR-nr."
                value={customerInfo.vatNumber}
                onChange={handleVatNumberChange}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
