import { IBoard, QueryAnswers } from '../../types';
import { memoryDb } from '../../memoryDb/memoryDb';

let { boards } = memoryDb;

const getAll = async (): Promise<IBoard[]> => [...boards];

const get = async (
  boardId: string
): Promise<IBoard | QueryAnswers.NOT_FOUND> => {
  const board = boards.find((b: IBoard) => b.id === boardId);
  if (board === undefined) return QueryAnswers.NOT_FOUND;

  return board;
};

const create = async (
  boardData: IBoard
): Promise<IBoard | QueryAnswers.NOT_FOUND> => {
  boards.push(boardData);
  return get(boardData.id);
};

const update = async (
  boardId: string,
  boardData: Omit<IBoard, 'id'>
): Promise<IBoard | QueryAnswers.NOT_FOUND> => {
  let board = await get(boardId);
  if (board === QueryAnswers.NOT_FOUND) return QueryAnswers.NOT_FOUND;

  board = { ...board, ...boardData };
  return board;
};

const remove = async (
  boardId: string
): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> => {
  const board = await get(boardId);
  if (board === QueryAnswers.NOT_FOUND) {
    return QueryAnswers.NOT_FOUND;
  }
  boards = boards.filter((b) => b.id !== boardId);
  return QueryAnswers.DELETED;
};

export { getAll, get, create, update, remove };
