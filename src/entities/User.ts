import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  login: string;

  @Column('varchar', { length: 100 })
  password: string;

  constructor({
    id = uuidv4(),
    login = '',
    name = '',
    password = '',
  }: Partial<User> = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
