import uuid from 'uuid';
import { IColumn } from '../../types';

export default class Column {
  id: string;

  title: string;

  order: number;

  constructor(column?: IColumn) {
    this.id = column?.id || uuid.v4();
    this.title = column?.title || 'Column';
    this.order = column?.order || 0;
  }
}
