import uuid from 'uuid';
import { IColumn } from '../../types';

export default class Column {
  id: string;

  title: string;

  order: number;

  constructor({ id = uuid.v4(), order = 0, title = 'Column' }: IColumn) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
