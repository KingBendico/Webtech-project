import React, { useState } from "react";
import { useCustomer } from "../../context/UserContext";
import "./style.css";
import { usePayment } from "../../context/PaymentContext";




export default function Payment() {
  const {paymentState, setPaymentState} = usePayment();
  const {customerInfo } = useCustomer();

  const handleGiftCardAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const giftCardAmount = parseInt(event.target.value, 10);
    setPaymentState((prevState) => ({ ...prevState, giftCardAmount }));
  };

  const handleGiftCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const giftCardNumber = event.target.value;
    setPaymentState((prevState) => ({ ...prevState, giftCardNumber }));
  };



  const canPayWithGiftCard =
    paymentState.giftCardNumber !== null &&
    paymentState.giftCardAmount !== null &&
    paymentState.giftCardNumber.length > 0 &&
    paymentState.giftCardAmount.toString().length > 0;

    const createOptions = () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const body = {
          paymentInfo: paymentState
      };
  
      const options = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
      };

      return options
  }
  const giftCardFetch = async () => {


    const options = createOptions()
    const respone = await fetch("https://eoa0n5l6r8gydlw.m.pipedream.net", options);
    if(respone.ok){
    window.history.pushState({}, "", "/success");
    window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
    window.history.pushState({}, "", "/failed");
    window.dispatchEvent(new PopStateEvent("popstate"));
    }
  
};

const [giftCardsubmitted, setGiftCardSubmitted] = useState(false);
const handleGiftCardSubmit = (event:any) => {
         event.preventDefault();

         if (canPayWithGiftCard) {
         giftCardFetch
        setGiftCardSubmitted(true);
       }

    };

  
  const [giftCardChecked, setGiftCardChecked] = React.useState(false);
  const handleGiftCardChange = () => {
    setGiftCardChecked(!giftCardChecked);
  };


  const giftCardContent = giftCardChecked ? (
    <>
    <form onSubmit={handleGiftCardSubmit}>
      <label htmlFor="giftCardNumber">Gavekortkode:</label>
      <input
        type="number"
        id="giftCardNumber"
        name="giftCardNumber"
      //  value={paymentState.giftCardNumber}
        placeholder="indtast kode"
        onChange={handleGiftCardNumberChange}
        required
      />
      <label htmlFor="giftCardAmount">Beløb:</label>
      <input
        type="number"
        id="giftCardAmount"
        name="giftCardAmount"
      //  value={giftCardAmount}
        placeholder="indtast beløb"
       onChange={handleGiftCardAmountChange}
        required
      />
      <button type="submit">Tilføj</button>
    </form>
  </>
  ) : null;





  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

 

  const handleCardSubmit = () => {
    // submission logic here
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleCardChange = () => {
    setSelectedOption("card");
  };

  const handleMobilePayChange = () => {
      
    setSelectedOption("mobilePay");

  };

  const handleInvoiceChange = () => {
    setSelectedOption("invoice");
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "card":
        return (
          <>
            <form onSubmit={handleCardSubmit}>
              <label htmlFor="cardNumber">Kortnummer:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
                required
              />
              <label htmlFor="cardHolder">Kortholder:</label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={cardHolder}
                onChange={(event) => setCardHolder(event.target.value)}
                required
              />
              <label htmlFor="expiryDate">Udløbsdato:</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={expiryDate}
                onChange={(event) => setExpiryDate(event.target.value)}
                required
              />
              <label htmlFor="cvv">Kontrolcifre (CVC):</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cvv}
                onChange={(event) => setCvv(event.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </>
        );
      case "mobilePay":
        if (customerInfo.phoneNr.length===8) {
        return (
          <>
            <p>Du har valgt at betale med MobilePay.</p>
          </>
        );}
        
        if (customerInfo.phoneNr.length>0 && customerInfo.phoneNr.length<8) {
          return (
            <>
              <p>Du kan ikke betale med MobilePay, da du ikke har indtastet et gyldigt telefonnummer.</p>
            </>
          );}
        
        else {

          return (
            <>
              <p>Du kan ikke betale med MobilePay, da du ikke har indtastet et telefonnummer under leveringsoplysninger.</p>
            </>
          );
        }
      case "invoice":

      if (customerInfo.companyName.length===0 && customerInfo.vatNumber.length===0) {
        return (
          <>
            <p>Du kan ikke betale med faktura uden at indtaste firmanavn og CVR-nummer under leveringsoplysninger.</p>
          </>
        );}

        if (customerInfo.companyName.length===0) {
          return (
            <>
              <p>Du kan ikke betale med faktura uden at indtaste firmanavn under leveringsoplysninger.</p>
            </>
          );}

          if (customerInfo.vatNumber.length===0) {
            return (
              <>
                <p>Du kan ikke betale med faktura uden at indtaste CVR-nummer under leveringsoplysninger.</p>
              </>
            );}
  

          else {

            return (
              <>
                <p>Du har valgt at betale med Faktura..</p>
              </>
            );
          }


      default:
        return <p>Vælg en betalingsmetode for at fortsætte.</p>;
    }
  };

  return (
    <>
      <div className="header-wrapper">
        <h1>Betalingsmetode</h1>
        <hr />
      </div>
      <div className="payment-wrapper">
        <div className="paymentmethod-wrapper">
          <p>Vælg betalingsmetode:</p>
          <div>
            <input
              id="payment-card"
              type="radio"
              name="myRadio"
              value="card"
              checked={selectedOption === "card"}
              onChange={handleCardChange}
            />
            <label htmlFor="payment-card">Betalingskort</label>
          </div>
          <div>
            <input
              id="payment-mobilepay"
              type="radio"
              name="myRadio"
              value="MobilePay"
              checked={selectedOption === "mobilePay"}
              onChange={handleMobilePayChange}
            />
            <label htmlFor="payment-mobilepay">MobilePay</label>
          </div>
          <div>
            <input
              id="payment-receipt"
              type="radio"
              name="myRadio"
              value="reciept"
              checked={selectedOption === "invoice"}
              onChange={handleInvoiceChange}
            />
            <label htmlFor="payment-receipt">Faktura</label>
          </div>

          <div className="giftcard-wrapper">
            <div>
              <input
                id="giftcard-cb"
                type="checkbox"
                checked={giftCardChecked}
                onChange={handleGiftCardChange}
              />
              <label htmlFor="giftcard-cb">Brug gavekort</label>
            </div>
            {giftCardContent}
            {giftCardsubmitted && <p>Dit gavekort er blevet tilføjet! Du har indtastet beløbet {paymentState.giftCardAmount}.</p>}
           
          </div>
        </div>
        <div className="paymentdetails-wrapper">{renderContent()}</div>
      </div>
    </>
  );
}
