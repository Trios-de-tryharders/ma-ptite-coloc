import { Expose } from "class-transformer";
import { UserEntity } from "../../databases/mysql/user.entity";
import { IsString, IsInt, Min, IsOptional, IsArray } from "class-validator";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";

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

  @IsOptional()
  @Expose()
  @IsArray()
  ownedColocations: ColocationEntity[];
}

export class UserToModifyDTO {
  @Expose()
  @IsOptional()
  @IsInt()
  id?: number;

  @Expose()
  @IsOptional()
  @IsString()
  firstname?: UserEntity['firstname'];

  @Expose()
  @IsOptional()
  @IsString()
  lastname?: string;

  @Expose()
  @IsOptional()
  @IsString()
  email?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  @Min(18)
  age?: number;

  @Expose()
  @IsOptional()
  @IsArray()
  ownedColocations?: ColocationEntity[];
}

export class SearchUserCriteriaDTO {
  @Expose()
  @IsOptional()
  @IsInt()
  id?: number;

  @Expose()
  @IsOptional()
  @IsString()
  firstname?: UserEntity['firstname'];

  @IsOptional()
  @Expose()
  @IsString()
  lastname?: string;

  @IsOptional()
  @Expose()
  @IsString()
  email?: string;

  @IsOptional()
  @IsInt()
  @Expose()
  @Min(18)
  age?: number;

  @IsOptional()
  @IsArray()
  @Expose()
  ownedColocations?: ColocationEntity[];
}