import { Expose } from "class-transformer";
import { IsString, IsNumber, IsInt, IsOptional } from "class-validator";

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
}
