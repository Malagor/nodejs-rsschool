import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { CustomError } from '../../middlewares/errorHandler';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async getAll(boardId: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({ boardId });
    if (!tasks) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Error request tasks from board with id: ${boardId}`
      );
    }
    return tasks;
  }

  async getOne(id: string, boardId: string): Promise<Task> {
    const task = await this.tasksRepository.findOneOrFail({ id, boardId });
    if (!task) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Task with id: ${id} not found.`
      );
    }

    return task;
  }

  async create(boardId: string, taskDto: CreateTaskDto): Promise<Task> {
    const newTask = await this.tasksRepository.create({ ...taskDto, boardId });
    return this.tasksRepository.save(newTask);
  }

  async update(params: {
    id: string;
    boardId: string;
    updateTaskDto: UpdateTaskDto;
  }): Promise<Task> {
    const { id, boardId, updateTaskDto } = params;
    const task = await this.tasksRepository.findOneOrFail({ id, boardId });

    if (!task) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Not found task with id: ${id}`
      );
    }

    this.tasksRepository.merge(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(params: { id: string; boardId: string }): Promise<DeleteResult> {
    const { id, boardId } = params;
    // const res = await this.tasksRepository.delete({ id, boardId });
    // if (!res) {
    //   throw new CustomError(
    //     HttpStatus.NOT_FOUND,
    //     `Not found task with id: ${id}`
    //   );
    // }
    // return res;
    return this.tasksRepository.delete({ id, boardId });
    // if (!res) {
    //   throw new CustomError(
    //     HttpStatus.NOT_FOUND,
    //     `Not found task with id: ${id}`
    //   );
    // }
    // return res;
  }
}
