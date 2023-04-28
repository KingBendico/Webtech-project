import { CustomerInfo } from "../../types/types";
import "./style.css";

interface Props {
  customerInfo: CustomerInfo;
  setCustomerInfo: (customerInfo: CustomerInfo) => void;
}

export default function customerInfoInput({
  customerInfo,
  setCustomerInfo,
}: Props) {
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

      const data = await fetch(
        "https://api.dataforsyningen.dk/postnumre?nr=" + value
      )
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
      return data;
    } catch (e) {
      console.log("hej", e);
    }
  };

  return (
    <div className="container">
      <form>
        <div className="label-wrapper">
          <label>Land</label>
        </div>
        <select
          name="country"
          onChange={handleCountryChange}
          value={customerInfo.country}
        >
          <option value="denmark">Danmark</option>
          <option value="sweeden">Sverige</option>
          <option value="norway">Norge</option>
        </select>

        <div className="label-wrapper">
          <label>Post nummer</label>
        </div>
        <input
          name="zip-code"
          value={customerInfo.zipCode}
          type="number"
          onChange={handleZipCodeChange}
        />
        <div className="label-wrapper">
          <label>By</label>
        </div>
        {customerInfo.country == "denmark" ? (
          <input name="city" value={customerInfo.city} disabled />
        ) : (
          <input name="city" value={customerInfo.city} />
        )}
        <div className="label-wrapper">
          <label>Adresse</label>
        </div>
        <input
          name="address"
          value={customerInfo.adress}
          onChange={handleAdressChange}
        />
        <div className="label-wrapper">
          <label>Telefon Nummer</label>
        </div>
        <input
          name="phone-number"
          type="number"
          value={customerInfo.phoneNr}
          onChange={handlePhoneNrChange}
        />
        <div className="label-wrapper">
          <label>Navn</label>
        </div>
        <input
          name="name"
          value={customerInfo.name}
          onChange={handleNameChange}
        />
        <div className="label-wrapper">
          <label>Email</label>
        </div>
        <input
          name="email"
          type="email"
          value={customerInfo.email}
          onChange={handleEmailChange}
        />
        <div className="label-wrapper">
          <label>Firma navn</label>
        </div>
        <input
          name="company-name"
          value={customerInfo.companyName}
          onChange={handleCompanyNameChange}
        />
        <div className="label-wrapper">
          <label>CVR nummer</label>
        </div>
        <input
          name="vat-number"
          value={customerInfo.vatNumber}
          onChange={handleVatNumberChange}
        />
      </form>
    </div>
  );
}
