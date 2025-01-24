import { Expose } from "class-transformer";
import { IsString, IsNumber, IsInt, IsOptional, IsArray, IsBoolean } from "class-validator";
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
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsInt()
  owner: UserEntity;
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
  name?: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  owner?: UserEntity;

  @Expose()
  @IsOptional()
  @IsArray()
  roommates?: UserEntity[];

  @Expose()
  @IsOptional()
  chief?: UserEntity;
}

export class SearchColocationCriteriaDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @Expose()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

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
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  owner?: UserEntity;

  @IsOptional()
  @IsArray()
  roommates?: UserEntity[];
}
