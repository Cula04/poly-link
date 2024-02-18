import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { VendingMachineProductCategory } from 'src/vending-machine-products/types';

@InputType()
export class AddVendingMachineProductInput {
  @Field(() => VendingMachineProductCategory)
  @IsNotEmpty()
  @IsEnum(VendingMachineProductCategory)
  type: VendingMachineProductCategory;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  threshold: number;

  @Field()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  currentAmount: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  change: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  currentAIAmount?: number;
}
