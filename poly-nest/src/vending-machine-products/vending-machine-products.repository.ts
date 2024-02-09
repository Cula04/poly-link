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

  async getVendingMachineProducts(
    productType: VendingMachineProductCategory,
  ): Promise<VendingMachineProductEntity[]> {
    const dbEntities = await this.vendingMachineProductTableRepo.find({
      where: { type: productType },
    });
    console.log('dbEntities', dbEntities);
    return dbEntities.map((dbEntity) => dbEntity.toDomainEntity());
  }

  async addVendingMachineProduct(
    product: VendingMachineProductEntity,
  ): Promise<VendingMachineProductEntity> {
    const dbEntity = VendingMachineProductDbEntity.fromDomainEntity(product);
    console.log('dbEntity', dbEntity);
    const res = await this.vendingMachineProductTableRepo.save(dbEntity);
    console.log('res', res);
    return product;
  }
}
