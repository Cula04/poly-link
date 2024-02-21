import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { registerEnumType } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendingMachineProductDbEntity } from './entities/vending-machine-product.db-entity';
import { VendingMachineProductCategory } from './types/vending-machine-product-category.type';
import { VendingMachineProductsRepository } from './vending-machine-products.repository';
import { VendingMachineProductsResolver } from './vending-machine-products.resolver';
import { VendingMachineProductsService } from './vending-machine-products.service';

registerEnumType(VendingMachineProductCategory, {
  name: 'VendingMachineProductType',
});

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([VendingMachineProductDbEntity]),
  ],
  providers: [
    VendingMachineProductsResolver,
    VendingMachineProductsService,
    VendingMachineProductsRepository,
    VendingMachineProductDbEntity,
  ],
  exports: [VendingMachineProductDbEntity],
})
export class VendingMachineProductsModule {}
