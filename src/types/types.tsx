interface Item {
  name: string;
  quantity: number;
  price: number;
  id: string;
  isGiftWrapped: boolean;
  recurringSchedule: string;
  rebateQuantity: number;
  rebatePercent: number;
  upsellProductId: any;
  currency: string;
}

interface customerInfo {
  country: string,
  zipCode: string,
  city: string,
  adress: string,
  phoneNr: string,
  name: string,
  email: string,
  companyName: string,
  vatNumber: string,
  toc: boolean,
  marketingEmails: boolean,
  prefs: string
}

interface BillingAddress {
  company: string;
  vatNumber: string;
}

interface PaymentState {
  amount: number;
  giftCardNumber: number | null;
  phoneNumber: number | null;
  billingAddress: BillingAddress | null;
  paymentMethod: 'MobilePay' | 'GiftCard' | 'Invoice' | null;
}

export type { Item, customerInfo, PaymentState, BillingAddress };
