import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsService } from './events/events.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, EventsService],
})
export class AppModule {}
