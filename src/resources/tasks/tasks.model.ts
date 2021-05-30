import uuid from 'uuid';
import { ITask } from '../../types';

export default class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string;

  boardId: string;

  columnId: string;

  constructor(task: ITask) {
    this.id = task.id || uuid.v4();
    this.title = task.title || 'Task';
    this.order = task.order || 0;
    this.description = task.description || 'Description';
    this.userId = task.userId || '';
    this.boardId = task.boardId || '';
    this.columnId = task.columnId || '';
  }
}
