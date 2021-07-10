import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  // UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryAnswers } from '../../constants';
import { UserNotFoundError } from './errors/user-not-found.error';
import { JwtLoginGuard } from '../login/jwt-login.guard';

@Controller('users')
@UseGuards(JwtLoginGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string
  ): Promise<User> {
    const user = await this.userService.update(id, updateUserDto);
    if (user === QueryAnswers.NOT_FOUND) {
      throw new UserNotFoundError(id);
    }
    return User.toResponse(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
