import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateEventDto {
    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    userId: string;

    @IsString()
    @IsOptional()
    dateTime: string;
}
