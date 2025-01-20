import { Expose } from "class-transformer";
import { IsString, IsInt, IsNumber } from "class-validator";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";

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
}