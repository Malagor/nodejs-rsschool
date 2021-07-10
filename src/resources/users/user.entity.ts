import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class User {
  @ApiProperty({
    example: '18af7b72-ea23-43fb-864d-0eca2d682b08',
    description: 'Уникальный ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Maxim',
    description: 'Имя пользователя',
  })
  @Column('varchar', { length: 50 })
  name: string;

  @ApiProperty({
    example: 'maxim77',
    description: 'Логин',
  })
  @Column('varchar', { length: 50, unique: true })
  login: string;

  @ApiProperty({
    example: '12Khdn!!_ll2',
    description: 'Пароль',
  })
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
