import { Expose, Transform } from "class-transformer";
import { IsNumber, IsInt, IsOptional } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ChargeEntity } from "../../databases/mysql/charge.entity";

export class DistributionToCreateDTO {
  @Expose()
  @IsInt()
  charge: ChargeEntity;

  @Expose()
  @IsInt()
  user: UserEntity;

  @Expose()
  @IsNumber()
  amount: number;
}

export class SearchDistributionCriteriaDTO {
  @IsOptional()
  @IsInt()
  @Expose()
  id?: number;

  @IsOptional()
  @IsInt()
  @Expose()
  charge?: ChargeEntity;

  @IsOptional()
  @IsInt()
  @Expose()
  user?: UserEntity;

  @IsOptional()
  @IsNumber()
  @Expose()
  amount?: number;
}

export class DistributionToUpdateDTO {
  @IsOptional()
  @IsInt()
  @Expose()
  charge?: ChargeEntity;

  @IsOptional()
  @IsInt()
  @Expose()
  user?: UserEntity;

  @IsOptional()
  @IsNumber()
  @Expose()
  amount?: number;
}
