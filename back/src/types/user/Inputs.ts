import { Expose } from "class-transformer";
import { IsString, IsInt, Min, IsArray, IsBoolean } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";
import { DistributionEntity } from "../../databases/mysql/distribution.entity";

export class userToCreateInput {
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
  @IsString()
  password_hash: UserEntity['password_hash'];

  @Expose()
  @IsInt()
  @Min(18)
  age: number;

  @Expose()
  @IsBoolean()
  isAdmin: boolean = false;
}