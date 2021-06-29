import * as taskRepo from './tasks.postgres.repository';
import { Task } from '../../entities/Task';
import { QueryAnswers } from '../../constants';

const getAll = (boardId: string): Promise<Task[]> => taskRepo.getAll(boardId);

const get = (
  boardId: string,
  taskId: string
): Promise<Task | QueryAnswers.NOT_FOUND> => taskRepo.get(boardId, taskId);

const create = (taskData: Task): Promise<Task | QueryAnswers.NOT_FOUND> =>
  taskRepo.create(taskData);

const update = (
  boardId: string,
  taskId: string,
  taskData: Task
): Promise<Task | QueryAnswers.NOT_FOUND> =>
  taskRepo.update(boardId, taskId, taskData);

const remove = (
  boardId: string,
  taskId: string
): Promise<QueryAnswers.NOT_FOUND | QueryAnswers.DELETED> =>
  taskRepo.remove(boardId, taskId);

// const deleteAllTasksFromBoard = (
//   boardId: string
// ): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> =>
//   taskRepo.deleteTasksFromBoard(boardId);
//
// const deleteUserFromTask = (
//   userId: string
// ): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> =>
//   taskRepo.deleteUserFromTask(userId);

export {
  getAll,
  get,
  create,
  update,
  remove,
  // deleteAllTasksFromBoard,
  // deleteUserFromTask,
};
