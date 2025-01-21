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
  ownerName: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsInt()
  ownerId: number;

  @Expose()
  @IsArray()
  roommates: UserPresenter[];

  @Expose()
  @IsOptional()
  chief?: UserPresenter;
}
