import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnEntity,
  // OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from './column.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { ColumnDto } from './dto/create-column.dto';

@Entity({ name: 'board' })
export class Board {
  @ApiProperty({
    example: '18af7b72-ea23-43fb-864d-0eca2d682b08',
    description: 'Уникальный ID доски',
  })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    example: 'Проектные работы',
    description: 'Заголок',
  })
  @ColumnEntity('varchar', { length: 50 })
  title: string;

  @ApiProperty({
    example: [
      {
        id: '18af7b72-ea23-43fb-864d-0eca2d682b08',
        title: 'TODO',
        order: 0,
      },
      {
        id: '1aa92e73-7d16-4a4d-bf26-f7cc51270059',
        title: 'inProcess',
        order: 1,
      },
    ],
    description: 'Массив Столбцов',
  })
  @ColumnEntity('jsonb', { nullable: true })
  columns: ColumnDto[];

  constructor({ title = 'Board', columns } = {} as CreateBoardDto) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns ? Board.createColumns(columns) : [];
  }

  static createColumns(columns: Column[] | undefined): Column[] {
    if (Array.isArray(columns)) {
      return columns.map((col: Column) => new Column(col));
    }
    return [new Column()];
  }
}
