import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
    @IsString()
    description: string;

    @IsNumber()
    userId: string;

    @IsString()
    dateTime: string;

    @IsOptional()
    createdAt: string;
}
