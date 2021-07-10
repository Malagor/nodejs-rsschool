import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './boards.service';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { Task } from '../tasks/task.entity';
import { LoginModule } from '../login/login.module';

@Module({
  providers: [BoardService],
  controllers: [BoardController],
  imports: [
    TypeOrmModule.forFeature([Board, Task]),
    forwardRef(() => LoginModule),
  ],
})
export class BoardModule {}
