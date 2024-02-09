import { Injectable } from '@nestjs/common';
import { VendingMachineProductEntity } from './entities';
import { VendingMachineProduct } from './types';
import { VendingMachineProductCategory } from './types/vending-machine-product-category.type';
import { VendingMachineProductsRepository } from './vending-machine-products.repository';

@Injectable({})
export class VendingMachineProductsService {
  constructor(
    private readonly vendingMachineProductsRepository: VendingMachineProductsRepository,
  ) {}

  async getVendingMachineProducts(
    productType: VendingMachineProductCategory,
  ): Promise<VendingMachineProduct[]> {
    const entity =
      await this.vendingMachineProductsRepository.getVendingMachineProducts(
        productType,
      );
    return entity.map((e) => e.props);
  }

  async addVendingMachineProduct(
    product: VendingMachineProductEntity,
  ): Promise<VendingMachineProduct> {
    const entity =
      await this.vendingMachineProductsRepository.addVendingMachineProduct(
        product,
      );
    return entity.props;
  }
}
