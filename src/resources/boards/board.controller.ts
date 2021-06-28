import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  // Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardService } from './boards.service';
import { Board } from '../../entities/Board';

@Controller('boards')
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
    return this.boardService.create(createBoardDto);
  }

  // @Put(':id')
  // @HttpCode(HttpStatus.OK)
  // update(
  //   @Body() updateUserDto: UpdateUserDto,
  //   @Param('id') id: string
  // ): Promise<User | undefined> {
  //   return this.userService.update(id, updateUserDto);
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.boardService.remove(id);
  }
}
