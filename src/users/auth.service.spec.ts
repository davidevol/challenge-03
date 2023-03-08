import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (
                firstName: string,
                lastName: string,
                birthDate: string,
                city: string,
                country: string,
                email: string,
                password: string,
                confirmPassword: string,
            ) =>
                Promise.resolve({
                    id: 1,
                    email,
                    password,
                    firstName,
                    lastName,
                    birthDate,
                    city,
                    country,
                    confirmPassword,
                } as UserEntity),
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

    it('creates a new user with salt and hash password', async () => {
        const user = await service.signup(
            'NAME',
            'LAST NAME',
            '29-01-1000',
            'SP',
            'BRASIL',
            'asfasd@email.com',
            'asdf',
            'asdf',
        );

        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');

        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
        fakeUsersService.find = () =>
            Promise.resolve([
                { id: 1, email: 'a', password: '1' } as UserEntity,
            ]);
        await expect(
            service.signup(
                'NAME',
                'LAST NAME',
                '29-01-1000',
                'SP',
                'BRASIL',
                'asfasd@email.com',
                'asdf',
                'asdf',
            ),
        ).rejects.toThrow(BadRequestException);
    });
});
