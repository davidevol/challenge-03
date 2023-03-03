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
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

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

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));

        if (!user) {
            throw new NotFoundException('user not exist');
        }

        return user;
    }

    @Get('/:id')
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
