import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetVendingMachineProductArgs } from './dto/args/get-vending-machine-product.args';
import { AddVendingMachineProductInput } from './dto/input/add-vending-machine-product.input';
import { VendingMachineProductEntity } from './entities';
import { VendingMachineProductGQLEntity } from './entities/vending-machine-product.gql-entity';
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
    console.log('getVendingMachineProductArgs', getVendingMachineProductArgs);
    const aaa =
      await this.vendingMachineProductsService.getVendingMachineProducts(
        getVendingMachineProductArgs.type,
      );
    console.log('aaa', aaa);
    return aaa;
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
}
