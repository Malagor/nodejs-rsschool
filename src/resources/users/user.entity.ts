import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50, unique: true })
  login: string;

  @Column('varchar', { length: 100 })
  password?: string;

  constructor({ id, login, name, password } = {} as User) {
    this.id = id;
    this.login = login;
    this.name = name;
    this.password = password;
  }

  static toResponse(user: User): User {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
