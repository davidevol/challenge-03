import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    ) {}

    create(
        firstName: string,
        lastName: string,
        birthDate: string,
        city: string,
        country: string,
        email: string,
        password: string,
        confirmPassword: string,
    ) {
        const user = this.repo.create({
            firstName,
            lastName,
            birthDate,
            city,
            country,
            email,
            password,
            confirmPassword,
        });
        return this.repo.save(user);
    }
}
