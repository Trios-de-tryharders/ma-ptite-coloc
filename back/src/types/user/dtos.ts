import { Expose } from "class-transformer";
import { UserEntity } from "../../databases/mysql/user.entity";
import { IsString, IsInt, Min, IsOptional } from "class-validator";

export class UserToCreateDTO {
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
  password: string;

  @Expose()
  @IsInt()
  @Min(18)
  age: number;
}

export class SearchUserCriteriaDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  firstname?: UserEntity['firstname'];

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsInt()
  @Min(18)
  age?: number;
}