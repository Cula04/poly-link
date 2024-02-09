import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { VendingMachineProductCategory } from 'src/vending-machine-products/types';

@InputType()
export class GetVendingMachineProductArgs {
  @Field(() => VendingMachineProductCategory)
  @IsNotEmpty()
  @IsEnum(VendingMachineProductCategory)
  type: VendingMachineProductCategory;
}
