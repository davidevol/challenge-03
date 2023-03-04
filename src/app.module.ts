import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
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
})
export class AppModule {}
