import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';

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
    createdAt: string;

    @AfterInsert()
    createdDate() {
        this.createdAt = Date();
    }
}
