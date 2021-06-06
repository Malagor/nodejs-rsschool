import { v4 as uuidv4 } from 'uuid';
import { IColumn, IBoard } from '../../types.js';
import Column from './column.model.js';

export class Board {
  id: string;

  title: string;

  columns: IColumn[] | null;

  constructor(
    { id = uuidv4(), title = 'Board', columns = null } = {} as IBoard
  ) {
    this.id = id;
    this.title = title;
    this.columns = Board.createColumns(columns);
  }

  static createColumns(columns: IColumn[] | null): IColumn[] {
    if (Array.isArray(columns)) {
      return columns.map((col: IColumn) => new Column({ ...col }));
    }
    return [new Column()];
  }
}
