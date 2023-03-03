import { IsEmail, IsString, IsAlpha, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsAlpha()
    @IsOptional()
    firstName: string;

    @IsAlpha()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    birthDate: string;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    country: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    confirmPassword: string;
}
