import { ChargeEntity } from "../../databases/mysql/charge.entity";
import { Expose } from "class-transformer";

import { ChargeUserPresenter, UserPresenter } from "../user/presenters";
import { ChargeColocationPresenter, ColocationPresenter } from "../colocation/presenters";
import { DistributionPresenter } from "../distribution/presenter";

export class ChargePresenter {
  @Expose()
  id: number;

  @Expose()
  type: string;

  @Expose()
  amount: number;

  @Expose()
  payer: ChargeUserPresenter;

  @Expose()
  colocation: ChargeColocationPresenter;

  @Expose()
  date: Date;

  @Expose()
  payed: boolean;

  @Expose()  
  distributions?: DistributionPresenter[]; 

  constructor(charge: ChargeEntity) {
    Object.assign(this, charge);
  }
}
