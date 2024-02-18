import { BaseEntity } from 'src/common/base-classes/base.entity';
import { VendingMachineProduct } from '../types/vending-machine-product.type';

export class VendingMachineProductEntity extends BaseEntity<VendingMachineProduct> {
  private constructor(props: VendingMachineProduct, id?: string) {
    super(props, id);
  }

  public static create(
    props: VendingMachineProduct,
    id?: string,
  ): VendingMachineProductEntity {
    return new VendingMachineProductEntity(props, id);
  }

  get id() {
    return this._id;
  }

  get type() {
    return this.props.type;
  }

  get threshold() {
    return this.props.threshold;
  }

  get date() {
    return this.props.date;
  }

  get currentAmount() {
    return this.props.currentAmount;
  }

  get change() {
    return this.props.change;
  }

  get currentAIAmount() {
    return this.props.currentAIAmount;
  }
}
