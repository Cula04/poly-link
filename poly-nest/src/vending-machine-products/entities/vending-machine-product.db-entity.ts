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
  date: string;

  @Column()
  currentAmount: number;

  @Column()
  lastChange: number;

  toDomainEntity?() {
    return VendingMachineProductEntity.create(
      {
        type: this.type,
        date: this.date,
        currentAmount: this.currentAmount,
        lastChange: this.lastChange,
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
      date: entity.props.date,
      currentAmount: entity.props.currentAmount,
      lastChange: entity.props.lastChange,
    };
  }
}

export const VendingMachineProductDBColumns: {
  [key in keyof VendingMachineProductDbEntity]: keyof VendingMachineProductDbEntity;
} = {
  _id: '_id',
  type: 'type',
  date: 'date',
  currentAmount: 'currentAmount',
  lastChange: 'lastChange',
};
