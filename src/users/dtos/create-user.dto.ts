import { IsEmail, IsString, IsAlpha, IsOptional} from 'class-validator';

export class CreateUserDto {
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
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    confirmPassword: string;
}
