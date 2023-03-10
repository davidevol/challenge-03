import { EventEntity } from 'src/events/event.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthDate: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    confirmPassword: string;

    @OneToMany(() => EventEntity, (event) => event.userId)
    events: EventEntity[];
}
