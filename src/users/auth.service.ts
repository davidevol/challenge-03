import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(
        firstName: string,
        lastName: string,
        birthDate: string,
        city: string,
        country: string,
        email: string,
        password: string,
        confirmPassword: string,
    ) {
        const users = await this.usersService.find(email);

        if (users.length) {
            throw new BadRequestException('email in use');
        }

        if (confirmPassword !== password) {
            throw new BadRequestException('please confirm your password');
        }

        // Generate a password
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 16)) as Buffer;
        const realPassword = salt + '.' + hash.toString('hex');

        // new user
        const user = await this.usersService.create(
            firstName,
            lastName,
            birthDate,
            city,
            country,
            email,
            realPassword,
            realPassword,
        );

        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('this user not exist');
        }

        const [salt, realPassword] = user.password.split('.');

        const attempt = (await scrypt(password, salt, 16)) as Buffer;

        if (realPassword !== attempt.toString('hex')) {
            throw new BadRequestException('this is not the correct password');
        }

        return user;
    }
}
