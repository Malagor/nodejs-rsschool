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
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardService } from './boards.service';
import { Board } from './board.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { LoginGuard } from '../login/login.guard';

@Controller('boards')
@UseGuards(LoginGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Board[]> {
    return this.boardService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<Board | undefined> {
    return this.boardService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    const newBoard = new Board(createBoardDto);
    return this.boardService.create(newBoard);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Body() updateBoardDto: UpdateBoardDto,
    @Param('id') id: string
  ): Promise<Board | undefined> {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.boardService.remove(id);
  }
}
