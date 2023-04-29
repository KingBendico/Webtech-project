import React, { useState } from 'react';
import { render } from 'react-dom';


type PaymentMethod = 'Card'|'MobilePay' | 'GiftCard' | 'Invoice';

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

  const handleGiftCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const giftCardNumber = event.target.value;
    setState((prevState) => ({ ...prevState, giftCardNumber }));
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleVatNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const canPayWithMobilePay = state.phoneNumber !== null && state.phoneNumber.length === 8;
  const canPayWithInvoice = state.billingAddress !== null && state.billingAddress.vatNumber !== '';

  const canPayWithGiftCard =
    state.giftCardNumber !== null &&
    state.amount !== null &&
    state.giftCardNumber.length > 0 &&
    state.amount.toString().length > 0;

    const [giftCardChecked, setGiftCardChecked] = React.useState(false);
    const handleGiftCardChange = () => {
      setGiftCardChecked(!giftCardChecked);
    };

    const giftCardContent = giftCardChecked 
    
    ?  

    <div>
        <label htmlFor="giftCardNumber">Gavekortkode:</label>
        <input id="giftCardNumber" type="string" onChange={handleGiftCardNumberChange} />
      

    <div>
        <label htmlFor="amount">Beløb:</label>
        <input id="amount" type="number" onChange={handleAmountChange} />
      </div>
      
      </div>

      
    : null;


  return (
    <>
   
      <h1>Betaling</h1>

      <hr />
      <p>
      Vælg betalingsmetode:
      </p>
      <div>
        <label>
          <input type="radio" name="myRadio" value="Kort" />
          Kort
        </label>
        </div>
        
        <div>
        <label>
          <input type="radio"    
          name="myRadio" value="MobilePay" />    
          MobilePay
        </label>
        </div>

        <div>
        <label>
          <input type="radio" name="myRadio" value="Faktura" />
          Faktura
        </label>
        </div>
      
  
      

      <div>
        <label>
          <input 
          type="checkbox"
          checked={giftCardChecked}
          onChange={handleGiftCardChange} 
          />
            Brug gavekort
         {giftCardContent}
          </label>
         
        </div>
        
        </>
  );
}
