import {
    IsString,
    IsOptional,
    IsNumber,
    IsLongitude,
    IsLatitude,
} from 'class-validator';

export class UpdateEventDto {
    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    userId: string;

    @IsNumber()
    @IsOptional()
    @IsLongitude()
    lng: number;

    @IsNumber()
    @IsOptional()
    @IsLatitude()
    lat: number;

    @IsString()
    @IsOptional()
    dateTime: string;
}
