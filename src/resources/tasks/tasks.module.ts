import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { Task } from './task.entity';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([Task])],
})
export class TaskModule {}
