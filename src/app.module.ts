import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { UserEntity } from './users/user.entity';
import { EventEntity } from './events/event.entity';



const cookieSession = require('cookie-session');

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [UserEntity, EventEntity],
            synchronize: true,
        }),
        UsersModule,
        EventsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
            }),
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    keys: ['some-key'],
                }),
            )
            .forRoutes('*');
    }
}