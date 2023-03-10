import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Query,
    Delete,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventsService } from './events.service';
import { UpdateEventDto } from './dtos/update-event.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { EventDto } from './dtos/event.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';




@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(EventDto)
    createEvent(@Body() body: CreateEventDto, @CurrentUser() user: UserEntity) {
        return this.eventsService.create(body, user);
    }

    @Get()
    findAllEvents(@Query('id') id: string) {
        return this.eventsService.find(id);
    }
    
    @Delete('/:id')
    removeEvent(@Param('id') id: string) {
        return this.eventsService.remove(parseInt(id));
    }
    
    @Patch('/:id')
    updateEvent(@Param('id') id: string, @Body() body: UpdateEventDto) {
        return this.eventsService.update(parseInt(id), body);
    }


    @Get('/:id')
    async findEvent(@Param('id') id: string) {
        const event = await this.eventsService.findOne(parseInt(id));

        if (!event) {
            throw new NotFoundException('this event not exist');
        }

        return event;
    }
}
