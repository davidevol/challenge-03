import { Injectable, NotFoundException } from '@nestjs/common';
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

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }
    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: number, attrs: Partial<UserEntity>) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('user not exist');
        }

        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('user not exist');
        }

        return this.repo.remove(user);
    }
}
