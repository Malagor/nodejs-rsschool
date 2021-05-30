import uuid from 'uuid';
import { IColumn, IBoard } from '../../types';
import Column from './column.model';

export class Board {
  id: string;

  title: string;

  columns: IColumn[] | null;

  constructor({ id = uuid.v4(), title = 'Board', columns = null }: IBoard) {
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
