import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity)
        private repo: Repository<EventEntity>,
    ) {}

    create(eventDto: CreateEventDto, user: UserEntity) {
        const event = this.repo.create(eventDto);
        event.user = user
        return this.repo.save(event);
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }
    find(userId: string) {
        return this.repo.find({ where: { userId } });
    }

    async update(id: number, attrs: Partial<EventEntity>) {
        const event = await this.findOne(id);

        if (!event) {
            throw new NotFoundException('this event not exist');
        }

        Object.assign(event, attrs);
        return this.repo.save(event);
    }

    async remove(id: number) {
        const event = await this.findOne(id);

        if (!event) {
            throw new NotFoundException('this event not exist');
        }

        return this.repo.remove(event);
    }
}
