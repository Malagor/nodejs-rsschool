import { IBoard, QueryAnswers } from '../../types';
import * as boardRepo from './boards.memory.repository';
import * as tasksService from '../tasks/tasks.service';

const getAll = (): Promise<IBoard[]> => boardRepo.getAll();

const get = (id: string): Promise<IBoard | QueryAnswers.NOT_FOUND> =>
  boardRepo.get(id);

const create = (board: IBoard): Promise<IBoard | QueryAnswers.NOT_FOUND> =>
  boardRepo.create(board);

const update = (
  id: string,
  board: IBoard
): Promise<IBoard | QueryAnswers.NOT_FOUND> => boardRepo.update(id, board);

const remove = (id: string): Promise<QueryAnswers[]> =>
  Promise.all([tasksService.deleteAllTasksFromBoard(id), boardRepo.remove(id)]);

export { getAll, get, create, update, remove };
