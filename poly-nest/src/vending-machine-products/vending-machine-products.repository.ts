import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendingMachineProductDbEntity } from './entities/vending-machine-product.db-entity';
import { VendingMachineProductEntity } from './entities/vending-machine-product.entity';
import { VendingMachineProductCategory } from './types/vending-machine-product-category.type';

@Injectable({})
export class VendingMachineProductsRepository {
  constructor(
    @InjectRepository(VendingMachineProductDbEntity)
    private readonly vendingMachineProductTableRepo: Repository<VendingMachineProductDbEntity>,
  ) {}

  async cleanDatabaseForType(
    productType: VendingMachineProductCategory,
  ): Promise<void> {
    await this.vendingMachineProductTableRepo.delete({
      type: productType,
    });
  }

  async getVendingMachineProducts(
    productType: VendingMachineProductCategory,
    threshold: number,
  ): Promise<VendingMachineProductEntity[]> {
    const whereQuery = {};
    if (productType) whereQuery['type'] = productType;
    if (threshold) whereQuery['threshold'] = threshold;
    const dbEntities = await this.vendingMachineProductTableRepo.find({
      where: whereQuery,
    });
    return dbEntities.map((dbEntity) => dbEntity.toDomainEntity());
  }

  async getVendingMachineProduct(
    productType: VendingMachineProductCategory,
    threshold: number,
    date: Date,
  ): Promise<VendingMachineProductEntity | null> {
    const dbEntity = await this.vendingMachineProductTableRepo.findOne({
      where: { type: productType, threshold, date },
    });
    if (dbEntity) return dbEntity.toDomainEntity();
  }

  async addVendingMachineProduct(
    product: VendingMachineProductEntity,
  ): Promise<VendingMachineProductEntity> {
    const dbEntity = VendingMachineProductDbEntity.fromDomainEntity(product);

    await this.vendingMachineProductTableRepo.save(dbEntity);
    return product;
  }

  async addVendingMachineProducts(
    products: VendingMachineProductEntity[],
  ): Promise<VendingMachineProductEntity[]> {
    const dbEntities = products.map((product) =>
      VendingMachineProductDbEntity.fromDomainEntity(product),
    );
    await this.vendingMachineProductTableRepo.save(dbEntities);
    return products;
  }
}
