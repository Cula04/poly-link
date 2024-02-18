import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetVendingMachineProductArgs } from './dto/args/get-vending-machine-product.args';
import { AddVendingMachineProductInput } from './dto/input/add-vending-machine-product.input';
import { PrefillDBWithNoAIDataInput } from './dto/input/add-vending-machine-product.input copy';
import { VendingMachineProductEntity } from './entities';
import { VendingMachineProductGQLEntity } from './entities/vending-machine-product.gql-entity';
import { VendingMachineProductCategory } from './types';
import { VendingMachineProductsService } from './vending-machine-products.service';

@Resolver(() => VendingMachineProductGQLEntity)
export class VendingMachineProductsResolver {
  constructor(
    private readonly vendingMachineProductsService: VendingMachineProductsService,
  ) {}

  @Query(() => [VendingMachineProductGQLEntity], {
    name: 'vendingMachineProducts',
    nullable: 'items',
  })
  async getVendingMachineProducts(
    @Args('getVendingMachineProductArgs')
    getVendingMachineProductArgs: GetVendingMachineProductArgs,
  ): Promise<VendingMachineProductGQLEntity[]> {
    const { type, threshold } = getVendingMachineProductArgs;
    if (!type && !threshold)
      throw new Error('Invalid arguments, type and/or threshold are required');
    return this.vendingMachineProductsService.getVendingMachineProducts(
      type,
      threshold,
    );
  }

  @Mutation(() => VendingMachineProductGQLEntity, {
    name: 'vendingMachineProduct',
  })
  async addVendingMachineProduct(
    @Args('product') product: AddVendingMachineProductInput,
  ): Promise<VendingMachineProductGQLEntity> {
    return this.vendingMachineProductsService.addVendingMachineProduct(
      VendingMachineProductEntity.create(product),
    );
  }

  @Mutation(() => Boolean, {
    name: 'prefillDBWithNoAIData',
  })
  async prefillDBWithNoAIData(
    @Args('prefillData') prefillData: PrefillDBWithNoAIDataInput,
  ): Promise<boolean> {
    const { date, type } = prefillData;
    const endDate = new Date();
    const productTypes = type
      ? [type]
      : Object.values(VendingMachineProductCategory);
    await this.vendingMachineProductsService.prefillDBWithNoAIData(
      date,
      endDate,
      productTypes,
    );
    return true;
  }
}
