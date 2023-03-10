import { Expose, Transform } from 'class-transformer';
import { UserEntity } from '../../users/user.entity';

export class EventDto {

    @Expose()
    id: number;

    @Expose()
    description: string;

    /* @Expose()
    userId: string; */

    @Expose()
    dateTime: string;

    @Expose()
    lng: number;

    @Expose()
    lat: number;

    @Expose()
    createdAt: string;

    @Transform( ({ obj }) => obj.user.id)
    @Expose()
    userId: UserEntity;
}
