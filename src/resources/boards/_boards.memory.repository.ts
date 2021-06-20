import { IBoard, QueryAnswers } from '../../types';
import { memoryDb } from '../../memoryDb/memoryDb';

const { boards } = memoryDb;

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
  boardData: IBoard
): Promise<IBoard | QueryAnswers.NOT_FOUND> => {
  const index = boards.findIndex((board) => board.id === boardId);
  if (index === -1) return QueryAnswers.NOT_FOUND;

  boards[index] = { ...boards[index], ...boardData };
  return get(boardId);
};

const remove = async (
  boardId: string
): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> => {
  const index = boards.findIndex((board) => board.id === boardId);
  if (index === -1) return QueryAnswers.NOT_FOUND;

  boards.splice(index, 1);
  return QueryAnswers.DELETED;
};

export { getAll, get, create, update, remove };
