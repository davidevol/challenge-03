import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(
            body.firstName,
            body.lastName,
            body.birthDate,
            body.city,
            body.country,
            body.email,
            body.password,
            body.confirmPassword,
        );
        console.log(body);
    }
}
