import { VendingMachineProductCategory } from './vending-machine-product-category.type';

export type VendingMachineProduct = {
  type: VendingMachineProductCategory;
  date: string;
  currentAmount: number;
  lastChange: number;
};
