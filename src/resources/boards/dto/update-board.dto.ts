import { Column } from '../column.model';

export interface UpdateBoardDto {
  title?: string;
  column?: Column[];
}
