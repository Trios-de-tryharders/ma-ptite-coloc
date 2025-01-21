import { Expose } from "class-transformer";
import { IsString, IsInt, IsNumber, IsArray, IsOptional } from "class-validator";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";
import { UserEntity } from "../../databases/mysql/user.entity";

export class colocationToCreateInput {
  @Expose()
  @IsString()
  location: ColocationEntity['location'];

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
  ownerId: UserEntity['id'];

  @Expose()
  @IsArray()
  roommates: UserEntity[];

  @Expose()
  @IsOptional()
  chief?: UserEntity;
}