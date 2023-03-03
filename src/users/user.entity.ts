import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
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
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    confirmPassword: string;
}
