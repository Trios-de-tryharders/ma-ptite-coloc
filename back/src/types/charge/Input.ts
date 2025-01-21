import { IsString, IsNumber, IsInt, IsDate, IsBoolean } from "class-validator";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";
import { UserEntity } from "../../databases/mysql/user.entity";

export class CreateChargeInput {
  @IsString()
  type: string;

  @IsNumber()
  amount: number;

  @IsInt()
  payer: UserEntity;

  @IsInt()
  colocation: ColocationEntity;

  @IsDate()
  date: Date;

  @IsBoolean()
  payed: boolean;
}

export class UpdateChargeInput {
  @IsString()
  type?: string;

  @IsNumber()
  amount?: number;

  @IsInt()
  payer?: UserEntity;

  @IsInt()
  colocation?: ColocationEntity;

  @IsDate()
  date?: Date;

  @IsBoolean()
  payed?: boolean;
}
