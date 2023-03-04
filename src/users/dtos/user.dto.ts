import { Expose} from 'class-transformer';

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    birthDate: string;

    @Expose()
    city: string;

    @Expose()
    country: string;

    @Expose()
    email: string;
}