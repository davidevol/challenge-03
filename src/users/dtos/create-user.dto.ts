import { IsEmail, IsString, IsAlpha, } from 'class-validator';

export class CreateUserDto {
    @IsAlpha()
    firstName: string;

    @IsAlpha()
    lastName: string;

    birthDate: string;

    @IsString()
    city: string;

    @IsString()
    country: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;
}
