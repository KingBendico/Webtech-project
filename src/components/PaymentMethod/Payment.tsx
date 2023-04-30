import React, { useState } from "react";
import { useCustomer } from "../../context/UserContext";

import "./style.css";
import { usePayment } from "../../context/PaymentContext";
import { PaymentMethod } from "../../types/types";


export default function Payment() {
  const {paymentState, setPaymentState} = usePayment();
  const {customerInfo, setCustomerInfo } = useCustomer();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(event.target.value, 10);
    setPaymentState((prevState) => ({ ...prevState, amount }));
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

  const canPayWithGiftCard =
    paymentState.giftCardNumber !== null &&
    paymentState.amount !== null &&
    paymentState.giftCardNumber.length > 0 &&
    paymentState.amount.toString().length > 0;

  const [giftCardChecked, setGiftCardChecked] = React.useState(false);
  const handleGiftCardChange = () => {
    setGiftCardChecked(!giftCardChecked);
  };

  const giftCardContent = giftCardChecked ? (
    <div>
      <div className="input-grid">
        <label htmlFor="giftCardNumber">Gavekortkode:</label>
        <input
          id="giftCardNumber"
          type="string"
          onChange={handleGiftCardNumberChange}
        />
      </div>
      <div className="input-grid">
        <label htmlFor="amount">Beløb:</label>
        <input id="amount" type="number" onChange={handleAmountChange} />
      </div>
    </div>
  ) : null;

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = () => {
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
            <form onSubmit={handleSubmit}>
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
        );} else {

          return (
            <>
              <p>Du kan ikke betale med MobilePay, da du ikke har indtastet et telefonnummer under leveringsoplysninger</p>
            </>
          );
        }
      case "invoice":
        return (
          <>
            <p>Du har valgt at betale med Faktura.</p>
          </>
        );
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
          </div>
        </div>
        <div className="paymentdetails-wrapper">{renderContent()}</div>
      </div>
    </>
  );
}
