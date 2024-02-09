import { Field, Int, ObjectType } from '@nestjs/graphql';
import { VendingMachineProductCategory } from '../types/vending-machine-product-category.type';
import { VendingMachineProduct } from '../types/vending-machine-product.type';

@ObjectType()
export class VendingMachineProductGQLEntity implements VendingMachineProduct {
  @Field(() => VendingMachineProductCategory)
  type: VendingMachineProductCategory;

  @Field()
  date: string;

  @Field(() => Int)
  currentAmount: number;

  @Field(() => Int)
  lastChange: number;
}
