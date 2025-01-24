import { IsNumber, IsInt, IsBoolean, IsDate } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ChargeEntity } from "../../databases/mysql/charge.entity";

export class CreateDistributionInput {
  @IsInt()
  charge: ChargeEntity;

  @IsInt()
  user: UserEntity;

  @IsNumber()
  amount: number;

  @IsDate()
  payedAt?: Date;

  @IsBoolean()
  payed?: boolean;
}

export class UpdateDistributionInput {
  @IsInt()
  charge?: ChargeEntity;

  @IsInt()
  user?: UserEntity;

  @IsNumber()
  amount?: number;

  @IsDate()
  payedAt?: Date;

  @IsBoolean()
  payed?: boolean;
}
