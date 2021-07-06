import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Board } from './board.entity';
// import { CreateBoardDto } from './dto/create-board.dto';
import { CustomError } from '../../middlewares/errorHandler';
import { UpdateBoardDto } from './dto/update-board.dto';

// import { CustomError } from '../../middlewares/errorHandler';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>
  ) {}

  async getAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async getOne(id: string): Promise<Board> {
    const board = await this.boardsRepository.findOneOrFail({ id });
    if (!board) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Board with id: ${id} not found.`
      );
    }

    return board;
  }

  async create(boardDto: Board): Promise<Board> {
    const newBoard = this.boardsRepository.create(boardDto);
    return this.boardsRepository.save(newBoard);
  }

  async update(id: string, boardDto: UpdateBoardDto): Promise<Board> {
    const board = await this.boardsRepository.findOneOrFail({ id });

    if (!board) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Not found board with id: ${id}`
      );
    }

    this.boardsRepository.merge(board, boardDto);
    return this.boardsRepository.save(board);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.boardsRepository.delete({ id });
  }
}
