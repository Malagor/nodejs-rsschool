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
  // UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardService } from './boards.service';
import { Board } from './board.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtLoginGuard } from '../login/jwt-login.guard';

@ApiTags('Boards')
@Controller('boards')
@UseGuards(JwtLoginGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: 'Получение всех досок' })
  @ApiResponse({ status: HttpStatus.OK, type: [Board] })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Board[]> {
    return this.boardService.getAll();
  }

  @ApiOperation({ summary: 'Получение доски по ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Board })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<Board | undefined> {
    return this.boardService.getOne(id);
  }

  @ApiOperation({ summary: 'Создание доски' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Board })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    const newBoard = new Board(createBoardDto);
    return this.boardService.create(newBoard);
  }

  @ApiOperation({ summary: 'Редактирование доски' })
  @ApiResponse({ status: HttpStatus.OK, type: Board })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Body() updateBoardDto: UpdateBoardDto,
    @Param('id') id: string
  ): Promise<Board | undefined> {
    return this.boardService.update(id, updateBoardDto);
  }

  @ApiOperation({ summary: 'Удаление доски' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.boardService.remove(id);
  }
}
