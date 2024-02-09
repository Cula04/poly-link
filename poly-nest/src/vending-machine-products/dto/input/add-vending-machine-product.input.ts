import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { VendingMachineProductCategory } from 'src/vending-machine-products/types';

@InputType()
export class AddVendingMachineProductInput {
  @Field(() => VendingMachineProductCategory)
  @IsNotEmpty()
  @IsEnum(VendingMachineProductCategory)
  type: VendingMachineProductCategory;

  @Field()
  @IsNotEmpty()
  date: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  currentAmount: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  lastChange: number;
}
