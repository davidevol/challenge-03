import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const crypto = require('crypto');

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: UserEntity[] = [];
        let uuid = crypto.randomUUID();
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(
                    (user) => user.email === email,
                );
                return Promise.resolve(filteredUsers);
            },
            create: (
                firstName: string,
                lastName: string,
                birthDate: string,
                city: string,
                country: string,
                email: string,
                password: string,
                confirmPassword: string,
            ) => {
                const user = {
                    id: parseInt(uuid),
                    firstName,
                    lastName,
                    birthDate,
                    city,
                    country,
                    email,
                    password,
                    confirmPassword,
                } as UserEntity;
                users.push(user);
                return Promise.resolve(user);
            },
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup(
            'NAME',
            'LAST NAME',
            '29-01-1000',
            'SP',
            'BRASIL',
            'test@email.com',
            'asdf',
            'asdf',
        );

        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
        await service.signup(
            'NAME',
            'LAST NAME',
            '29-01-1000',
            'SP',
            'BRASIL',
            'test@email.com',
            'asdf',
            'asdf',
        );
        await expect(
            service.signup(
                'NAME',
                'LAST NAME',
                '29-01-1000',
                'SP',
                'BRASIL',
                'test@email.com',
                'asdf',
                'asdf',
            ),
        ).rejects.toThrow(BadRequestException);
    });

    it('throws if signin is called with an unused email', async () => {
        await expect(
            service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
        ).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        await service.signup(
            'NAME',
            'LAST NAME',
            '29-01-1000',
            'SP',
            'BRASIL',
            'test@email.com',
            'asdf',
            'asdf',
        );
        await expect(
            service.signin('test@email.com', 'wrongPass'),
        ).rejects.toThrow(BadRequestException);
    });
});
