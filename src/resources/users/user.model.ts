import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../types.js';

export default class User {
  id: string;

  name: string;

  login: string;

  password: string | undefined;

  constructor({ id = uuidv4(), login, name, password } = {} as IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
