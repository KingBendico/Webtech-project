import React, { useState } from "react";
import { useCustomer } from "../../context/UserContext";
import "./style.css";
import { usePayment } from "../../context/PaymentContext";
import { PaymentMethod } from "../../types/types";



export default function Payment() {
  const {paymentState, setPaymentState} = usePayment();
  const {customerInfo, setCustomerInfo } = useCustomer();

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

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const phoneNumber = event.target.value;
    setPaymentState((prevState) => ({ ...prevState, phoneNumber }));
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const company = event.target.value;
    setPaymentState((prevState) => ({
      ...prevState,
      billingAddress: {
        ...prevState.billingAddress,
        company,
      },
    }));
  };

  const handleVatNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const vatNumber = event.target.value;
    setPaymentState((prevState) => ({
      ...prevState,
      billingAddress: {
        ...prevState.billingAddress,
        vatNumber,
      },
    }));
  };

  const handlePaymentMethodChange = (paymentMethod: PaymentMethod) => {
    setPaymentState((prevState) => ({ ...prevState, paymentMethod }));
  };

  const canPayWithMobilePay =
    paymentState.phoneNumber !== null && paymentState.phoneNumber.length === 8;
  const canPayWithInvoice =
    paymentState.billingAddress !== null && paymentState.billingAddress.vatNumber !== "";


  const [giftCardCode, setGiftCardCode] = useState("");
  const [giftCardAmount, setGiftCardAmount] = useState("");

  const canPayWithGiftCard =
    paymentState.giftCardNumber !== null &&
    paymentState.amount !== null &&
    paymentState.giftCardNumber.length > 0 &&
    paymentState.amount.toString().length > 0;

    // const canPayWithGiftCard =
    // giftCardCode !== null &&
    // giftCardAmount !== null &&
    // giftCardCode.length > 0 &&
    // giftCardAmount.toString().length > 0;



const [giftCardsubmitted, setGiftCardSubmitted] = useState(false);
const handleGiftCardSubmit = (event:any) => {
         event.preventDefault();

         if (canPayWithGiftCard) {
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
