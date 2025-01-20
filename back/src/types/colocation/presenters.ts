import { Expose } from "class-transformer";
import { IsNumber, IsString, IsInt } from "class-validator";

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
}
