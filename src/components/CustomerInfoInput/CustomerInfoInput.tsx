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
    setCustomerInfo({ ...customerInfo, phoneNr: e.target.value });
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
    setCustomerInfo({ ...customerInfo, vatNumber: e.target.value });
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
          try {
            return await cachedResponse.json();
          } catch {}
        }
      }

      return fetch("https://api.dataforsyningen.dk/postnumre?nr=" + value)
        .then((response) => response.json())
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
        .catch((err) => console.log(err));
    } catch (e) {
      console.log("hej", e);
    }
  };

  return (
    <div className="container">
      <form>
        <div className="label-wrapper">
          <label htmlFor="country">Land</label>
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
          <label htmlFor="zip-code">Post nummer</label>
          <input
            name="zip-code"
            value={customerInfo.zipCode}
            type="number"
            onChange={handleZipCodeChange}
            required
          />
        </div>
        <div className="label-wrapper">
          <label htmlFor="city">By</label>
          <br />
          {customerInfo.country == "denmark" ? (
            <input name="city" id="city" value={customerInfo.city} disabled />
          ) : (
            <input name="city" id="city" value={customerInfo.city} required />
          )}
        </div>
        <div className="label-wrapper">
          <label htmlFor="address">Adresse</label>
          <br />
          <input
            name="address"
            id="address"
            value={customerInfo.adress}
            onChange={handleAdressChange}
            required
          />
        </div>
        <div className="label-wrapper">
          <label htmlFor="phone-number">Telefon Nummer</label>
          <br />
          <input
            name="phone-number"
            id="phone-number"
            type="number"
            value={customerInfo.phoneNr}
            onChange={handlePhoneNrChange}
            required
          />
        </div>
        <div className="label-wrapper">
          <br />
          <label htmlFor="name">Navn</label>
          <br />
          <input
            name="name"
            id="name"
            value={customerInfo.name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="label-wrapper">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="label-wrapper">
          <label htmlFor="company-name">Firma navn</label>
          <input
            name="company-name"
            id="company-name"
            value={customerInfo.companyName}
            onChange={handleCompanyNameChange}
          />
        </div>
        <div className="label-wrapper">
          <label htmlFor="vat-number">CVR nummer</label>
          <input
            name="vat-number"
            id="vat-number"
            value={customerInfo.vatNumber}
            onChange={handleVatNumberChange}
          />
        </div>
      </form>
    </div>
  );
}
