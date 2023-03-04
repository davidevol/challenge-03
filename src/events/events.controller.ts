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
} from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventsService } from './events.service';
import { UpdateEventDto } from './dtos/update-event.dto';

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

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

    @Post()
    createEvent(@Body() body: CreateEventDto) {
        this.eventsService.create(
            body.description,
            body.userId,
            body.dateTime,
            body.createdAt,
        );
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
