import { IBoard } from '../../types';
import * as boardRepo from './boards.memory.repository';
import * as tasksService from '../tasks/tasks.service';

const getAll = (): Promise<IBoard[]> => boardRepo.getAll();

const get = (id: string): Promise<IBoard | undefined> => boardRepo.get(id);

const create = (board: IBoard): Promise<IBoard | undefined> =>
  boardRepo.create(board);

const update = (
  id: string,
  board: IBoard
): Promise<IBoard | null | undefined> => boardRepo.update(id, board);

const remove = (id: string): Promise<[boolean, boolean]> =>
  Promise.all([tasksService.deleteAllTasksFromBoard(id), boardRepo.remove(id)]);

export { getAll, get, create, update, remove };
