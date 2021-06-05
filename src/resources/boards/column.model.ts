import { v4 as uuidv4 } from 'uuid';
import { IColumn } from '../../types';

export default class Column {
  id: string;

  title: string;

  order: number;

  constructor({ id = uuidv4(), title = 'Column', order = 0 } = {} as IColumn) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
