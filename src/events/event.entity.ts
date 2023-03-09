import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
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
}
