import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../types.js';

export default class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor(
    {
      id = uuidv4(),
      title = 'Task',
      description = 'Description',
      order = 0,
      userId = null,
      boardId = null,
      columnId = null,
    } = {} as ITask
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
