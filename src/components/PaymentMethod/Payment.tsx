import React, { useState } from "react";

import "./style.css";

type PaymentMethod = "Card" | "MobilePay" | "GiftCard" | "Invoice";

interface PaymentState {
  amount: number;
  giftCardNumber: string | null;
  phoneNumber: string | null;
  billingAddress: {
    company?: string;
    vatNumber?: string;
  } | null;
  paymentMethod: PaymentMethod | null;
}

export default function Payment() {
  const [state, setState] = useState<PaymentState>({
    amount: 0,
    giftCardNumber: null,
    phoneNumber: null,
    billingAddress: null,
    paymentMethod: null,
  });

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(event.target.value, 10);
    setState((prevState) => ({ ...prevState, amount }));
  };

  const handleGiftCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const giftCardNumber = event.target.value;
    setState((prevState) => ({ ...prevState, giftCardNumber }));
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const phoneNumber = event.target.value;
    setState((prevState) => ({ ...prevState, phoneNumber }));
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const company = event.target.value;
    setState((prevState) => ({
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
    setState((prevState) => ({
      ...prevState,
      billingAddress: {
        ...prevState.billingAddress,
        vatNumber,
      },
    }));
  };

  const handlePaymentMethodChange = (paymentMethod: PaymentMethod) => {
    setState((prevState) => ({ ...prevState, paymentMethod }));
  };

  const canPayWithMobilePay =
    state.phoneNumber !== null && state.phoneNumber.length === 8;
  const canPayWithInvoice =
    state.billingAddress !== null && state.billingAddress.vatNumber !== "";

  const canPayWithGiftCard =
    state.giftCardNumber !== null &&
    state.amount !== null &&
    state.giftCardNumber.length > 0 &&
    state.amount.toString().length > 0;

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
    setSelectedOption("receipt");
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "card":
        return (
          <>
            <hr />
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
        return (
          <>
            <hr />
            <p>Du har valgt at betale med MobilePay.</p>
          </>
        );
      case "reciept":
        return (
          <>
            <hr />
            <p>Du har valgt at betale med Faktura.</p>
          </>
        );
      default:
        return null;
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
              checked={selectedOption === "receipt"}
              onChange={handleInvoiceChange}
            />
            <label htmlFor="payment-receipt">Faktura</label>
          </div>
        </div>
        <div className="paymentdetails-wrapper">{renderContent()}</div>

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
    </>
  );
}
