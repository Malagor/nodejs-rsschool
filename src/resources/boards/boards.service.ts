import { QueryAnswers } from '../../types';
import { Board } from '../../entities/Board';
import * as boardRepo from './board.postgres.repository';

const getAll = (): Promise<Board[]> => boardRepo.getAll();

const get = (id: string): Promise<Board | QueryAnswers.NOT_FOUND> =>
  boardRepo.get(id);

const create = (board: Board): Promise<Board | QueryAnswers.NOT_FOUND> =>
  boardRepo.create(board);

const update = (
  id: string,
  board: Board
): Promise<Board | QueryAnswers.NOT_FOUND> => boardRepo.update(id, board);

const remove = (id: string): Promise<QueryAnswers> => boardRepo.remove(id);

export { getAll, get, create, update, remove };
