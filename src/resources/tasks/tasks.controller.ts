import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  // UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './tasks.service';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CustomError } from '../../middlewares/errorHandler';
import { JwtLoginGuard } from '../login/jwt-login.guard';
import { HttpExceptionFilter } from '../../exceptionFilter/http-exception.filter';

@ApiTags('Tasks')
@Controller('boards/:boardId/tasks')
@UseGuards(JwtLoginGuard)
@UseFilters(new HttpExceptionFilter())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Получение всех задач на доске' })
  @ApiResponse({ status: HttpStatus.OK, type: [Task] })
  @Get()
  // @HttpCode(HttpStatus.OK)
  getAll(@Param('boardId') boardId: string): Promise<Task[]> {
    if (!boardId) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        `Not correct board id: ${boardId}`
      );
    }
    return this.taskService.getAll(boardId);
  }

  @ApiOperation({ summary: 'Получение задачи по ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  @Get(':id')
  // @HttpCode(HttpStatus.OK)
  getOne(
    @Param('boardId') boardId: string,
    @Param('id') id: string
  ): Promise<Task | undefined> {
    return this.taskService.getOne(id, boardId);
  }

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Task })
  @Post()
  // @HttpCode(HttpStatus.CREATED)
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.taskService.create(boardId, createTaskDto);
  }

  @ApiOperation({ summary: 'Редактирование задачи' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  @Put(':id')
  // @HttpCode(HttpStatus.OK)
  update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    return this.taskService.update({ id, boardId, updateTaskDto });
  }

  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('boardId') boardId: string,
    @Param('id') id: string
  ): Promise<DeleteResult> {
    return this.taskService.remove({ id, boardId });
  }
}
