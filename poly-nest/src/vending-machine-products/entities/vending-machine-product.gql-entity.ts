import { Field, Int, ObjectType } from '@nestjs/graphql';
import { VendingMachineProduct } from '../types';
import { VendingMachineProductCategory } from '../types/vending-machine-product-category.type';

@ObjectType()
export class VendingMachineProductGQLEntity implements VendingMachineProduct {
  @Field(() => VendingMachineProductCategory)
  type: VendingMachineProductCategory;

  @Field(() => Int)
  threshold: number;

  @Field()
  date: Date;

  @Field(() => Int)
  currentAmount: number;

  @Field(() => Int)
  change: number;

  @Field(() => Int, { nullable: true })
  currentAIAmount?: number;
}
