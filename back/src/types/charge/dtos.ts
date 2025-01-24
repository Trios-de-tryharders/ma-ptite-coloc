import { Expose, Transform } from "class-transformer";
import { IsString, IsNumber, IsInt, IsOptional, Min, IsDate, IsBoolean } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";
import { DistributionEntity } from "../../databases/mysql/distribution.entity";

export class ChargeToCreateDTO {
  @Expose()
  @IsString()
  type: string;

  @Expose()
  @IsNumber()
  @Min(0)
  amount: number;

  @Expose()
  @IsInt()
  payer: UserEntity;

  @Expose()
  @IsInt()
  colocation: ColocationEntity;

  @Expose()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  date: Date;

  @Expose()
  @IsOptional()
  @IsBoolean()
  payed: boolean;
}

export class SearchChargeCriteriaDTO {
  @IsOptional()
  @IsNumber()
  @Expose()
  id?: number;

  @IsOptional()
  @IsString()
  @Expose()
  type?: string;

  @IsOptional()
  @IsInt()
  @Expose()
  payer?: UserEntity;

  @IsOptional()
  @IsInt()
  @Expose()
  colocation?: ColocationEntity;
  
  @Expose()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : value), { toClassOnly: true })
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsBoolean()
  @Expose()
  payed?: boolean;

  @Expose()
  @IsOptional()
  distributions?: DistributionEntity[]; 
}

export class ChargeToUpdateDTO {
  @IsOptional()
  @IsNumber()
  @Expose()
  id?: number;

  @IsOptional()
  @IsString()
  @Expose()
  type?: string;

  @IsOptional()
  @IsInt()
  @Expose()
  payer?: UserEntity;

  @IsOptional()
  @IsInt()
  @Expose()
  colocation?: ColocationEntity;
  
  @Expose()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : value), { toClassOnly: true })
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsBoolean()
  @Expose()
  payed?: boolean;

  @Expose()
  @IsOptional()
  distributions?: DistributionEntity[]; 
}