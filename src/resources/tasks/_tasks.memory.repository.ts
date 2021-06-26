import { memoryDb } from '../../memoryDb/memoryDb';
import { ITask, QueryAnswers } from '../../types';

let { tasks } = memoryDb;

const getAll = async (boardId: string): Promise<ITask[]> =>
  tasks.filter((task) => task.boardId === boardId);

const get = async (
  boardId: string,
  taskId: string
): Promise<ITask | QueryAnswers.NOT_FOUND> => {
  const task = tasks.find((t) => t.id === taskId && t.boardId === boardId);

  if (task === undefined) return QueryAnswers.NOT_FOUND;

  return task;
};

const create = async (task: ITask): Promise<ITask | QueryAnswers.NOT_FOUND> => {
  if (!task.boardId) return QueryAnswers.NOT_FOUND;

  tasks.push(task);
  return get(task.boardId, task.id);
};

const update = async (
  boardId: string,
  taskId: string,
  taskData: ITask
): Promise<ITask | QueryAnswers.NOT_FOUND> => {
  // let task = await get(boardId, taskId);
  const index = tasks.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (index === -1) return QueryAnswers.NOT_FOUND;

  tasks[index] = { ...tasks[index], ...taskData };

  return get(boardId, taskId);
};

const remove = async (
  boardId: string,
  taskId: string
): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> => {
  const index = tasks.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (index === -1) return QueryAnswers.NOT_FOUND;
  tasks.splice(index, 1);
  return QueryAnswers.DELETED;
};

const deleteUserFromTask = async (
  userId: string
): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> => {
  try {
    tasks.forEach((task) => {
      const locTask = task;
      if (locTask.userId === userId) {
        locTask.userId = null;
      }
    });
    return QueryAnswers.DELETED;
  } catch (e) {
    return QueryAnswers.NOT_FOUND;
  }
};

const deleteTasksFromBoard = async (
  boardId: string
): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> => {
  try {
    tasks = tasks.filter((task) => task.boardId !== boardId);
    return QueryAnswers.DELETED;
  } catch (e) {
    return QueryAnswers.NOT_FOUND;
  }
};

export {
  getAll,
  get,
  create,
  update,
  remove,
  deleteTasksFromBoard,
  deleteUserFromTask,
};
