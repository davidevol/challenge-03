import {
    IsLatitude,
    IsLongitude,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateEventDto {
    @IsString()
    description: string;

    @IsNumber()
    userId: string;

    @IsString()
    dateTime: string;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;

    @IsOptional()
    createdAt: string;
}
