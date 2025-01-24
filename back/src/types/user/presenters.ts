import { Expose } from "class-transformer";
import { IsNumber, IsString, IsInt, Min } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";


export class UserPresenter {
  @Expose()
  @IsNumber()
  id: UserEntity['id'];

  @Expose()
  @IsString()
  firstname: UserEntity['firstname'];

  @Expose()
  @IsString()
  lastname: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsInt()
  @Min(18)
  age: number;
}


export class DistributionUserPresenter {
  @Expose()
  @IsNumber()
  id: UserEntity['id'];

  @Expose()
  @IsString()
  firstname: UserEntity['firstname'];

  @Expose()
  @IsString()
  lastname: string;

  @Expose()
  @IsString()
  email: string;
}

export class ChargeUserPresenter {
  @Expose()
  @IsNumber()
  id: UserEntity['id'];

  @Expose()
  @IsString()
  firstname: UserEntity['firstname'];

  @Expose()
  @IsString()
  lastname: string;

  @Expose()
  @IsString()
  email: string;
}