import uuid from 'uuid';
import { IUser } from '../../types';

export default class User {
  id: string;

  name: string;

  login: string;

  password: string | undefined;

  constructor(user: IUser) {
    this.id = user.id || uuid.v4();
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }

  static toResponse(user: IUser): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
