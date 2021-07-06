import { v4 as uuidv4 } from 'uuid';
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column as ColumnEntity,
// } from 'typeorm';

// @Entity()
export class Column {
  // @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ColumnEntity('varchar', { length: 50 })
  title: string;

  // @ColumnEntity('int')
  order: number;

  constructor({ id = uuidv4(), title = 'Column', order = 0 } = {} as Column) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
