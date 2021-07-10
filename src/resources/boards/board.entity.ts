import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnEntity,
  // OneToMany,
} from 'typeorm';
import { Column } from './column.model';
import { CreateBoardDto } from './dto/create-board.dto';
// import { Task } from '../tasks/task.entity';

@Entity({ name: 'board' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnEntity('varchar', { length: 50 })
  title: string;

  @ColumnEntity('jsonb', { nullable: true })
  columns: Column[];

  // @OneToMany(() => Task, (task) => task.boardId)
  // tasks!: Task[];

  constructor({ id, title = 'Board', columns } = {} as CreateBoardDto) {
    this.id = id;
    this.title = title;
    this.columns = Board.createColumns(columns);
  }

  static createColumns(columns: Column[] | undefined): Column[] {
    if (Array.isArray(columns)) {
      return columns.map((col: Column) => new Column(col));
    }
    return [new Column()];
  }
}
