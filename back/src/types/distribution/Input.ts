import { IsNumber, IsInt } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ChargeEntity } from "../../databases/mysql/charge.entity";

export class CreateDistributionInput {
  @IsInt()
  charge: ChargeEntity;

  @IsInt()
  user: UserEntity;

  @IsNumber()
  amount: number;
}

export class UpdateDistributionInput {
  @IsInt()
  charge?: ChargeEntity;

  @IsInt()
  user?: UserEntity;

  @IsNumber()
  amount?: number;
}
