import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity()
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    userId: string;

    @Column()
    dateTime: string;

    @Column()
    @CreateDateColumn()
    createdAt: string;
}
