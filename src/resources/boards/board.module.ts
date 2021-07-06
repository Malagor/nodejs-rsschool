import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './boards.service';
import { BoardController } from './board.controller';
import { Board } from './board.entity';

@Module({
  providers: [BoardService],
  controllers: [BoardController],
  imports: [TypeOrmModule.forFeature([Board])],
})
export class BoardModule {}
