import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { VendingMachineProductCategory } from 'src/vending-machine-products/types';

@InputType()
export class GetVendingMachineProductArgs {
  @Field(() => VendingMachineProductCategory, { nullable: true })
  @IsEnum(VendingMachineProductCategory)
  @IsOptional()
  type?: VendingMachineProductCategory;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  threshold?: number;
}
