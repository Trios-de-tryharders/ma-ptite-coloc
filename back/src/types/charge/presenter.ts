import { ChargeEntity } from "../../databases/mysql/charge.entity";
import { Expose, Transform } from "class-transformer";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";
import { UserPresenter } from "../user/presenters";
import { ColocationPresenter } from "../colocation/presenters";

export class ChargePresenter {
  @Expose()
  id: number;

  @Expose()
  type: string;

  @Expose()
  amount: number;

  @Expose()
  payer: UserPresenter;

  @Expose()
  colocation: ColocationPresenter;

  @Expose()
  date: Date;

  @Expose()
  payed: boolean;

  constructor(charge: ChargeEntity) {
    Object.assign(this, charge);
  }
}
