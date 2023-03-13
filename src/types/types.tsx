interface Item {
  name: string;
  quantity: number;
  price: number;
  id: string;
  isGiftWrapped: boolean;
  recurringSchedule: string;
  rebateQuantity: number;
  rebatePercent: number;
  upsellProductId: string;
}

export type { Item };
