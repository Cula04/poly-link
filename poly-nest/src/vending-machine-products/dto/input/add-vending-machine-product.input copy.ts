import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { VendingMachineProductCategory } from 'src/vending-machine-products/types';

@InputType()
export class PrefillDBWithNoAIDataInput {
  @Field(() => VendingMachineProductCategory, { nullable: true })
  @IsEnum(VendingMachineProductCategory)
  @IsOptional()
  type?: VendingMachineProductCategory;

  @Field()
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
