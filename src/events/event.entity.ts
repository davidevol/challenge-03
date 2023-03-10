import { userInfo } from 'os';
import { UserEntity } from 'src/users/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';

@Entity()
export class EventEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    description: string;

    @Column()
    userId: string;

    @Column()
    dateTime: string;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column()
    @CreateDateColumn()
    createdAt: string;

    @ManyToOne(() => UserEntity, (user) => user.events)
    user: UserEntity;
}
