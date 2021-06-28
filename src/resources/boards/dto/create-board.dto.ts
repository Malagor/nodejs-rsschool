// import { Column } from '../column.model';
// import { IColumn } from '../../../types';

export class CreateBoardDto {
  readonly id: string;

  readonly title: string;

  readonly columns?: [];

  constructor(board: CreateBoardDto) {
    this.id = board.id;
    this.title = board.title;
    this.columns = board.columns;
  }

  // static createColumns(columns: IColumn[]): IColumn[] {
  //   if (Array.isArray(columns)) {
  //     return columns.map((col: IColumn) => new Column({ ...col }));
  //   }
  //   return [new Column()];
  // }
}
