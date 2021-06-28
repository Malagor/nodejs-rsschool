import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Board } from '../../entities/Board';
import { CreateBoardDto } from './dto/create-board.dto';
import { CustomError } from '../../middlewares/errorHandler';
// import { UpdateBoardDto } from './dto/update-board.dto';
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

  async getOne(id: string): Promise<Board | undefined> {
    const board = await this.boardsRepository.findOneOrFail(id);
    if (!board) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Board with id: ${id} not found.`
      );
    }

    return board;
  }

  async create(boardDto: CreateBoardDto): Promise<Board> {
    const newBoard = this.boardsRepository.create(boardDto);
    return this.boardsRepository.save(newBoard);
  }

  // async update(id: string, boardDto: UpdateBoardDto): Promise<Board | undefined> {
  //   const board = this.boardsRepository.findOne(id);
  //
  //   if (!board) {
  //     throw new CustomError(
  //       HttpStatus.NOT_FOUND,
  //       `Not found board with id: ${id}`
  //     );
  //   }
  //
  //   if (board) {
  //     this.boardsRepository.merge(board, boardDto);
  //     return this.boardsRepository.save(board);
  //   }
  //   return undefined;
  // }

  async remove(id: string): Promise<DeleteResult> {
    return this.boardsRepository.delete(id);
  }
}
