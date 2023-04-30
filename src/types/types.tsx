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

interface CustomerInfo {
  country: string;
  zipCode: string;
  city: string;
  adress: string;
  phoneNr: string;
  name: string;
  email: string;
  companyName: string;
  vatNumber: string;
  toc: boolean;
  marketingEmails: boolean;
  prefs: string;
}

interface BillingAddress {
  company: string;
  vatNumber: string;
}

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

export type { Item, CustomerInfo, PaymentState, PaymentMethod, BillingAddress };
