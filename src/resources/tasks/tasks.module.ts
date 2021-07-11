import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { Task } from './task.entity';
import { Board } from '../boards/board.entity';
import { LoginModule } from '../login/login.module';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [
    TypeOrmModule.forFeature([Task, Board]),
    forwardRef(() => LoginModule),
  ],
})
export class TaskModule {}
