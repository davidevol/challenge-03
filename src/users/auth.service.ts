import { Injectable, BadRequestException } from '@nestjs/common';
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
        const _password = salt + '.' + hash.toString('hex');

        // new user
        const user = await this.usersService.create(
            firstName,
            lastName,
            birthDate,
            city,
            country,
            email,
            _password,
            _password,
        );

        return user;
    }

    signin() {}
}
