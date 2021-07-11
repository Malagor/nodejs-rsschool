import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryAnswers } from '../../constants';
import { UserNotFoundError } from './errors/user-not-found.error';
import { JwtLoginGuard } from '../login/jwt-login.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtLoginGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Получение пользвателя по id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOne(id);
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (e) {
      throw new HttpException(
        { message: e.message, detail: e.detail },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @ApiOperation({ summary: 'Редактирование пользователя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Put(':id')
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

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
