import { IBoard } from '../../types.js';
import { memoryDb } from '../../memoryDb/memoryDb.js';

const { boards } = memoryDb;

const getAll = async (): Promise<IBoard[]> => [...boards];

const get = async (boardId: string): Promise<IBoard | undefined> =>
  boards.find((board: IBoard) => board.id === boardId);

const create = async (boardData: IBoard): Promise<IBoard | undefined> => {
  boards.push(boardData);
  return get(boardData.id);
};

const update = async (
  boardId: string,
  boardData: IBoard
): Promise<IBoard | null | undefined> => {
  const index = boards.findIndex((board) => board.id === boardId);
  if (index === -1) return null;

  boards[index] = { ...boards[index], ...boardData, id: boardId };
  return get(boardId);
};

const remove = async (itemId: string): Promise<boolean> => {
  const index = boards.findIndex((item) => item.id === itemId);
  if (index === -1) return false;

  return !!boards.splice(index, 1).length;
};

export { getAll, get, create, update, remove };
