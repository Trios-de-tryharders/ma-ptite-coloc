import { Expose } from "class-transformer";
import { IsNumber, IsString, IsInt, IsArray, IsOptional } from "class-validator";
import { UserPresenter } from "../user/presenters";

export class ColocationPresenter {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  location: string;

  @Expose()
  @IsNumber()
  area: number;

  @Expose()
  @IsInt()
  numberOfRooms: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  owner: UserPresenter;

  @Expose()
  @IsArray()
  roommates: UserPresenter[];

  @Expose()
  @IsOptional()
  chief?: UserPresenter;
}

export class ChargeColocationPresenter {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;
}
