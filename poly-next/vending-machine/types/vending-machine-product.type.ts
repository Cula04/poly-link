import { VendingMachineProductCategory } from './vending-machine-product-category.type';

export type VendingMachineProduct = {
  type: VendingMachineProductCategory;
  threshold: number;
  date: Date;
  change: number;
  currentAmount: number;
  currentAIAmount?: number;
};
