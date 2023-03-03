import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsService } from './events/events.service';
import { EventsModule } from './events/events.module';
import { UserEntity } from './users/user.entity';
import { EventEntity } from './events/event.entity';

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
    providers: [AppService, EventsService],
})
export class AppModule {}
