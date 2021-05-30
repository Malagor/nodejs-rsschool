import { v4 as uuidv4 } from 'uuid';
import { IColumn } from '../../types.js';

export default class Column {
  id: string;

  title: string;

  order: number;

  constructor(column?: IColumn) {
    this.id = column?.id || uuidv4();
    this.title = column?.title || 'Column';
    this.order = column?.order || 0;
  }
}
