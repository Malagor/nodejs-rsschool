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
  // UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './tasks.service';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CustomError } from '../../middlewares/errorHandler';
// import { LoginGuard } from '../login/login.guard';

@Controller('boards/:boardId/tasks')
// @UseGuards(LoginGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Param('boardId') boardId: string): Promise<Task[]> {
    if (!boardId) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        `Not correct board id: ${boardId}`
      );
    }
    return this.taskService.getAll(boardId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(
    @Param('boardId') boardId: string,
    @Param('id') id: string
  ): Promise<Task | undefined> {
    return this.taskService.getOne(id, boardId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.taskService.create(boardId, createTaskDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    return this.taskService.update({ id, boardId, updateTaskDto });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('boardId') boardId: string,
    @Param('id') id: string
  ): Promise<DeleteResult> {
    return this.taskService.remove({ id, boardId });
  }
}
