import { Expose } from "class-transformer";
import { IsString, IsNumber, IsInt, IsOptional, IsArray } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

export class ColocationToCreateDTO {
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
  ownerId: UserEntity['id'];

  @Expose()
  @IsArray()
  @IsOptional()
  roommates: UserEntity[];
}

export class ColocationToModifyDTO {
  @Expose()
  @IsOptional()
  @IsString()
  location?: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  area?: number;

  @Expose()
  @IsOptional()
  @IsInt()
  numberOfRooms?: number;

  @Expose()
  @IsOptional()
  @IsString()
  ownerName?: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  ownerId?: UserEntity['id'];

  @Expose()
  @IsOptional()
  @IsArray()
  roommates?: UserEntity[];
}

export class SearchColocationCriteriaDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  area?: number;

  @IsOptional()
  @IsInt()
  numberOfRooms?: number;

  @IsOptional()
  @IsString()
  ownerName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  ownerId?: UserEntity['id'];

  @IsOptional()
  @IsArray()
  roommates?: UserEntity[];
}
