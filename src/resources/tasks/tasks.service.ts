import { ITask } from '../../types.js';
import * as taskRepo from './tasks.memory.repository.js';

const getAll = (boardId: string): Promise<ITask[]> => taskRepo.getAll(boardId);

const get = (boardId: string, taskId: string): Promise<ITask | undefined> =>
  taskRepo.get(boardId, taskId);

const create = (taskData: ITask): Promise<ITask | undefined> =>
  taskRepo.create(taskData);

const update = (
  boardId: string,
  taskId: string,
  taskData: ITask
): Promise<ITask | null | undefined> =>
  taskRepo.update(boardId, taskId, taskData);

const remove = (boardId: string, taskId: string): Promise<boolean> =>
  taskRepo.remove(boardId, taskId);

const deleteAllTasksFromBoard = (boardId: string): Promise<boolean> =>
  taskRepo.deleteTasksFromBoard(boardId);

const deleteUserFromTask = (userId: string): Promise<boolean> =>
  taskRepo.deleteUserFromTask(userId);

export {
  getAll,
  get,
  create,
  update,
  remove,
  deleteAllTasksFromBoard,
  deleteUserFromTask,
};
