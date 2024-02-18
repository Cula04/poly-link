import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { VendingMachineProductCategory } from '../types/vending-machine-product-category.type';
import { VendingMachineProduct } from '../types/vending-machine-product.type';
import { VendingMachineProductEntity } from './vending-machine-product.entity';

@Entity({ name: 'vending_machine_product' })
export class VendingMachineProductDbEntity implements VendingMachineProduct {
  @ObjectIdColumn()
  _id: string;

  @Column({ type: 'enum', enum: VendingMachineProductCategory })
  type: VendingMachineProductCategory;

  @Column()
  threshold: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  currentAmount: number;

  @Column({ nullable: true })
  currentAIAmount?: number;

  @Column()
  change: number;

  toDomainEntity?() {
    return VendingMachineProductEntity.create(
      {
        type: this.type,
        threshold: this.threshold,
        date: this.date,
        currentAmount: this.currentAmount,
        currentAIAmount: this.currentAIAmount,
        change: this.change,
      },
      this._id,
    );
  }

  static fromDomainEntity(
    entity: VendingMachineProductEntity,
  ): VendingMachineProductDbEntity {
    return {
      _id: entity.id,
      type: entity.props.type,
      threshold: entity.props.threshold,
      date: entity.props.date,
      currentAmount: entity.props.currentAmount,
      currentAIAmount: entity.props.currentAIAmount,
      change: entity.props.change,
    };
  }
}

export const VendingMachineProductDBColumns: {
  [key in keyof VendingMachineProductDbEntity]: keyof VendingMachineProductDbEntity;
} = {
  _id: '_id',
  type: 'type',
  threshold: 'threshold',
  date: 'date',
  currentAmount: 'currentAmount',
  currentAIAmount: 'currentAIAmount',
  change: 'change',
};
