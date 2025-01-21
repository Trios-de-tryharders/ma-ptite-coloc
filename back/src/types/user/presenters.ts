import { Expose } from "class-transformer";
import { IsNumber, IsString, IsInt, Min, IsArray } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ColocationPresenter } from "../colocation/presenters";

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

  @Expose()
  @IsArray()
  ownedColocations: ColocationPresenter[];
}