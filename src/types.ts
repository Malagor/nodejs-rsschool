export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[] | null;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
  password?: string;
}

export interface IDatabase {
  users: IUser[];
  boards: IBoard[];
  tasks: ITask[];
}
