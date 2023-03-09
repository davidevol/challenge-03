import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('handles a signup request', async () => {
        const res = await request(app.getHttpServer())
            .post('/users/signup')
            .send({
                firstName: 'Name',
                lastName: 'lastName',
                birthDate: '20-02-2000',
                city: 'SP',
                country: 'Brazil',
                email: 'user@email2023.io',
                password: 'user@11111',
                confirmPassword: 'user@11111',
            })
            .expect(201);
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
    });

    it('signup as a new user then get the currently logged in user', async () => {
        const email = 'user@email2023.io';

        const res = await request(app.getHttpServer())
            .post('/users/signin')
            .send({ email, password: 'user@11111' })
            .expect(201);

        const cookie = res.get('Set-Cookie');

        const { body } = await request(app.getHttpServer())
            .get('/users/me')
            .set('Cookie', cookie)
            .expect(200);

        expect(body.email).toEqual(email);
    });
});
