import { Expose, Type } from "class-transformer";
import { DistributionUserPresenter } from "../user/presenters";
import { ChargePresenter } from "../charge/presenter";

export class DistributionPresenter {
  @Expose()
  id: number;

  @Expose()
  @Type(() => ChargePresenter)
  charge: ChargePresenter;

  @Expose()
  user: DistributionUserPresenter;

  @Expose()
  amount: number;
}
